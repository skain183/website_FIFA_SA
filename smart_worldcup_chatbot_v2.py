# Install these if you haven't already:
# !pip install sentence-transformers torch --quiet
# !pip install --upgrade gradio --quiet

from sentence_transformers import SentenceTransformer, util
import torch
import gradio as gr

# Load the AI model
model = SentenceTransformer('all-MiniLM-L6-v2')

# FAQ dictionary
faq = {
    "متى المباراة القادمة؟": "المباراة القادمة يوم الجمعة الساعة 9 مساءً في استاد الملك فهد.",
    "أين يقع أقرب ملعب؟": "أقرب ملعب هو استاد الجوهرة في جدة.",
    "هل توجد مطاعم قريبة من الملعب؟": "نعم، مطاعم مثل البيك وستاربكس قريبة من الاستاد.",
    "ما هي أسعار التذاكر؟": "أسعار التذاكر تتراوح من 50 ريال إلى 300 ريال حسب الفئة.",
    "ما هي أفضل الأماكن السياحية القريبة؟": "يمكنك زيارة جدة التاريخية، الكورنيش الجديد، ونافورة الملك فهد.",
    "Hello": "Hello! Welcome to World Cup Saudi Guide. How can I help you today?",
    "Where is the stadium?": "The nearest stadium is King Abdullah Sports City (Jeddah).",
    "Ticket prices?": "Ticket prices range from SAR 50 to SAR 300 depending on the match and seat.",
    "Restaurants nearby?": "Yes! Al Baik and Starbucks are nearby the stadium.",
    "Tourist attractions?": "You can visit Al-Balad, the Corniche, and the King Fahd Fountain."
}

# Prepare embeddings for FAQ questions
faq_questions = list(faq.keys())
faq_embeddings = model.encode(faq_questions, convert_to_tensor=True)

# Chatbot response function
def chatbot_response(user_input):
    user_embedding = model.encode(user_input, convert_to_tensor=True)
    cosine_scores = util.cos_sim(user_embedding, faq_embeddings)
    best_match_idx = torch.argmax(cosine_scores)
    best_question = faq_questions[best_match_idx]
    return faq[best_question]

# Create Gradio interface
iface = gr.Interface(fn=chatbot_response, inputs="text", outputs="text", 
                     title="Smart World Cup Guide Bot",
                     description="Ask me anything about matches, tickets, places, and more.")

# Launch with a public link
iface.launch(share=True)

