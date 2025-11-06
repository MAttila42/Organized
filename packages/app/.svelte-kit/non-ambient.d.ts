
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/module" | "/module/[moduleId]" | "/module/[moduleId]/[...rest]" | "/settings";
		RouteParams(): {
			"/module/[moduleId]": { moduleId: string };
			"/module/[moduleId]/[...rest]": { moduleId: string; rest: string }
		};
		LayoutParams(): {
			"/": { moduleId?: string; rest?: string };
			"/module": { moduleId?: string; rest?: string };
			"/module/[moduleId]": { moduleId: string; rest?: string };
			"/module/[moduleId]/[...rest]": { moduleId: string; rest: string };
			"/settings": Record<string, never>
		};
		Pathname(): "/" | "/module" | "/module/" | `/module/${string}` & {} | `/module/${string}/` & {} | `/module/${string}/${string}` & {} | `/module/${string}/${string}/` & {} | "/settings" | "/settings/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.well-known/appspecific/com.chrome.devtools.json" | "/favicon.png" | "/migrations/0000_busy_rafael_vega.sql" | "/migrations/0001_zippy_wolfpack.sql" | "/migrations/0002_acoustic_amphibian.sql" | "/migrations/0003_breezy_newton_destine.sql" | "/migrations/0004_secret_maria_hill.sql" | "/migrations/0005_quick_pretty_boy.sql" | "/migrations/meta/0000_snapshot.json" | "/migrations/meta/0001_snapshot.json" | "/migrations/meta/0002_snapshot.json" | "/migrations/meta/0003_snapshot.json" | "/migrations/meta/0004_snapshot.json" | "/migrations/meta/0005_snapshot.json" | "/migrations/meta/_journal.json" | string & {};
	}
}