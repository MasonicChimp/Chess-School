'use strict';

let $burgerBtn;
let $mobileNav;
let $allNavItems;
let $allSections;
let $allAccordionBtns;
let $allAccordionIcons;
let $opinionsBox;
let $counterItems;
let $allMenuSection;
let $menuTabs;
let $currentDate;

const mainFunction = () => {
  prepareElements();
  prepareEvents();
};

const prepareElements = () => {
  $burgerBtn = document.querySelector('.hamburger');
  $mobileNav = document.querySelector('.nav__list');
  $allNavItems = document.querySelectorAll('.nav__link');
  $allSections = document.querySelectorAll('.scrollspy');
  $allAccordionBtns = document.querySelectorAll('.about-us__accordion-btn');
  $allAccordionIcons = document.querySelectorAll('.about-us__accordion-icon');
  $opinionsBox = document.querySelector('.opinions__boxes');
  $counterItems = document.querySelectorAll('.opinions__number');
  $allMenuSection = document.querySelectorAll('.products__menu-section');
  $menuTabs = document.querySelectorAll('.products__menu-tab');
  $currentDate = document.querySelector('.footer__date');
};

const prepareEvents = () => {
  $burgerBtn.addEventListener('click', handleBars);
  window.addEventListener('scroll', handleScrollspy);
  window.addEventListener('click', closeAccordionFromOutside);
  $allAccordionBtns.forEach((item) => {
    item.addEventListener('click', openAccordionItems);
  });

  const observer = new IntersectionObserver(startCounter, counterOption);
  observer.observe($opinionsBox);

  actualDate();
};

//Nav&Bars

const handleBars = () => {
  $burgerBtn.classList.toggle('is-active');
  $mobileNav.classList.toggle('nav__list-active');

  $allNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      $burgerBtn.classList.remove('is-active');
      $mobileNav.classList.remove('nav__list-active');
    });
  });
};

//Scrollspy

const handleScrollspy = () => {
  const sections = [];

  $allSections.forEach((section) => {
    if (window.scrollY <= section.offsetTop + section.offsetHeight - 35) {
      sections.push(section);

      const activeSection = document.querySelector(`[href*="${sections[0].id}"]`);
      $allNavItems.forEach((item) => item.classList.remove('nav__active-link'));
      activeSection.classList.add('nav__active-link');
    }
  });
};

//Accordion

function openAccordionItems() {
  if (this.nextElementSibling.classList.contains('about-us__accordion-info-active')) {
    this.nextElementSibling.classList.remove('about-us__accordion-info-active');
  } else {
    closeAccordionitems();
    this.nextElementSibling.classList.add('about-us__accordion-info-active');
  }

  $allAccordionIcons.forEach((icon) => {
    if (icon.parentElement.nextElementSibling.classList.contains('about-us__accordion-info-active')) {
      icon.classList.add('about-us__accordion-icon-active');
    } else {
      icon.classList.remove('about-us__accordion-icon-active');
    }
  });
}

const closeAccordionitems = () => {
  const allActive = document.querySelectorAll('.about-us__accordion-info');
  allActive.forEach((item) => item.classList.remove('about-us__accordion-info-active'));
  $allAccordionIcons.forEach((icon) => icon.classList.remove('about-us__accordion-icon-active'));
};

const closeAccordionFromOutside = (e) => {
  if (
    e.target.classList.contains('about-us__accordion-btn') ||
    e.target.classList.contains('about-us__accordion-info') ||
    e.target.classList.contains('about-us__accordion-text')
  ) {
    return;
  } else {
    closeAccordionitems();
  }
};

//CounterOpinion

const counterOption = {
  rootMargin: '-120px',
};

const startCounter = (e) => {
  if (e[0].isIntersecting) {
    $counterItems.forEach((item) => {
      const updateCounter = () => {
        const finish = item.getAttribute('data-number');
        const value = parseInt(item.innerText);
        const speed = finish / 100;

        if (value < finish) {
          item.innerText = `${Math.floor(value + speed)}`;
          setTimeout(updateCounter, 20);
        } else {
          item.innerText = finish;
        }
      };
      updateCounter();
    });
  }
};

//Menu Tabs

const showMenuTab = (id) => {
  $allMenuSection.forEach((section) => (section.style.display = 'none'));
  document.getElementById(id).style.display = 'block';

  $menuTabs.forEach((item) => item.classList.remove('products__menu-tab-active'));

  const buttonID = document.querySelector(`[data-id=${id}]`);
  buttonID.classList.add('products__menu-tab-active');
};

//Actual Date

const actualDate = () => {
  const actualYear = new Date().getFullYear();
  $currentDate.textContent = actualYear;
};

document.addEventListener('DOMContentLoaded', mainFunction);
