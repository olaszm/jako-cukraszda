const dropDownEl = document.querySelector(".dropdown");
const hamburgerElement = document.querySelector(".hambi");
const sectionEL = document.querySelector(".gallery");
const sectionTitle = document.querySelector(".section__title > h1");
const gridItems = [...document.querySelectorAll(".grid-item")];
const navItems = [...document.querySelectorAll("[data-route]")];
const productCards = document.querySelectorAll(".product__card");

window.addEventListener("DOMContentLoaded", () => {
  const { pathname } = window.location;
  console.log(pathname);
  const route = navItems.filter((item) => item.dataset.route == pathname);
  route.forEach((r) => {
    r.classList.add("selected");
  });
});

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

// Grid Images

// gridItems.forEach((item) => {
//   item.addEventListener("mouseenter", (e) => {
//     e.target.style.zIndex += 1;
//   });
// });

// Gallery

window.addEventListener("DOMContentLoaded", async () => {
  const { pathname } = window.location;
  let regex = /\/[a-z]+/gi;
  if (pathname.includes("gallery")) {
    const query = pathname.match(regex)[1];
    const res = await fetch(`/api${query}`);
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
  const pEl = document.createElement("p");
  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    pEl.append(span);
  });
  return pEl;
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

//Create Google Maps

if (window.location.pathname == "/contact") {
  createMap(46.9668722, 18.9172693, "#map", 15);
  createMap(46.9596846, 18.9439502, "#map_two", 15);
}

function createMap(lat, long, selector, zoom) {
  let positionOnMap = { lat: lat, lng: long };

  let map = new google.maps.Map(document.querySelector(selector), {
    zoom,
    center: positionOnMap,
  });

  let marker = new google.maps.Marker({ position: positionOnMap, map: map });
}

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
const tlAbout = gsap.timeline();

tlAbout
  .from([".grid-item"], {
    opacity: 0,
    height: 0,
    duration: 0.7,
    ease: "ease",
    stagger: 0.4,
  })
  .from(".section__content__text", {
    opacity: 0,
    duration: 0.4,
    ease: "ease",
  });

gsap.from(".services__card", {
  scrollTrigger: {
    trigger: ".services__card__container",
    start: "top 80%",
    end: "bottom bottom",
    // markers: true,
  },
  opacity: 0,
  y: "100%",
  duration: 0.6,
  stagger: 0.4,
});

gsap.from(".section__content__map", {
  opacity: 0,
  duration: 0.6,
  ease: "ease-out",
  stagger: 0.4,
});

tl.from([".overlay", ".hero"], {
  x: -100,
  duration: 1.2,
  width: -0,
  skewX: 4,
  ease: "power3.inOut",
  stagger: {
    amount: 0.2,
  },
}).from([".hero__content__title", ".hero__content__cta"], {
  opacity: 0,
  y: 100,
  duration: 0.6,
  stagger: 0.4,
});

gsap.from(productCards, {
  delay: "-0.4",
  y: -60,
  skewX: 6,
  duration: 0.8,
  opacity: 0,
  ease: "power3.out",
  stagger: {
    amount: 0.2,
  },
});

console.log(productCards);
