window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > (document.documentElement.scrollHeight - window.innerHeight)-100) {
        document.querySelector(".scriptTop").classList.add("show")
    } else {
        document.querySelector(".scriptTop").classList.remove("show")
    }
})
document.querySelector("#footer .scriptTop").addEventListener("click", () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
})