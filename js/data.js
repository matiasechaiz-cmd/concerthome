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
    movistar_arena: 19490,
    estadio_nacional: 23490,
    teatro_caupolican: 18490,
    teatro_coliseo: 18490,
    club_hipico: 17490
  },
  san_miguel: {
    movistar_arena: 18490,
    estadio_nacional: 22490,
    teatro_caupolican: 17490,
    teatro_coliseo: 17490,
    club_hipico: 16990
  },
  la_florida: {
    movistar_arena: 24990,
    estadio_nacional: 19490,
    teatro_caupolican: 22990,
    teatro_coliseo: 22990,
    club_hipico: 23990
  },
  maipu: {
    movistar_arena: 23490,
    estadio_nacional: 28490,
    teatro_caupolican: 22490,
    teatro_coliseo: 22490,
    club_hipico: 21490
  },
  puente_alto: {
    movistar_arena: 27990,
    estadio_nacional: 24490,
    teatro_caupolican: 26990,
    teatro_coliseo: 26990,
    club_hipico: 27990
  },
  santiago_centro: {
    movistar_arena: 16990,
    estadio_nacional: 19490,
    teatro_caupolican: 15990,
    teatro_coliseo: 15990,
    club_hipico: 15990
  },
  providencia: {
    movistar_arena: 20990,
    estadio_nacional: 18490,
    teatro_caupolican: 19990,
    teatro_coliseo: 19490,
    club_hipico: 19990
  },
  nunoa: {
    movistar_arena: 21990,
    estadio_nacional: 17990,
    teatro_caupolican: 20990,
    teatro_coliseo: 20490,
    club_hipico: 20990
  },
  las_condes: {
    movistar_arena: 26990,
    estadio_nacional: 23490,
    teatro_caupolican: 25990,
    teatro_coliseo: 24990,
    club_hipico: 25990
  },
  la_reina: {
    movistar_arena: 25490,
    estadio_nacional: 21990,
    teatro_caupolican: 24490,
    teatro_coliseo: 23490,
    club_hipico: 24490
  },
  penalolen: {
    movistar_arena: 25490,
    estadio_nacional: 21490,
    teatro_caupolican: 24490,
    teatro_coliseo: 23490,
    club_hipico: 24490
  },
  macul: {
    movistar_arena: 22990,
    estadio_nacional: 18490,
    teatro_caupolican: 21990,
    teatro_coliseo: 21490,
    club_hipico: 21990
  },
  estacion_central: {
    movistar_arena: 17490,
    estadio_nacional: 22990,
    teatro_caupolican: 17490,
    teatro_coliseo: 17490,
    club_hipico: 16990
  },
  independencia: {
    movistar_arena: 20490,
    estadio_nacional: 23990,
    teatro_caupolican: 19490,
    teatro_coliseo: 19490,
    club_hipico: 19490
  },
  recoleta: {
    movistar_arena: 21490,
    estadio_nacional: 24990,
    teatro_caupolican: 20490,
    teatro_coliseo: 20490,
    club_hipico: 20490
  }
};

const TARIFAS_REGRESO = {
  movistar_arena: {
    la_cisterna: 20990,
    san_miguel: 19990,
    la_florida: 26490,
    maipu: 25490,
    puente_alto: 30490,
    santiago_centro: 18490,
    providencia: 22990,
    nunoa: 23990,
    las_condes: 28990,
    la_reina: 27490,
    penalolen: 27490,
    macul: 24990,
    estacion_central: 19490,
    independencia: 21990,
    recoleta: 22990
  },
  estadio_nacional: {
    la_cisterna: 24990,
    san_miguel: 23990,
    la_florida: 21490,
    maipu: 30490,
    puente_alto: 26990,
    santiago_centro: 21990,
    providencia: 20490,
    nunoa: 19990,
    las_condes: 25990,
    la_reina: 23990,
    penalolen: 23490,
    macul: 20990,
    estacion_central: 24990,
    independencia: 25990,
    recoleta: 26990
  },
  teatro_caupolican: {
    la_cisterna: 20490,
    san_miguel: 19490,
    la_florida: 24990,
    maipu: 24990,
    puente_alto: 29490,
    santiago_centro: 17490,
    providencia: 21990,
    nunoa: 22990,
    las_condes: 27990,
    la_reina: 26490,
    penalolen: 26490,
    macul: 23990,
    estacion_central: 19490,
    independencia: 21490,
    recoleta: 22490
  },
  teatro_coliseo: {
    la_cisterna: 20490,
    san_miguel: 19490,
    la_florida: 24990,
    maipu: 24990,
    puente_alto: 29490,
    santiago_centro: 17490,
    providencia: 21490,
    nunoa: 22490,
    las_condes: 27490,
    la_reina: 25990,
    penalolen: 25990,
    macul: 23490,
    estacion_central: 19490,
    independencia: 21490,
    recoleta: 22490
  },
  club_hipico: {
    la_cisterna: 19490,
    san_miguel: 18490,
    la_florida: 25990,
    maipu: 22990,
    puente_alto: 29490,
    santiago_centro: 16990,
    providencia: 21990,
    nunoa: 22990,
    las_condes: 27990,
    la_reina: 26490,
    penalolen: 26490,
    macul: 23990,
    estacion_central: 18990,
    independencia: 20990,
    recoleta: 21990
  }
};
