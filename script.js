
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

      const bookBtn = document.createElement("button");
      bookBtn.textContent = "احجز التذكرة";
      bookBtn.style.backgroundColor = "#005baa";
      bookBtn.style.color = "white";
      bookBtn.style.border = "none";
      bookBtn.style.padding = "8px 16px";
      bookBtn.style.borderRadius = "6px";
      bookBtn.style.cursor = "pointer";

      bookBtn.addEventListener("click", () => {
        alert(`تم حجز التذكرة لمباراة ${match.teamA} ضد ${match.teamB} يوم ${match.date} في ${match.city}.`);
      });

      li.appendChild(bookBtn);
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
});
