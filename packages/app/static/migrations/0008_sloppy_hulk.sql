DROP INDEX `shopping_memberships_listId_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `shopping_memberships_list_id_unique` ON `shopping_memberships` (`list_id`);