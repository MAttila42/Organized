

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true,
  "load": null
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CzG9pAPQ.js","_app/immutable/chunks/DDKh-MSL.js","_app/immutable/chunks/IzzPcZU7.js","_app/immutable/chunks/BruXBgQu.js","_app/immutable/chunks/BmK2dJuU.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CLEbI9k6.js","_app/immutable/chunks/BgQwZvYi.js","_app/immutable/chunks/BONUUjX4.js","_app/immutable/chunks/Cpo9UT1H.js","_app/immutable/chunks/C3mfnZMO.js"];
export const stylesheets = ["_app/immutable/assets/0.Dw5KClFj.css"];
export const fonts = ["_app/immutable/assets/ubuntu-cyrillic-ext-400-normal.B-Nhg57H.woff2","_app/immutable/assets/ubuntu-cyrillic-ext-400-normal.BQUrPAlD.woff","_app/immutable/assets/ubuntu-cyrillic-400-normal.D9OZd8lm.woff2","_app/immutable/assets/ubuntu-cyrillic-400-normal.CD6XmiVF.woff","_app/immutable/assets/ubuntu-greek-ext-400-normal.CeBDcuzJ.woff2","_app/immutable/assets/ubuntu-greek-ext-400-normal.VZgpvyyF.woff","_app/immutable/assets/ubuntu-greek-400-normal.GaJa0t-K.woff2","_app/immutable/assets/ubuntu-greek-400-normal.UX4bU-Ff.woff","_app/immutable/assets/ubuntu-latin-ext-400-normal.Bb6UNjxu.woff2","_app/immutable/assets/ubuntu-latin-ext-400-normal.kv0aZEtN.woff","_app/immutable/assets/ubuntu-latin-400-normal.CQJ26Fy6.woff2","_app/immutable/assets/ubuntu-latin-400-normal.ChuJk2Dr.woff"];
