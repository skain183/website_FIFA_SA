const matches = [
  { teamA: "السعودية", teamB: "البرازيل", city: "الرياض", date: "2025-06-10" },
  { teamA: "الأرجنتين", teamB: "فرنسا", city: "جدة", date: "2025-06-12" },
  { teamA: "إنجلترا", teamB: "ألمانيا", city: "الدمام", date: "2025-06-14" },
  { teamA: "إسبانيا", teamB: "هولندا", city: "الرياض", date: "2025-06-16" },
];

window.addEventListener('DOMContentLoaded', () => {
  const scheduleSection = document.getElementById("schedule");


  const filterContainer = document.createElement("div");
  filterContainer.innerHTML = `
    <label for="citySelect">اختر المدينة:</label>
    <select id="citySelect">
      <option value="">الكل</option>
      <option value="الرياض">الرياض</option>
      <option value="جدة">جدة</option>
      <option value="الدمام">الدمام</option>
    </select>

    <label for="dateInput">اختر التاريخ:</label>
    <input type="date" id="dateInput" />

    <button id="filterBtn">بحث</button>
  `;
  filterContainer.style.marginBottom = "20px";
  scheduleSection.appendChild(filterContainer);


  const matchList = document.createElement("ul");
  matchList.id = "matchList";
  scheduleSection.appendChild(matchList);

  function displayMatches(list) {
    matchList.innerHTML = "";

    if (list.length === 0) {
      matchList.innerHTML = "<li>لا توجد مباريات تطابق البحث.</li>";
      return;
    }

    list.forEach(match => {
      const li = document.createElement("li");
      li.style.marginBottom = "15px";

      const matchInfo = document.createElement("p");
      matchInfo.textContent = `${match.teamA} ضد ${match.teamB} - ${match.city} - ${match.date}`;
      li.appendChild(matchInfo);

      matchList.appendChild(li);
    });
  }

  document.getElementById("filterBtn").addEventListener("click", () => {
    const selectedCity = document.getElementById("citySelect").value;
    const selectedDate = document.getElementById("dateInput").value;

    const filtered = matches.filter(match => {
      return (!selectedCity || match.city === selectedCity) &&
             (!selectedDate || match.date === selectedDate);
    });

    displayMatches(filtered);
  });

  displayMatches(matches);


  const linksContainer = document.createElement("div");
  linksContainer.style.marginTop = "30px";
  linksContainer.innerHTML = `
    <h3>معلومات إضافية:</h3>
    <ul>
      <li><a href="#" id="languageTips">Language and Cultural Tips</a></li>
      <li><a href="#" id="transportation">Transportation</a></li>
      <li><a href="#" id="hotels">Hotels</a></li>
    </ul>
  `;
  scheduleSection.appendChild(linksContainer);


  const sections = {
    languageTips: `
      <h3>Language and Cultural Tips</h3>
      <p>في السعودية، اللغة الرسمية هي العربية. بس في المدن الكبيرة، كثير يعرف إنجليزي.<br>
         خلك مؤدب، قل "السلام عليكم"، واحترم العادات. اللبس المحتشم ضروري، والكرم شي أساسي عند أهل البلد.</p>
      <ul>
        <li>لا تناقش الدين أو السياسة.</li>
        <li>ابتسم، وخلك محترم للكل.</li>
        <li>إذا أحد عزمك، خذ الدعوة بجد!</li>
      </ul>
    `,
    transportation: `
      <h3>Transportation</h3>
      <p>طرق التنقل في السعودية:</p>
      <ul>
        <li><strong>المترو:</strong> ممتاز وسريع بالرياض وجدة.</li>
        <li><strong>أوبر وكريم:</strong> متوفرة بكل مكان.</li>
        <li><strong>التكاسي:</strong> تأكد من تشغيل العداد.</li>
        <li><strong>المشي:</strong> مناسب لبعض المناطق.</li>
      </ul>
    `,
    hotels: `
      <h3>Hotels</h3>
      <p>خيارات السكن:</p>
      <ul>
        <li><strong>الفخمة:</strong> الريتز، الفورسيزونز، الهيلتون.</li>
        <li><strong>المتوسطة:</strong> نوفوتيل، إيبيس.</li>
        <li><strong>الشقق:</strong> مثالية للعائلات ومحبي الطبخ.</li>
      </ul>
      <p>تطبيقات الحجز: Booking, Agoda وغيرها.</p>
    `
  };

  const contentDiv = document.createElement("div");
  contentDiv.id = "infoContent";
  contentDiv.style.marginTop = "30px";
  scheduleSection.appendChild(contentDiv);

  Object.keys(sections).forEach(id => {
    document.getElementById(id).addEventListener("click", (e) => {
      e.preventDefault();
      contentDiv.innerHTML = sections[id];
    });
  });
});