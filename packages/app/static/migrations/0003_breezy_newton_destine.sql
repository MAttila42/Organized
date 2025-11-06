CREATE TABLE `assignments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`subject` text,
	`due_date` text,
	`description` text,
	`completed` integer DEFAULT 0 NOT NULL
);
