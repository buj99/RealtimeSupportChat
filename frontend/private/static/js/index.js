import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  router();
});

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

window.addEventListener("popstate", () => {
  router();
});
