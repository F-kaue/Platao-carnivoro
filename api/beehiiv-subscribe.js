export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // Configurações do Beehiiv
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    if (!publicationId || !apiKey) {
      console.error('Variáveis de ambiente não configuradas:', {
        publicationId: !!publicationId,
        apiKey: !!apiKey
      });
      return res.status(500).json({ error: 'Configuração do servidor incompleta' });
    }

    // URL da API do Beehiiv
    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

    // Payload para o Beehiiv
    const payload = {
      email: email,
      send_welcome_email: true,
      utm_source: 'platao-carnivoro',
      utm_medium: 'website',
      utm_campaign: 'newsletter'
    };

    console.log('Enviando para Beehiiv:', {
      url: beehiivUrl,
      email: email,
      publicationId: publicationId
    });

    // Fazer a requisição para o Beehiiv
    const response = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();

    console.log('Resposta do Beehiiv:', {
      status: response.status,
      data: responseData
    });

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Inscrição realizada com sucesso!',
        data: responseData
      });
    } else {
      console.error('Erro do Beehiiv:', responseData);
      return res.status(response.status).json({
        success: false,
        error: responseData.message || 'Erro ao inscrever no newsletter',
        details: responseData
      });
    }

  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
}