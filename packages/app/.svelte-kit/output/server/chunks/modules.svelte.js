import "clsx";
import SQL from "@tauri-apps/plugin-sql";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { eq, and, sql, gte, inArray } from "drizzle-orm";
let database;
let sqlite;
async function useDatabase() {
  if (database)
    return { database, sqlite };
  sqlite = await SQL.load("sqlite:sqlite.db");
  database = drizzle(
    async (sql2, params, method) => {
      let rows = [];
      let results = [];
      if (isSelectQuery(sql2)) {
        rows = await sqlite.select(sql2, params).catch((e) => {
          console.error("SQL Error:", e);
          return [];
        });
      } else {
        rows = await sqlite.execute(sql2, params).catch((e) => {
          console.error("SQL Error:", e);
          return [];
        });
        return { rows: [] };
      }
      rows = rows.map((row) => {
        return Object.values(row);
      });
      results = method === "all" ? rows : rows[0];
      return { rows: results };
    },
    { logger: false, casing: "snake_case" }
  );
  return { database, sqlite };
}
function isSelectQuery(sql2) {
  const selectRegex = /^\s*SELECT\b/i;
  return selectRegex.test(sql2);
}
const userModules = sqliteTable("user_modules", {
  id: integer().primaryKey({ autoIncrement: true }),
  moduleId: text("module_id").notNull(),
  color: text().notNull().default("#FFFFFF"),
  displayOrder: integer("display_order").notNull().default(0)
});
const userLinks = sqliteTable("user_links", {
  id: integer().primaryKey({ autoIncrement: true }),
  linkId: text("link_id").notNull(),
  type: text({ enum: ["shortcut", "label"] }).notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  icon: text(),
  color: text().notNull().default("#FFFFFF"),
  parameters: text({ mode: "json" }).$type(),
  moduleId: text("module_id").notNull()
});
const moduleStore = {
  modules: [],
  moduleCards: [],
  shortcuts: [],
  async loadModuleCards() {
    const { database: database2 } = await useDatabase();
    const enabledModules = await database2.select().from(userModules).orderBy(userModules.displayOrder);
    const enabledLabels = await database2.select().from(userLinks).where(eq(userLinks.type, "label")).orderBy(userLinks.displayOrder);
    this.moduleCards = await Promise.all(enabledModules.map(async (m) => {
      const moduleDef = this.modules.find((mod) => mod.id === m.moduleId);
      const labelsForModule = enabledLabels.filter((l) => l.moduleId === m.moduleId);
      const resolved = await Promise.all(labelsForModule.map(async (l) => {
        const link = moduleDef.links.find((link2) => link2.id === l.linkId);
        const mod = await link.call();
        return { component: mod?.default, parameters: l.parameters ?? {} };
      }));
      return {
        name: moduleDef.name,
        moduleId: m.moduleId,
        color: m.color,
        displayOrder: m.displayOrder,
        labels: resolved
      };
    }));
  },
  async loadShortcuts() {
    const { database: database2 } = await useDatabase();
    const enabledShortcuts = await database2.select().from(userLinks).where(eq(userLinks.type, "shortcut")).orderBy(userLinks.displayOrder);
    const modulesById = new Map(this.modules.map((m) => [m.id, m]));
    const resolved = [];
    const invalidLinkIds = [];
    for (const shortcut of enabledShortcuts) {
      const moduleDef = modulesById.get(shortcut.moduleId);
      if (!moduleDef) {
        invalidLinkIds.push(shortcut.id);
        continue;
      }
      const link = moduleDef.links.find((l) => l.type === "shortcut" && l.id === shortcut.linkId);
      if (!link) {
        invalidLinkIds.push(shortcut.id);
        continue;
      }
      resolved.push({
        id: shortcut.id,
        moduleId: shortcut.moduleId,
        linkId: shortcut.linkId,
        icon: shortcut.icon,
        color: shortcut.color,
        displayOrder: shortcut.displayOrder,
        call: link.call,
        parameters: shortcut.parameters ?? {}
      });
    }
    if (invalidLinkIds.length > 0) await database2.delete(userLinks).where(inArray(userLinks.id, invalidLinkIds));
    this.shortcuts = resolved;
  },
  /**
   * Enables a module.
   *
   * This will insert the module into the database and adjust the display order of existing modules.
   *
   * @param moduleId The module identifier to enable.
   * @param color The color to assign to the module.
   * @param position The display order position for the module.
   */
  async addModuleCard(moduleId, color, position) {
    if (!position) position = this.moduleCards[this.moduleCards.length - 1]?.displayOrder + 1 || 0;
    if (!color) color = "#FFFFFF";
    const { database: database2 } = await useDatabase();
    const result = await database2.select().from(userModules).where(eq(userModules.displayOrder, position));
    if (result.length > 0) {
      database2.update(userModules).set({ displayOrder: sql`${userModules.displayOrder} + 1` }).where(gte(userModules.displayOrder, position));
    }
    await database2.insert(userModules).values({ moduleId, color, displayOrder: position });
    await this.loadModuleCards();
  },
  /**
   * Disables a module.
   *
   * @param moduleId The module identifier to disable.
   */
  async removeModuleCard(moduleId) {
    const { database: database2 } = await useDatabase();
    await database2.delete(userModules).where(eq(userModules.moduleId, moduleId));
    await database2.delete(userLinks).where(eq(userLinks.moduleId, moduleId));
    await this.loadModuleCards();
    await this.loadShortcuts();
  },
  /**
   * Retrieves all labels for a module.
   *
   * @param moduleId The module identifier to get labels for.
   * @returns An array of labels for the specified module.
   */
  getLabels(moduleId) {
    return this.modules.find((m) => m.id === moduleId)?.links.filter((l) => l.type === "label").sort((a, b) => a.name.localeCompare(b.name)) || [];
  },
  /**
   * Retrieves all possible actions for a module.
   *
   * @param moduleId The module identifier to get action for.
   * @returns An array of actions for the specified module.
   */
  getActions(moduleId) {
    return this.modules.find((m) => m.id === moduleId)?.links.filter((l) => l.type === "shortcut").sort((a, b) => a.name.localeCompare(b.name)) || [];
  },
  /**
   * Retrieves all enabled labels for a module.
   *
   * @param moduleId The module identifier to get enabled labels for.
   * @returns An array of enabled labels for the specified module.
   */
  async getEnabledLabels(moduleId) {
    const { database: database2 } = await useDatabase();
    const result = await database2.select().from(userLinks).where(and(eq(userLinks.moduleId, moduleId), eq(userLinks.type, "label"))).orderBy(userLinks.displayOrder);
    return result.map((l) => ({ id: l.id, linkId: l.linkId, parameters: l.parameters }));
  },
  /**
   * Adds a new label to a module.
   *
   * This will insert the label into the database and adjust the display order of existing labels.
   *
   * @param moduleId The module identifier to add the label to.
   * @param linkId The link identifier for the label.
   * @param parameters The parameters for the label.
   * @param position The position in the module's label list for the label.
   */
  async addLabel(moduleId, linkId, parameters, position) {
    const { database: database2 } = await useDatabase();
    const result = await database2.select().from(userLinks).where(and(eq(userLinks.moduleId, moduleId), eq(userLinks.displayOrder, position)));
    if (result.length > 0) {
      await database2.update(userLinks).set({ displayOrder: sql`${userLinks.displayOrder} + 1` }).where(and(eq(userLinks.moduleId, moduleId), gte(userLinks.displayOrder, position)));
    }
    await database2.insert(userLinks).values({
      linkId,
      type: "label",
      displayOrder: position,
      parameters,
      moduleId
    });
    await this.loadModuleCards();
  },
  /**
   * Adds a new shortcut to quick actions.
   *
   * @param moduleId The module identifier the shortcut is for.
   * @param linkId The link identifier the shortcut invokes.
   * @param parameters The parameters for the shortcut call.
   * @param icon The icon for the shortcut.
   * @param color The color for the shortcut.
   * @param position The position in the shortcut list.
   */
  async addShortcut(moduleId, linkId, parameters, icon, color, position) {
    if (!position) position = this.shortcuts[this.shortcuts.length - 1]?.displayOrder + 1 || 0;
    if (!color) color = "#FFFFFF";
    const { database: database2 } = await useDatabase();
    const result = await database2.select().from(userLinks).where(and(eq(userLinks.moduleId, moduleId), eq(userLinks.displayOrder, position)));
    if (result.length > 0) {
      database2.update(userLinks).set({ displayOrder: sql`${userLinks.displayOrder} + 1` }).where(and(eq(userLinks.moduleId, moduleId), gte(userLinks.displayOrder, position)));
    }
    await database2.insert(userLinks).values({
      linkId,
      type: "shortcut",
      displayOrder: position,
      icon,
      color,
      parameters,
      moduleId
    });
    await this.loadShortcuts();
  },
  /**
   * Removes a link (shortcut or label) from the home screen.
   *
   * @param id The identifier of the link to remove.
   */
  async removeLink(id) {
    const { database: database2 } = await useDatabase();
    await database2.delete(userLinks).where(eq(userLinks.id, id));
    await this.loadShortcuts();
  },
  /**
   * Updates a module card's editable fields.
   *
   * @param moduleId The module identifier whose card is being edited.
   * @param data Partial editable properties (color, displayOrder)
   * @param data.color New color value
   * @param data.displayOrder New display order
   */
  async editModuleCard(moduleId, data) {
    const { database: database2 } = await useDatabase();
    const updates = {};
    if (data.color !== void 0) updates.color = data.color;
    if (data.displayOrder !== void 0) updates.displayOrder = data.displayOrder;
    if (Object.keys(updates).length === 0) return;
    await database2.update(userModules).set(updates).where(eq(userModules.moduleId, moduleId));
    await this.loadModuleCards();
  },
  /**
   * Updates a shortcut's editable fields.
   *
   * @param id The userLinks row id for the shortcut (same as Shortcut.id)
   * @param data Partial editable properties (icon, color, displayOrder, parameters)
   * @param data.icon New icon class
   * @param data.color New color value
   * @param data.displayOrder New display order
   * @param data.parameters Updated parameters payload
   */
  async editShortcut(id, data) {
    const { database: database2 } = await useDatabase();
    const updates = {};
    if (data.icon !== void 0) updates.icon = data.icon;
    if (data.color !== void 0) updates.color = data.color;
    if (data.displayOrder !== void 0) updates.displayOrder = data.displayOrder;
    if (data.parameters !== void 0) updates.parameters = data.parameters;
    if (Object.keys(updates).length === 0) return;
    await database2.update(userLinks).set(updates).where(eq(userLinks.id, id));
    await this.loadShortcuts();
  }
};
export {
  moduleStore as m,
  useDatabase as u
};
