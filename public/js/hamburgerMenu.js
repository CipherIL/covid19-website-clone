const $hamburgerMenuContainer = document.querySelector('.navbar__hamburger-menu');
const $hamburgerMenuIcon = document.getElementById('hamburger-menu__lines');
const $hamburgerMenuCloseIcon = document.getElementById('hamburger-menu__X');
const $hamburgerMenuBackground = document.querySelector('.hamburger-menu__background');
const $hamburgerMenuMenu = document.querySelector('.hamburger-menu__menu');
const $hamburgerMenuModal = document.getElementById('hamburger-menu');
const $navbarInfo = document.querySelector('.navbar-info');

const $hamburgerMenuSectionButtons = document.querySelectorAll('.hamburger-menu__menu .menu-section__button');
const $hamburgerMenuSectionContainers = document.querySelectorAll('.hamburger-menu__menu .menu-section__container');
const $hamburgerMenuInnerButtons = document.querySelectorAll('.menu-section__innerButton');
const $hamburgerMenuInnerSections = document.querySelectorAll('.menu-section__innerSection');


const toggleHamburgerMenuModal = ()=>{
    $hamburgerMenuBackground.style.height = (window.innerHeight - $navbarInfo.offsetHeight+1)+"px";
    if($hamburgerMenuModal.style.display==='none'){
        $hamburgerMenuModal.style.display='block';
        setTimeout(()=>{
            $hamburgerMenuBackground.classList.toggle('show')
            $hamburgerMenuMenu.classList.toggle('show');
        },0)
    }
    else{
        $hamburgerMenuBackground.classList.toggle('show');
        $hamburgerMenuMenu.classList.toggle('show');
        setTimeout(()=>{
            $hamburgerMenuModal.style.display = 'none';
        },100)
    }
}

$hamburgerMenuContainer.addEventListener('click',()=>{
    $hamburgerMenuIcon.classList.toggle('show');
    $hamburgerMenuCloseIcon.classList.toggle('show');
    toggleHamburgerMenuModal();
   
})

$hamburgerMenuSectionButtons.forEach((button,i)=>{
    button.addEventListener('click',()=>{
        button.children[1].children[0].classList.toggle('show');
        $hamburgerMenuSectionContainers[i].classList.toggle('show');
    })
})

console.log($hamburgerMenuInnerButtons)

$hamburgerMenuInnerButtons.forEach((button,i)=>{
    button.addEventListener('click',()=>{
        button.children[1].children[0].classList.toggle('show');
        $hamburgerMenuInnerSections[i].classList.toggle('show');
        setTimeout(()=>{
            for(let j=0;j<$hamburgerMenuInnerSections[i].children.length;j++){
                $hamburgerMenuInnerSections[i].children[j].classList.toggle('show');
            }
        },100)
    })
})