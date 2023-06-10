'use strict'
// Menu
let linksMenu = document.querySelector('header .links');
let buttonMenu = document.querySelector('header .toggle-menu');
linksMenu.style.setProperty('height', '0px');

buttonMenu.onclick = function () {
  linksMenu.classList.toggle('show')
}

let dark = document.querySelectorAll('.darkTheme');
dark.forEach(function (el) {
  el.onclick = function () {
    document.querySelector('html').id === '' ? document.querySelector('html').id = 'dark' : document.querySelector('html').id = '';
    if (document.querySelector('html').id == 'dark') {
      document.querySelector('header .logo-brand img').setAttribute('src', 'img/logo-dark.png');
      document.querySelector('footer .logo-brand img').setAttribute('src', 'img/logo-dark.png');
    } else {
      document.querySelector('header .logo-brand img').setAttribute('src', 'img/logo-light.png');
      document.querySelector('footer .logo-brand img').setAttribute('src', 'img/logo-light.png');
    }
  }
})

// Landing
let contentsLanding = document.querySelectorAll('.landing .content');
let itemsLanding = document.querySelectorAll('.landing .content-items .box');

for (let i = 0; i < contentsLanding.length; i++) {
  contentsLanding[i].id = itemsLanding[i].id =`${i}`
}

itemsLanding.forEach(function (el) {
  el.onmouseover = function () {
    itemsLanding.forEach(el => el.classList.remove('active'))
    el.classList.add('active')
    contentsLanding.forEach(el => el.classList.remove('active'));
    contentsLanding.forEach(function (ele) {
      ele.id == el.id && ele.classList.add('active');
    })
  }
})

// Carousel
// Variubals
let next = document.querySelector('.buttons-carousel .next');
let prev = document.querySelector('.buttons-carousel .prev');
let ul = document.querySelector('.carousel-content ul');
let allLis = document.querySelectorAll('.carousel-content ul li');
let gap = 10;
let activeLi = Math.floor(allLis.length / 2);

// Style Elements
document.querySelector('.carousel-content').style.cssText = 'position: relative; width:100vw; overflow:hidden; min-height:530px; padding-top:100px; display: flex; flex-direction: column; align-items: center;'
ul.style.cssText = '  display: flex; justify-content: center; align-items: center; list-style: none; margin: 0; padding: 0; transition: .3s; user-select: none;'
let styleElementsCarousel = () => {
  let styelItem = 'min-width: 230px; border-radius: 6px; overflow: hidden; opacity: .3; height: 230px; cursor: pointer; position: relative; transition: .3s; -webkit-box-reflect: below 1px linear-gradient(rgba(0, 0, 0, 0) 65%, rgb(0 0 0 / 40%) 97.5%);'
  allLis.forEach(el => el.style = `${styelItem}`);
  allLis[activeLi].style.cssText = `${styelItem}  opacity: 1 !important; scale: 1.6 !important; z-index: 1000;`
  allLis[activeLi].style.removeProperty('cursor')
}
styleElementsCarousel()

// Set Gap For Ul
ul.style.gap = `${gap}px`;

// Define The Conintes Will Work By It
let n = -allLis[0].offsetWidth - gap
ul.style.translate = `-${allLis[0].offsetWidth / 2 + (gap * .5)}px 0`
if (allLis.length % 2 !== 0) {
  ul.style.translate = `0px`
}

// function Remoe Active
let removClass = () => allLis.forEach(el => el.classList.remove('active'));

// Add Id For Elements
for (let i = 0; i < allLis.length; i++) {
  allLis[i].id = `${i}`
}

// Loop Items
let nextMove = 1;
let prevMove = 1;

// When allLis.length == 1
if (allLis.length == 1) {
  activeLi = 0;
  ul.style.translate = `0 0`;
  next.classList.add('hidden')
  prev.classList.add('hidden')
};

// Add Class Active to allLis[activeLi]
allLis[activeLi].classList.add('active')

let lastMove = +(-n * ((allLis.length - 1) / 2)).toFixed(1);

