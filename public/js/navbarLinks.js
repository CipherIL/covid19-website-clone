const $navbarLinkContainers = [...document.querySelectorAll('.navbar-links__link-container')];
const $page = document.querySelector('.page-container');
$navbarLinkContainers.forEach((linkContainer)=>{
    linkContainer.addEventListener('click',(e)=>{
        e.preventDefault();
        
        const sectionPos = document.getElementById(linkContainer.children[0].href.split('#')[1]).offsetTop;
        const currChosen = document.querySelector('.navbar-links__link-container.chosen');
        if(currChosen !== linkContainer){
            currChosen.classList.remove('chosen');
            linkContainer.classList.add('chosen');
        }    
        $page.scrollTop= sectionPos - (window.innerWidth<690?160:155);
    })
})