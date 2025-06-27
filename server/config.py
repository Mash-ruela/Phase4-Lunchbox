import os

class Config:
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "static", "images")
    DB_CONFIG = {
        "host": "brembo.mysql.pythonanywhere-services.com",
        "user": "brembo",
        "password": "modcom1234",
        "database": "brembo$default"
    }
