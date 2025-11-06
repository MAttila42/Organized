import { e as escape_html } from "./async.js";
import "clsx";
import { t } from "./i18n.svelte.js";
import { A as AssignmentsList } from "./AssignmentsList.js";
import { a as study } from "./_layout.js";
function DueAssignments($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function getDueTimestamp(value) {
      if (!value) return Number.POSITIVE_INFINITY;
      const timestamp = new Date(value).getTime();
      return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
    }
    const dueAssignments = [...study.assignments].filter((assignment) => !assignment.completed).sort((a, b) => {
      const diff = getDueTimestamp(a.dueDate) - getDueTimestamp(b.dueDate);
      if (diff !== 0) return diff;
      return (a.id ?? 0) - (b.id ?? 0);
    });
    if (dueAssignments.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-2 text-sm text-muted"><div class="i-fluent:clipboard-task-list-ltr-16-filled size-4"></div> <div>${escape_html(t("study.labels.dueAssignments.empty", "No upcoming assignments."))}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      AssignmentsList($$renderer2, { items: dueAssignments, variant: "compact" });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  DueAssignments as default
};