let scale = function (numberElement) {
  allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('scale', '1.3');
  allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('scale', '1.3');
  allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('opacity', '.7');
  allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('opacity', '.7');
  allLis[numberElement + 1] !== undefined && allLis[numberElement + 1].style.setProperty('z-index', '5');
  allLis[numberElement - 1] !== undefined && allLis[numberElement - 1].style.setProperty('z-index', '5');
}
scale(activeLi)
// When CLick On Item
allLis.forEach(function (el) {
  el.onclick = function () {
    removClass();
    this.classList.add('active');
    if (allLis.length % 2 == 0) {
      ul.style.translate = `${(-allLis[0].offsetWidth / 2 - (gap * .5)) - n * ((allLis.length / 2) - (+this.id))}px`;
    } else {
      ul.style.translate = `${(-allLis[0].offsetWidth / 2 - (gap * .5)) - n * (Math.floor(allLis.length / 2) - (+this.id)) - n / 2}px`;
    }
    activeLi = +this.id;
    nextMove = (+this.id + 1) - Math.floor(allLis.length / 2)
    prevMove = -(+this.id - Math.floor(allLis.length / 2) - 1)
    // Set Classes And Removes For Buttons
    if (ul.style.translate !== `${lastMove}px` && allLis.length > 1) {
      prev.classList.remove('hidden')
    }
    ul.style.translate === `${-lastMove}px` ? next.classList.add('hidden') : next.classList.remove('hidden')
    ul.style.translate === `${lastMove}px` ? prev.classList.add('hidden') : prev.classList.remove('hidden')
    styleElementsCarousel();
    scale(+this.id);
  }
})
next.onclick = function () {
  // When Should Function Work
  if (ul.style.translate !== `${-lastMove}px` && allLis.length > 1) {
    allLis.length % 2 == 0 ? ul.style.translate = `${n * nextMove + (n * .5)}px 0` : ul.style.translate = `${n * nextMove}px`
    activeLi++;
    nextMove++;
    prevMove--;
    // Style Elemnts
    styleElementsCarousel()
    scale(activeLi);
    // Set Classes And Removes For Buttons
    removClass()
    allLis[activeLi].classList.add('active')
    prev.classList.remove('hidden')
  }
  // Set Classes And Removes For Buttons
  if (ul.style.translate === `${-lastMove}px`) next.classList.add('hidden');
};
prev.onclick = function () {
  // When Should Function Work
  if (ul.style.translate !== `${lastMove}px` && allLis.length > 1) {
    ul.style.translate = `${-n * prevMove + (n * .5)}px 0`;
    allLis.length % 2 == 0 ? ul.style.translate = `${-n * prevMove + (n * .5)}px 0` : ul.style.translate = `${-n * prevMove}px 0`
    prevMove++;
    nextMove--
    activeLi--;
    // Style Elemnts
    styleElementsCarousel()
    scale(activeLi);
    // Set Classes And Removes For Buttons
    removClass()
    allLis[activeLi].classList.add('active')
  }
  // Set Classes And Removes For Buttons
  ul.style.translate === `${lastMove}px` ? prev.classList.add('hidden') : next.classList.remove('hidden')
};

// Open Iagme
for (let i = 0; i < document.querySelectorAll('.show-img').length; i++) {
  document.querySelectorAll('.show-img')[i].id = `r${i}`
}
let openImg = document.querySelector('.open-img')
let imageForBig = document.querySelector('.open-img img')

document.querySelectorAll('.carousel-parent li .show-img').forEach(function (el) {
  el.onclick = function () {
    document.body.style.overflow = 'hidden'
    openImg.classList.add('show')
    imageForBig.src = `${document.querySelector(`li #${el.id} + img`).src}`
  }
})

openImg.onclick = function () {
  this.classList.remove('show')
  document.body.style.overflow = '';
}

// Scroll To Top And Prograss Header
let scrolltoTop = document.querySelector('.scroll-to-top')
let progHeader = document.querySelector('.prograss-header .background');

window.onscroll = function () {
  let widthInd = (scrollY / (document.body.offsetHeight - 650)) * 100;
  progHeader.style.cssText = `width:${Math.floor(widthInd)}%;`;
  scrollY >= 625 ? scrolltoTop.classList.add('show') : scrolltoTop.classList.remove('show');
}

scrolltoTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}