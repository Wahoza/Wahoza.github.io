let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch-btn');

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enabledDarkmode() : disableDarkmode()
})

const enabledDarkmode = () => {
    document.body.classList.add('darkmode');
    document.body.classList.remove('lightmode');
    localStorage.setItem('darkmode', 'active')
} 

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    document.body.classList.add('lightmode');
    localStorage.setItem('darkmode', 'false')
} 

if(darkmode === "active") {enabledDarkmode();} else if(darkmode === "false") {disableDarkmode();} 
else {
    var theme = document.getElementById("theme");

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enabledDarkmode();
    
    }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        disableDarkmode();         
    }
    else{
        enabledDarkmode();
    }
}



