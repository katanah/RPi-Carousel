CREATE TABLE images (
    id INT PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NUll,
    file_path TEXT NOT NULL,
    uploaded_at TIME DEFAULT CURRENT_TIMESTAMP
);