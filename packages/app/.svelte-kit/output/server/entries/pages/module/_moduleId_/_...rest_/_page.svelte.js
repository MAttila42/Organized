import { e as escape_html } from "../../../../../chunks/async.js";
import { a as attr } from "../../../../../chunks/attributes.js";
import { p as page } from "../../../../../chunks/index.js";
import { t } from "../../../../../chunks/i18n.svelte.js";
import { m as moduleStore } from "../../../../../chunks/modules.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const module = moduleStore.modules.find((m) => m.id === page.data.moduleId);
    var ModuleComponent;
    var $$promises = $$renderer2.run([
      async () => ModuleComponent = (await module?.component())?.default
    ]);
    $$renderer2.push(`<div class="flex flex-row items-center gap-3 p-2 pt-0"><a href="/"${attr("aria-label", t("back", "Back"))} draggable="false"><div class="i-fluent:arrow-left-12-filled size-7"></div></a> <h1 class="text-2xl font-bold">`);
    $$renderer2.async([$$promises[0]], ($$renderer3) => {
      $$renderer3.push(() => escape_html(module?.name));
    });
    $$renderer2.push(`</h1></div> `);
    ModuleComponent($$renderer2, {});
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
