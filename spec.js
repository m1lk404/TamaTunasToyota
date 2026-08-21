import { siteConfig } from "./data/site.config.js";

const params = new URLSearchParams(window.location.search);
const requestedModel = params.get("model") || "";
const requestedType = params.get("type") || "";
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const escapeHTML = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]));
const prettyLabel = (value) => value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/Mm$/, " (mm)").replace(/Cc$/, " (cc)").replace(/Ps$/, " (PS)").replace(/L$/, " (L)").replace(/^./, (character) => character.toUpperCase());
const specTitle = document.querySelector("#spec-title");
const specType = document.querySelector("#spec-type");
const specIntro = document.querySelector("#spec-intro");
const specStatus = document.querySelector("#spec-status");
const sections = document.querySelector("#spec-sections");
const sourceLink = document.querySelector("#spec-source-link");

function findProduct(products) {
  const model = normalize(requestedModel);
  const aliases = {
    "innova zenix": "innova zenix hybrid ev",
    "veloz hybrid": "veloz hybrid ev",
    "all new voxy": "voxy",
    voxy: "voxy",
    calya: "calya",
  };
  const target = aliases[model] || model;
  return products.find((product) => normalize(product.model) === target)
    || products.find((product) => normalize(product.model).includes(target) || target.includes(normalize(product.model)));
}

function findCar() {
  return siteConfig.cars.find((car) => normalize(car.model) === normalize(requestedModel))
    || siteConfig.cars.find((car) => normalize(car.name).includes(normalize(requestedModel)));
}

function renderValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value !== "object") return String(value);
  return Object.entries(value).map(([key, nestedValue]) => `<span><b>${escapeHTML(prettyLabel(key))}</b>${escapeHTML(renderValue(nestedValue))}</span>`).join("");
}

function renderSpecifications(product) {
  sections.innerHTML = Object.entries(product.specifications || {}).map(([sectionName, values]) => `<article class="spec-section"><h3>${escapeHTML(prettyLabel(sectionName))}</h3><div class="spec-table">${Object.entries(values).map(([key, value]) => `<div class="spec-row"><span>${escapeHTML(prettyLabel(key))}</span><strong>${escapeHTML(renderValue(value))}</strong></div>`).join("")}</div></article>`).join("");
}

fetch("./data/official-specifications.json")
  .then((response) => {
    if (!response.ok) throw new Error("Data spesifikasi tidak tersedia");
    return response.json();
  })
  .then((data) => {
    const product = findProduct(data.products);
    const car = findCar();
    const officialPage = data.officialCatalogPages.find((page) => normalize(page.model).includes(normalize(requestedModel)) || normalize(requestedModel).includes(normalize(page.model)));
    const sourceUrl = product?.sourceUrl || officialPage?.url;
    specTitle.textContent = car?.name || requestedModel || "Toyota";
    specType.textContent = requestedType || car?.unitName || "Spesifikasi teknis resmi";
    document.title = `${specTitle.textContent} | Tama Tunas Toyota`;
    if (product) {
      specIntro.textContent = "Ringkasan teknis unit yang dirangkum dari sumber resmi Toyota Astra Motor.";
      specStatus.textContent = `Tipe terverifikasi: ${product.availableTypes.length} · Diambil ${data.capturedAt}`;
      renderSpecifications(product);
    } else {
      specIntro.textContent = "Halaman spesifikasi pribadi Tama Tunas Toyota. Detail teknis resmi untuk model ini belum tersedia di dataset terverifikasi kami.";
      specStatus.textContent = "Data teknis belum tersedia di dataset lokal";
      sections.innerHTML = `<article class="spec-empty"><strong>Spesifikasi sedang diperbarui</strong><p>Silakan buka sumber resmi Toyota untuk detail terbaru model ini.</p></article>`;
    }
    if (sourceUrl) {
      sourceLink.href = sourceUrl;
    } else {
      sourceLink.hidden = true;
    }
  })
  .catch(() => {
    specTitle.textContent = requestedModel || "Spesifikasi Toyota";
    specIntro.textContent = "Data spesifikasi belum dapat dimuat. Silakan kembali ke showroom dan coba lagi.";
    specStatus.textContent = "Data tidak tersedia";
  });
