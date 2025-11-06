import { e as escape_html } from "./async.js";
import "clsx";
import { t } from "./i18n.svelte.js";
import { L as List } from "./List2.js";
import { a as study } from "./_layout.js";
function ClassesToday($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function getTodayIndex() {
      const d = (/* @__PURE__ */ new Date()).getDay();
      return d === 0 ? 6 : d - 1;
    }
    const todayIndex = getTodayIndex();
    const todayItems = study.items.filter((i) => i.day == null || i.day === todayIndex).sort((a, b) => (a.schedule ?? 0) - (b.schedule ?? 0)).slice(0, 5);
    if (todayItems.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-2 text-sm text-muted"><div class="i-fluent:book-open-16-filled size-4"></div> <div>${escape_html(t("study.labels.classesToday.empty", "No classes today."))}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      List($$renderer2, { items: todayItems, variant: "compact" });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  ClassesToday as default
};
