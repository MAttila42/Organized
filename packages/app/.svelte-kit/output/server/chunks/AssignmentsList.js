import { e as escape_html } from "./async.js";
import { b as attr_class, e as ensure_array_like } from "./index2.js";
import { t } from "./i18n.svelte.js";
import { a as attr } from "./attributes.js";
function AssignmentItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { assignment, toggleCompletion, variant = "default" } = $$props;
    function formatDueDate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString();
    }
    const dueLabel = formatDueDate(assignment.dueDate);
    const isCompleted = Boolean(assignment.completed);
    const isCompact = variant === "compact";
    const hasToggle = Boolean(toggleCompletion);
    $$renderer2.push(`<div${attr_class(`flex flex-row items-start gap-3 ${isCompact ? "px-2 py-1.5" : "p-2"}`)}>`);
    if (hasToggle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button"${attr_class(`mt-1 flex size-4 items-center justify-center rounded-full border ${isCompleted ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted"}`)}${attr("aria-label", isCompleted ? t("study.assignments.item.markIncomplete", "Mark assignment incomplete") : t("study.assignments.item.markComplete", "Mark assignment complete"))}${attr("aria-pressed", isCompleted)}>`);
      if (isCompleted) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="i-fluent:checkmark-12-filled size-3"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="button"${attr_class(`flex flex-1 flex-col items-start gap-1 rounded-md text-left ${isCompact ? "hover:bg-muted/20" : "hover:bg-muted/40"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`)}><div${attr_class(`w-full flex flex-row justify-between gap-2 ${isCompact ? "items-center" : "items-start"}`)}><div${attr_class(`min-w-0 flex flex-col ${isCompact ? "gap-0" : "gap-0.5"}`)}><span${attr_class(`truncate font-medium ${isCompleted ? "text-muted line-through" : ""} ${isCompact ? "text-sm" : ""}`)}>${escape_html(assignment.title)}</span> `);
    if (!isCompact && assignment.subject) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="truncate text-sm text-muted">${escape_html(assignment.subject)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (dueLabel) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(`shrink-0 rounded bg-background px-2 py-0.5 text-xs text-muted ${isCompact ? "whitespace-nowrap" : ""}`)}>${escape_html(dueLabel)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (isCompact && assignment.subject) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="truncate text-xs text-muted">${escape_html(assignment.subject)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!isCompact && assignment.description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="line-clamp-2 w-full text-sm text-muted">${escape_html(assignment.description)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button></div>`);
  });
}
function AssignmentsList($$renderer, $$props) {
  const { items, edit, toggleCompletion, variant = "default" } = $$props;
  $$renderer.push(`<div class="flex flex-col rounded-lg bg-background divide-y"><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let assignment = each_array[$$index];
    AssignmentItem($$renderer, { assignment, toggleCompletion, variant });
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  AssignmentsList as A
};
