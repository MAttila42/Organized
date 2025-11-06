import { e as escape_html } from "./async.js";
import { b as attr_class, a as attr_style, e as ensure_array_like } from "./index2.js";
function Item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { item, variant = "default" } = $$props;
    function scheduleLabel(schedule) {
      if (schedule === null || schedule === void 0) return "";
      return `P${schedule + 1}`;
    }
    const timeLabel = scheduleLabel(item.schedule);
    $$renderer2.push(`<button class="flex flex-col items-start gap-1 p-2"><div${attr_class(`flex w-full flex-row gap-2 ${variant === "compact" ? "items-center justify-between" : "items-start"}`)}><div class="min-w-0 flex flex-row items-center gap-2"><div class="size-3 shrink-0 rounded-sm"${attr_style(`background:${item.color}`)}></div> <span class="truncate font-medium">${escape_html(variant === "compact" ? item.shortName : item.subject)}</span> `);
    if (item.teacher) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="truncate text-start text-sm text-muted">${escape_html(item.teacher)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (variant === "compact") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-1 text-xs text-muted">`);
      if (timeLabel) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="rounded bg-background px-1 py-0.5">${escape_html(timeLabel)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.location) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="rounded bg-background px-1 py-0.5">${escape_html(item.location)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (variant === "default") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-2 text-xs text-muted">`);
      if (timeLabel) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="rounded bg-background px-1 py-0.5">${escape_html(timeLabel)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.location) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="rounded bg-background px-1 py-0.5">${escape_html(item.location)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function List($$renderer, $$props) {
  const { items, variant = "default", edit } = $$props;
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
