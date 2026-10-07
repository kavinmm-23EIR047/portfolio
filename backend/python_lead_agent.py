"""
AK WebFlair Technologies - Autonomous AI Lead & Mindset Analyzer
Author: Kavin M M (Founder & CEO)
Email: akwebflairtechnologies@gmail.com
WhatsApp / Phone: +91 96007 32162 | +91 93632 65477

This Python module analyzes client inquiry transcripts, classifies their purchase mindset,
extracts target technical requirements, and formats instant WhatsApp direct lead routing messages.
"""

import json
import re
import urllib.parse
from datetime import datetime

FOUNDER_WHATSAPP = "919600732162"
FOUNDER_EMAIL = "akwebflairtechnologies@gmail.com"

class MindsetAnalyzer:
    def __init__(self):
        self.keywords = {
            "HIGH_INTENT": [
                "price", "cost", "quote", "budget", "hire", "estimate",
                "urgent", "start", "contact", "call", "timeline", "payment"
            ],
            "CRM_DASHBOARD": [
                "crm", "dashboard", "analytics", "pipeline", "admin", "sales", "portal"
            ],
            "AI_AGENT": [
                "ai", "agent", "python", "automation", "llm", "langchain", "bot", "fastapi"
            ],
            "ECOMMERCE": [
                "ecommerce", "store", "shop", "landing", "razorpay", "cart", "products"
            ],
            "MOBILE_APP": [
                "flutter", "react native", "mobile", "app", "android", "ios"
            ],
            "FULLSTACK": [
                "mern", "postgres", "postgresql", "node", "express", "mongodb", "api"
            ]
        }

    def analyze_mindset(self, client_messages, service_selected=""):
        combined_text = " ".join(client_messages).lower() + " " + service_selected.lower()

        # Determine Intent Score
        intent_matches = [kw for kw in self.keywords["HIGH_INTENT"] if kw in combined_text]
        intent_level = "High Intent (Ready to Procure)" if len(intent_matches) >= 2 else (
            "Moderate Intent (Evaluating Solution)" if len(intent_matches) == 1 else "Exploratory Inquiry"
        )

        # Determine Primary Capability Interest
        matched_categories = []
        if any(kw in combined_text for kw in self.keywords["CRM_DASHBOARD"]):
            matched_categories.append("CRM & UI Dashboards")
        if any(kw in combined_text for kw in self.keywords["AI_AGENT"]):
            matched_categories.append("Python AI Automation Agents")
        if any(kw in combined_text for kw in self.keywords["ECOMMERCE"]):
            matched_categories.append("Landing & E-Commerce")
        if any(kw in combined_text for kw in self.keywords["MOBILE_APP"]):
            matched_categories.append("Flutter & React Native Mobile Apps")
        if any(kw in combined_text for kw in self.keywords["FULLSTACK"]):
            matched_categories.append("MERN & PostgreSQL Full-Stack")

        recommended_service = matched_categories[0] if matched_categories else (service_selected or "Custom Web Software")

        return {
            "intent_level": intent_level,
            "recommended_service": recommended_service,
            "matched_signals": intent_matches,
            "categories": matched_categories
        }

    def generate_whatsapp_lead_link(self, name, phone, email, comment, service, mindset_data):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        message = (
            f"🚀 *NEW CLIENT LEAD — AK WEBFLAIR AI AGENT*\n\n"
            f"👤 *Client Name:* {name}\n"
            f"📱 *Phone:* {phone}\n"
            f"📧 *Email:* {email or 'N/A'}\n"
            f"🛠️ *Selected Service:* {service}\n\n"
            f"🧠 *AI Mindset Analysis:*\n"
            f"• *Intent Level:* {mindset_data['intent_level']}\n"
            f"• *Target Capability:* {mindset_data['recommended_service']}\n\n"
            f"📝 *Client Scope & Notes:*\n"
            f"\"{comment or 'Client interested in immediate project discussion.'}\"\n\n"
            f"⏰ *Captured At:* {timestamp}\n"
            f"🌐 *Sent via AK WebFlair Direct Lead Engine*"
        )

        encoded_text = urllib.parse.quote(message)
        whatsapp_url = f"https://wa.me/{FOUNDER_WHATSAPP}?text={encoded_text}"
        return whatsapp_url, message

def parse_lead_input(name, phone, email="", comment="", service="", chat_history=None):
    if chat_history is None:
        chat_history = []
    
    analyzer = MindsetAnalyzer()
    mindset = analyzer.analyze_mindset(chat_history + [comment], service)
    url, formatted_msg = analyzer.generate_whatsapp_lead_link(name, phone, email, comment, service, mindset)
    
    lead_record = {
        "name": name,
        "phone": phone,
        "email": email,
        "comment": comment,
        "service": service,
        "mindset": mindset,
        "whatsapp_url": url,
        "formatted_message": formatted_msg,
        "timestamp": datetime.now().isoformat()
    }

    # Persist to local JSON database
    try:
        with open("leads_db.json", "a", encoding="utf-8") as f:
            f.write(json.dumps(lead_record) + "\n")
        print("✅ Lead saved to leads_db.json successfully!")
    except Exception as e:
        print(f"⚠️ Failed to write to leads_db.json: {e}")

    return lead_record

if __name__ == "__main__":
    print("🤖 AK WebFlair Python AI Lead Analyzer Module Loaded")
    sample_lead = parse_lead_input(
        name="Kavin M M",
        phone="+91 96007 32162",
        email="akwebflairtechnologies@gmail.com",
        comment="Need a custom CRM UI dashboard with python AI lead routing.",
        service="CRM Platforms & UI Dashboards",
        chat_history=["How much does a CRM dashboard cost?", "Can you add Python AI automation?"]
    )
    print("\n--- GENERATED WHATSAPP LEAD LINK ---")
    print(sample_lead["whatsapp_url"])
    print("\n--- FORMATTED MESSAGE ---")
    print(sample_lead["formatted_message"])
