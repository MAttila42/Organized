import { e as escape_html } from "./async.js";
import "clsx";
import { b as attr_class, e as ensure_array_like } from "./index2.js";
import { S as SectionContainer } from "./SectionContainer.js";
import { R as Root, D as Dialog_trigger, a as Dialog_content, b as Dialog_header, c as Dialog_title, L as Label, I as Input, B as Button } from "./label.js";
import { T as Textarea } from "./textarea.js";
import { t } from "./i18n.svelte.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import { a as attr } from "./attributes.js";
import "@sveltejs/kit/internal/server";
import "./client.js";
import "@tauri-apps/plugin-sql";
import "./modules.svelte.js";
import { a as study } from "./_layout.js";
import { A as AssignmentsList } from "./AssignmentsList.js";
import { D as Dialog_close } from "./dialog-close.js";
import { R as Root$1, S as Select_trigger, a as Select_content, b as Select_item } from "./index3.js";
import { L as List } from "./List2.js";
import { E as ExamsList } from "./ExamsList.js";
function AssignmentsCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const sortedAssignments = [...study.assignments].sort((a, b) => {
      const aCompleted = Boolean(a.completed);
      const bCompleted = Boolean(b.completed);
      if (aCompleted !== bCompleted) return aCompleted ? 1 : -1;
      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY;
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY;
      if (Number.isFinite(aDate) && Number.isFinite(bDate)) return aDate - bDate;
      if (Number.isFinite(aDate)) return -1;
      if (Number.isFinite(bDate)) return 1;
      return (a.id ?? 0) - (b.id ?? 0);
    });
    let title = "";
    let subject = "";
    let dueDate = "";
    let description = "";
    let isAddDialogOpen = false;
    let editing = null;
    let isEditOpen = false;
    let editTitle = "";
    let editSubject = "";
    let editDueDate = "";
    let editDescription = "";
    let editCompleted = false;
    const isAddReady = !!title.trim();
    const isEditReady = !!editTitle.trim() && editing != null;
    function resetForm() {
      title = "";
      subject = "";
      dueDate = "";
      description = "";
    }
    function openEdit(item) {
      editing = item.id ?? null;
      if (editing == null) return;
      editTitle = item.title ?? "";
      editSubject = item.subject ?? "";
      editDueDate = item.dueDate ?? "";
      editDescription = item.description ?? "";
      editCompleted = Boolean(item.completed);
      isEditOpen = true;
    }
    function closeEdit() {
      isEditOpen = false;
      editing = null;
    }
    async function addAssignment() {
      if (!isAddReady) return;
      const payload = {
        title: title.trim(),
        subject: subject.trim() || null,
        dueDate: dueDate || null,
        description: description.trim() || null,
        completed: 0
      };
      await study.addAssignment(payload);
      resetForm();
    }
    async function saveAssignment() {
      if (!isEditReady || editing == null) return;
      await study.updateAssignment(editing, {
        title: editTitle.trim(),
        subject: editSubject.trim() || null,
        dueDate: editDueDate || null,
        description: editDescription.trim() || null,
        completed: editCompleted ? 1 : 0
      });
      closeEdit();
    }
    async function deleteAssignment() {
      if (editing == null) return;
      await study.removeAssignment(editing);
      closeEdit();
    }
    async function toggleCompletion(item, completed) {
      if (item.id == null) return;
      await study.setAssignmentCompletion(item.id, completed);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SectionContainer($$renderer3, {
        title: t("study.assignments.title", "Assignments"),
        description: t("study.assignments.description", "Track tasks and upcoming deadlines."),
        class: "flex flex-col gap-3",
        children: ($$renderer4) => {
          if (sortedAssignments.length === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:clipboard-task-list-ltr-16-filled size-5"></div> <div>${escape_html(t("study.assignments.empty", "No assignments yet. Add one."))}</div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            AssignmentsList($$renderer4, { items: sortedAssignments, edit: openEdit, toggleCompletion });
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Root($$renderer4, {
            get open() {
              return isAddDialogOpen;
            },
            set open($$value) {
              isAddDialogOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_trigger($$renderer5, {
                class: "w-full",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted"><div class="i-fluent:add-12-filled size-5"></div> <div>${escape_html(t("study.assignments.add.trigger", "Add Assignment"))}</div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.assignments.add.title", "Add Assignment"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "title",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.add.titleLabel", "Title"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "title",
                    type: "text",
                    placeholder: t("study.assignments.add.titlePlaceholder", "Read Chapter 5"),
                    get value() {
                      return title;
                    },
                    set value($$value) {
                      title = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "subject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.add.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "subject",
                    type: "text",
                    placeholder: t("study.assignments.add.subjectPlaceholder", "History"),
                    get value() {
                      return subject;
                    },
                    set value($$value) {
                      subject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "dueDate",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.add.dueDateLabel", "Due Date"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "dueDate",
                    type: "date",
                    get value() {
                      return dueDate;
                    },
                    set value($$value) {
                      dueDate = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "description",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.add.descriptionLabel", "Notes"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Textarea($$renderer6, {
                    id: "description",
                    rows: 4,
                    placeholder: t("study.assignments.add.descriptionPlaceholder", "Anything important to remember"),
                    get value() {
                      return description;
                    },
                    set value($$value) {
                      description = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isAddReady,
                    class: "w-full",
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isAddReady,
                        onclick: addAssignment,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("add", "Add"))}`);
                        },
                        $$slots: { default: true }
                      });
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
              return isEditOpen;
            },
            set open($$value) {
              isEditOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.assignments.edit.title", "Edit Assignment"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "etitle",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.edit.titleLabel", "Title"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "etitle",
                    type: "text",
                    get value() {
                      return editTitle;
                    },
                    set value($$value) {
                      editTitle = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "esubject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.edit.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "esubject",
                    type: "text",
                    get value() {
                      return editSubject;
                    },
                    set value($$value) {
                      editSubject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edueDate",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.edit.dueDateLabel", "Due Date"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "edueDate",
                    type: "date",
                    get value() {
                      return editDueDate;
                    },
                    set value($$value) {
                      editDueDate = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edescription",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.assignments.edit.descriptionLabel", "Notes"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Textarea($$renderer6, {
                    id: "edescription",
                    rows: 4,
                    get value() {
                      return editDescription;
                    },
                    set value($$value) {
                      editDescription = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-row items-center justify-between border border-input rounded-md px-3 py-2"><div class="flex flex-col"><span class="text-sm font-medium">${escape_html(t("study.assignments.edit.completedLabel", "Completed"))}</span> <span class="text-xs text-muted">${escape_html(t("study.assignments.edit.completedHint", "Toggle when the assignment is done."))}</span></div> <button type="button"${attr_class(`flex h-6 w-10 items-center rounded-full transition-colors ${editCompleted ? "bg-primary" : "bg-muted"}`)}${attr("aria-label", t("study.assignments.edit.completedAria", "Assignment completion status"))}${attr("aria-pressed", editCompleted)}><span${attr_class(`mx-1 size-4 rounded-full bg-background transition-transform ${editCompleted ? "translate-x-4" : ""}`)}></span></button></div> <div class="flex flex-col gap-2"><!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isEditReady,
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isEditReady,
                        onclick: saveAssignment,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("save", "Save"))}`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    onclick: deleteAssignment,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("delete", "Delete"))}`);
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
function ClassesCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const weekDays = [
      t("days.short.monday", "Mon"),
      t("days.short.tuesday", "Tue"),
      t("days.short.wednesday", "Wed"),
      t("days.short.thursday", "Thu"),
      t("days.short.friday", "Fri"),
      t("days.short.saturday", "Sat"),
      t("days.short.sunday", "Sun")
    ];
    let subject = "";
    let shortName = "";
    let teacher = "";
    let location = "";
    let color = "#ffffff";
    let dayStr = String(study.selectedDay);
    let scheduleStr = "";
    let editing = null;
    let isEditOpen = false;
    let editSubject = "";
    let editShortName = "";
    let editTeacher = "";
    let editLocation = "";
    let editColor = "#ffffff";
    let editDayStr = "";
    let editScheduleStr = "";
    function openEdit(item) {
      editing = item.id;
      editSubject = item.subject ?? "";
      editShortName = item.shortName ?? "";
      editTeacher = item.teacher ?? "";
      editLocation = item.location ?? "";
      editColor = item.color ?? "#ffffff";
      editDayStr = item.day == null ? "" : String(item.day);
      editScheduleStr = item.schedule == null ? "" : String(item.schedule + 1);
      isEditOpen = true;
    }
    function closeEdit() {
      isEditOpen = false;
      editing = null;
    }
    const isEditReady = !!editSubject.trim() && editing != null;
    async function saveEdit() {
      if (!isEditReady || editing == null) return;
      const scheduleNum = editScheduleStr ? Number(editScheduleStr) - 1 : null;
      await study.updateItem(editing, {
        subject: editSubject.trim(),
        shortName: editShortName.trim() || null,
        teacher: editTeacher.trim() || null,
        location: editLocation.trim() || null,
        color: editColor.trim() || "#FFFFFF",
        day: editDayStr === "" ? null : Number(editDayStr),
        schedule: scheduleNum != null && Number.isFinite(scheduleNum) ? scheduleNum : null
      });
      closeEdit();
    }
    async function deleteEdit() {
      if (editing == null) return;
      await study.removeItem(editing);
      closeEdit();
    }
    const isAddReady = !!subject.trim();
    function resetForm() {
      subject = "";
      shortName = "";
      teacher = "";
      location = "";
      color = "#ffffff";
      dayStr = String(study.selectedDay);
      scheduleStr = "";
    }
    async function addClass() {
      if (!isAddReady) return;
      const scheduleNum = scheduleStr ? Number(scheduleStr) - 1 : null;
      const payload = {
        subject: subject.trim(),
        shortName: shortName.trim() || null,
        teacher: teacher.trim() || null,
        location: location.trim() || null,
        color: color.trim() || "#FFFFFF",
        day: dayStr === "" ? null : Number(dayStr),
        schedule: scheduleNum != null && Number.isFinite(scheduleNum) ? scheduleNum : null
      };
      await study.addItem(payload);
      resetForm();
    }
    const prevDay = study.neighborDays.prev;
    const currentDay = study.neighborDays.current;
    const nextDay = study.neighborDays.next;
    const dayTrigger = weekDays[Number(dayStr)] ?? t("study.classes.form.dayPlaceholder", "Day");
    const editDayTrigger = editDayStr === "" ? t("study.classes.form.noDay", "No day") : weekDays[Number(editDayStr)];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SectionContainer($$renderer3, {
        title: t("study.classes.title", "Classes"),
        description: t("study.classes.description", "Manage your class schedule."),
        class: "flex flex-col gap-3",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex flex-row items-center justify-center gap-4"><button class="b-1 rounded-md bg-background px-3 py-1 text-sm text-muted hover:b-primary">${escape_html(weekDays[prevDay])}</button> <button class="b-2 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground" aria-current="true">${escape_html(weekDays[currentDay])}</button> <button class="b-1 rounded-md bg-background px-3 py-1 text-sm text-muted hover:b-primary">${escape_html(weekDays[nextDay])}</button></div> `);
          if (study.filteredItems.length === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:book-open-16-filled size-5"></div> <div>${escape_html(t("study.classes.empty", "No classes for this day. Add one."))}</div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            List($$renderer4, {
              items: study.filteredItems,
              variant: "default",
              edit: openEdit
            });
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Root($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_trigger($$renderer5, {
                class: "w-full",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted"><div class="i-fluent:add-12-filled size-5"></div> <div>${escape_html(t("study.classes.add.trigger", "Add Class"))}</div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.classes.add.title", "Add Class"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "subject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "subject",
                    type: "text",
                    placeholder: t("study.classes.add.subjectPlaceholder", "Mathematics"),
                    get value() {
                      return subject;
                    },
                    set value($$value) {
                      subject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "short",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.shortLabel", "Short"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "short",
                    type: "text",
                    placeholder: t("study.classes.add.shortPlaceholder", "Math"),
                    get value() {
                      return shortName;
                    },
                    set value($$value) {
                      shortName = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "teacher",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.teacherLabel", "Teacher"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "teacher",
                    type: "text",
                    placeholder: t("study.classes.add.teacherPlaceholder", "Mr. Smith"),
                    get value() {
                      return teacher;
                    },
                    set value($$value) {
                      teacher = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="grid grid-cols-3 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "location",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.locationLabel", "Location"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "location",
                    type: "text",
                    placeholder: t("study.classes.add.locationPlaceholder", "Room 101"),
                    get value() {
                      return location;
                    },
                    set value($$value) {
                      location = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "color",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "color",
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
                    for: "day",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.dayLabel", "Day"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Root$1($$renderer6, {
                    type: "single",
                    get value() {
                      return dayStr;
                    },
                    set value($$value) {
                      dayStr = $$value;
                      $$settled = false;
                    },
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Select_trigger($$renderer7, {
                        id: "day",
                        class: "w-full",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(dayTrigger)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <!---->`);
                      Select_content($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!--[-->`);
                          const each_array = ensure_array_like(weekDays);
                          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                            let d = each_array[i];
                            $$renderer8.push(`<!---->`);
                            Select_item($$renderer8, {
                              value: String(i),
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->${escape_html(d)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          }
                          $$renderer8.push(`<!--]-->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "schedule",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.add.periodLabel", "Period (1..)"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "schedule",
                    type: "number",
                    placeholder: t("study.classes.add.periodPlaceholder", "1"),
                    get value() {
                      return scheduleStr;
                    },
                    set value($$value) {
                      scheduleStr = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isAddReady,
                    class: "w-full",
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isAddReady,
                        onclick: addClass,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("add", "Add"))}`);
                        },
                        $$slots: { default: true }
                      });
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
              return isEditOpen;
            },
            set open($$value) {
              isEditOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.classes.edit.title", "Edit Class"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "esubject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "esubject",
                    type: "text",
                    get value() {
                      return editSubject;
                    },
                    set value($$value) {
                      editSubject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "eshort",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.shortLabel", "Short"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "eshort",
                    type: "text",
                    get value() {
                      return editShortName;
                    },
                    set value($$value) {
                      editShortName = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "eteacher",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.teacherLabel", "Teacher"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "eteacher",
                    type: "text",
                    get value() {
                      return editTeacher;
                    },
                    set value($$value) {
                      editTeacher = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="grid grid-cols-3 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "elocation",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.locationLabel", "Location"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "elocation",
                    type: "text",
                    get value() {
                      return editLocation;
                    },
                    set value($$value) {
                      editLocation = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "ecolor",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "ecolor",
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
                    for: "eday",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.dayLabel", "Day"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Root$1($$renderer6, {
                    type: "single",
                    get value() {
                      return editDayStr;
                    },
                    set value($$value) {
                      editDayStr = $$value;
                      $$settled = false;
                    },
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Select_trigger($$renderer7, {
                        id: "eday",
                        class: "w-full",
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(editDayTrigger)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!----> <!---->`);
                      Select_content($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!--[-->`);
                          const each_array_1 = ensure_array_like(weekDays);
                          for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                            let d = each_array_1[i];
                            $$renderer8.push(`<!---->`);
                            Select_item($$renderer8, {
                              value: String(i),
                              children: ($$renderer9) => {
                                $$renderer9.push(`<!---->${escape_html(d)}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer8.push(`<!---->`);
                          }
                          $$renderer8.push(`<!--]-->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "eschedule",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.classes.edit.periodLabel", "Period (1..)"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "eschedule",
                    type: "number",
                    get value() {
                      return editScheduleStr;
                    },
                    set value($$value) {
                      editScheduleStr = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2"><!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isEditReady,
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isEditReady,
                        onclick: saveEdit,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("save", "Save"))}`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    onclick: deleteEdit,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("delete", "Delete"))}`);
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
function ExamsCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function getExamTimestamp(value) {
      if (!value) return Number.POSITIVE_INFINITY;
      const timestamp = new Date(value).getTime();
      return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
    }
    const sortedExams = [...study.exams].sort((a, b) => {
      const aTime = getExamTimestamp(a.date);
      const bTime = getExamTimestamp(b.date);
      const aDone = Number.isFinite(aTime) && aTime < Date.now();
      const bDone = Number.isFinite(bTime) && bTime < Date.now();
      if (aDone !== bDone) return aDone ? 1 : -1;
      if (Number.isFinite(aTime) && Number.isFinite(bTime)) return aTime - bTime;
      if (Number.isFinite(aTime)) return -1;
      if (Number.isFinite(bTime)) return 1;
      return (a.id ?? 0) - (b.id ?? 0);
    });
    let title = "";
    let subject = "";
    let date = "";
    let description = "";
    let isAddDialogOpen = false;
    let editing = null;
    let isEditOpen = false;
    let editTitle = "";
    let editSubject = "";
    let editDate = "";
    let editDescription = "";
    const isAddReady = !!title.trim() && !!date;
    const isEditReady = !!editTitle.trim() && !!editDate && editing != null;
    function resetForm() {
      title = "";
      subject = "";
      date = "";
      description = "";
    }
    function openEdit(item) {
      editing = item.id ?? null;
      if (editing == null) return;
      editTitle = item.title ?? "";
      editSubject = item.subject ?? "";
      editDate = item.date ?? "";
      editDescription = item.description ?? "";
      isEditOpen = true;
    }
    function closeEdit() {
      isEditOpen = false;
      editing = null;
    }
    async function addExam() {
      if (!isAddReady) return;
      const payload = {
        title: title.trim(),
        subject: subject.trim() || null,
        date,
        description: description.trim() || null
      };
      await study.addExam(payload);
      resetForm();
    }
    async function saveExam() {
      if (!isEditReady || editing == null) return;
      await study.updateExam(editing, {
        title: editTitle.trim(),
        subject: editSubject.trim() || null,
        date: editDate,
        description: editDescription.trim() || null
      });
      closeEdit();
    }
    async function deleteExam() {
      if (editing == null) return;
      await study.removeExam(editing);
      closeEdit();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SectionContainer($$renderer3, {
        title: t("study.exams.title", "Exams"),
        description: t("study.exams.description", "Keep track of upcoming exams."),
        class: "flex flex-col gap-3",
        children: ($$renderer4) => {
          if (sortedExams.length === 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="mt-1 flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:calendar-ltr-16-filled size-5"></div> <div>${escape_html(t("study.exams.empty", "No exams yet. Add one."))}</div></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            ExamsList($$renderer4, { items: sortedExams, edit: openEdit });
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Root($$renderer4, {
            get open() {
              return isAddDialogOpen;
            },
            set open($$value) {
              isAddDialogOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_trigger($$renderer5, {
                class: "w-full",
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex flex-row items-center justify-center gap-1 b-3 rounded-md b-dashed p-2 text-muted"><div class="i-fluent:add-12-filled size-5"></div> <div>${escape_html(t("study.exams.add.trigger", "Add Exam"))}</div></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.exams.add.title", "Add Exam"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "title",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.add.titleLabel", "Title"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "title",
                    type: "text",
                    placeholder: t("study.exams.add.titlePlaceholder", "Midterm 1"),
                    get value() {
                      return title;
                    },
                    set value($$value) {
                      title = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "subject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.add.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "subject",
                    type: "text",
                    placeholder: t("study.exams.add.subjectPlaceholder", "Physics"),
                    get value() {
                      return subject;
                    },
                    set value($$value) {
                      subject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "date",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("date", "Date"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "date",
                    type: "date",
                    required: true,
                    get value() {
                      return date;
                    },
                    set value($$value) {
                      date = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "description",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.add.descriptionLabel", "Notes"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Textarea($$renderer6, {
                    id: "description",
                    rows: 4,
                    placeholder: t("study.exams.add.descriptionPlaceholder", "Topics, room, anything important"),
                    get value() {
                      return description;
                    },
                    set value($$value) {
                      description = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isAddReady,
                    class: "w-full",
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        class: "w-full",
                        disabled: !isAddReady,
                        onclick: addExam,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("add", "Add"))}`);
                        },
                        $$slots: { default: true }
                      });
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
              return isEditOpen;
            },
            set open($$value) {
              isEditOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_header($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->`);
                      Dialog_title($$renderer7, {
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("study.exams.edit.title", "Edit Exam"))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer7.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <div class="w-full flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "etitle",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.edit.titleLabel", "Title"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "etitle",
                    type: "text",
                    get value() {
                      return editTitle;
                    },
                    set value($$value) {
                      editTitle = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="grid grid-cols-2 gap-3"><div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "esubject",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.edit.subjectLabel", "Subject"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "esubject",
                    type: "text",
                    get value() {
                      return editSubject;
                    },
                    set value($$value) {
                      editSubject = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edate",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("date", "Date"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Input($$renderer6, {
                    id: "edate",
                    type: "date",
                    required: true,
                    get value() {
                      return editDate;
                    },
                    set value($$value) {
                      editDate = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div></div> <div class="flex flex-col gap-2">`);
                  Label($$renderer6, {
                    for: "edescription",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("study.exams.edit.descriptionLabel", "Notes"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Textarea($$renderer6, {
                    id: "edescription",
                    rows: 4,
                    get value() {
                      return editDescription;
                    },
                    set value($$value) {
                      editDescription = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2"><!---->`);
                  Dialog_close($$renderer6, {
                    disabled: !isEditReady,
                    children: ($$renderer7) => {
                      Button($$renderer7, {
                        disabled: !isEditReady,
                        onclick: saveExam,
                        children: ($$renderer8) => {
                          $$renderer8.push(`<!---->${escape_html(t("save", "Save"))}`);
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    variant: "destructive",
                    onclick: deleteExam,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("delete", "Delete"))}`);
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
function Study($$renderer) {
  $$renderer.push(`<div class="mx-4 flex flex-col gap-4">`);
  ClassesCard($$renderer);
  $$renderer.push(`<!----> `);
  AssignmentsCard($$renderer);
  $$renderer.push(`<!----> `);
  ExamsCard($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  Study as default
};
