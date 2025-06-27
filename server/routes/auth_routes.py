from flask import Blueprint, request, jsonify
import pymysql
from config import Config

auth_bp = Blueprint("auth", __name__, url_prefix="/api")

@auth_bp.route("/signup", methods=["POST"])
def signup():
    username = request.form["username"]
    email = request.form["email"]
    phone = request.form["phone"]
    password = request.form["password"]

    connection = pymysql.connect(**Config.DB_CONFIG)
    cursor = connection.cursor()
    sql = "INSERT INTO users(username, email, phone, password) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (username, email, phone, password))
    connection.commit()

    return jsonify({"success": "thank you for joining"})

@auth_bp.route("/signin", methods=["POST"])
def signin():
    username = request.form["username"]
    password = request.form["password"]

    connection = pymysql.connect(**Config.DB_CONFIG)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT user_id, username, email, phone FROM users WHERE username=%s AND password=%s"
    cursor.execute(sql, (username, password))

    if cursor.rowcount == 0:
        return jsonify({"message": "login failed. Invalid credentials"})
    else:
        user = cursor.fetchone()
        return jsonify({
            "message": "login successful",
            "user": user
        })
