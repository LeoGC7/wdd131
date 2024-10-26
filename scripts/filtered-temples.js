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

function updateTitle(newTitle) {
    const titleElement = document.querySelector('.title');
    titleElement.textContent = newTitle;
}

const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "João Pessoa Brazil",
        location: "João Pessoa, Brazil",
        dedicated: "2023, October, 1 (Announced)",
        area: 18850,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/joao-pessoa-brazil-temple/joao-pessoa-brazil-temple-50370-main.jpg"
      },
      {
        templeName: "Londrina Brazil",
        location: "Londrina, Brazil",
        dedicated: "2023, October, 2 (Announced)",
        area: 32000,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/londrina-brazil-temple/londrina-brazil-temple-44185-main.jpg"
      },
      {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
      },
      {
        templeName: "Houston Texas",
        location: "Houston, Texas, United States",
        dedicated: "2018, April, 22",
        area: 33970,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/houston-texas-temple/houston-texas-temple-23480-main.jpg"
      },
      {
        templeName: "Jhannesburg South Africa",
        location: "Jhannesburg, South Africa",
        dedicated: "1985, August, 24-25",
        area: 19184,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22475-main.jpg"
      },
  ];

function createTempleCard(templesList) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    templesList.forEach(temple => {
        const htmlstring = `
        <div class="temple-card">
            <div class="temple-header">
                <h3 class="temple-name">${temple.templeName}</h3>
            </div>  
            <div class="temple-info">
                <p class="info">Location: <span class="info-data">${temple.location}</span></p>
                <p class="info">Dedicated: <span class="info-data">${temple.dedicated}</span></p>
                <p class="info">Area: <span class="info-data">${temple.area}</span><span class="square-feets"> sq ft</span></p>
            </div>
            <div class="temple-image">
                <img src="${temple.imageUrl}" alt="${temple.templeName}" class="image" loading="lazy">
            </div>
        </div>
        `;

        gallery.insertAdjacentHTML("beforeend", htmlstring);
    });
}


function showAll() {
    createTempleCard(temples);

    updateTitle('Home')
}

function oldFilter() {
    const filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 2000);
    createTempleCard(filteredTemples);

    updateTitle('Old')
}

function newFilter() {
    const filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() >= 2000);
    createTempleCard(filteredTemples);

    updateTitle('New')
}

function largeFilter() {
    const filteredTemples = temples.filter(temple => temple.area >= 50000);
    createTempleCard(filteredTemples);

    updateTitle('Large')
}

function smallFilter() {
    const filteredTemples = temples.filter(temple => temple.area < 50000);
    createTempleCard(filteredTemples);

    updateTitle('Small')
}

showAll();
