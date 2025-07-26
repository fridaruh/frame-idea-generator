# 🚀 Frame Idea Generator - Farcaster Mini App

Una mini-aplicación para Farcaster que genera ideas creativas para mini-apps combinando elementos aleatorios de tres categorías: artefactos, temas e industrias.


## ✨ Características

- 🎲 **Generación Aleatoria**: Combina 30 artefactos, 30 temas y 30 industrias
- 🔒 **Sistema de Bloqueo**: Fija elementos específicos mientras generas nuevas combinaciones
- 🤖 **IA Integrada**: Usa OpenAI GPT-4o-mini para generar ideas detalladas
- 📱 **Responsive**: Funciona perfectamente en móvil y desktop
- ⚡ **Interacciones**: Doble toque (móvil) y barra espaciadora (desktop) para generar

## 🛠 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **SDK**: @farcaster/miniapp-sdk
- **IA**: OpenAI GPT-4o-mini
- **Despliegue**: Compatible con Vercel, Netlify, etc.

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- API Key de OpenAI (opcional, para generación de ideas)

### Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/fridaruh/frame-idea-generator
   cd frame-idea-miniapp
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env.local
   VITE_OPENAI_API_KEY=tu_api_key_aqui
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

## 📱 Uso como Mini-App de Farcaster

### Compartir en Feeds

1. **Método Simple**: Comparte la URL directamente en cualquier cast
2. **Embed Automático**: La URL se convertirá en un embed rico interactivo
3. **Un Clic**: Los usuarios pueden abrir la mini-app directamente desde el feed

### Configuración para Farcaster

El proyecto ya incluye:
- ✅ Metadatos `fc:miniapp` y `fc:frame` 
- ✅ Imágenes optimizadas (icon, splash, og-image)
- ✅ SDK de Farcaster integrado
- ✅ Detección automática de contexto

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ElementBlock.tsx    # Bloques de elementos
│   ├── IdeasView.tsx       # Vista de ideas generadas
│   ├── InitialPopup.tsx    # Popup inicial
│   ├── Instructions.tsx    # Instrucciones de uso
│   └── PromptDisplay.tsx   # Display del prompt
├── hooks/               # Hooks personalizados
│   ├── useKeyboard.ts      # Manejo de teclado
│   ├── useOrientationRefresh.ts # Refresh por orientación
│   └── useSwipeGesture.ts  # Gestos táctiles
├── services/            # Servicios externos
│   └── openai.ts           # Integración con OpenAI
├── data.ts              # Datos de elementos
├── types.ts             # Tipos TypeScript
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## 🎨 Personalización

### Modificar Elementos

Edita `src/data.ts` para cambiar los elementos disponibles:

```typescript
export const elementos = {
  artefacto: [
    'Tu nuevo artefacto',
    // ... más elementos
  ],
  tema: [
    'Tu nuevo tema',
    // ... más elementos  
  ],
  industria: [
    'Tu nueva industria',
    // ... más elementos
  ]
};
```

### Cambiar Colores

Los colores están definidos en Tailwind CSS:
- **Artefacto**: `bg-[#003049]` (Azul marino)
- **Tema**: `bg-[#f77f00]` (Naranja)
- **Industria**: `bg-[#d62828]` (Rojo)

### Personalizar IA

Modifica el prompt en `src/services/openai.ts`:

```typescript
const systemPrompt = "Tu prompt personalizado aquí...";
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `VITE_OPENAI_API_KEY`
3. Despliega automáticamente

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Configura variables de entorno

### Otros Proveedores

El proyecto es compatible con cualquier servicio que soporte sitios estáticos.

## 🔧 Configuración Avanzada

### Manifest de Farcaster

Para aparecer en búsquedas de Farcaster:

1. Ve a [https://farcaster.xyz/~/developers/mini-apps/manifest](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Ingresa tu dominio y detalles
3. Configura el redirect en tu servidor

### Analytics

Puedes integrar analytics desde el dashboard de desarrolladores de Farcaster.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Reconocimientos

- [Farcaster](https://farcaster.xyz) por la plataforma de Mini Apps
- [OpenAI](https://openai.com) por la API de generación de texto
- [Lucide](https://lucide.dev) por los iconos
- [Tailwind CSS](https://tailwindcss.com) por los estilos

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un issue en GitHub
- Contacta en Farcaster: @FridaRuh

---

**¡Hecho con ❤️ para la comunidad de Farcaster!**

