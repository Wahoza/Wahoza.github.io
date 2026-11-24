const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () =>{
    navLinks.classList.toggle('active');
}


function CloseNavWindow(){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(width <= 600){
        navLinks.classList.toggle('active');
    }
}

const navButtons = navLinks.getElementsByTagName('a');

for (let i = 0; i < navButtons.length; i++){
    navButtons[i].onclick = () =>{
        CloseNavWindow();
    }
}