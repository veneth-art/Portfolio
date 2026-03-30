import json
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

try:
    cred = credentials.Certificate(
        json.loads(os.environ.get("FIREBASE_CREDENTIALS", "{}"))
    )
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    db = None


def handler(event, context):
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json",
    }

    if event["httpMethod"] == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        data = json.loads(event["body"])
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not all([name, email, message]):
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "All fields are required"}),
            }

        if "@" not in email:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Invalid email address"}),
            }

        contact_data = {
            "name": name,
            "email": email,
            "message": message,
            "createdAt": datetime.utcnow().isoformat(),
            "read": False,
        }

        if db is not None:
            db.collection("contacts").add(contact_data)
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({"success": True, "message": "Message received"}),
            }
        else:
            print(f"Contact form submission (Firebase not configured): {contact_data}")
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps(
                    {"success": True, "message": "Message received (demo mode)"}
                ),
            }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid JSON"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }
