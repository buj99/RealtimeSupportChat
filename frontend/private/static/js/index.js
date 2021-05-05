import { router } from "./router.js";
import { navigateTo } from './utils.js'

document.addEventListener("DOMContentLoaded", () => {

    router();
});


document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
});

window.addEventListener("popstate", (e) => {
    router();
});