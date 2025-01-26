const slides = document.getElementById('slides');
const navbar = document.getElementById('navbar');
const dots = document.querySelectorAll('.dot');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dynamicElements = document.querySelectorAll('.dynamic-bg');

let currentIndex = 0;

// Utility function to calculate contrasting color
function getContrastingColor(color) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Update slider and navbar colors
function updateSlider(index) {
  const currentSlide = slides.children[index];
  const bgColor = currentSlide.getAttribute('data-color');
  const textColor = getContrastingColor(bgColor);

  // Update navbar background and text
  navbar.style.backgroundColor = bgColor;
  navbar.style.color = textColor;
  navbar.querySelectorAll('a').forEach(link => (link.style.color = textColor));
  navbar.querySelector('#site-name').style.color = textColor;

  // Update slide background and text
  dynamicElements.forEach(slide => (slide.style.backgroundColor = bgColor));
  currentSlide.style.color = textColor;

  // Update dot indicators
  dots.forEach((dot, i) => {
    dot.style.backgroundColor = i === index ? textColor : '#37415C';
  });
}

// Event listeners
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateSlider(index);
  });
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateSlider(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dots.length;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateSlider(currentIndex);
});

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % dots.length;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateSlider(currentIndex);
}, 5000);

// Initial setup
// updateSlider(0);




const productCards = document.querySelectorAll('.product-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay');
        setTimeout(() => {
          entry.target.classList.add('animate-bounce-in-place');
          entry.target.classList.remove('opacity-0');
        }, delay);
      }
    });
  },
  { threshold: 0.2 }
);

productCards.forEach((card) => observer.observe(card));


document.addEventListener("scroll", () => {
  const text = document.querySelector(".fly-in-left");
  const image = document.querySelector(".bounce-in-right");

  const triggerHeight = window.innerHeight * 0.8;
  const textPosition = text.getBoundingClientRect().top;
  const imagePosition = image.getBoundingClientRect().top;

  if (textPosition < triggerHeight) {
    text.classList.remove("opacity-0");
  }

  if (imagePosition < triggerHeight) {
    image.classList.remove("opacity-0");
  }
});


document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active classes
    document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active', 'text-red-600'));
    document.querySelectorAll('.tab-pane').forEach((pane) => pane.classList.add('hidden'));

    // Add active class to clicked button and show the corresponding tab
    button.classList.add('active', 'text-red-600');
    document.getElementById(button.dataset.tab).classList.remove('hidden');
  });
});



let productCurrentIndex = 0;
const productSlides = document.querySelector("#product-slider").children;
const productDots = document.querySelectorAll(".product-dot");
let productInterval;

const updateProductSlider = () => {
  const slider = document.querySelector("#product-slider");
  slider.style.transform = `translateX(-${productCurrentIndex * 100}%)`;
  updateProductDots();
};

const updateProductDots = () => {
  productDots.forEach((dot, index) => {
    dot.classList.toggle("product-dot-active", index === productCurrentIndex);
  });
};

const productNextSlide = () => {
  productCurrentIndex = (productCurrentIndex + 1) % productSlides.length;
  updateProductSlider();
};

const productPrevSlide = () => {
  productCurrentIndex = (productCurrentIndex - 1 + productSlides.length) % productSlides.length;
  updateProductSlider();
};

const productGoToSlide = (index) => {
  productCurrentIndex = index;
  updateProductSlider();
};

const startProductAutoSlide = () => {
  productInterval = setInterval(productNextSlide, 5000); // 5 seconds
};

const stopProductAutoSlide = () => {
  clearInterval(productInterval);
};

document.querySelector("#product-slider").addEventListener("mouseenter", stopProductAutoSlide);
document.querySelector("#product-slider").addEventListener("mouseleave", startProductAutoSlide);

startProductAutoSlide(); // Start auto-sliding
updateProductSlider(); // Ensure dots update correctly on load
