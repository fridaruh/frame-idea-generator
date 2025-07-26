const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateMiniAppIdeas(artefacto: string, tema: string, industria: string): Promise<string[]> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `Hay un ${artefacto.toLowerCase()} en el contexto de ${tema.toLowerCase()} que impacta en ${industria.toLowerCase()}. ¿Qué es? Imagina que es una mini-app para Farcaster. Dame 3 ideas viables, claras y cortas.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente experto creador de mini-apps en Frame Protocol. Las mini-apps son aplicaciones web que se ejecutan dentro de clientes de Farcaster y pueden usar el SDK para acceder a características nativas como autenticación, notificaciones e interacción con wallets.

Limitantes técnicas de Mini Apps:
- Son aplicaciones web estándar (HTML, CSS, JavaScript)
- Pueden usar React y otros frameworks web
- Acceso al SDK de Farcaster para funcionalidades nativas
- Pueden integrarse con wallets y realizar transacciones
- Soporte para autenticación con Farcaster
- Pueden enviar notificaciones a usuarios

Estas aplicaciones deben de ser viables para ser construidas en un máximo de 4 horas por principiantes
No puedes utilizar servicios de geolocalización complejos
Mantén las funcionalidades de audio/video simples

Limitantes de contenido:
No debes usar datos personales sensibles
No apostar/gambling
No ser mediocres con casos de uso obvios: NFT básicos, generación de tokens simples
Ser creativos para transformar la industria, no sólo juegos básicos
Mantener viabilidad técnica (no ciencia ficción)
Deben hacer sentido dentro del contexto de una red social descentralizada
No puede ser nada de créditos perpetuos

Todas las ideas que das sobre qué mini-apps hacer son cada idea de máximo 50 palabras. Responde SOLO con las 3 ideas numeradas, sin texto adicional.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the numbered list into individual ideas
    const ideas = content
      .split(/\d+\.\s*/)
      .filter((idea: string) => idea.trim().length > 0)
      .map((idea: string) => idea.trim());

    return ideas;
  } catch (error) {
    console.error('Error generating ideas:', error);
    throw error;
  }
}