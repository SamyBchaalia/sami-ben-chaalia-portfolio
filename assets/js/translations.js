document.addEventListener("DOMContentLoaded", async () => {
  const langSwitcher = document.getElementById("lang-switcher");
  const savedLang = localStorage.getItem("lang") || "fr";
  langSwitcher.value = savedLang;
  await loadTranslations(savedLang);

  langSwitcher.addEventListener("change", async (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("lang", selectedLang);
    await loadTranslations(selectedLang);
  });
});

async function loadTranslations(lang) {
  try {
    const response = await fetch(`assets/locales/${lang}.json`);
    const translations = await response.json();

    document.documentElement.setAttribute("lang", lang);
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = translations[el.dataset.i18n] || el.textContent;
    });
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}
