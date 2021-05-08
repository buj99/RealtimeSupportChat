import { pathToRegex, getParams } from "./utils.js";
import Login from "./views/Login.js";
import Chat from "./views/Chat.js";
import UserMeniu from "./views/UserMeniu.js";
import Costumize from "./views/Costumize.js";

export const router = async () => {
  const root = document.getElementById("app");
  const routes = [
    { path: "/404", view: Login },
    { path: "/", view: Login },
    { path: "/login", view: Login },
    { path: "/-username", view: UserMeniu },
    { path: "/-username/@chatname", view: Chat },
    { path: "/-username/costumize", view: Costumize },
  ];

  //testing routes for match

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    location.assign("/404");
  }

  const view = new match.route.view(getParams(match));
  root.innerHTML = await view.getHTML();
  view.loadSetupDomElements();
};
