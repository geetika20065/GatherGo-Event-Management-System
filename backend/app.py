from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

# Database Connection
def get_db_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="",
        database="event_management",
        use_pure=True
    )
@app.route("/")
def home():
    return "GatherGo Backend Running Successfully!"

# Get all users
@app.route("/users", methods=["GET"])
def get_users():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users")

    users = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(users)
@app.route("/users", methods=["POST"])
def add_user():

    data = request.get_json()

    name = data["name"]
    email = data["email"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = "INSERT INTO users (name, email) VALUES (%s, %s)"
    values = (name, email)

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "User Added Successfully"
    })

@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):

    data = request.get_json()

    name = data["name"]
    email = data["email"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    UPDATE users
    SET name = %s,
        email = %s
    WHERE id = %s
    """

    values = (
        name,
        email,
        id
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "User Updated Successfully"
    })

@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):

    db = get_db_connection()
    cursor = db.cursor()

    sql = "DELETE FROM users WHERE id = %s"

    cursor.execute(sql, (id,))
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "User Deleted Successfully"
    })
@app.route("/events", methods=["GET"])
def get_events():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM events")

    events = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(events)
@app.route("/events", methods=["POST"])
def add_event():

    data = request.get_json()

    event_name = data["event_name"]
    event_date = data["event_date"]
    venue = data["venue"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    INSERT INTO events
    (event_name, event_date, venue)
    VALUES (%s, %s, %s)
    """

    values = (
        event_name,
        event_date,
        venue
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Event Added Successfully"
    })
@app.route("/events/<int:id>", methods=["PUT"])
def update_event(id):

    data = request.get_json()

    event_name = data["event_name"]
    event_date = data["event_date"]
    venue = data["venue"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    UPDATE events
    SET event_name=%s,
        event_date=%s,
        venue=%s
    WHERE id=%s
    """

    values = (
        event_name,
        event_date,
        venue,
        id
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Event Updated Successfully"
    })

@app.route("/events/<int:id>", methods=["DELETE"])
def delete_event(id):

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM events WHERE id=%s",
        (id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Event Deleted Successfully"
    })

@app.route("/venues/<int:id>", methods=["DELETE"])
def delete_venue(id):

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM venues WHERE id=%s",
        (id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Venue Deleted Successfully"
    })


@app.route("/venues", methods=["GET"])
def get_venues():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM venues")

    venues = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(venues)

@app.route("/venues", methods=["POST"])
def add_venue():

    data = request.get_json()

    venue_name = data["venue_name"]
    location = data["location"]
    capacity = data["capacity"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    INSERT INTO venues
    (venue_name, location, capacity)
    VALUES (%s, %s, %s)
    """

    values = (
        venue_name,
        location,
        capacity
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Venue Added Successfully"
    })
@app.route("/venues/<int:id>", methods=["PUT"])
def update_venue(id):

    data = request.get_json()

    venue_name = data["venue_name"]
    location = data["location"]
    capacity = data["capacity"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    UPDATE venues
    SET venue_name=%s,
        location=%s,
        capacity=%s
    WHERE id=%s
    """

    values = (
        venue_name,
        location,
        capacity,
        id
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Venue Updated Successfully"
    })

@app.route("/registrations", methods=["GET"])
def get_registrations():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM registrations")

    registrations = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(registrations)

@app.route("/registrations", methods=["POST"])
def add_registration():

    data = request.get_json()

    print(data)
    print("event_date =", data["event_date"])

    username = data["username"]
    event_name = data["event_name"]
    event_date = data["event_date"]
    venue = data["venue"]

    db = get_db_connection()
    cursor = db.cursor()

    # Check if already registered
    check_sql = """
    SELECT * FROM registrations
    WHERE username=%s AND event_name=%s
    """

    cursor.execute(check_sql, (username, event_name))
    existing = cursor.fetchone()

    if existing:
        cursor.close()
        db.close()

        return jsonify({
            "message": "Already Registered"
        }), 409

    # Insert registration
    sql = """
    INSERT INTO registrations
    (username, event_name, event_date, venue)
    VALUES (%s, %s, %s, %s)
    """

    values = (
        username,
        event_name,
        event_date,
        venue
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Registration Added Successfully"
    })

@app.route("/registrations", methods=["DELETE"])
def delete_registration():

    data = request.get_json()

    username = data["username"]
    event_name = data["event_name"]

    db = get_db_connection()
    cursor = db.cursor()

    sql = """
    DELETE FROM registrations
    WHERE username=%s AND event_name=%s
    """

    cursor.execute(sql, (username, event_name))
    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Registration Cancelled Successfully"
    })    

@app.route("/dashboard", methods=["GET"])
def dashboard():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total_users FROM users")
    total_users = cursor.fetchone()["total_users"]

    cursor.execute("SELECT COUNT(*) AS total_events FROM events")
    total_events = cursor.fetchone()["total_events"]

    cursor.execute("SELECT COUNT(*) AS total_venues FROM venues")
    total_venues = cursor.fetchone()["total_venues"]

    cursor.execute("SELECT COUNT(*) AS total_registrations FROM registrations")
    total_registrations = cursor.fetchone()["total_registrations"]

    cursor.close()
    db.close()

    return jsonify({
        "total_users": total_users,
        "total_events": total_events,
        "total_venues": total_venues,
        "total_registrations": total_registrations
    })
if __name__ == "__main__":
    app.run(debug=True)