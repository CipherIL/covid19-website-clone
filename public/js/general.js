const $scrollableContainers = document.querySelectorAll('.card-content.scrollable-container');

$scrollableContainers.forEach((container)=>{
    container.addEventListener('wheel',(e)=>{
        if(checkOverflowing(container)){
            e.stopPropagation();
            e.stopImmediatePropagation
            e.preventDefault();
            container.scrollLeft -= e.deltaY/5;
        }
    })
})

const checkOverflowing = (el)=>{
    return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}