'use strict';
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const section1 = document.querySelector('.home');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
//Smooth scrolling
navbar.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const tSection = e.target.getAttribute('href');
    document.querySelector(tSection).scrollIntoView({ behavior: 'smooth' });
  }
});
/*
document.querySelector(".nav__item").addEventListener("click", function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
*/

// open navigation
window.onscroll = function () {
  navbar.classList.remove('show');
};
hamburger.addEventListener('click', function () {
  navbar.classList.toggle('show');
});
// Blurry navigation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const targetLink = e.target;
    const siblings = targetLink
      .closest('.navbar')
      .querySelectorAll('.nav__link');
    const signUp = targetLink.closest('.header').querySelector('.btn');
    const logo = targetLink.closest('.header').querySelector('.logo');

    siblings.forEach(el => {
      if (el !== targetLink) el.style.opacity = this;
    });
    logo.style.opacity = this;
    signUp.style.opacity = this;
  }
};
navbar.addEventListener('mouseover', handleHover.bind(0.5));
navbar.addEventListener('mouseout', handleHover.bind(1));
// Sticky Navigation
// think of the structure and not down the important parts
const headerHeight = header.getBoundingClientRect().height;
console.log(headerHeight);
// function
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add('sticky');
  else header.classList.remove('sticky');
};

// observer
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
// observe area
navObserver.observe(section1);

// Revealing sections
//Function
const sectionReveal = (entries, observer) => {
  const [entry] = entries;
  //   sections.classList.add('section__hidden');
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section__hidden');
  observer.unobserve(entry.target);
};
// Observer
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section__hidden');
});

///////////////////////////////////////////////////////
//Slider part
const leftBtn = document.querySelector('.left__btn');
const rightBtn = document.querySelector('.right__btn');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlides = slides.length;

///////////////////////////
//create dots
const creatDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
creatDots();

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slideData = e.target.dataset.slide;

    goToSlide(slideData);
    activateDots(slideData);
  }
});

// /////////////////////////
//Activating dots
const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active');
};
activateDots(0);
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
///////////////////////////////
//prevslide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else curSlide--;
  goToSlide(curSlide);
  activateDots(curSlide);
};
///////////////////////////////////
//nextSlide
const nextSlide = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else curSlide++;

  goToSlide(curSlide);
  activateDots(curSlide);
};

leftBtn.addEventListener('click', function () {
  prevSlide(curSlide);
});
rightBtn.addEventListener('click', function () {
  nextSlide(curSlide);
});

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

//Challenge part

const arrow = document.querySelectorAll('.arrow');
const challengeShow = document.querySelectorAll('.challenge__show--box');
arrow.forEach((arrow, i) =>
  arrow.addEventListener('click', function () {
    console.log('clicked');
    challengeShow.forEach(sha =>
      sha
        .querySelector(`.challenge__show--box[data-slide="${i}"]`)
        .classList.toggle('box__show')
    );
  })
);

// arrow.forEach((slide, i) => {
//   slide
//     .querySelector(`.arrow[data-slide="${i}"]`)
//     .addEventListener('click', function () {
//       challengeShow.forEach(sha => sha.classList.toggle('box__show'));
//     });
// });

// arrow.addEventListener('click', function () {
//   challengeShow.forEach(challenge => {
//     challenge.classList.toggle('box__show');
//   });
// });
