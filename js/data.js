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
  },
  santiago_centro: {
    movistar_arena: 15000,
    estadio_nacional: 18000,
    teatro_caupolican: 14000,
    teatro_coliseo: 14000,
    club_hipico: 14000
  },
  providencia: {
    movistar_arena: 20000,
    estadio_nacional: 17000,
    teatro_caupolican: 19000,
    teatro_coliseo: 18000,
    club_hipico: 19000
  },
  nunoa: {
    movistar_arena: 21000,
    estadio_nacional: 16000,
    teatro_caupolican: 20000,
    teatro_coliseo: 19000,
    club_hipico: 20000
  },
  las_condes: {
    movistar_arena: 27000,
    estadio_nacional: 23000,
    teatro_caupolican: 26000,
    teatro_coliseo: 25000,
    club_hipico: 26000
  },
  la_reina: {
    movistar_arena: 25000,
    estadio_nacional: 21000,
    teatro_caupolican: 24000,
    teatro_coliseo: 23000,
    club_hipico: 24000
  },
  penalolen: {
    movistar_arena: 25000,
    estadio_nacional: 20000,
    teatro_caupolican: 24000,
    teatro_coliseo: 23000,
    club_hipico: 24000
  },
  macul: {
    movistar_arena: 22000,
    estadio_nacional: 17000,
    teatro_caupolican: 21000,
    teatro_coliseo: 20000,
    club_hipico: 21000
  },
  estacion_central: {
    movistar_arena: 16000,
    estadio_nacional: 22000,
    teatro_caupolican: 16000,
    teatro_coliseo: 16000,
    club_hipico: 15000
  },
  independencia: {
    movistar_arena: 19000,
    estadio_nacional: 23000,
    teatro_caupolican: 18000,
    teatro_coliseo: 18000,
    club_hipico: 18000
  },
  recoleta: {
    movistar_arena: 20000,
    estadio_nacional: 24000,
    teatro_caupolican: 19000,
    teatro_coliseo: 19000,
    club_hipico: 19000
  }
};

const TARIFAS_REGRESO = {
  movistar_arena: {
    la_cisterna: 20000,
    san_miguel: 19000,
    la_florida: 26000,
    maipu: 25000,
    puente_alto: 30000,
    santiago_centro: 17000,
    providencia: 22000,
    nunoa: 23000,
    las_condes: 29000,
    la_reina: 27000,
    penalolen: 27000,
    macul: 24000,
    estacion_central: 18000,
    independencia: 21000,
    recoleta: 22000
  },
  estadio_nacional: {
    la_cisterna: 24000,
    san_miguel: 23000,
    la_florida: 20000,
    maipu: 30000,
    puente_alto: 26000,
    santiago_centro: 21000,
    providencia: 19000,
    nunoa: 18000,
    las_condes: 25000,
    la_reina: 23000,
    penalolen: 22000,
    macul: 19000,
    estacion_central: 24000,
    independencia: 25000,
    recoleta: 26000
  },
  teatro_caupolican: {
    la_cisterna: 19000,
    san_miguel: 18000,
    la_florida: 24000,
    maipu: 24000,
    puente_alto: 29000,
    santiago_centro: 16000,
    providencia: 21000,
    nunoa: 22000,
    las_condes: 28000,
    la_reina: 26000,
    penalolen: 26000,
    macul: 23000,
    estacion_central: 18000,
    independencia: 20000,
    recoleta: 21000
  },
  teatro_coliseo: {
    la_cisterna: 19000,
    san_miguel: 18000,
    la_florida: 24000,
    maipu: 24000,
    puente_alto: 29000,
    santiago_centro: 16000,
    providencia: 20000,
    nunoa: 21000,
    las_condes: 27000,
    la_reina: 25000,
    penalolen: 25000,
    macul: 22000,
    estacion_central: 18000,
    independencia: 20000,
    recoleta: 21000
  },
  club_hipico: {
    la_cisterna: 18000,
    san_miguel: 17000,
    la_florida: 25000,
    maipu: 22000,
    puente_alto: 29000,
    santiago_centro: 15000,
    providencia: 21000,
    nunoa: 22000,
    las_condes: 28000,
    la_reina: 26000,
    penalolen: 26000,
    macul: 23000,
    estacion_central: 17000,
    independencia: 19000,
    recoleta: 20000
  }
};
