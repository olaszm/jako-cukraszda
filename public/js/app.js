const dropDownEl = document.querySelector(".dropdown");
const hamburgerElement = document.querySelector(".hambi");

// DROPDOWN ------------------------------
let isMenuOpen = false;

window.addEventListener("click", (e) => {
  if (
    e.target.className.includes("hambi") ||
    (!e.target.className.includes("dropdown") && isMenuOpen)
  ) {
    dropDownEl.classList.toggle("dropdown-active");
    isMenuOpen = !isMenuOpen;
    console.log(isMenuOpen);
  }
});

// ROUTER ------------------------------

// window.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM loaded");

//   const router = document.querySelectorAll("[data-route]");

//   router.forEach((r) => {
//     r.addEventListener("click", (e) => {
//       const routeName = e.target.dataset.route;
//       window.history.pushState({}, routeName, `/${routeName}`);
//     });
//   });

//   class Router {
//     constructor(name, routes) {
//       this.name = name;
//       this.routes = routes;
//     }
//   }

//   const myFirstRouter = new Router("firstRouter", [
//     { path: "/", name: "home" },
//     { path: "/about", name: "about" },
//     { path: "/product", name: "product" },
//     { path: "/order", name: "order" },
//     { path: "/contact", name: "contact" },
//   ]);

//   const currentPath = window.location.pathname;
//   if (currentPath == "/") {
//     console.log("Home page");
//   } else {
//     const route = myFirstRouter.routes.filter((r) => {
//       return r.path == currentPath;
//     })[0];
//     if (route) {
//       appEl.textContent = "your are on " + route.name;
//     } else {
//       appEl.textContent = `404 No Route`;
//     }
//   }
// });
