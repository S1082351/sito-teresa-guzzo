// Configurazione condivisa tra landing page e configuratore.
//
// La configurazione pubblicata vive in site-config.json nel repository ed è
// quindi identica per tutti i visitatori. Il configuratore la aggiorna
// committando quel file tramite l'API di GitHub (serve la chiave di
// pubblicazione); qui ci sono solo lettura, default e sanitizzazione.

const CONFIG_URL = "site-config.json";

// Aumentare quando la struttura della configurazione cambia in modo
// incompatibile: un site-config.json con versione diversa viene ignorato.
const CONFIG_VERSION = 3;

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

// Ogni campo deve avere il tipo del default, così il resto del codice può
// usare .trim() e .forEach senza guardie.
function sanitizeConfig(raw) {
  const config = { ...DEFAULT_CONFIG, ...raw };
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

async function loadConfig() {
  try {
    // Query param anti-cache: GitHub Pages/CDN servono subito l'ultima versione.
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), { cache: "no-store" });
    if (res.ok) {
      const saved = await res.json();
      if (saved && typeof saved === "object" && saved.version === CONFIG_VERSION) {
        return sanitizeConfig(saved);
      }
    }
  } catch (e) {
    // offline o file assente (es. apertura da file://): si usano i default
  }
  return { ...DEFAULT_CONFIG };
}
