const $navbarLinkContainers = [...document.querySelectorAll('.navbar-links__link-container')];
const $navbarScrollableContainer = document.querySelector('.navbar-links');
const $page = document.querySelector('.page-container');
const $pageSections = [...document.querySelectorAll('.section')];
const $navbarContainer = document.querySelector('.navbar-container');


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

$navbarContainer.addEventListener('wheel',(e)=>{
    e.stopPropagation();
    e.stopImmediatePropagation
    e.preventDefault();
    $navbarScrollableContainer.scrollLeft -= e.deltaY/5;
})

$page.addEventListener('scroll',()=>{
    const halfwayHeight = window.innerHeight/5;
    const sectionsInViewAbobeMiddle = [];
    $pageSections.forEach((section,i)=>{
        const sectionRect = section.getBoundingClientRect();
        if(sectionRect.top<halfwayHeight && sectionRect.top>0) sectionsInViewAbobeMiddle.push({section,i});
    })
    if(sectionsInViewAbobeMiddle.length>0){
        const toHighlight = sectionsInViewAbobeMiddle.splice(-1)[0];
        $navbarLinkContainers.forEach((container)=>container.classList.remove('chosen'));
        $navbarLinkContainers[toHighlight.i].classList.add('chosen');
        $navbarLinkContainers[toHighlight.i].scrollIntoView({
            inline: 'nearest',
            block: 'nearest'
        });
    }
}) 
