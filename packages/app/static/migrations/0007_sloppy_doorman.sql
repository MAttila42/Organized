ALTER TABLE `shopping_list` RENAME TO `shopping_local_items`;--> statement-breakpoint
CREATE TABLE `app_instance` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`instance_token` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shopping_memberships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`list_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`color` text,
	`is_owner` integer DEFAULT 0 NOT NULL,
	`synced_at` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shopping_memberships_listId_unique` ON `shopping_memberships` (`list_id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_shopping_local_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` text,
	`unit` text,
	`description` text,
	`in_cart` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_shopping_local_items`("id", "name", "quantity", "unit", "description", "in_cart") SELECT "id", "name", "quantity", "unit", "description", "in_cart" FROM `shopping_local_items`;--> statement-breakpoint
DROP TABLE `shopping_local_items`;--> statement-breakpoint
ALTER TABLE `__new_shopping_local_items` RENAME TO `shopping_local_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;