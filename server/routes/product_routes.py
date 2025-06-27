from flask import Blueprint, request, jsonify, current_app
import pymysql
import os
from config import Config

product_bp = Blueprint("products", __name__, url_prefix="/api")

@product_bp.route("/addproducts", methods=["POST"])
def add_products():
    name = request.form["product_name"]
    desc = request.form["product_desc"]
    cost = request.form["product_cost"]
    photo = request.files["product_photo"]
    photo_name = photo.filename
    photo_path = os.path.join(current_app.config["UPLOAD_FOLDER"], photo_name)
    photo.save(photo_path)

    connection = pymysql.connect(**Config.DB_CONFIG)
    cursor = connection.cursor()
    sql = "INSERT INTO products(product_name, product_desc, product_cost, product_photo) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (name, desc, cost, photo_name))
    connection.commit()

    return jsonify({"success": "product saved successfully"})

@product_bp.route("/getproducts")
def get_products():
    connection = pymysql.connect(**Config.DB_CONFIG)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM products")
    return jsonify(cursor.fetchall())

@product_bp.route("/singleproduct/<int:id>")
def get_single_product(id):
    connection = pymysql.connect(**Config.DB_CONFIG)
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM products WHERE product_id=%s", (id,))
    if cursor.rowcount == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(cursor.fetchone())
