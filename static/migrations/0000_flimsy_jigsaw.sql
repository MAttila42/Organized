CREATE TABLE `test` (
	`id` integer PRIMARY KEY NOT NULL,
	`test` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `test_id_unique` ON `test` (`id`);