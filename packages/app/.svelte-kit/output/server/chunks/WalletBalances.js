import { e as escape_html } from "./async.js";
import { e as ensure_array_like, a as attr_style, b as attr_class } from "./index2.js";
import { t } from "./i18n.svelte.js";
import { f as finances } from "./_layout.js";
function WalletBalances($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const summaries = finances.walletSummaries;
    function formatAmount(value) {
      if (!Number.isFinite(value)) return "0.00";
      const sign = value >= 0 ? "+" : "-";
      const absolute = Math.abs(value);
      return `${sign}${absolute.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (summaries.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-2 text-sm text-muted"><div class="i-fluent:wallet-16-regular size-4"></div> <div>${escape_html(t("finances.wallet.labels.balances.empty", "No wallets tracked yet."))}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex flex-col gap-2"><!--[-->`);
      const each_array = ensure_array_like(summaries);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let summary = each_array[$$index];
        $$renderer2.push(`<div class="flex flex-row items-center justify-between gap-3 border border-border/60 rounded-md bg-background px-3 py-2 text-sm"><div class="min-w-0 flex flex-row items-center gap-2"><span class="size-2.5 shrink-0 rounded-full"${attr_style(`background: ${summary.wallet.color ?? "#64748B"}`)}></span> <span class="truncate font-medium">${escape_html(summary.wallet.name)}</span></div> <span${attr_class(`shrink-0 font-semibold ${summary.balance >= 0 ? "text-primary" : "text-destructive"}`)}>${escape_html(formatAmount(summary.balance))}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  WalletBalances as default
};
