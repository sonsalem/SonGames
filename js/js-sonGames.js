'use strict'
// Menu
let linksMenu = document.querySelector('header .links');
document.addEventListener("DOMContentLoaded", function(e) {
  linksMenu != undefined && linksMenu.style.setProperty('height', '0px');
})

let buttonMenu = document.querySelector('header .toggle-menu i');
  document.addEventListener('click', function(e) {
    if (e.target == buttonMenu) {
      linksMenu.classList.toggle('show')
    }
  })

  let linksMenuA = document.querySelectorAll('header .links > a');

if (linksMenuA != undefined) {
  linksMenuA.forEach(function (el) {
    el.onclick = function () {
      linksMenuA.onclick(el => el.classList.remove('active'));
      this.classList.add('active');
    }
  })
}

let light = document.querySelectorAll('.lightTheme');

if (localStorage.getItem('theme')) {
  document.querySelector('html').id = `${localStorage.getItem('theme')}`
} else {
  localStorage.setItem('theme', 'dark');
}

document.addEventListener('click', function(e) {
  light.forEach(function(el) {
    if (e.target == el) {
      if (localStorage.getItem('theme') === 'dark') {
        document.querySelector('html').id = `light`
        localStorage.setItem('theme', 'light')
      } else {
        document.querySelector('html').id = '';
        localStorage.setItem('theme', 'dark')
      }
      if (document.querySelector('html').id == 'light') {
        document.querySelector('.logo-brand img').setAttribute('src', 'img/logo-light.png');
      } else {
        document.querySelector('.logo-brand img').setAttribute('src', 'img/logo-dark.png');
      }
    }
  })
})

// Landing
document.addEventListener('DOMContentLoaded', function(e) {
  let contentsLanding = document.querySelectorAll('.landing .content');
  let itemsLanding = document.querySelectorAll('.landing .content-items .box');

  if (contentsLanding[0] != undefined) {
    for (let i = 0; i < contentsLanding.length; i++) {
      contentsLanding[i].id = itemsLanding[i].id = `${i}`
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
  }
})

// Card Game
let cardGames = document.querySelectorAll('.image-add, .card-magic');

if (cardGames != undefined) {
  cardGames.forEach(el => {
    el.onclick = function () {
      window.location.assign(`game-detailes.html`)
    }
  })
}

// Carousel
// Variubals
let next = document.querySelector('.buttons-carousel .next');
let prev = document.querySelector('.buttons-carousel .prev');
let ul = document.querySelector('.carousel-content ul');
let allLis = document.querySelectorAll('.carousel-content ul li');
let gap = 10;
let activeLi = Math.floor(allLis.length / 2);

if (document.querySelector('.carousel-content') != undefined) {
  // Style Elements
  document.querySelector('.carousel-content').style.cssText = 'position: relative; width:100vw; overflow:hidden; min-height:530px; padding-top:100px; display: flex; flex-direction: column; align-items: center;'
    ul.style.cssText = '  display: flex; justify-content: center; align-items: center; list-style: none; margin: 0; padding: 0; transition: .3s; user-select: none;'
    // Set Gap For Ul
    ul.style.gap = `${gap}px`;
  let styleElementsCarousel = () => {
    let styelItem = 'width: 230px; border-radius: 6px; overflow: hidden; opacity: .3; height: 230px; cursor: pointer; position: relative; transition: .3s; -webkit-box-reflect: below 1px linear-gradient(rgba(0, 0, 0, 0) 65%, rgb(0 0 0 / 40%) 97.5%);'
    allLis.forEach(el => el.style = `${styelItem}`);
    if (allLis[activeLi] != undefined) {
      allLis[activeLi].style.cssText = `${styelItem}  opacity: 1 !important; scale: 1.6 !important; z-index: 1000;`
      allLis[activeLi].style.removeProperty('cursor')
    }
  }
  styleElementsCarousel()
  
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
document.addEventListener('DOMContentLoaded', function() {
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
})
}

// Scroll To Top
let scrollTop = document.createElement('div');
scrollTop.classList.add('scroll-to-top', 'position-fixed', 'd-flex', 'align-items-center', 'justify-content-center', 'rounded-10', 'text-light', 'bg-main', 't-duration', 'pointer');

let icoScroll = document.createElement('i');
icoScroll.classList.add('fa-solid', 'fa-angle-up');

scrollTop.append(icoScroll)
document.body.append(scrollTop)

// Scroll To Top And Prograss Header
let scrolltoTop = document.querySelector('.scroll-to-top')
let progHeader = document.querySelector('.prograss-header .background');

window.onscroll = function () {
  let widthInd = (scrollY / (document.body.offsetHeight - 700)) * 100;
  progHeader!= undefined ? progHeader.style.cssText = `width:${Math.floor(widthInd)}%;` : "";
  scrollY >= 625 ? scrolltoTop.classList.add('show') : scrolltoTop.classList.remove('show');
}
scrollTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// check
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('check')) {
    e.target.classList.toggle('checked')
  }
})
document.addEventListener('click', function (e) {
  let card = document.querySelector('.card')
  if (e.target.classList.contains('register-btn')) {
    e.target.classList.add('active');
    document.getElementById('us-register') != undefined && document.getElementById('us-register').focus();
    document.querySelector('.log-btn').classList.remove('active')
    card.classList.add('flip');
  }
  if (e.target.classList.contains('log-btn')) {
    e.target.classList.add('active');
    document.getElementById('em-log') != undefined && document.getElementById('em-log').focus();
    document.querySelector('.register-btn').classList.remove('active')
    card.classList.remove('flip');
  }
})

