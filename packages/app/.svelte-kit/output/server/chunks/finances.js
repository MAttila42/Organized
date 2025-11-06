import { e as escape_html } from "./async.js";
import "clsx";
import { b as attr_class, e as ensure_array_like, a as attr_style } from "./index2.js";
import "./client.js";
import { S as SectionContainer } from "./SectionContainer.js";
import { R as Root, D as Dialog_trigger, B as Button, a as Dialog_content, b as Dialog_header, c as Dialog_title, L as Label, I as Input } from "./label.js";
import { T as Textarea } from "./textarea.js";
import { t } from "./i18n.svelte.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "@tauri-apps/plugin-sql";
import "./modules.svelte.js";
import { f as finances } from "./_layout.js";
import { D as Dialog_description } from "./dialog-description.js";
import { a as attr } from "./attributes.js";
function TransactionsView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const selectedSummary = finances.selectedWalletSummary;
    const transactions = finances.selectedTransactions;
    let dialogOpen = false;
    let kind = "income";
    let amount = "";
    let occurredAt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    let note = "";
    const canAddTransaction = Boolean(selectedSummary && Number.parseFloat(amount) > 0);
    function resetForm() {
      kind = "income";
      amount = "";
      occurredAt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      note = "";
    }
    async function addTransaction() {
      if (!canAddTransaction || !selectedSummary?.wallet.id) return;
      const parsed = Number.parseFloat(amount);
      if (!Number.isFinite(parsed) || parsed <= 0) return;
      const signedAmount = kind === "expense" ? -parsed : parsed;
      await finances.addTransaction({
        walletId: selectedSummary.wallet.id,
        amount: signedAmount,
        occurredAt: occurredAt || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        description: note.trim() || null
      });
      resetForm();
      dialogOpen = false;
    }
    async function removeTransaction(id) {
      if (id == null) return;
      await finances.removeTransaction(id);
    }
    function formatAmount(value) {
      if (!Number.isFinite(value)) return "0.00";
      const sign = value >= 0 ? "+" : "-";
      const absolute = Math.abs(value);
      return `${sign}${absolute.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    function formatDate(value) {
      if (!value) return t("finances.wallet.transactions.noDate", "No date");
      const timestamp = Date.parse(value);
      if (!Number.isNaN(timestamp)) return new Date(timestamp).toLocaleDateString();
      return value;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (!selectedSummary) {
        $$renderer3.push("<!--[-->");
        SectionContainer($$renderer3, {
          title: t("finances.wallet.overview.title", "Overview"),
          description: t("finances.wallet.overview.description", "Select a wallet to see its transactions and balance."),
          class: "flex flex-col gap-3",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:wallet-16-regular size-5"></div> <div>${escape_html(t("finances.wallet.pick", "Pick a wallet to begin tracking transactions."))}</div></div>`);
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<!---->`);
        Root($$renderer3, {
          get open() {
            return dialogOpen;
          },
          set open($$value) {
            dialogOpen = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="flex flex-col gap-4">`);
            SectionContainer($$renderer4, {
              title: selectedSummary.wallet.name ?? t("finances.wallet.dialog.title", "Wallet"),
              description: t("finances.wallet.dialog.description", "Balance updates as you record transactions."),
              class: "flex flex-col gap-4",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between"><div class="flex flex-col gap-1"><span class="text-sm text-muted">${escape_html(t("finances.wallet.currentBalance", "Current balance"))}</span> <span${attr_class(`text-3xl font-semibold ${selectedSummary.balance >= 0 ? "text-foreground" : "text-destructive"}`)}>${escape_html(formatAmount(selectedSummary.balance))}</span></div> <!---->`);
                Dialog_trigger($$renderer5, {
                  children: ($$renderer6) => {
                    Button($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("finances.wallet.addTransaction", "Add transaction"))}`);
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="grid gap-3 sm:grid-cols-2"><div class="border border-border rounded-lg px-3 py-2"><div class="text-xs text-muted">${escape_html(t("finances.wallet.income", "Income"))}</div> <div class="text-lg text-primary font-semibold">${escape_html(formatAmount(selectedSummary.income))}</div></div> <div class="border border-border rounded-lg px-3 py-2"><div class="text-xs text-muted">${escape_html(t("finances.wallet.expense", "Expense"))}</div> <div class="text-lg text-destructive font-semibold">-${escape_html(selectedSummary.expense.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</div></div></div> `);
                if (selectedSummary.wallet.description) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="border border-border/60 rounded-lg border-dashed bg-muted/20 px-3 py-2 text-sm text-muted">${escape_html(selectedSummary.wallet.description)}</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              }
            });
            $$renderer4.push(`<!----> `);
            SectionContainer($$renderer4, {
              title: t("finances.wallet.transactions.title", "Transactions"),
              description: t("finances.wallet.transactions.description", "Most recent first."),
              class: "flex flex-col gap-3",
              children: ($$renderer5) => {
                if (transactions.length === 0) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:receipt-20-regular size-5"></div> <div>${escape_html(t("finances.wallet.transactions.noTransactions", "No transactions recorded yet."))}</div></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`<div class="rounded-lg bg-background divide-y"><!--[-->`);
                  const each_array = ensure_array_like(transactions);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let transaction = each_array[$$index];
                    $$renderer5.push(`<div class="flex flex-row items-center gap-3 px-3 py-2"><div class="min-w-0 flex flex-1 flex-col gap-1"><div class="text-sm font-medium">${escape_html(formatDate(transaction.occurredAt))}</div> `);
                    if (transaction.description) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<div class="line-clamp-2 text-xs text-muted">${escape_html(transaction.description)}</div>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]--></div> <div${attr_class(`text-sm font-semibold ${transaction.amount >= 0 ? "text-primary" : "text-destructive"}`)}>${escape_html(formatAmount(transaction.amount ?? 0))}</div> `);
                    Button($$renderer5, {
                      variant: "ghost",
                      size: "icon",
                      class: "shrink-0",
                      "aria-label": t("finances.wallet.transactions.delete", "Delete transaction"),
                      onclick: () => removeTransaction(transaction.id),
                      children: ($$renderer6) => {
                        $$renderer6.push(`<div class="i-fluent:delete-16-regular size-4"></div>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div>`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
                }
                $$renderer5.push(`<!--]-->`);
              }
            });
            $$renderer4.push(`<!----></div> <!---->`);
            Dialog_content($$renderer4, {
              class: "sm:max-w-md",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_header($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Dialog_title($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("finances.wallet.dialog.title", "Record transaction"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Dialog_description($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("finances.wallet.dialog.description", "Positive amounts add to the balance, negative subtract."))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="flex flex-col gap-4"><div class="flex items-center gap-2">`);
                Button($$renderer5, {
                  class: "flex-1",
                  variant: kind === "income" ? "default" : "outline",
                  onclick: () => kind = "income",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.income", "Income"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  class: "flex-1",
                  variant: kind === "expense" ? "default" : "outline",
                  onclick: () => kind = "expense",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.expense", "Expense"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <div class="flex flex-col gap-2">`);
                Label($$renderer5, {
                  for: "transaction-amount",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.amount", "Amount"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "transaction-amount",
                  type: "number",
                  min: "0",
                  step: "0.01",
                  placeholder: "0.00",
                  get value() {
                    return amount;
                  },
                  set value($$value) {
                    amount = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="flex flex-col gap-2">`);
                Label($$renderer5, {
                  for: "transaction-date",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.date", "Date"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "transaction-date",
                  type: "date",
                  get value() {
                    return occurredAt;
                  },
                  set value($$value) {
                    occurredAt = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="flex flex-col gap-2">`);
                Label($$renderer5, {
                  for: "transaction-note",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.note", "Notes"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  id: "transaction-note",
                  rows: 3,
                  placeholder: t("finances.wallet.dialog.notePlaceholder", "Optional description"),
                  get value() {
                    return note;
                  },
                  set value($$value) {
                    note = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> `);
                Button($$renderer5, {
                  class: "w-full",
                  disabled: !canAddTransaction,
                  onclick: addTransaction,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("finances.wallet.dialog.save", "Save transaction"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
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
  });
}
function WalletSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const walletSummaries = finances.walletSummaries;
    const selectedId = finances.selectedWalletId;
    let createOpen = false;
    let name = "";
    let color = "#2563EB";
    let description = "";
    let editOpen = false;
    let editingId = null;
    let editName = "";
    let editColor = "#2563EB";
    let editDescription = "";
    const canCreate = Boolean(name.trim());
    const canSave = Boolean(editingId != null && editName.trim());
    async function createWallet() {
      if (!canCreate) return;
      await finances.addWallet({
        name: name.trim(),
        color: color || "#2563EB",
        description: description.trim() || null
      });
      resetCreate();
      createOpen = false;
    }
    function resetCreate() {
      name = "";
      color = "#2563EB";
      description = "";
    }
    function closeEdit() {
      editOpen = false;
      editingId = null;
    }
    async function saveWallet() {
      if (!canSave || editingId == null) return;
      await finances.updateWallet(editingId, {
        name: editName.trim(),
        color: editColor || "#2563EB",
        description: editDescription.trim() || null
      });
      closeEdit();
    }
    async function deleteWallet() {
      if (editingId == null) return;
      await finances.removeWallet(editingId);
      closeEdit();
    }
    function formatAmount(value) {
      if (!Number.isFinite(value)) return "0.00";
      const sign = value >= 0 ? "+" : "-";
      const absolute = Math.abs(value);
      return `${sign}${absolute.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SectionContainer($$renderer3, {
        title: t("finances.wallet.selector.title", "Wallets"),
        description: t("finances.wallet.selector.description", "Create wallets to separate budgets and savings."),
        class: "flex flex-col gap-3",
        children: ($$renderer4) => {
          if (walletSummaries.length === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:wallet-credit-card-20-regular size-5"></div> <div>${escape_html(t("finances.wallet.selector.empty", "No wallets yet. Add your first wallet to get started."))}</div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div class="flex flex-col gap-2"><!--[-->`);
            const each_array = ensure_array_like(walletSummaries);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let summary = each_array[$$index];
              $$renderer4.push(`<div role="button"${attr("tabindex", summary.wallet.id != null ? 0 : -1)}${attr_class(`group flex flex-col gap-2 rounded-lg border px-3 py-2 text-left transition ${summary.wallet.id === selectedId ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-muted/40"}`)}><div class="flex flex-row items-center justify-between gap-2"><div class="flex flex-row items-center gap-2"><span class="size-2.5 rounded-full"${attr_style(`background: ${summary.wallet.color || "#64748B"}`)}></span> <span class="font-medium">${escape_html(summary.wallet.name)}</span></div> <div${attr_class(`text-sm font-semibold ${summary.balance >= 0 ? "text-primary" : "text-destructive"}`)}>${escape_html(formatAmount(summary.balance))}</div></div> `);
              if (summary.wallet.description) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="line-clamp-2 text-xs text-muted">${escape_html(summary.wallet.description)}</div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <div class="flex flex-row items-center justify-between text-xs text-muted"><div>${escape_html(`${summary.transactionCount} ${summary.transactionCount === 1 ? t("finances.wallet.selector.transactionSingular", "transaction") : t("finances.wallet.selector.transactionPlural", "transactions")}`)}</div> <button type="button" class="opacity-0 transition group-hover:opacity-100"${attr("aria-label", t("finances.wallet.selector.edit.aria", "Edit wallet details"))}><div class="i-fluent:edit-16-regular size-4"></div></button></div></div>`);
            }
            $$renderer4.push(`<!--]--></div>`);
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Root($$renderer4, {
            get open() {
              return createOpen;
            },
            set open($$value) {
              createOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_trigger($$renderer5, {
                class: "w-full",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted"><div class="i-fluent:add-12-filled size-5"></div> <div>${escape_html(t("finances.wallet.selector.addTrigger", "Add Wallet"))}</div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_content($$renderer5, {
                class: "sm:max-w-md",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("finances.wallet.selector.create.title", "New Wallet"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <!---->`);
                      Dialog_description($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("finances.wallet.selector.create.description", "Set a name, color, and optional description."))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "wallet-name",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("finances.wallet.selector.create.nameLabel", "Name"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "wallet-name",
                    placeholder: t("finances.wallet.selector.create.namePlaceholder", "Everyday spending"),
                    get value() {
                      return name;
                    },
                    set value($$value) {
                      name = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "wallet-color",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "wallet-color",
                    type: "color",
                    get value() {
                      return color;
                    },
                    set value($$value) {
                      color = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "wallet-description",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("description", "Description"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "wallet-description",
                    placeholder: t("finances.wallet.selector.create.descriptionPlaceholder", "Short notes"),
                    get value() {
                      return description;
                    },
                    set value($$value) {
                      description = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> `);
                  Button($$renderer6, {
                    class: "w-full",
                    disabled: !canCreate,
                    onclick: createWallet,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("finances.wallet.selector.create.cta", "Create wallet"))}`);
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
          $$renderer4.push(`<!----> <!---->`);
          Root($$renderer4, {
            get open() {
              return editOpen;
            },
            set open($$value) {
              editOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_content($$renderer5, {
                class: "sm:max-w-md",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("finances.wallet.selector.edit.title", "Edit Wallet"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edit-wallet-name",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("finances.wallet.selector.edit.nameLabel", "Name"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "edit-wallet-name",
                    get value() {
                      return editName;
                    },
                    set value($$value) {
                      editName = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edit-wallet-color",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "edit-wallet-color",
                    type: "color",
                    get value() {
                      return editColor;
                    },
                    set value($$value) {
                      editColor = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edit-wallet-description",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("description", "Description"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "edit-wallet-description",
                    get value() {
                      return editDescription;
                    },
                    set value($$value) {
                      editDescription = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Button($$renderer6, {
                    class: "w-full",
                    disabled: !canSave,
                    onclick: saveWallet,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("saveChanges", "Save changes"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    onclick: deleteWallet,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("finances.wallet.selector.edit.delete", "Delete wallet"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "ghost",
                    onclick: closeEdit,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("cancel", "Cancel"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div></div>`);
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
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Finances($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="mx-4 flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,320px)_1fr] xl:items-start">`);
    WalletSelector($$renderer2);
    $$renderer2.push(`<!----> `);
    TransactionsView($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  Finances as default
};
