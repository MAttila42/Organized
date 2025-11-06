import { e as escape_html } from "../../../chunks/async.js";
import { e as ensure_array_like } from "../../../chunks/index2.js";
import { S as SectionContainer } from "../../../chunks/SectionContainer.js";
import { R as Root, S as Select_trigger, a as Select_content, b as Select_item } from "../../../chunks/index3.js";
import { i as i18n, t } from "../../../chunks/i18n.svelte.js";
import { a as attr } from "../../../chunks/attributes.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let localeSelection = i18n.locale;
    const availableLocales = [...i18n.locales];
    const localeOptions = availableLocales.map((value) => ({ value, label: formatLocale(value) }));
    const selectedLocaleLabel = localeOptions.find((option) => option.value === localeSelection)?.label ?? t("settings.language.selectPrompt", "Select language");
    function formatLocale(locale) {
      if (!locale) return locale;
      try {
        const [languageCode, regionCode] = locale.split("-");
        const languageDisplay = new Intl.DisplayNames([i18n.locale], { type: "language" });
        const regionDisplay = regionCode ? new Intl.DisplayNames([i18n.locale], { type: "region" }) : null;
        const languageName = languageDisplay.of(languageCode ?? locale) ?? languageCode ?? locale;
        const regionName = regionCode && regionDisplay ? regionDisplay.of(regionCode) ?? regionCode : null;
        return regionName ? `${languageName} (${regionName})` : languageName;
      } catch {
        return locale;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col gap-4 pb-6"><div class="flex flex-row items-center gap-3 p-2 pt-0"><a href="/"${attr("aria-label", t("back", "Back"))} draggable="false"><div class="i-fluent:arrow-left-12-filled size-7"></div></a> <h1 class="text-2xl font-bold">${escape_html(t("settings.header.title", "Settings"))}</h1></div> <div class="mx-4 flex flex-col gap-4">`);
      SectionContainer($$renderer3, {
        title: t("settings.language.title", "Language"),
        description: t("settings.language.description", "Choose the language Organized uses throughout the app."),
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex flex-col gap-2"><!---->`);
          Root($$renderer4, {
            type: "single",
            get value() {
              return localeSelection;
            },
            set value($$value) {
              localeSelection = $$value;
              $$settled = false;
            },
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Select_trigger($$renderer5, {
                class: "w-full justify-between",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(selectedLocaleLabel)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Select_content($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(localeOptions);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let option = each_array[$$index];
                    $$renderer6.push(`<!---->`);
                    Select_item($$renderer6, {
                      value: option.value,
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(option.label)}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <p class="text-sm text-muted">${escape_html(t("settings.language.note", "Changes apply immediately and persist across sessions."))}</p></div>`);
        }
      });
      $$renderer3.push(`<!----></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
