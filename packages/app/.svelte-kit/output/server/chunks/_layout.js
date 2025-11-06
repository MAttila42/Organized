import { u as useDatabase, m as moduleStore } from "./modules.svelte.js";
import { t, a as initI18n } from "./i18n.svelte.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "./client.js";
import { sql, eq } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
async function migrate(fetch) {
  const res = await fetch("/migrations/meta/_journal.json");
  const data = await res.json();
  let migrations = data.entries.map((entry) => entry.tag);
  migrations = migrations.sort((a, b) => {
    const aHash = a.slice(0, 4);
    const bHash = b.slice(0, 4);
    if (aHash && bHash)
      return aHash.localeCompare(bHash);
    return 0;
  });
  const migrationTableCreate = (
    /* sql */
    `
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash text NOT NULL UNIQUE,
      created_at numeric
    )
  `
  );
  const { sqlite } = await useDatabase();
  await sqlite.execute(migrationTableCreate, []);
  for (const hash of migrations) {
    const dbMigrations = await sqlite.select(
      /* sql */
      `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`
    );
    const hasBeenRun = (hash2) => dbMigrations.find((dbMigration) => {
      return dbMigration?.hash === hash2;
    });
    if (hash && hasBeenRun(hash) === void 0) {
      const res2 = await fetch(`/migrations/${hash}.sql`);
      const data2 = await res2.text();
      if (data2) {
        sqlite.execute(data2, []);
        sqlite.execute(
          /* sql */
          `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
          [hash, Date.now()]
        );
      }
    }
  }
  return Promise.resolve();
}
function registerModule({ links = [], ...module }) {
  const definition = {
    ...module,
    links
  };
  const index = moduleStore.modules.findIndex((m) => m.id === definition.id);
  if (index === -1)
    moduleStore.modules.push(definition);
  else
    moduleStore.modules[index] = definition;
  return definition;
}
function createModuleRouteShortcut(moduleId, ...segments) {
  const path = segments.map((segment) => segment.trim()).filter(Boolean).map(encodeURIComponent).join("/");
  return async (params) => {
    const { goto: goto2 } = await import("./navigation.js");
    const url = path ? `/module/${moduleId}/${path}` : `/module/${moduleId}`;
    let query = "";
    if (params && Object.keys(params).length > 0) {
      const search = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value === void 0 || value === null)
          continue;
        search.set(key, String(value));
      }
      const serialized = search.toString();
      if (serialized)
        query = `?${serialized}`;
    }
    await goto2(`${url}${query}`);
  };
}
function createAddTransactionShortcut() {
  const navigate = createModuleRouteShortcut("finances", "record-transaction");
  return async (params) => {
    const payload = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        const normalized = (typeof value === "string" ? value : String(value)).trim();
        if (normalized)
          payload[key] = normalized;
      }
    }
    await navigate(payload);
  };
}
const wallets = sqliteTable("wallets", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#2563EB"),
  description: text("description"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
const walletTransactions = sqliteTable("wallet_transactions", {
  id: integer().primaryKey({ autoIncrement: true }),
  walletId: integer("wallet_id").notNull().references(() => wallets.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  description: text("description"),
  occurredAt: text("occurred_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
const finances = {
  wallets: [],
  transactions: [],
  selectedWalletId: null,
  get selectedWallet() {
    if (this.selectedWalletId == null) return void 0;
    return this.wallets.find((wallet) => wallet.id === this.selectedWalletId);
  },
  get walletSummaries() {
    return this.wallets.map((wallet) => {
      const related = wallet.id == null ? [] : this.transactions.filter((tx) => tx.walletId === wallet.id);
      const stats = summariseTransactions(related);
      return { wallet, ...stats };
    });
  },
  get selectedWalletSummary() {
    const wallet = this.selectedWallet;
    if (!wallet) return null;
    return this.walletSummaries.find((item) => item.wallet.id === wallet.id) ?? {
      wallet,
      balance: 0,
      income: 0,
      expense: 0,
      transactionCount: 0
    };
  },
  get selectedTransactions() {
    if (this.selectedWalletId == null) return [];
    return [...this.transactions].filter((tx) => tx.walletId === this.selectedWalletId).sort((a, b) => {
      const aDate = toComparableDate(a.occurredAt);
      const bDate = toComparableDate(b.occurredAt);
      if (aDate === bDate) return (b.id ?? 0) - (a.id ?? 0);
      return bDate - aDate;
    });
  },
  selectWallet(walletId) {
    this.selectedWalletId = walletId;
  },
  ensureSelection() {
    if (this.wallets.length === 0) {
      this.selectedWalletId = null;
      return;
    }
    if (this.selectedWalletId == null || !this.wallets.some((w) => w.id === this.selectedWalletId)) this.selectedWalletId = this.wallets[0]?.id ?? null;
  },
  async loadAll() {
    await Promise.all([this.loadWallets(), this.loadTransactions()]);
    this.ensureSelection();
  },
  async loadWallets() {
    const { database } = await useDatabase();
    this.wallets = await database.select().from(wallets).all();
    this.ensureSelection();
  },
  async loadTransactions() {
    const { database } = await useDatabase();
    this.transactions = await database.select().from(walletTransactions).all();
  },
  async addWallet(payload) {
    const { database } = await useDatabase();
    await database.insert(wallets).values(payload);
    await this.loadWallets();
    const latest = this.wallets.reduce(
      (candidate, wallet) => {
        if (wallet.id == null) return candidate;
        if (!candidate?.id || wallet.id > candidate.id) return wallet;
        return candidate;
      },
      null
    );
    if (latest?.id != null) this.selectedWalletId = latest.id;
  },
  async updateWallet(id, payload) {
    const { database } = await useDatabase();
    await database.update(wallets).set(payload).where(eq(wallets.id, id));
    await this.loadWallets();
  },
  async removeWallet(id) {
    const { database } = await useDatabase();
    await database.delete(walletTransactions).where(eq(walletTransactions.walletId, id));
    await database.delete(wallets).where(eq(wallets.id, id));
    await this.loadWallets();
    await this.loadTransactions();
  },
  async addTransaction(payload) {
    const { database } = await useDatabase();
    await database.insert(walletTransactions).values(payload);
    await this.loadTransactions();
  },
  async updateTransaction(id, payload) {
    const { database } = await useDatabase();
    await database.update(walletTransactions).set(payload).where(eq(walletTransactions.id, id));
    await this.loadTransactions();
  },
  async removeTransaction(id) {
    const { database } = await useDatabase();
    await database.delete(walletTransactions).where(eq(walletTransactions.id, id));
    this.transactions = this.transactions.filter((tx) => tx.id !== id);
  }
};
function summariseTransactions(transactions) {
  let income = 0;
  let expense = 0;
  for (const tx of transactions) {
    const value = Number(tx.amount ?? 0);
    if (!Number.isFinite(value)) continue;
    if (value >= 0) income += value;
    else expense += Math.abs(value);
  }
  return {
    income,
    expense,
    balance: income - expense,
    transactionCount: transactions.length
  };
}
function toComparableDate(value) {
  if (!value) return 0;
  const timestamp = Date.parse(value);
  if (!Number.isNaN(timestamp)) return timestamp;
  return 0;
}
function load$3() {
  registerModule({
    id: "finances",
    name: t("modules.finances.name", "Finances"),
    description: t("modules.finances.description", "Track wallets, balances, and transactions."),
    links: [
      {
        id: "record-transaction",
        name: t("modules.finances.links.recordTransaction.name", "Record transaction"),
        description: t("modules.finances.links.recordTransaction.description", "Open finances to record a transaction in a selected wallet."),
        moduleId: "finances",
        type: "shortcut",
        call: createAddTransactionShortcut(),
        parameters: [
          {
            id: "wallet",
            name: t("modules.finances.links.recordTransaction.parameters.wallet", "Wallet name"),
            type: "string"
          }
        ]
      },
      {
        id: "wallet-balances",
        name: t("modules.finances.links.walletBalances.name", "Wallet balances"),
        description: t("modules.finances.links.walletBalances.description", "Snapshot of each wallet with its current balance."),
        moduleId: "finances",
        type: "label",
        call: () => import("./WalletBalances.js"),
        parameters: []
      }
    ],
    component: () => import("./finances.js")
  });
  finances.loadAll();
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$3
}, Symbol.toStringTag, { value: "Module" }));
const shoppingList = sqliteTable("shopping_list", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  quantity: integer("quantity"),
  unit: text("unit"),
  description: text("description")
});
const shopping = {
  items: [],
  async addItem(item) {
    const { database } = await useDatabase();
    await database.insert(shoppingList).values(item);
    await this.loadItems();
  },
  async removeItem(id) {
    const { database } = await useDatabase();
    await database.delete(shoppingList).where(eq(shoppingList.id, id));
    this.items = this.items.filter((item) => item.id !== id);
  },
  async loadItems() {
    const { database } = await useDatabase();
    this.items = await database.select().from(shoppingList).all();
  }
};
function load$2() {
  registerModule({
    id: "shopping",
    name: t("modules.shopping.name", "Shopping"),
    description: t("modules.shopping.description", "Barebones shopping module."),
    links: [
      {
        id: "add-item",
        name: t("modules.shopping.links.addItem.name", "Add Item"),
        description: t("modules.shopping.links.addItem.description", "Jump to the shopping module and open the add item dialog."),
        moduleId: "shopping",
        type: "shortcut",
        call: createModuleRouteShortcut("shopping", "add-item"),
        parameters: []
      },
      {
        id: "list",
        name: t("modules.shopping.links.list.name", "Shopping List"),
        description: t("modules.shopping.links.list.description", "List of items to buy."),
        moduleId: "shopping",
        type: "label",
        call: () => import("./ShoppingList.js"),
        parameters: []
      }
    ],
    component: () => import("./shopping.js")
  });
  shopping.loadItems();
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$2
}, Symbol.toStringTag, { value: "Module" }));
const classes = sqliteTable("classes", {
  id: integer().primaryKey({ autoIncrement: true }),
  subject: text("subject").notNull(),
  shortName: text("short_name"),
  teacher: text("teacher"),
  location: text("location"),
  color: text().notNull().default("#FFFFFF"),
  day: integer("day"),
  // 0 = Monday, 6 = Sunday
  schedule: integer("schedule")
  // 0 = first period, 1 = second period, etc.
});
const assignments = sqliteTable("assignments", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subject: text("subject"),
  dueDate: text("due_date"),
  description: text("description"),
  completed: integer("completed").notNull().default(0)
});
const exams = sqliteTable("exams", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subject: text("subject"),
  date: text("date").notNull(),
  description: text("description")
});
const study = {
  items: [],
  assignments: [],
  exams: [],
  selectedDay: (() => {
    const d = /* @__PURE__ */ (/* @__PURE__ */ new Date()).getDay();
    return d === 0 ? 6 : d - 1;
  })(),
  setDay(day) {
    this.selectedDay = day;
  },
  nextDay() {
    this.selectedDay = (this.selectedDay + 1) % 7;
  },
  prevDay() {
    this.selectedDay = (this.selectedDay + 6) % 7;
  },
  get neighborDays() {
    return {
      prev: (this.selectedDay + 6) % 7,
      current: this.selectedDay,
      next: (this.selectedDay + 1) % 7
    };
  },
  get filteredItems() {
    return this.items.filter((i) => i.day == null || i.day === this.selectedDay).sort((a, b) => (a.schedule ?? 0) - (b.schedule ?? 0));
  },
  async addItem(item) {
    const { database } = await useDatabase();
    await database.insert(classes).values(item);
    await this.loadItems();
  },
  async updateItem(id, item) {
    const { database } = await useDatabase();
    await database.update(classes).set(item).where(eq(classes.id, id));
    await this.loadItems();
  },
  async removeItem(id) {
    const { database } = await useDatabase();
    await database.delete(classes).where(eq(classes.id, id));
    this.items = this.items.filter((item) => item.id !== id);
  },
  async loadItems() {
    await Promise.all([this.loadClasses(), this.loadAssignments(), this.loadExams()]);
  },
  async loadClasses() {
    const { database } = await useDatabase();
    this.items = await database.select().from(classes).all();
  },
  async loadAssignments() {
    const { database } = await useDatabase();
    this.assignments = await database.select().from(assignments).all();
  },
  async loadExams() {
    const { database } = await useDatabase();
    this.exams = await database.select().from(exams).all();
  },
  async addAssignment(item) {
    const { database } = await useDatabase();
    await database.insert(assignments).values(item);
    await this.loadAssignments();
  },
  async updateAssignment(id, item) {
    const { database } = await useDatabase();
    await database.update(assignments).set(item).where(eq(assignments.id, id));
    await this.loadAssignments();
  },
  async removeAssignment(id) {
    const { database } = await useDatabase();
    await database.delete(assignments).where(eq(assignments.id, id));
    this.assignments = this.assignments.filter((assignment) => assignment.id !== id);
  },
  async setAssignmentCompletion(id, completed) {
    await this.updateAssignment(id, { completed: completed ? 1 : 0 });
  },
  async addExam(item) {
    const { database } = await useDatabase();
    await database.insert(exams).values(item);
    await this.loadExams();
  },
  async updateExam(id, item) {
    const { database } = await useDatabase();
    await database.update(exams).set(item).where(eq(exams.id, id));
    await this.loadExams();
  },
  async removeExam(id) {
    const { database } = await useDatabase();
    await database.delete(exams).where(eq(exams.id, id));
    this.exams = this.exams.filter((exam) => exam.id !== id);
  }
};
function load$1() {
  registerModule({
    id: "study",
    name: t("modules.study.name", "Study"),
    description: t("modules.study.description", "Barebones study module."),
    links: [
      {
        id: "add-assignment",
        name: t("modules.study.links.addAssignment.name", "Add assignment"),
        description: t("modules.study.links.addAssignment.description", "Jump to the study module and open the add assignment dialog."),
        moduleId: "study",
        type: "shortcut",
        call: createModuleRouteShortcut("study", "add-assignment"),
        parameters: []
      },
      {
        id: "add-exam",
        name: t("modules.study.links.addExam.name", "Add exam"),
        description: t("modules.study.links.addExam.description", "Jump to the study module and open the add exam dialog."),
        moduleId: "study",
        type: "shortcut",
        call: createModuleRouteShortcut("study", "add-exam"),
        parameters: []
      },
      {
        id: "classes-today",
        name: t("modules.study.links.classesToday.name", "Classes today"),
        description: t("modules.study.links.classesToday.description", "List of today's classes."),
        moduleId: "study",
        type: "label",
        call: () => import("./ClassesToday.js"),
        parameters: []
      },
      {
        id: "due-assignments",
        name: t("modules.study.links.dueAssignments.name", "Due assignments"),
        description: t("modules.study.links.dueAssignments.description", "Incomplete assignments sorted by due date."),
        moduleId: "study",
        type: "label",
        call: () => import("./DueAssignments.js"),
        parameters: []
      },
      {
        id: "upcoming-exams",
        name: t("modules.study.links.upcomingExams.name", "Upcoming exams"),
        description: t("modules.study.links.upcomingExams.description", "Exams scheduled in the next week."),
        moduleId: "study",
        type: "label",
        call: () => import("./UpcomingExams.js"),
        parameters: []
      }
    ],
    component: () => import("./study.js")
  });
  study.loadItems();
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: load$1
}, Symbol.toStringTag, { value: "Module" }));
const moduleFiles = /* @__PURE__ */ Object.assign({ "./finances/index.ts": __vite_glob_0_0, "./shopping/index.ts": __vite_glob_0_1, "./study/index.ts": __vite_glob_0_2 });
const modules = Object.entries(moduleFiles).map(([path, mod]) => {
  const nameMatch = /\.\/([^/]+)\/index\.ts$/.exec(path);
  const name = nameMatch ? nameMatch[1] : path;
  const loadFn = mod.load;
  return { name, load: loadFn };
});
modules.map((m) => m.load).filter((fn) => Boolean(fn));
async function loadAllModules() {
  for (const m of modules) {
    if (m.load)
      await m.load();
  }
}
const ssr = false;
const prerender = true;
async function load({ fetch }) {
  initI18n();
  await migrate(fetch);
  await loadAllModules();
  await moduleStore.loadModuleCards();
  await moduleStore.loadShortcuts();
}
export {
  study as a,
  ssr as b,
  finances as f,
  load as l,
  prerender as p,
  shopping as s
};
