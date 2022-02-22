//wow
$(function () {
    new WOW().init();
})

//set background for navbar when scroll
const nav = document.getElementsByClassName('navbar');
window.onscroll = function () {
    if (nav[0] = !null) {
        if (document.documentElement.scrollTop > 20) {
            nav[0].classList.add('header-scroll');
        } else {
            nav[0].classList.remove('header-scroll');
        }
    }
}

//Click menu item -> hide navbar
const navBars = document.querySelectorAll('.nav-link');
const navCollapse = document.querySelector('.collapse.navbar-collapse');

navBars.forEach((navBar) => {
    navBar.addEventListener('click', function () {
        navCollapse.classList.remove('show');
    })
})