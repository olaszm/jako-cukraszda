const dropDownEl = document.querySelector(".dropdown");
const hamburgerElement = document.querySelector(".hambi");
const sectionEL = document.querySelector(".gallery");
const sectionTitle = document.querySelector(".section__title > h1");
const aboutTextEl = document.querySelector(".about__text");
const gridItems = [...document.querySelectorAll(".grid-item")];
const navItems = [...document.querySelectorAll("[data-route]")];

const slideImages = [...document.querySelectorAll(".hero__img > img")];

window.addEventListener("DOMContentLoaded", () => {
  const { pathname } = window.location;
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

if (aboutTextEl) {
  tlAbout
    .from(".section__title", {
      opacity: 0,
      x: -100,
      duration: 0.4,
      ease: "ease",
    })
    .from([".grid-item"], {
      opacity: 0,
      height: 0,
      duration: 0.7,
      ease: "ease",
      stagger: 0.4,
    })
    .from(aboutTextEl, {
      opacity: 0,
      duration: 0.4,
      ease: "ease",
    });
}

const servicesCard = [...document.querySelectorAll(".services__card")];

if (servicesCard) {
  gsap.from(servicesCard, {
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
}

gsap.from(".section__content__map", {
  opacity: 0,
  duration: 0.6,
  ease: "ease-out",
  stagger: 0.4,
});

const heroEl = document.querySelector(".hero");
const overlayEl = document.querySelector(".overlay");

if (heroEl && overlayEl) {
  tl.from([overlayEl, heroEl], {
    x: -100,
    duration: 1.2,
    width: 0,
    skewX: 2,
    ease: "power3.inOut",
    stagger: {
      amount: 0.2,
    },
  })
    .from([".hero__content__title", ".hero__content__cta"], {
      opacity: 0,
      y: 100,
      duration: 0.5,
      stagger: 0.4,
    })
    .then((e) => {
      if (overlayEl) {
        overlayEl.style.width = "100%";
      }
      if (heroEl) {
        heroEl.style.width = "100%";
      }
    });
}
