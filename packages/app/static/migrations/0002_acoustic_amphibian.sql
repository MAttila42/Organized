CREATE TABLE `classes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`subject` text NOT NULL,
	`short_name` text,
	`teacher` text,
	`location` text,
	`color` text DEFAULT '#FFFFFF' NOT NULL,
	`day` integer,
	`schedule` integer
);
