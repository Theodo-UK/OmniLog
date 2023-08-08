CREATE TABLE llm_logs (
    id SERIAL PRIMARY KEY,
    unixtime_seconds BIGINT NOT NULL,
    input_string TEXT NOT NULL,
    output_string TEXT NOT NULL,
    total_tokens INTEGER NOT NULL
);