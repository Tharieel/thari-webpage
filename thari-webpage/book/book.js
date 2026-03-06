// Buch-Vorschau
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const authorInput = document.getElementById('author');
const contentInput = document.getElementById('content');

const previewTitleLeft = document.getElementById('preview-title-left');
const previewDateLeft = document.getElementById('preview-date-left');
const previewAuthorLeft = document.getElementById('preview-author-left');
const previewContentLeft = document.getElementById('preview-content-left');

const previewTitleRight = document.getElementById('preview-title-right');
const previewDateRight = document.getElementById('preview-date-right');
const previewAuthorRight = document.getElementById('preview-author-right');
const previewContentRight = document.getElementById('preview-content-right');

titleInput.addEventListener('input', () => {
    previewTitleLeft.textContent = titleInput.value || 'Titel';
    previewTitleRight.textContent = titleInput.value || 'Titel';
});

authorInput.addEventListener('input', () => {
    previewAuthorLeft.textContent = authorInput.value || 'Autor';
    previewAuthorRight.textContent = authorInput.value || 'Autor';
});

dateInput.addEventListener('input', () => {
    previewDateLeft.textContent = dateInput.value || 'Datum';
    previewDateRight.textContent = dateInput.value || 'Datum';
});

contentInput.addEventListener('input', () => {
    previewContentLeft.textContent = contentInput.value || 'Inhalt';
    previewContentRight.textContent = contentInput.value || 'Inhalt';
});

// Kalender
const calendarGrid = document.getElementById('calendarGrid');
const monthYearLabel = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();

function getStorageKey(year, month, day) {
    return `calendar-${year}-${month}-${day}`;
}

function renderCalendar(date) {
    calendarGrid.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleString('de-DE', { month: 'long' });
    monthYearLabel.textContent = `${monthName} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');

        const header = document.createElement('header');
        header.textContent = day;

        const textarea = document.createElement('textarea');
        const savedText = localStorage.getItem(getStorageKey(year, month, day));
        if (savedText) textarea.value = savedText;

        textarea.addEventListener('input', () => {
            localStorage.setItem(getStorageKey(year, month, day), textarea.value);
        });

        dayDiv.appendChild(header);
        dayDiv.appendChild(textarea);
        calendarGrid.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
