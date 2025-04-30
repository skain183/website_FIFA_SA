
# تحتاج قبل تشغيل الكود تثبيت مكتبتين عبر تنفيذ السطرين التاليين:
# pip install sentence-transformers
# pip install torch

from sentence_transformers import SentenceTransformer, util
import torch

# تحميل نموذج الذكاء الاصطناعي لفهم الجمل
model = SentenceTransformer('all-MiniLM-L6-v2')

# الأسئلة المتوقعة والردود المناسبة لها
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

# تجهيز التضمينات Embeddings
faq_questions = list(faq.keys())
faq_embeddings = model.encode(faq_questions, convert_to_tensor=True)

def smart_chatbot():
    print("Welcome to the Smart World Cup Guide Bot!")
    print("Ask me anything about matches, tickets, places, and more.")
    
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["bye", "خلاص"]:
            print("Bot: Thank you! Enjoy your World Cup experience!")
            break
        
        # تحليل الجملة ومقارنتها مع الأسئلة الموجودة
        user_embedding = model.encode(user_input, convert_to_tensor=True)
        cosine_scores = util.cos_sim(user_embedding, faq_embeddings)
        
        # العثور على أعلى تطابق
        best_match_idx = torch.argmax(cosine_scores)
        best_question = faq_questions[best_match_idx]
        best_answer = faq[best_question]
        
        print(f"Bot: {best_answer}")

# لتشغيل البوت
smart_chatbot()
