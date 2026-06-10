// Configurazione condivisa tra landing page e configuratore.
// I dati personalizzati vengono salvati in localStorage; in assenza si usano i default.

const STORAGE_KEY = "sito-config";

// Aumentare quando i contenuti predefiniti cambiano in modo incompatibile:
// le configurazioni salvate con versione diversa vengono scartate.
const CONFIG_VERSION = 2;

const DEFAULT_CONFIG = {
  nome: "Dott.ssa Teresa Guzzo",
  professione: "Dermatologa",
  tagline: "La salute della tua pelle merita attenzione, ascolto ed esperienza.",
  bio: "Specialista in Dermatologia, riceve ad Ancona dove si occupa di diagnosi e cura delle patologie della pelle, dei capelli e delle unghie. Dedica particolare attenzione alla prevenzione dei tumori cutanei e alla cura del paziente in ogni fase del percorso, dalla prima visita al follow-up.",
  servizi: [
    "Visita dermatologica",
    "Mappatura dei nei in epiluminescenza",
    "Trattamento dell'acne",
    "Tricologia (capelli e cuoio capelluto)",
    "Crioterapia"
  ],
  indirizzo: "Via Guido Miglioli 30, 60131 Ancona (AN)",
  telefono: "",
  email: "",
  orari: "Su appuntamento",
  linkPrenotazione: "",
  tema: "teal",
  mostraBio: true,
  mostraServizi: true,
  mostraContatti: true
};

function loadConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object" && saved.version === CONFIG_VERSION) {
      const config = { ...DEFAULT_CONFIG, ...saved };
      // Sanitizzazione: ogni campo deve avere il tipo del default,
      // così il resto del codice può usare .trim() e .forEach senza guardie.
      for (const key of Object.keys(DEFAULT_CONFIG)) {
        if (typeof config[key] !== typeof DEFAULT_CONFIG[key]) {
          config[key] = DEFAULT_CONFIG[key];
        }
      }
      config.servizi = Array.isArray(config.servizi)
        ? config.servizi.filter(s => typeof s === "string" && s.trim())
        : [...DEFAULT_CONFIG.servizi];
      return config;
    }
  } catch (e) {
    // dati corrotti: si riparte dai default
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...config, version: CONFIG_VERSION }));
}

function resetConfig() {
  localStorage.removeItem(STORAGE_KEY);
}
