

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateSlider(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slide.length - 1 : currentIndex - 1;
    updateSlider(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex === slide.length - 1) ? 0 : currentIndex + 1;
    updateSlider(currentIndex);
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.dataset.index);
        updateSlider(currentIndex);
    });
});

function autoSlide() {
    currentIndex = (currentIndex === slide.length - 1) ? 0 : currentIndex + 1;
    updateSlider(currentIndex);
}

setInterval(autoSlide, 3000);

