import { e as escape_html } from "./async.js";
import "clsx";
import { t } from "./i18n.svelte.js";
import { E as ExamsList } from "./ExamsList.js";
import { a as study } from "./_layout.js";
function UpcomingExams($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const UPCOMING_WINDOW_MS = 1e3 * 60 * 60 * 24 * 7;
    function getExamTimestamp(value) {
      if (!value) return Number.POSITIVE_INFINITY;
      const timestamp = new Date(value).getTime();
      return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
    }
    const upcomingExams = (() => {
      const now = Date.now();
      const end = now + UPCOMING_WINDOW_MS;
      return [...study.exams].filter((exam) => {
        const timestamp = getExamTimestamp(exam.date);
        if (!Number.isFinite(timestamp)) return false;
        return timestamp >= now && timestamp <= end;
      }).sort((a, b) => {
        const diff = getExamTimestamp(a.date) - getExamTimestamp(b.date);
        if (diff !== 0) return diff;
        return (a.id ?? 0) - (b.id ?? 0);
      }).slice(0, 5);
    })();
    if (upcomingExams.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-row items-center gap-2 text-sm text-muted"><div class="i-fluent:calendar-ltr-16-filled size-4"></div> <div>${escape_html(t("study.labels.upcomingExams.empty", "No exams scheduled this week."))}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      ExamsList($$renderer2, { items: upcomingExams, variant: "compact" });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  UpcomingExams as default
};
