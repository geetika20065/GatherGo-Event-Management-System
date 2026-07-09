import mysql.connector

print("STARTING DB FILE")

try:
    db = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="",
        database="event_management",
        use_pure=True
    )

    print("Database Connected Successfully!")

except Exception as e:
    print("ERROR:")
    print(str(e))

print("END OF FILE")