import mysql.connector

print("STARTING CONNECTION TEST")

try:
    db = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="",
        port=3306,
        use_pure=True
    )

    print("CONNECTED!")

except Exception as e:
    print("ERROR:")
    print(e)

print("END")