// Configurazione condivisa tra landing page e configuratore.
// I dati personalizzati vengono salvati in localStorage; in assenza si usano i default.

const STORAGE_KEY = "sito-config";

const DEFAULT_CONFIG = {
  nome: "Dott.ssa Teresa Guzzo",
  professione: "Dermatologa · Venereologa",
  tagline: "La salute della tua pelle merita attenzione, ascolto ed esperienza.",
  bio: "Specialista in Dermatologia e Venereologia, riceve ad Ancona dove si occupa di diagnosi e cura delle patologie della pelle, dei capelli e delle unghie. Dedica particolare attenzione alla prevenzione dei tumori cutanei e alla cura del paziente in ogni fase del percorso, dalla prima visita al follow-up.",
  servizi: [
    "Visita dermatologica",
    "Mappatura dei nei in epiluminescenza",
    "Trattamento dell'acne",
    "Tricologia (capelli e cuoio capelluto)",
    "Crioterapia",
    "Visita venereologica"
  ],
  indirizzo: "Via Guido Miglioli 30, 60131 Ancona (AN)",
  telefono: "",
  email: "",
  orari: "Su appuntamento",
  linkPrenotazione: "https://www.doctolib.it/dermatologo-venereologo/ancona/teresa-guzzo",
  tema: "teal",
  mostraBio: true,
  mostraServizi: true,
  mostraContatti: true
};

function loadConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      return { ...DEFAULT_CONFIG, ...saved };
    }
  } catch (e) {
    // dati corrotti: si riparte dai default
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function resetConfig() {
  localStorage.removeItem(STORAGE_KEY);
}
