def write_data(cur, time, prompt, response, tokens):
    cur.execute("""
    INSERT INTO llm_logs (datetime_utc, input_string, output_string, total_tokens)
    VALUES (%s, %s, %s, %s);
    """, (time, prompt, response, tokens))