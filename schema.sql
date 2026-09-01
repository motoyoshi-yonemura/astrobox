CREATE TABLE IF NOT EXISTS contacts (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	message TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
