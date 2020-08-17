const dropDownEl = document.querySelector(".dropdown");
const hamburgerElement = document.querySelector(".hambi");

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
