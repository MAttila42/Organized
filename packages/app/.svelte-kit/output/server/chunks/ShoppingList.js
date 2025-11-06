import "./async.js";
import "clsx";
import { L as List } from "./List.js";
import { s as shopping } from "./_layout.js";
function ShoppingList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    List($$renderer2, { items: shopping.items, variant: "compact" });
  });
}
export {
  ShoppingList as default
};
