const $themeButton = document.getElementById('theme-switch');
const $brightnessLogo = document.querySelector('#theme-switch img');
const lightLogo = '/public/media/logos/brightness_light.png';
const darkLogo = '/public/media/logos/brightness_dark.png';

$themeButton.addEventListener('click',()=>{
    const theme = document.documentElement.getAttribute('data-theme');  
    document.documentElement.setAttribute('data-theme',theme==='light'?'dark':'light');
    $brightnessLogo.src = theme==='light'?darkLogo:lightLogo;
    
})