const COMUNAS = [
  { value: "la_cisterna", label: "La Cisterna" },
  { value: "san_miguel", label: "San Miguel" },
  { value: "la_florida", label: "La Florida" },
  { value: "maipu", label: "Maipú" },
  { value: "puente_alto", label: "Puente Alto" }
];

const RECINTOS = [
  { value: "movistar_arena", label: "Movistar Arena" },
  { value: "estadio_nacional", label: "Estadio Nacional" },
  { value: "teatro_caupolican", label: "Teatro Caupolicán" },
  { value: "teatro_coliseo", label: "Teatro Coliseo" },
  { value: "club_hipico", label: "Club Hípico" }
];

const TARIFAS_IDA = {
  la_cisterna: {
    movistar_arena: 18000,
    estadio_nacional: 22000,
    teatro_caupolican: 17000,
    teatro_coliseo: 17000,
    club_hipico: 16000
  },
  san_miguel: {
    movistar_arena: 17000,
    estadio_nacional: 21000,
    teatro_caupolican: 16000,
    teatro_coliseo: 16000,
    club_hipico: 15000
  },
  la_florida: {
    movistar_arena: 24000,
    estadio_nacional: 18000,
    teatro_caupolican: 22000,
    teatro_coliseo: 22000,
    club_hipico: 23000
  },
  maipu: {
    movistar_arena: 23000,
    estadio_nacional: 28000,
    teatro_caupolican: 22000,
    teatro_coliseo: 22000,
    club_hipico: 21000
  },
  puente_alto: {
    movistar_arena: 28000,
    estadio_nacional: 24000,
    teatro_caupolican: 27000,
    teatro_coliseo: 27000,
    club_hipico: 28000
  }
};

const TARIFAS_REGRESO = {
  movistar_arena: {
    la_cisterna: 20000,
    san_miguel: 19000,
    la_florida: 26000,
    maipu: 25000,
    puente_alto: 30000
  },
  estadio_nacional: {
    la_cisterna: 24000,
    san_miguel: 23000,
    la_florida: 20000,
    maipu: 30000,
    puente_alto: 26000
  },
  teatro_caupolican: {
    la_cisterna: 19000,
    san_miguel: 18000,
    la_florida: 24000,
    maipu: 24000,
    puente_alto: 29000
  },
  teatro_coliseo: {
    la_cisterna: 19000,
    san_miguel: 18000,
    la_florida: 24000,
    maipu: 24000,
    puente_alto: 29000
  },
  club_hipico: {
    la_cisterna: 18000,
    san_miguel: 17000,
    la_florida: 25000,
    maipu: 22000,
    puente_alto: 29000
  }
};
