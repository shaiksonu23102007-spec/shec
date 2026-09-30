from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.routes.auth import auth_bp
from app.routes.student import student_bp
from app.routes.department import department_bp
from app.routes.admission import admission_bp
from app.routes.admin import admin_bp
from app.routes.fees import fees_bp
from config import config


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(student_bp, url_prefix='/api/student')
    app.register_blueprint(department_bp, url_prefix='/api/departments')
    app.register_blueprint(admission_bp, url_prefix='/api/admissions')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(fees_bp, url_prefix='/api/fees')

    @app.get('/')
    def home():
        return jsonify({'message': 'SHEC College API is running.'})

    @app.get('/api/health')
    def health():
        return jsonify({'status': 'ok', 'service': 'shec-api'})

    return app
