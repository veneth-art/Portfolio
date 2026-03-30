import json
import os
import firebase_admin
from firebase_admin import credentials, firestore

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
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
    }

    if event["httpMethod"] == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        if db is None:
            projects = [
                {
                    "id": "1",
                    "title": "E-Commerce Platform",
                    "description": "A full-stack e-commerce solution with modern UI and seamless checkout experience.",
                    "tags": ["React", "Node.js", "Stripe"],
                    "github": "#",
                    "live": "#",
                },
                {
                    "id": "2",
                    "title": "Analytics Dashboard",
                    "description": "Real-time data visualization dashboard for business intelligence and insights.",
                    "tags": ["Next.js", "D3.js", "PostgreSQL"],
                    "github": "#",
                    "live": "#",
                },
                {
                    "id": "3",
                    "title": "Mobile Banking App",
                    "description": "Secure mobile banking application with biometric authentication.",
                    "tags": ["React Native", "Firebase", "GraphQL"],
                    "github": "#",
                    "live": "#",
                },
                {
                    "id": "4",
                    "title": "AI Content Generator",
                    "description": "Machine learning powered content creation tool for marketing teams.",
                    "tags": ["Python", "TensorFlow", "React"],
                    "github": "#",
                    "live": "#",
                },
            ]
        else:
            projects_ref = db.collection("projects")
            docs = projects_ref.order_by(
                "createdAt", direction=firestore.Query.DESCENDING
            ).stream()
            projects = [{"id": doc.id, **doc.to_dict()} for doc in docs]

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"projects": projects}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }
