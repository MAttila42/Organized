export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".well-known/appspecific/com.chrome.devtools.json","favicon.png","migrations/0000_busy_rafael_vega.sql","migrations/0001_zippy_wolfpack.sql","migrations/0002_acoustic_amphibian.sql","migrations/0003_breezy_newton_destine.sql","migrations/0004_secret_maria_hill.sql","migrations/0005_quick_pretty_boy.sql","migrations/meta/0000_snapshot.json","migrations/meta/0001_snapshot.json","migrations/meta/0002_snapshot.json","migrations/meta/0003_snapshot.json","migrations/meta/0004_snapshot.json","migrations/meta/0005_snapshot.json","migrations/meta/_journal.json"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".sql":"application/sql"},
	_: {
		client: {start:"_app/immutable/entry/start.Canfitzi.js",app:"_app/immutable/entry/app.CXsy_75e.js",imports:["_app/immutable/entry/start.Canfitzi.js","_app/immutable/chunks/CLEbI9k6.js","_app/immutable/chunks/BruXBgQu.js","_app/immutable/entry/app.CXsy_75e.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/BruXBgQu.js","_app/immutable/chunks/BONUUjX4.js","_app/immutable/chunks/BKJo60Al.js","_app/immutable/chunks/C3mfnZMO.js","_app/immutable/chunks/DIV_Juqf.js","_app/immutable/chunks/zTxQI-8N.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/settings","/module/shopping","/module/study"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
