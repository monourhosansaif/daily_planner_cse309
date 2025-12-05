-- Create database and table for the daily planner
CREATE DATABASE IF NOT EXISTS daily_planner CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE daily_planner;

CREATE TABLE IF NOT EXISTS planner_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  monthyear VARCHAR(100) NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
