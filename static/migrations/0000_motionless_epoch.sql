CREATE TABLE `user_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`link_id` text NOT NULL,
	`type` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`parameters` text,
	`module_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_modules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`module_id` text NOT NULL,
	`color` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL
);
