CREATE TABLE `shopping_list` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer,
	`unit` text,
	`description` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`link_id` text NOT NULL,
	`type` text NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`icon` text,
	`color` text DEFAULT '#FFFFFF' NOT NULL,
	`parameters` text,
	`module_id` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_links`("id", "link_id", "type", "display_order", "icon", "color", "parameters", "module_id") SELECT "id", "link_id", "type", "display_order", "icon", "color", "parameters", "module_id" FROM `user_links`;--> statement-breakpoint
DROP TABLE `user_links`;--> statement-breakpoint
ALTER TABLE `__new_user_links` RENAME TO `user_links`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_user_modules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`module_id` text NOT NULL,
	`color` text DEFAULT '#FFFFFF' NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user_modules`("id", "module_id", "color", "display_order") SELECT "id", "module_id", "color", "display_order" FROM `user_modules`;--> statement-breakpoint
DROP TABLE `user_modules`;--> statement-breakpoint
ALTER TABLE `__new_user_modules` RENAME TO `user_modules`;