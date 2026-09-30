import os
import pymysql


def get_db_connection():
    try:
        return pymysql.connect(
            host=os.getenv('MYSQL_HOST', 'localhost'),
            port=int(os.getenv('MYSQL_PORT', '3306')),
            user=os.getenv('MYSQL_USER', 'root'),
            password=os.getenv('MYSQL_PASSWORD', 'root'),
            database=os.getenv('MYSQL_DB', 'shec_college'),
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=False
        )
    except Exception:
        return None

