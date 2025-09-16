// pages/api/beehiiv-subscribe.js
export default async function handler(req, res) {
  // 🔓 Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email é obrigatório' });
    }

    console.log('🚀 Iniciando inscrição Beehiiv:', email);

    // 🔑 Coloque sua API_KEY da Beehiiv no Vercel (Environment Variables)
    const API_KEY = process.env.BEEHIIV_API_KEY;
    const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!API_KEY) {
      console.error('❌ BEEHIIV_API_KEY não configurada');
      return res.status(500).json({ success: false, error: 'API key não configurada' });
    }

    if (!PUBLICATION_ID) {
      console.error('❌ BEEHIIV_PUBLICATION_ID não configurado');
      return res.status(500).json({ success: false, error: 'Publication ID não configurado' });
    }

    console.log('🔑 API Key configurada:', API_KEY.substring(0, 10) + '...');
    console.log('📋 Publication ID:', PUBLICATION_ID);

    const response = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    });

    const data = await response.json();

    console.log('📊 Resposta do Beehiiv:', response.status, response.statusText);
    console.log('📦 Dados:', data);

    if (!response.ok) {
      console.error('❌ Erro do Beehiiv:', data);
      return res.status(response.status).json({ success: false, error: data });
    }

    console.log('✅ Inscrição realizada com sucesso!');

    return res.status(200).json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      data,
    });
  } catch (err) {
    console.error('💥 Erro na inscrição:', err);
    return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
}
