import { siteConfig } from "./data/site.config.js";

const { salesInfo, siteMeta, cars, waHelper } = siteConfig;
let activeCarIndex = 0;
let car = cars[activeCarIndex];
const $ = (selector) => document.querySelector(selector);
const escapeHTML = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[character]));
const getUnitName = (unit) => unit.unitName || unit.name;
const locationInfo = {
  dealer: salesInfo?.dealer || "Toyota Tunas",
  branch: salesInfo?.branch || "Cabang Toyota Bandung",
  address: salesInfo?.address || "Alamat dealer belum tersedia",
  googleMapsUrl: salesInfo?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${salesInfo?.dealer || "Toyota Tunas"} ${salesInfo?.branch || "Bandung"}`)}`,
};

$("#sales-name").textContent = salesInfo.name;
$("#dealer-name").textContent = salesInfo.name;
$("#branch-name").textContent = salesInfo.branch;
$("#header-location").href = locationInfo.googleMapsUrl;
$("#header-location").target = "_blank";
$("#footer-dealer").textContent = locationInfo.dealer;
$("#footer-branch").textContent = locationInfo.branch;
$("#footer-address").textContent = locationInfo.address;
$("#maps-cta").href = locationInfo.googleMapsUrl;
$("#maps-cta").target = "_blank";
$("#banner-text").textContent = "TUNAS TOYOTA - CARI MOBIL TOYOTA IMPIAN? Dapatkan Penawaran Harga OTR & Simulasi Kredit Terbaik Se-Bandung! Hubungi Tama Tunas Kiaracondong WA: 0878-1730-5398";
$("#spotlight-title").textContent = car.name;
$("#car-tag").textContent = car.tag;
$("#car-price").textContent = "Memuat OTR...";
$("#car-image").src = car.image;
$("#car-image").alt = car.name;
$(".showcase__controls p").innerHTML = "<b>01</b> Geser atau gunakan panah untuk mengganti unit";

const generalLink = waHelper.generateLink("general");
const unitLink = waHelper.generateLink("unit", { nameUnit: getUnitName(car) });
$("#header-wa").href = generalLink;
$("#floating-wa").href = generalLink;
$("#unit-wa").href = unitLink;
const aboutLink = document.createElement("a");
aboutLink.className = "footer-about-link";
aboutLink.href = "./about.html";
aboutLink.textContent = "About Us & Disclaimer ↗";
$(".footer__bottom").append(aboutLink);

document.querySelectorAll("a[target='_blank']").forEach((link) => {
  if (!link.href.includes("wa.me") && !link.href.includes("whatsapp") && !link.href.includes("google.com/maps")) {
    link.removeAttribute("target");
  }
});

function getLowestPrice(unit) {
  const category = pricelist?.categories?.find((item) => item.model.toLowerCase() === (unit.model || "").toLowerCase());
  const values = category?.types?.flatMap((type) => Object.entries(type)
    .filter(([key, value]) => key !== "name" && typeof value === "string" && value !== "-")
    .map(([, value]) => Number(value.replace(/\./g, "")))) || [];
  const numericPrices = values.filter((value) => Number.isFinite(value) && value > 0);
  if (numericPrices.length === 0) return "Hubungi untuk OTR";
  return `Rp ${Math.min(...numericPrices).toLocaleString("id-ID")}`;
}

function renderCarouselDots() {
  $("#carousel-dots").innerHTML = cars.map((item, index) => `<button class="carousel-dot${index === activeCarIndex ? " is-active" : ""}" type="button" aria-label="Tampilkan ${escapeHTML(item.name)}" aria-pressed="${index === activeCarIndex}" data-index="${index}"></button>`).join("");
}

function renderCar(index) {
  activeCarIndex = (index + cars.length) % cars.length;
  car = cars[activeCarIndex];
  $("#spotlight-title").textContent = car.name;
  $("#car-tag").textContent = car.tag;
  $("#fact-powertrain").textContent = (car.tag || "Toyota").split(" /")[0];
  $("#fact-type").textContent = getUnitName(car).split(" ").slice(-2).join(" ");
  $("#fact-source").textContent = pricelist?.updatedAt || "2026";
  $("#car-price").textContent = getLowestPrice(car);
  $("#car-image").src = car.image;
  $("#car-image").alt = car.name;
  $("#car-stage-label").textContent = `${car.model || car.name} · ${car.tag}`;
  $("#image-fallback strong").textContent = car.name.split(" ").slice(0, 2).join(" ");
  $("#unit-wa").href = waHelper.generateLink("unit", { nameUnit: getUnitName(car) });
  renderCarouselDots();
  $("#carousel-index").textContent = String(activeCarIndex + 1).padStart(2, "0");
}

$("#car-image").addEventListener("error", () => {
  $("#image-fallback").classList.add("is-visible");
});

const modelTabs = $("#model-tabs");
const priceGrid = $("#price-grid");
const tableEmpty = $("#table-empty");

