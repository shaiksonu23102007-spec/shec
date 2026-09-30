import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'shec-development-secret-key-2026-09-29!')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'shec-jwt-development-secret-key-2026-09-29!')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=6)
    JSON_SORT_KEYS = False

    MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
    MYSQL_PORT = int(os.getenv('MYSQL_PORT', '3306'))
    MYSQL_USER = os.getenv('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', 'root')
    MYSQL_DB = os.getenv('MYSQL_DB', 'shec_college')

    SQLALCHEMY_TRACK_MODIFICATIONS = False


config = Config()
