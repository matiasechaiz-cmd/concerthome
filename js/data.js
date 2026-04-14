const COMUNAS = [
  { value: "la_cisterna", label: "La Cisterna" },
  { value: "san_miguel", label: "San Miguel" },
  { value: "la_florida", label: "La Florida" },
  { value: "maipu", label: "Maipú" },
  { value: "puente_alto", label: "Puente Alto" },
  { value: "santiago_centro", label: "Santiago Centro" },
  { value: "providencia", label: "Providencia" },
  { value: "nunoa", label: "Ñuñoa" },
  { value: "las_condes", label: "Las Condes" },
  { value: "la_reina", label: "La Reina" },
  { value: "penalolen", label: "Peñalolén" },
  { value: "macul", label: "Macul" },
  { value: "estacion_central", label: "Estación Central" },
  { value: "independencia", label: "Independencia" },
  { value: "recoleta", label: "Recoleta" }
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
    movistar_arena: 16500,
    estadio_nacional: 20500,
    teatro_caupolican: 15500,
    teatro_coliseo: 15500,
    club_hipico: 14500
  },
  san_miguel: {
    movistar_arena: 15500,
    estadio_nacional: 19500,
    teatro_caupolican: 14500,
    teatro_coliseo: 14500,
    club_hipico: 14000
  },
  la_florida: {
    movistar_arena: 22000,
    estadio_nacional: 16500,
    teatro_caupolican: 20000,
    teatro_coliseo: 20000,
    club_hipico: 21000
  },
  maipu: {
    movistar_arena: 20500,
    estadio_nacional: 25500,
    teatro_caupolican: 19500,
    teatro_coliseo: 19500,
    club_hipico: 18500
  },
  puente_alto: {
    movistar_arena: 25000,
    estadio_nacional: 21500,
    teatro_caupolican: 24000,
    teatro_coliseo: 24000,
    club_hipico: 25000
  },
  santiago_centro: {
    movistar_arena: 14000,
    estadio_nacional: 16500,
    teatro_caupolican: 13000,
    teatro_coliseo: 13000,
    club_hipico: 13000
  },
  providencia: {
    movistar_arena: 18000,
    estadio_nacional: 15500,
    teatro_caupolican: 17000,
    teatro_coliseo: 16500,
    club_hipico: 17000
  },
  nunoa: {
    movistar_arena: 19000,
    estadio_nacional: 15000,
    teatro_caupolican: 18000,
    teatro_coliseo: 17500,
    club_hipico: 18000
  },
  las_condes: {
    movistar_arena: 24000,
    estadio_nacional: 20500,
    teatro_caupolican: 23000,
    teatro_coliseo: 22000,
    club_hipico: 23000
  },
  la_reina: {
    movistar_arena: 22500,
    estadio_nacional: 19000,
    teatro_caupolican: 21500,
    teatro_coliseo: 20500,
    club_hipico: 21500
  },
  penalolen: {
    movistar_arena: 22500,
    estadio_nacional: 18500,
    teatro_caupolican: 21500,
    teatro_coliseo: 20500,
    club_hipico: 21500
  },
  macul: {
    movistar_arena: 20000,
    estadio_nacional: 15500,
    teatro_caupolican: 19000,
    teatro_coliseo: 18500,
    club_hipico: 19000
  },
  estacion_central: {
    movistar_arena: 14500,
    estadio_nacional: 20000,
    teatro_caupolican: 14500,
    teatro_coliseo: 14500,
    club_hipico: 14000
  },
  independencia: {
    movistar_arena: 17500,
    estadio_nacional: 21000,
    teatro_caupolican: 16500,
    teatro_coliseo: 16500,
    club_hipico: 16500
  },
  recoleta: {
    movistar_arena: 18500,
    estadio_nacional: 22000,
    teatro_caupolican: 17500,
    teatro_coliseo: 17500,
    club_hipico: 17500
  }
};

const TARIFAS_REGRESO = {
  movistar_arena: {
    la_cisterna: 18000,
    san_miguel: 17000,
    la_florida: 23500,
    maipu: 22500,
    puente_alto: 27500,
    santiago_centro: 15500,
    providencia: 20000,
    nunoa: 21000,
    las_condes: 26000,
    la_reina: 24500,
    penalolen: 24500,
    macul: 22000,
    estacion_central: 16500,
    independencia: 19000,
    recoleta: 20000
  },
  estadio_nacional: {
    la_cisterna: 22000,
    san_miguel: 21000,
    la_florida: 18500,
    maipu: 27500,
    puente_alto: 24000,
    santiago_centro: 19000,
    providencia: 17500,
    nunoa: 17000,
    las_condes: 23000,
    la_reina: 21000,
    penalolen: 20500,
    macul: 18000,
    estacion_central: 22000,
    independencia: 23000,
    recoleta: 24000
  },
  teatro_caupolican: {
    la_cisterna: 17500,
    san_miguel: 16500,
    la_florida: 22000,
    maipu: 22000,
    puente_alto: 26500,
    santiago_centro: 14500,
    providencia: 19000,
    nunoa: 20000,
    las_condes: 25000,
    la_reina: 23500,
    penalolen: 23500,
    macul: 21000,
    estacion_central: 16500,
    independencia: 18500,
    recoleta: 19500
  },
  teatro_coliseo: {
    la_cisterna: 17500,
    san_miguel: 16500,
    la_florida: 22000,
    maipu: 22000,
    puente_alto: 26500,
    santiago_centro: 14500,
    providencia: 18500,
    nunoa: 19500,
    las_condes: 24500,
    la_reina: 23000,
    penalolen: 23000,
    macul: 20500,
    estacion_central: 16500,
    independencia: 18500,
    recoleta: 19500
  },
  club_hipico: {
    la_cisterna: 16500,
    san_miguel: 15500,
    la_florida: 23000,
    maipu: 20000,
    puente_alto: 26500,
    santiago_centro: 14000,
    providencia: 19000,
    nunoa: 20000,
    las_condes: 25000,
    la_reina: 23500,
    penalolen: 23500,
    macul: 21000,
    estacion_central: 16000,
    independencia: 18000,
    recoleta: 19000
  }
};
