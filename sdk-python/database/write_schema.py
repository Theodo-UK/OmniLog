import psycopg2

def write_schema(connection, cursor):
    with open('schema.sql', 'r') as f:
        schema = f.read()

    try: 
        cursor.execute(schema)
    except psycopg2.errors.DuplicateTable as e:
        print(f"Table schema already defined: {e}")
        connection.rollback()