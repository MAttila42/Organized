import { e as escape_html } from "./async.js";
import { b as attr_class, e as ensure_array_like } from "./index2.js";
import "@tauri-apps/plugin-sql";
import "./_layout.js";
import "clsx";
function Badge($$renderer, $$props) {
  const { children } = $$props;
  $$renderer.push(`<span class="border rounded-full bg-secondary px-2 text-sm">`);
  children($$renderer);
  $$renderer.push(`<!----></span>`);
}
function Item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { item, variant = "default" } = $$props;
    function badges($$renderer3) {
      if (item.quantity || item.unit) {
        $$renderer3.push("<!--[-->");
        Badge($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(item.quantity ?? "")} ${escape_html(item.unit ?? "")}`);
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    $$renderer2.push(`<button class="flex flex-col items-start gap-1 p-2"><div${attr_class(`max-w-full flex flex-row gap-2 ${variant === "compact" ? "w-full justify-between items-center" : "items-start"}`)}><div class="flex flex-row items-center gap-2"><span class="font-medium">${escape_html(item.name)}</span> `);
    if (item.description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="truncate text-start text-sm text-muted">${escape_html(item.description)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (variant === "compact") {
      $$renderer2.push("<!--[-->");
      badges($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (variant === "default") {
      $$renderer2.push("<!--[-->");
      badges($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function List($$renderer, $$props) {
  const { items, variant = "default" } = $$props;
  $$renderer.push(`<div class="flex flex-col rounded-lg bg-background divide-y"><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    Item($$renderer, { item, variant });
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  List as L
};
