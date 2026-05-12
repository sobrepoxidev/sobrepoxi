# Database Migrations

## Convention

Migrations are numbered sequentially: `0001_<description>.sql`

Format:
```sql
-- Migration: <number> — <description>
-- Created: <date>
-- Description: <purpose>
-- Reversible: <rollback instruction>

-- Migration SQL
```

## Apply Migrations

Manually in Supabase SQL Editor or via migration tool.

## Rollback

Each migration must include a `-- Reversible:` comment with the exact DDL to undo.