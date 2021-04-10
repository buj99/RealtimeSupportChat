/**

1. get the `menu` button
2. add a `click` event listener on the button
3. on click, change style of `nav`


 */

let threeDotsButton = document.querySelector(".three-dots-button");
// let menuBtn = document.querySelector(".menuBtn");
let nav = document.getElementsByTagName("nav")[0];


threeDotsButton.addEventListener('click', onClick);
// menuBtn.addEventListener('click', onClick);
document.body.addEventListener('click', onBodyClick);




function onClick() {
    nav.classList.add('is--open');
}

function onBodyClick(e) {
    console.log(e);
    if (
        threeDotsButton.contains(e.target) ||
        nav.contains(e.target)
    ) {
        return;
    }

    nav.classList.remove('is--open');
}