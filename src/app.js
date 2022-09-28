import { logout } from "./api/users.js";
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";


const main = document.querySelector("main");

document.getElementById('logoutBtn').addEventListener('click',onLogout)

page(decorateContext);
page("/", homeView);
page("/catalog", catalogView);
page("/game/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);

updateNav()
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
ctx.updateNav=updateNav;
  next();
}
function renderMain(templateResult) {
  render(templateResult, main);
}

function updateNav() {
  const userData = getUserData();
  if (userData) {
    document.getElementById("user").style.display = "block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "block";
  }
}

function onLogout(){
logout();
updateNav();
page.redirect('/')
}