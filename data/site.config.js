/**
 * site.config.js
 * Single Source of Truth (SSOT) - Acuan Tunggal Data Website Sales Toyota Tunas
 * Semua perubahan data sales, unit mobil, harga, hotspot, dan pesan WA diatur di file ini.
 */

export const siteConfig = {
  // ==========================================
  // 1. INFORMASI SALES & DEALER
  // ==========================================
  salesInfo: {
    name: "Tama Tunas Toyota",
    dealer: "Toyota Tunas",
    branch: "Tunas Toyota Kiaracondong",
    address: "Jalan Jendral Jl. Ibrahim Adjie No.47, Kb. Kangkung, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40272",
    googleMapsUrl: "https://maps.google.com/?cid=8670978462842920528",
    whatsappNumber: "6287817305398", // Format internasional tanpa '+' atau '0'
    profilePicture: "image/profile_me.jpg", // Path foto profil (Coming Soon / Placeholder)
  },

  // ==========================================
  // 2. METADATA WEBSITE & SEO
  // ==========================================
  siteMeta: {
    title: "Tama Tunas Toyota Dealer | Sales Resmi Kiaracondong Bandung",
    description: "Promo Toyota Bandung 2026. Dapatkan DP Murah, Diskon Spesial, dan Perhitungan Kredit Resmi Tunas Toyota Kiaracondong.",
    bannerText: "PROMO TERBARU 2026: Dapatkan Penawaran Khusus & DP Ringan Hubungi Tama Sekarang!",
    baseUrl: "https://tamatunastoyota.pages.dev",
    siteName: "Tama Tunas Toyota",
    locale: "id_ID",
    ogType: "website",
    twitterHandle: "@tamatunastoyota",
    keywords: [
      "Toyota Bandung",
      "promo Toyota",
      "dealer Toyota Kiaracondong",
      "Tama Tunas Toyota",
      "simulasi kredit Toyota",
      "harga OTR Toyota Bandung",
      "Toyota Innova Zenix",
      "Toyota Avanza",
      "Toyota Calya",
      "Toyota Alphard",
    ],
    image: "assets/wwwtoyotaastracoid_product_kijang-innova-zenix-hybrid-ev/sP9vTp7b1TP41L0EVGIWegCvDlRFwTfbQcNtXXEp.jpg",
  },

  // ==========================================
  // 3. KATALOG MOBIL & INTERACTIVE HOTSPOTS (TIPE TERTINGGI)
  // ==========================================
  cars: [
    { id: "zenix-hybrid", model: "Innova Zenix", name: "Zenix Hybrid EV", unitName: "Innova Zenix 2.0 Q HV Modelista CVT TSS", tag: "Hybrid EV / Premium MPV", image: "assets/wwwtoyotaastracoid_product_kijang-innova-zenix-hybrid-ev/sP9vTp7b1TP41L0EVGIWegCvDlRFwTfbQcNtXXEp.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/kijang-innova-zenix-hybrid-ev", hotspots: [
      { id: "tss-radar", title: "Toyota Safety Sense 3.0", description: "Teknologi keselamatan aktif untuk membantu menjaga kewaspadaan di perjalanan.", position: { top: "52%", left: "72%" } },
      { id: "alloy-wheel", title: "Premium Alloy Wheel", description: "Velg premium yang menegaskan karakter Zenix Hybrid EV.", position: { top: "72%", left: "64%" } },
      { id: "panoramic-roof", title: "Panoramic View Monitor", description: "Pandangan sekitar kendaraan untuk membantu manuver lebih percaya diri.", position: { top: "25%", left: "45%" } },
    ] },
    { id: "zenix-gasoline", model: "Innova Zenix", name: "Zenix Gasoline", unitName: "Innova Zenix 2.0 Q CVT TSS", tag: "Gasoline / Premium MPV", image: "assets/wwwtoyotaastracoid_product_kijang-innova-zenix/D4jXwAgULWxm1Ku4tRwQGs7xJ4zECsiYdTbETQBM.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/kijang-innova-zenix", hotspots: [
      { id: "front-grille", title: "Signature Front Grille", description: "Tampilan depan premium dengan karakter modern dan tegas.", position: { top: "56%", left: "26%" } },
      { id: "alloy-wheel", title: "Alloy Wheel", description: "Pelek alloy yang melengkapi proporsi MPV premium.", position: { top: "72%", left: "54%" } },
      { id: "side-mirror", title: "Side Mirror", description: "Spion samping mendukung visibilitas saat berpindah jalur.", position: { top: "42%", left: "58%" } },
    ] },
    { id: "calya", model: "Calya", name: "New Calya", unitName: "Calya G", tag: "Gasoline / Family MPV", image: "assets/wwwtoyotaastracoid_product_calya/53LAHr9ofZ3akWlQGV0App5UG2nF39L5aknSUOmJ.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/calya", hotspots: [
      { id: "front-grille", title: "New Front Mid Grille", description: "Desain grille dengan aksen chrome untuk tampilan sporty dan modern.", position: { top: "55%", left: "27%" } },
      { id: "alloy-wheel", title: "New Alloy Wheel", description: "Pelek dengan desain baru untuk tampilan yang lebih bold.", position: { top: "72%", left: "48%" } },
      { id: "safety", title: "SRS Airbags & ABS", description: "Perlengkapan keselamatan untuk mendukung perjalanan keluarga.", position: { top: "45%", left: "56%" } },
    ] },
    { id: "avanza", model: "New Avanza", name: "All New Avanza", unitName: "New Avanza 1.5 G", tag: "Gasoline / Family MPV", image: "assets/wwwtoyotaastracoid_product_avanza/CCfc92yfh9gJ2mEmXHhp978TfEdlCtk46ek4DCFt.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/avanza", hotspots: [
      { id: "front-grille", title: "Modern Front Fascia", description: "Siluet depan modern untuk mobil keluarga yang aktif.", position: { top: "55%", left: "25%" } },
      { id: "alloy-wheel", title: "Alloy Wheel", description: "Pelek alloy yang melengkapi tampilan Avanza.", position: { top: "72%", left: "52%" } },
      { id: "safety", title: "Safety Equipment", description: "Perlengkapan keselamatan untuk menemani mobilitas keluarga.", position: { top: "43%", left: "58%" } },
    ] },
    { id: "veloz", model: "Veloz Hybrid", name: "New Veloz Hybrid EV", unitName: "1.5 Q Hybrid CVT TSS Modellista", tag: "Hybrid EV / Premium MPV", image: "assets/wwwtoyotaastracoid_product_veloz-hybrid-ev/vMG5ff6KXSaKWus0UJeURhsMwhUYd8mrYwULX983.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/veloz-hybrid-ev", hotspots: [
      { id: "front-grille", title: "Premium Front Grille", description: "Fascia modern dengan karakter premium yang kuat.", position: { top: "55%", left: "25%" } },
      { id: "alloy-wheel", title: "Black Alloy Wheel", description: "Velg hitam memberikan aksen sporty.", position: { top: "72%", left: "50%" } },
      { id: "safety", title: "6 Airbags & Parking Sonar", description: "Perlengkapan keselamatan dan bantuan parkir untuk keluarga.", position: { top: "42%", left: "62%" } },
    ] },
    { id: "innova", model: "New Kijang Innova", name: "New Kijang Innova", unitName: "Kijang Innova 2.4 G Diesel", tag: "Diesel / Family MPV", image: "assets/wwwtoyotaastracoid_product_kijang-innova/3CApvoYZ4xsYI0CPgIgA2TJh0waQmBo7XxWoVm25.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/kijang-innova", hotspots: [
      { id: "front-grille", title: "Bold Front Design", description: "Desain depan berkarakter untuk perjalanan keluarga dan bisnis.", position: { top: "55%", left: "27%" } },
      { id: "alloy-wheel", title: "Alloy Wheel", description: "Pelek alloy untuk tampilan yang solid.", position: { top: "72%", left: "52%" } },
      { id: "interior", title: "Spacious Interior", description: "Kabin lapang untuk perjalanan panjang yang nyaman.", position: { top: "38%", left: "62%" } },
    ] },
    { id: "voxy", model: "All New Voxy", name: "All New Voxy", unitName: "Voxy 2.0", tag: "Gasoline / Luxury MPV", image: "assets/wwwtoyotaastracoid_product_voxy/wCqSmbbJammOMrbjpfE80QmITDvqGRgebDJnrZk8.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/voxy", hotspots: [
      { id: "front-grille", title: "Luxury MPV Design", description: "Proporsi dan detail eksterior untuk pengalaman MPV premium.", position: { top: "54%", left: "27%" } },
      { id: "alloy-wheel", title: "Premium Wheel", description: "Pelek premium yang menyempurnakan tampilan Voxy.", position: { top: "72%", left: "53%" } },
      { id: "interior", title: "Spacious Cabin", description: "Kabin nyaman untuk membawa keluarga dan menikmati perjalanan.", position: { top: "37%", left: "62%" } },
    ] },
    { id: "alphard-xe", model: "All New Alphard", name: "New Alphard XE", unitName: "Alphard 2.5 XE", tag: "Luxury MPV", image: "assets/wwwtoyotaastracoid_product_alphard-xe/uxfgjGLk4hl0jty5rcuXZuVydlSmdwzYxAmBngCA.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/alphard-xe", hotspots: [
      { id: "front-grille", title: "Executive Front Design", description: "Desain depan berkelas untuk pengalaman berkendara premium.", position: { top: "54%", left: "26%" } },
      { id: "alloy-wheel", title: "Luxury Alloy Wheel", description: "Detail roda yang mempertegas karakter executive MPV.", position: { top: "72%", left: "54%" } },
      { id: "interior", title: "Executive Cabin", description: "Kabin yang dirancang untuk kenyamanan penumpang.", position: { top: "38%", left: "63%" } },
    ] },
    { id: "alphard-xe-hybrid", model: "All New Alphard", name: "New Alphard XE Hybrid EV", unitName: "Alphard 2.5 XE HV", tag: "Hybrid EV / Luxury MPV", image: "assets/wwwtoyotaastracoid_product_alphard-xe-hybrid-ev/OSFz7gsopS47dkq7y9rRX50V9NHDvyf86VeedVQE.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/alphard-xe-hybrid-ev", hotspots: [
      { id: "front-grille", title: "Executive Hybrid Design", description: "Desain luxury MPV dengan karakter elektrifikasi.", position: { top: "54%", left: "26%" } },
      { id: "alloy-wheel", title: "Premium Alloy Wheel", description: "Roda premium untuk tampilan yang elegan.", position: { top: "72%", left: "53%" } },
      { id: "interior", title: "Premium Passenger Cabin", description: "Ruang kabin yang mengutamakan kenyamanan penumpang.", position: { top: "38%", left: "63%" } },
    ] },
    { id: "alphard-hybrid", model: "All New Alphard", name: "New Alphard Hybrid EV", unitName: "New Alphard 2.5 G CVT Hybrid", tag: "Hybrid EV / Luxury MPV", image: "assets/wwwtoyotaastracoid_product_alphard-hev/4cLijkHylpFrJoed8QsGLOy32KTZB4GwzyvKu0k1.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/alphard-hev", hotspots: [
      { id: "front-grille", title: "Alphard Hybrid Presence", description: "Tampilan executive yang kuat dengan teknologi hybrid.", position: { top: "54%", left: "26%" } },
      { id: "alloy-wheel", title: "Executive Alloy Wheel", description: "Detail roda elegan untuk melengkapi eksterior.", position: { top: "72%", left: "53%" } },
      { id: "interior", title: "Luxury Interior", description: "Kabin premium untuk perjalanan yang tenang dan nyaman.", position: { top: "38%", left: "63%" } },
    ] },
    { id: "vellfire", model: "New Vellfire Hybrid EV", name: "New Vellfire Hybrid EV", unitName: "New Vellfire 2.5 VIP CVT Hybrid", tag: "Hybrid EV / Luxury MPV", image: "assets/wwwtoyotaastracoid_product_vellfire-hev/wWMl4YHhf09eemzNzxM8fQTerHlPdmRHYP3LyQKJ.jpg", sourceUrl: "https://www.toyota.astra.co.id/product/vellfire-hev", hotspots: [
      { id: "front-grille", title: "VIP Front Design", description: "Wajah depan Vellfire yang tegas dan eksklusif.", position: { top: "54%", left: "26%" } },
      { id: "alloy-wheel", title: "VIP Alloy Wheel", description: "Detail roda premium untuk tampilan yang berkelas.", position: { top: "72%", left: "53%" } },
      { id: "interior", title: "VIP Passenger Cabin", description: "Kabin yang memprioritaskan kenyamanan penumpang VIP.", position: { top: "38%", left: "63%" } },
    ] },
  ],

  // ==========================================
  // 4. HELPER LOGIKA LINK WHATSAPP AUTOMATION
  // ==========================================
  waHelper: {
    /**
     * Membentuk URL wa.me dengan pesan otomatis berdasarkan konteks
     * @param {string} type - Jenis pesan ('general' | 'unit' | 'feature')
     * @param {object} payload - Data tambahan seperti nameUnit, nameFeature
     * @returns {string} URL WhatsApp siap pakai
     */
    generateLink: function (type, payload = {}) {
      const phone = siteConfig.salesInfo.whatsappNumber;
      const salesName = siteConfig.salesInfo.name;
      let text = "";

      switch (type) {
        case "unit":
          text = `Halo ${salesName}, saya tertarik dengan unit *${payload.nameUnit}*. Boleh info promo OTR Bandung dan simulasi kreditnya?`;
          break;
        case "feature":
          text = `Halo ${salesName}, saya mau tanya lebih rinci mengenai fitur *${payload.nameFeature}* pada *${payload.nameUnit}*. Apakah unit ready stock di Tunas Kiaracondong?`;
          break;
        case "general":
        default:
          text = `Halo ${salesName}, saya lihat website promo Toyota Tunas. Mau tanya-tanya promo dan perhitungan DP murah untuk mobil Toyota.`;
          break;
      }

      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    },
  },
};