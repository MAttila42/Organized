import { e as escape_html } from "./async.js";
import "clsx";
import { S as SectionContainer } from "./SectionContainer.js";
import { R as Root, D as Dialog_trigger, a as Dialog_content, b as Dialog_header, c as Dialog_title, L as Label, I as Input, B as Button } from "./label.js";
import { t } from "./i18n.svelte.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./client.js";
import "@tauri-apps/plugin-sql";
import "./modules.svelte.js";
import { L as List } from "./List.js";
import { s as shopping } from "./_layout.js";
import { D as Dialog_close } from "./dialog-close.js";
function Shopping($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let name = "";
    let quantityStr = "";
    let unit = "";
    let description = "";
    let isAddDialogOpen = false;
    const isAddReady = !!name.trim();
    async function addItem() {
      if (!isAddReady) return;
      const q = Number(quantityStr);
      const payload = {
        name: name.trim(),
        quantity: Number.isFinite(q) && !Number.isNaN(q) ? q : null,
        unit: unit.trim() ? unit.trim() : null,
        description: description.trim() ? description.trim() : null
      };
      await shopping.addItem(payload);
      name = "";
      quantityStr = "";
      unit = "";
      description = "";
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="mx-4 flex flex-col gap-4">`);
      SectionContainer($$renderer3, {
        title: t("shopping.title", "Shopping List"),
        description: t("shopping.description", "Keep track of items to buy."),
        class: "flex flex-col gap-3",
        children: ($$renderer4) => {
          if (shopping.items.length === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:cart-16-filled size-5"></div> <div>${escape_html(t("shopping.empty", "Your list is empty. Add your first item."))}</div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            List($$renderer4, { items: shopping.items, variant: "default" });
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Root($$renderer4, {
            get open() {
              return isAddDialogOpen;
            },
            set open($$value) {
              isAddDialogOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_trigger($$renderer5, {
                class: "w-full",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted"><div class="i-fluent:add-12-filled size-5"></div> <div>${escape_html(t("shopping.add.trigger", "Add Item"))}</div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("shopping.add.title", "Add Item"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "name",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("shopping.add.nameLabel", "Name"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "name",
                    type: "text",
                    placeholder: t("shopping.add.namePlaceholder", "Milk"),
                    get value() {
                      return name;
                    },
                    set value($$value) {
                      name = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "qty",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("shopping.add.quantityLabel", "Quantity"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "qty",
                    type: "number",
                    inputmode: "numeric",
                    placeholder: t("shopping.add.quantityPlaceholder", "2"),
                    get value() {
                      return quantityStr;
                    },
                    set value($$value) {
                      quantityStr = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "unit",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("shopping.add.unitLabel", "Unit"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "unit",
                    type: "text",
                    placeholder: t("shopping.add.unitPlaceholder", "pcs, l, kg"),
                    get value() {
                      return unit;
                    },
                    set value($$value) {
                      unit = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "desc",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("description", "Description"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "desc",
                    type: "text",
                    placeholder: t("shopping.add.descriptionPlaceholder", "Brand or notes (optional)"),
                    get value() {
                      return description;
                    },
                    set value($$value) {
                      description = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isAddReady,
                    class: "w-full",
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isAddReady,
                        onclick: addItem,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("add", "Add"))}`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  Shopping as default
};
