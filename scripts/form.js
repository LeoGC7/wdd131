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

const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product');

    products.forEach(product => {
        const option = document.createElement('option');
        option.id = product.id;
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
});

const stars = document.querySelectorAll('.form-radio');
const starIcons = document.querySelectorAll('.star-icon');

function updateStars(rating) {
  starIcons.forEach((icon, index) => {
      if (index < rating) {
          icon.src = 'images/star-filled.png';
      } else {
          icon.src = 'images/star.png';
      }
  });
}

stars.forEach((star, index) => {
  star.addEventListener('change', () => {
      updateStars(index + 1);
  });
});

// Review JS
document.addEventListener('DOMContentLoaded', () => {
  let submissionCount = localStorage.getItem('submissionCount');

  if (!submissionCount) {
      submissionCount = 0;
  } else {
      submissionCount = parseInt(submissionCount);
  }

  submissionCount += 1;

  localStorage.setItem('submissionCount', submissionCount);

  document.getElementById('sub-number').textContent = submissionCount;
});