function formatPrice(value) {
  if (!value || value === "-") return "-";
  return `Rp ${value}`;
}

function getPriceColumns(types) {
  const keys = ["col1", "col2", "nonPremium", "premium", "nonPremiumColor", "premiumColor", "manual", "cvt", "automatic"];
  const labels = {
    col1: "Non-Premium / Manual",
    col2: "Premium / Automatic",
    nonPremium: "Non-Premium",
    premium: "Premium",
    nonPremiumColor: "Non-Premium",
    premiumColor: "Premium",
    manual: "Manual",
    cvt: "CVT / Automatic",
    automatic: "Automatic",
  };
  return keys.filter((key) => types.some((type) => key in type)).map((key) => ({ key, label: labels[key] }));
}

function renderPriceList(categories, activeModel) {
  const category = categories.find((item) => item.model === activeModel) || categories[0];
  const sourceUrl = `./spec.html?model=${encodeURIComponent(category.model)}&type=`;
  const columns = getPriceColumns(category.types);
  $("#pricelist-meta").textContent = `${category.types.length} varian · OTR Bandung · Update ${escapeHTML(pricelist.updatedAt)}`;
  priceGrid.innerHTML = category.types.map((type, index) => {
    const prices = columns.map((column) => `<span class="price-option"><small>${escapeHTML(column.label)}</small><strong>${escapeHTML(formatPrice(type[column.key]))}</strong></span>`).join("");
    const link = waHelper.generateLink("unit", { nameUnit: type.name });
    return `<article class="price-card" data-spec-url="${escapeHTML(`${sourceUrl}${encodeURIComponent(type.name)}`)}" tabindex="0" role="link" aria-label="Lihat spesifikasi ${escapeHTML(type.name)}"><div class="price-card__top"><span class="variant-model">${escapeHTML(category.model)}</span><span class="card-number">${String(index + 1).padStart(2, "0")}</span></div><h3>${escapeHTML(type.name)}</h3><div class="price-options">${prices}</div><a class="price-card__cta" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer" aria-label="Hitung DP untuk ${escapeHTML(type.name)}"><span>◌</span> Hitung DP / Simulasi Kredit <b>↗</b></a><span class="price-card__spec">Lihat spesifikasi resmi <b>↗</b></span></article>`;
  }).join("");
  tableEmpty.hidden = category.types.length > 0;
}

priceGrid.addEventListener("click", (event) => {
  if (event.target.closest(".price-card__cta")) return;
  const card = event.target.closest(".price-card");
  if (card?.dataset.specUrl) window.location.href = card.dataset.specUrl;
});
priceGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".price-card");
  if (!card?.dataset.specUrl) return;
  event.preventDefault();
  window.location.href = card.dataset.specUrl;
});

let pricelist;
fetch("./data/pricelist.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Pricelist request failed: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    pricelist = data;
    $("#car-price").textContent = getLowestPrice(car);
    $("#unit-wa").href = waHelper.generateLink("unit", { nameUnit: getUnitName(car) });
    $("#car-stage-label").textContent = `${car.model || car.name} · ${car.tag}`;
    renderCar(activeCarIndex);
    modelTabs.innerHTML = data.categories.map((category, index) => `<button class="model-tab${index === 0 ? " is-active" : ""}" type="button" role="tab" aria-selected="${index === 0}" data-model="${escapeHTML(category.model)}">${escapeHTML(category.model)}</button>`).join("");
    modelTabs.addEventListener("click", (event) => {
      const tab = event.target.closest(".model-tab");
      if (!tab) return;
      document.querySelectorAll(".model-tab").forEach((item) => {
        item.classList.toggle("is-active", item === tab);
        item.setAttribute("aria-selected", item === tab);
      });
      renderPriceList(data.categories, tab.dataset.model);
    });
    renderPriceList(data.categories, data.categories[0].model);
  })
  .catch(() => {
    $("#pricelist-meta").textContent = "Data pricelist belum dapat dimuat.";
    tableEmpty.hidden = false;
  });

$("#carousel-prev").addEventListener("click", () => renderCar(activeCarIndex - 1));
$("#carousel-next").addEventListener("click", () => renderCar(activeCarIndex + 1));
$("#carousel-dots").addEventListener("click", (event) => {
  const dot = event.target.closest(".carousel-dot");
  if (dot) renderCar(Number(dot.dataset.index));
});

let touchStartX = 0;
$("#car-stage").addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
$("#car-stage").addEventListener("touchend", (event) => {
  const deltaX = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(deltaX) > 45) renderCar(activeCarIndex + (deltaX < 0 ? 1 : -1));
}, { passive: true });
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") renderCar(activeCarIndex - 1);
  if (event.key === "ArrowRight") renderCar(activeCarIndex + 1);
});

renderCarouselDots();

$("#mobile-wa").href = generalLink;
