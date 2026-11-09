let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch-btn');

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enabledDarkmode() : disableDarkmode()
})

const enabledDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active')
} 

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'false')
} 

if(darkmode === "active") enabledDarkmode();