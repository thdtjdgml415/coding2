        // 모달
        const modalBtn = document.querySelector(".modal__btn");
        const modalClose = document.querySelector(".modal__close");
        const modalCont = document.querySelector(".modal__cont")


        modalBtn.addEventListener("click", () => {
            modalCont.classList.add("show");
            modalCont.classList.remove("hide");
        });
        modalClose.addEventListener("click", () => {
            modalCont.classList.add("hide");
        });


        // 탭메뉴
        const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
        const tabCont = document.querySelectorAll(".modal__box .cont > div");

        tabBtn.forEach((element, index) => {
            element.addEventListener("click", (event) => {
                event.preventDefault();   //클릭하면  발생하는 이벤트를 막아준다.

                //클래스 activ를 모두 제거함
                tabBtn.forEach(li => {
                    li.classList.remove("active");
                })
                //내가 클릭한 버튼에 active를 추가함
                element.classList.add("active");

                //버튼을 클릭하면 모든 자식박스 숨김
                tabCont.forEach(div => {
                    div.style.display = "none";
                })

                //주제를 클릭한 버튼과 관련된 카테고리를 보여준다.
                tabCont[index].style.display = "block";

            });
        });