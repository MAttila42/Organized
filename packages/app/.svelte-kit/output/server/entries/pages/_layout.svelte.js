import { e as escape_html } from "../../chunks/async.js";
import "clsx";
import { t } from "../../chunks/i18n.svelte.js";
import initUnocssRuntime from "@unocss/runtime";
import presetIcons from "https://esm.sh/@unocss/preset-icons/browser";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    initUnocssRuntime({
      defaults: { presets: [presetIcons({ cdn: "https://esm.sh/" })] }
    });
    const { children } = $$props;
    $$renderer2.push(`<div class="pt-safe"><!--[!-->`);
    {
      $$renderer2.push(`<p>${escape_html(t("loading", "Loading..."))}</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _layout as default
};
