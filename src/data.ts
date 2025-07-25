import { artefactos, temas, industrias } from './types';

export const artefactos: string[] = [
  "Formulario", "Encuesta", "Calendario", "Chat simulado", "Mapa",
  "Trivia", "Dashboard", "Tarjeta", "Juego de elecciones", "Timelapse",
  "Reto visual", "Panel de control", "Sistema de votos", "Mensaje cifrado",
  "Simulador de decisiones", "Scoreboard", "Rueda de opciones", "Sello digital",
  "Código QR", "Perfil falso", "Botón mágico", "Lista colaborativa", "Mosaico de usuarios",
  "Archivo compartido", "Selector aleatorio", "Detector de ánimo", "Nota de voz",
  "Termómetro social", "Interface", "Notificación"
];

export const temas: string[] = [
  "Opinión pública", "Confianza", "Tiempo libre", "Cuidado emocional", "Noticias locales",
  "Identidad", "Micro-hábitos", "Diversidad", "Dilemas éticos", "Memoria colectiva",
  "Inspiración", "Preferencias", "Votaciones simbólicas", "Secretos", "Decisiones grupales",
  "Reputación", "Celebraciones", "Humor", "Rituales digitales", "Colaboración",
  "Ayuda mutua", "Amistades digitales", "Fake news", "Creatividad", "Futuro del trabajo",
  "Peticiones ciudadanas", "Notas de voz", "Comunidad", "Fracasos", "Participación"
];

export const industrias: string[] = [
  "Educación digital", "Gobierno abierto", "Eventos", "Salud mental", "Periodismo",
  "Arte y cultura", "Cuidado comunitario", "Moda sustentable", "Activismo",
  "Investigación ciudadana", "Creators economy", "Diseño", "Ciudadanía digital",
  "Innovación pública", "Juegos sociales", "Entretenimiento", "Blockchain social",
  "Medios independientes", "Alimentación", "Voluntariado", "Transporte urbano",
  "Viajes y movilidad", "Seguridad barrial", "Comercio local", "Organizaciones civiles",
  "Economía informal", "Deportes comunitarios", "Coleccionismo digital",
  "Comunicación social", "Economía creativa"
];


export const getRandomElement = (type: 'artefacto' | 'tema' | 'industria'): string => {
  const sourceMap = {
    artefacto: artefactos,
    tema: temas,
    industria: industrias
  };
  
  const array = sourceMap[type];
  return array[Math.floor(Math.random() * array.length)];
};