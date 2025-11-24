CREATE TABLE `calendar_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`time` text,
	`description` text,
	`completed` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE `shopping_list` ADD `in_cart` integer DEFAULT 0 NOT NULL;