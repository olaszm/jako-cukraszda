const dropDownEl = document.querySelector(".dropdown");
const hamburgerElement = document.querySelector(".hambi");
const sectionEL = document.querySelector(".gallery");
const sectionTitle = document.querySelector(".section__title > h1");

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

window.addEventListener("DOMContentLoaded", async () => {
  const { pathname } = window.location;
  console.log(pathname);
  if (pathname.includes("gallery")) {
    const res = await fetch("/api/weddingCakes");
    const data = await res.json();

    let rowItems = [];
    data.forEach((d) => {
      sectionTitle.textContent = `Gallery`;

      const div = createGalleryCard();
      const img = createGalleryImage(d);
      const contentDiv = createGallertContentEl();
      const cardTitle = createGalleryCardTitle(d.name);
      const cardTags = createGalleryCardTags(d.flavours);
      contentDiv.append(cardTitle);
      contentDiv.append(cardTags);

      div.append(img);
      div.append(contentDiv);
      rowItems.push(div);

      if (rowItems.length >= 3) {
        const row = createGalleryRow(rowItems);
        sectionEL.append(row);
        rowItems = [];
      }
    });
  }
});

const createGalleryRow = (items) => {
  const div = document.createElement("div");
  div.classList.add("gallery__card__row");
  items.forEach((item) => {
    div.append(item);
  });
  return div;
};

const createGalleryCardTitle = (name) => {
  const title = document.createElement("h3");
  title.textContent = name;
  return title;
};

const createGalleryCardTags = (tags) => {
  let tag = tags.join(" ");
  return tag;
};

const createGallertContentEl = () => {
  const div = document.createElement("div");
  div.classList.add("gallery__card__content");
  return div;
};

const createGalleryCard = () => {
  const div = document.createElement("div");
  div.classList.add("gallery__card");
  return div;
};

const createGalleryImage = (item) => {
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.name;
  img.classList.add("gallery__img");
  return img;
};
