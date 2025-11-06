import { e as escape_html } from "./async.js";
import { b as attr_class, e as ensure_array_like } from "./index2.js";
import { t } from "./i18n.svelte.js";
function ExamItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { exam, variant = "default" } = $$props;
    function formatExamDate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString();
    }
    function getExamTimestamp(value) {
      if (!value) return Number.POSITIVE_INFINITY;
      const timestamp = new Date(value).getTime();
      return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
    }
    const dateLabel = formatExamDate(exam.date);
    const isCompact = variant === "compact";
    const isDone = (() => {
      const timestamp = getExamTimestamp(exam.date);
      return Number.isFinite(timestamp) && timestamp < Date.now();
    })();
    $$renderer2.push(`<div${attr_class(`flex flex-row items-start gap-3 ${isCompact ? "px-2 py-1.5" : "p-2"}`)}><button type="button"${attr_class(`flex flex-1 flex-col items-start gap-1 rounded-md text-left ${isCompact ? "hover:bg-muted/20" : "hover:bg-muted/40"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`)}><div${attr_class(`w-full flex flex-row justify-between gap-2 ${isCompact ? "items-center" : "items-start"}`)}><div${attr_class(`min-w-0 flex flex-col ${isCompact ? "gap-0" : "gap-0.5"}`)}><span${attr_class(`truncate font-medium ${isDone ? "text-muted line-through" : ""} ${isCompact ? "text-sm" : ""}`)}>${escape_html(exam.title)}</span> `);
    if (!isCompact && exam.subject) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="truncate text-sm text-muted">${escape_html(exam.subject)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex flex-col items-end gap-1">`);
    if (dateLabel) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(`shrink-0 rounded bg-background px-2 py-0.5 text-xs text-muted ${isCompact ? "whitespace-nowrap" : ""}`)}>${escape_html(dateLabel)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (isDone) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs text-muted">${escape_html(t("done", "Done"))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (isCompact && exam.subject) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="truncate text-xs text-muted">${escape_html(exam.subject)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!isCompact && exam.description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="line-clamp-2 w-full text-sm text-muted">${escape_html(exam.description)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button></div>`);
  });
}
function ExamsList($$renderer, $$props) {
  const { items, edit, variant = "default" } = $$props;
  $$renderer.push(`<div class="flex flex-col rounded-lg bg-background divide-y"><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let exam = each_array[$$index];
    ExamItem($$renderer, { exam, variant });
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  ExamsList as E
};
