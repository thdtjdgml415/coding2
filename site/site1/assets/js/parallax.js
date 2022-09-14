
//스크롤이동
document.querySelectorAll(".header__menu a").forEach(li => {
    li.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(li.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
