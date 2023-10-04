# Prisma Migrations

## Overview

Prisma migrations should be handled differently for different [user types](./user_types.md).

## Migrating Prisma Schema for Omnilog Users

Contact your admin to handle prisma migrations.

## Migrating Prisma Schema for Omnilog Admin Users

If migrations are done properly without schema drifts, then users will have clean updates. If a schema drift occurs then all of their data will be lost.

Each time an admin user wants to update their web app, they have to run `prisma migrate deploy`.

## Migrating Prisma Schema for Omnilog Devs

### [DON'T edit or delete migrations that have been applied](https://www.prisma.io/docs/concepts/components/prisma-migrate/migration-histories#do-not-edit-or-delete-migrations-that-have-been-applied)

Avoid touching migration files, history is not made for devs to modify, but for prisma to keep track of the changes. The migration folder has to be pushed to git to ensure all devs are on the same page.

### DO use the following process to introduce changes in the prisma schema

1. Modify the Prisma schema and run `prisma db push` until the exploration for your new schema is done
2. When the schema is stabilised for your new feature, run `prisma migrate reset` to update the database to its original state.
3. Then run `prisma migrate dev --name <my-new-feature>` to declare and write the file for the migration to be done to reach the new state of the database.
4. Commit and push the code

## Notes on Prisma Migration commands

While experimenting on dev environment, use `prisma db push`. It updates the db's schema but might cause the db to be emptied if a schema drift occurs. This can be prevented by giving default values to newly created columns.

`prisma migrate dev --name <my-new-feature>` inscribes in a history file the changes to go from the previous schema to the new one. When running, it creates a new file and applies it to the postgres database. If the database does not match the original schema, then it will fail. The migration history should be initialised with `prisma migrate dev --name init`

If push or migrating to a new schema causes a breaking change (schema drift), then prisma will ask if the database can be dropped. To keep the data already stored, you can use `prisma migrate dev --create-only` to generate the migration file without applying it. You can then modify it to bypass the schema drift before applying your migration with `prisma migrate dev`. Use cases: renaming a field.

When a database is older than the schema described by the prisma migration history, run `prisma migrate deploy`.

If the database schema got updated manually, run `prisma migrate diff` to compare your changes to the migration history, and eventually apply the migration using `prisma db execute`. This last command is the equivalent of running `prisma db pull` and `prisma migrate dev`.

If development drifts off and the database has been corrupted by a wrong `prisma db push`, run `prisma migrate reset` to go back to the last recorded migration.
