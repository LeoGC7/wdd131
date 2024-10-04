const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;


const lastModified = new Date(document.lastModified);

const optionsDate = { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric'
};

const optionsTime = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false
};

const formattedDate = lastModified.toLocaleDateString('en-US', optionsDate);
const formattedTime = lastModified.toLocaleTimeString('en-US', optionsTime);

const dateContainer = document.getElementById("lastmodified");

dateContainer.textContent = `Last modification: ${formattedDate} ${formattedTime}`;

function ShowNav() {
    const lateralNav = document.getElementById('lateralNav');

    if (lateralNav.classList.contains('hidden')) {
        lateralNav.classList.remove('hidden');
    } else {
        lateralNav.classList.add('hidden')
    }
}