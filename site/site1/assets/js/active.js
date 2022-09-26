const btn = document.querySelector(".side__btn");
const sideMenu = document.querySelector(".side__menu")


btn.addEventListener("click", (a) => {
    a.preventDefault();
    sideMenu.classList.toggle("hide");
    
});