// alret
let inputAlret = document.querySelectorAll('.register input');
let alretOpen = document.querySelectorAll('.register input + .alret-filed ');

document.addEventListener('DOMContentLoaded', function () {
  if (inputAlret != undefined) {
    inputAlret.forEach(function (el) {
      el.onblur = function () {
        alretOpen.forEach(function (ele) {
          if (el.value == '' && el.getAttribute('place') == ele.getAttribute('place')) {
              ele.classList.add('show')
              setTimeout(() => {
                ele.classList.remove('show')
              }, 2000);
          }
        })
      }
    })
  }
})

// date
document.addEventListener("DOMContentLoaded", function(e) {
  let now = new Date();
  let day;
  now.getDate() <= 9 ? day = `0${now.getDate()}` : day = now.getDate()
  let moth;
  now.getMonth() <= 9 ? moth = `0${now.getMonth()+1}` : moth = `${now.getMonth()+1}`
  let today = `${now.getFullYear()}-${moth}-${day}`
  if (document.querySelector(".dateInput") != undefined) document.querySelector(".dateInput").value = `${today}`;
});

// conform Password
document.addEventListener('submit', function (e) {
  if (e.target == document.querySelector('.form-register')) {
    let pass = document.getElementById('pas-register');
    let confPass = document.getElementById('conmf-pas-register');
    let vaild = false;
    if (confPass.value !== pass.value) {
      confPass.classList.add('wrong')
      vaild = false
    } else {
      confPass.classList.remove('wrong');
      vaild = true
    }
    vaild == false && e.preventDefault()
  }
})

// Filter

let games = document.querySelectorAll('.crad-game');
let gamesPrice = document.querySelectorAll('.crad-game .price-filter');
let allFilter = document.querySelectorAll('.all-filter');

let p95Filter = document.querySelector('.p95-fiter')
let p190Filter = document.querySelector('.p190-fiter')
let p280Filter = document.querySelector('.p280-fiter')
let p140Filter = document.querySelector('.p140-fiter')

let actionFilter = document.querySelector('.action-filter');
let rgbFilter = document.querySelector('.rgp-filter');
let shooterFilter = document.querySelector('.shooter-filter');

if (allFilter != undefined) {
  allFilter.forEach(ele => {
    ele.onclick = function () {
      gamesPrice.forEach(el => {
        el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none')
        el.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none')
      })
    }
  })
}
document.addEventListener('click', function(e) {
  if (e.target == actionFilter) {
    games.forEach(function (el) {
      el.classList.contains('action') === false ? el.parentElement.classList.add('d-none') : el.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == rgbFilter) {
    games.forEach(function (el) {
      el.classList.contains('rgp') === false ? el.parentElement.classList.add('d-none') : el.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == shooterFilter) {
    games.forEach(function (el) {
      el.classList.contains('shooter') === false ? el.parentElement.classList.add('d-none') : el.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == p95Filter) {
    gamesPrice.forEach(el => {
      +el.textContent >= 95
      ? el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('d-none')
      : el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == p190Filter) {
    gamesPrice.forEach(el => {
      +el.textContent >= 190
      ? el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('d-none')
      : el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == p280Filter) {
    gamesPrice.forEach(el => {
      +el.textContent >= 280
      ? el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('d-none')
      : el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none');
    })
  }
})
document.addEventListener('click', function(e) {
  if (e.target == p140Filter) {
    gamesPrice.forEach(el => {
      +el.textContent <= 140
      ? el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('d-none')
      : el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove('d-none');
    })
  }
})

// Carousel Game
$(document).ready(function(){
  $(".owl-game").owlCarousel({
    loop:true,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1,
        },
      }
  });
});

$(document).ready(function(){
  $(".owl-related").owlCarousel({
    loop:false,
    nav:true,
    margin: 20,
    dots:false,
    responsive:{
        0:{
          items:2,
        },
        567: {
          items:3,
        }
      }
  });
});

// pagination

(function($) {
  $.fn.custompagination = (function(opation){
      var paginationContainer = this;
      var itemsToPaginate;

      var defcult = {
          itemsperpage : 12
      };

      var settings = {};

      $.extend(settings , defcult , opation );

      var itemsperpage = settings.itemsperpage ; 

      itemsToPaginate = $(settings.itemsToPaginate);
      var numberOfPaginationLinks = Math.ceil(itemsToPaginate.length / itemsperpage);

      $('<ul class=\"pagntion-list\"><li class=\"pagntion-number active\">1</li></ul>').appendTo(paginationContainer);

      for ( var index = 1; index < numberOfPaginationLinks; index++) {
          paginationContainer.find("ul").append("<li class=\"pagntion-number\">"+ (index+1) +"</li>")
      }
      
      itemsToPaginate.filter(":gt("+  (itemsperpage - 1) +")").hide();

      paginationContainer.find("ul li").on("click", function(){
          $(document.querySelectorAll('*.pagntion-number')).removeClass('active')
          $(this).addClass('active')

      var linkNumbers = $(this).text();

         var itemsToHide = itemsToPaginate.filter(":lt("+  ((linkNumbers - 1) * itemsperpage ) +")");
         $.merge(itemsToHide , itemsToPaginate.filter(":gt("+  ((linkNumbers * itemsperpage) - 1 ) +")"));
      itemsToHide.hide();
      var itemsToShow = itemsToPaginate.not(itemsToHide);
      itemsToShow.show();
      });
  });
}(jQuery))

$(function(){

  $(document).ready(function(){
      $(".paginate").custompagination({
          itemsToPaginate : (".paginate > *"),
      })
  })

}(jQuery))