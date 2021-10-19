const $hamburgerMenuContainer = document.querySelector('.navbar__hamburger-menu');
const $hamburgerMenuIcon = document.getElementById('hamburger-menu__lines');
const $hamburgerMenuCloseIcon = document.getElementById('hamburger-menu__X');

$hamburgerMenuContainer.addEventListener('click',()=>{
    $hamburgerMenuIcon.classList.toggle('show');
    $hamburgerMenuCloseIcon.classList.toggle('show');
})