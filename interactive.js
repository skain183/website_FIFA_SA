const sections = {
  schedule: {
    en: "Match schedule: June 10 to July 20 across Saudi cities.",
    ar: "جدول المباريات: من 10 يونيو إلى 20 يوليو في مدن السعودية."
  },
  tickets: {
    en: "Tickets range from SAR 50-300. Buy from fifa.com/tickets.",
    ar: "تتراوح أسعار التذاكر من ٥٠ إلى ٣٠٠ ريال. احجز من fifa.com/tickets."
  },
  hotels: {
    en: "Recommended hotels: Hilton, Fairmont, Movenpick.",
    ar: "فنادق مقترحة: هيلتون، فيرمونت، موفنبيك."
  },
  cities: {
    en: "Host Cities: Riyadh, Jeddah, Dammam, Abha, Neom.",
    ar: "المدن المستضيفة: الرياض، جدة، الدمام، أبها، نيوم."
  },
  language: {
    en: "Arabic tips: 'Shukran' = Thank you, 'Marhaba' = Hello.",
    ar: "نصائح لغوية: شكراً = Thank you، مرحباً = Hello."
  },
  chatbot: {
    en: "Use the chatbot below to ask anything about FIFA 2034!",
    ar: "استخدم البوت الذكي في الأسفل واسأل أي شيء عن كأس العالم 2034!"
  },
  transportation: {
    en: "Metro and bus services will be available in all host cities.",
    ar: "ستتوفر خدمات المترو والحافلات في جميع المدن المستضيفة."
  },
  restaurants: {
    en: "Top-rated places: AlBaik, Nozomi, and Shababik.",
    ar: "أماكن مميزة: البيك، نوزومي، شبابيك."
  },
  fanZones: {
    en: "Fan zones will feature live screenings and entertainment.",
    ar: "مناطق الجماهير ستحتوي على شاشات عرض ومرافق ترفيهية."
  }
};

let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  const title = currentLang === "en" ? "FIFA 2034 Services" : "خدمات كأس العالم 2034";
  document.getElementById("main-title").textContent = title;
}

function showSection(section) {
  const content = sections[section][currentLang];
  const contentArea = document.getElementById("content-area");
  contentArea.innerHTML = `<p>${content}</p>`;

  const mediaArea = document.getElementById("media-area");
  mediaArea.innerHTML = ""; // Clear previous media

  // Add images or videos based on section
  if (section === "schedule") {
    mediaArea.innerHTML = `<img src="schedule.jpg" alt="Schedule" width="300">`;
  } else if (section === "cities") {
    mediaArea.innerHTML = `<video controls width="300">
      <source src="cities.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>`;
  }
}

function handleChat() {
  const input = document.getElementById("chat-input").value.toLowerCase();
  let response = "";

  if (input.includes("ticket") || input.includes("تذاكر")) {
    response = sections.tickets[currentLang];
  } else if (input.includes("hotel") || input.includes("فندق")) {
    response = sections.hotels[currentLang];
  } else if (input.includes("city") || input.includes("مدينة")) {
    response = sections.cities[currentLang];
  } else if (input.includes("restaurant") || input.includes("مطعم")) {
    response = sections.restaurants[currentLang];
  } else if (input.includes("fan") || input.includes("جماهير")) {
    response = sections.fanZones[currentLang];
  } else if (input.includes("transport") || input.includes("نقل")) {
    response = sections.transportation[currentLang];
  } else {
    response = currentLang === "en" 
      ? "Sorry, I didn't understand. Try asking about tickets, hotels, cities..."
      : "عذرًا، لم أفهم. جرب السؤال عن التذاكر، الفنادق، المدن...";
  }

  document.getElementById("chat-response").textContent = response;
}