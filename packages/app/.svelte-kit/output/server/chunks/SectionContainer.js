import { e as escape_html } from "./async.js";
import "clsx";
import { c as cn, C as Card, a as Card_header, b as Card_title, d as Card_content } from "./card.js";
import { d as attributes, c as bind_props } from "./index2.js";
import { c as clsx } from "./attributes.js";
function Card_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<p${attributes({
      "data-slot": "card-description",
      class: clsx(cn("text-muted-foreground text-sm", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></p>`);
    bind_props($$props, { ref });
  });
}
function SectionContainer($$renderer, $$props) {
  const { title, description, class: className = "", children } = $$props;
  $$renderer.push(`<!---->`);
  Card($$renderer, {
    class: "gap-3 rounded-md bg-secondary p-3",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->`);
      Card_header($$renderer2, {
        class: "px-0",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          Card_title($$renderer3, {
            class: "w-max rounded-lg bg-background px-3 py-2",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->${escape_html(title)}`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          if (description) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<!---->`);
            Card_description($$renderer3, {
              class: "px-1 text-muted",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(description)}`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <!---->`);
      Card_content($$renderer2, {
        class: `px-0 ${className}`,
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!---->`);
}
export {
  SectionContainer as S
};
