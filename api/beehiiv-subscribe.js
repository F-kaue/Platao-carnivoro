// api/beehiiv-subscribe.js - Vercel Serverless Function
export default async function handler(req, res) {
  // Configurar CORS para todos os domínios
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'CORS preflight' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método não permitido' 
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email é obrigatório' 
      });
    }

    console.log('🚀 Iniciando inscrição Beehiiv via Vercel API:', email);

    // API Key e Publication ID das variáveis de ambiente
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const PUBLICATION_ID = process.env.PUBLICATION_ID;

    if (!BEEHIIV_API_KEY) {
      console.error('❌ BEEHIIV_API_KEY não configurada');
      return res.status(500).json({ 
        success: false, 
        error: 'API key não configurada' 
      });
    }

    if (!PUBLICATION_ID) {
      console.error('❌ PUBLICATION_ID não configurado');
      return res.status(500).json({ 
        success: false, 
        error: 'Publication ID não configurado' 
      });
    }

    console.log('🔑 API Key configurada:', BEEHIIV_API_KEY.substring(0, 10) + '...');
    console.log('📋 Publication ID:', PUBLICATION_ID);

    // Fazer requisição para a API do Beehiiv
    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          send_welcome_email: true
        })
      }
    );

    const data = await beehiivResponse.json();

    console.log('📊 Resposta do Beehiiv:', beehiivResponse.status, beehiivResponse.statusText);
    console.log('📦 Dados:', data);

    if (!beehiivResponse.ok) {
      console.error('❌ Erro do Beehiiv:', data);
      return res.status(beehiivResponse.status).json({ 
        success: false, 
        error: data.message || `Erro ${beehiivResponse.status}: ${beehiivResponse.statusText}`,
        data: data
      });
    }

    console.log('✅ Inscrição realizada com sucesso!');

    return res.status(200).json({ 
      success: true, 
      message: 'Inscrição realizada com sucesso!',
      data: {
        email,
        publication_id: PUBLICATION_ID,
        beehiiv_response: data
      }
    });

  } catch (error) {
    console.error('💥 Erro no servidor Vercel:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno no servidor',
      details: error.message
    });
  }
}
