const $themeButton = document.getElementById('theme-switch');
const $brightnessLogo = document.querySelector('#theme-switch img');
const darkLogo = '/public/media/logos/brightness_light.png';
const lightLogo = '/public/media/logos/brightness_dark.png';

const getCookieValue = (name) =>{
    let match = document.cookie.match(RegExp('(?:^|;\\s*)'+name+'=([^;]*)'));
    return match ? match[1]:null;
}

const setTheme = (isLight)=>{
    document.documentElement.setAttribute('data-theme',isLight?'dark':'light');
    setSwitchThemeButton(isLight);
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = isLight?"theme=dark":"theme=light";
}
const setSwitchThemeButton = (isLight) => {
    $brightnessLogo.src = isLight?darkLogo:lightLogo;
}

$themeButton.addEventListener('click',()=>{
    const theme = document.documentElement.getAttribute('data-theme');  
    if(theme==='light') setTheme(true);
    else setTheme(false);
})

if(getCookieValue('theme')==='dark') setTheme(true);
else setTheme(false);