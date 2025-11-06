import "./async.js";
import { c as bind_props, b as attr_class, s as spread_props } from "./index2.js";
import { Dialog } from "bits-ui";
function Dialog_close($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      disabled = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (disabled) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div data-slot="dialog-close"${attr_class(`pointer-events-none select-none opacity-50 ${restProps?.class ?? ""}`)}>`);
        restProps?.children?.($$renderer3);
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<!---->`);
        Dialog.Close($$renderer3, spread_props([
          { "data-slot": "dialog-close" },
          restProps,
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
export {
  Dialog_close as D
};
