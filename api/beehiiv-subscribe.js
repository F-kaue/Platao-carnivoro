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

    // Configurações do Beehiiv (atualizadas)
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID || '5951e46f-6568-49e6-9f88-9a882ecd001d';
    const apiKey = process.env.BEEHIIV_API_KEY || 'LF0v80f4yQNRrToqiBw7aM17eEOp7HJbhVIoXe6Tb9mupF90SI1jZv3QLXLzOR9L';

    console.log('Configurações do Beehiiv:', {
      publicationId: publicationId,
      apiKeyLength: apiKey ? apiKey.length : 0,
      hasApiKey: !!apiKey
    });

    // URL da API do Beehiiv (tentando v1 primeiro)
    const beehiivUrl = `https://api.beehiiv.com/v1/publications/${publicationId}/subscriptions`;

    // Payload para o Beehiiv (formato simplificado)
    const payload = {
      email: email
    };

    console.log('Enviando para Beehiiv:', {
      url: beehiivUrl,
      email: email,
      publicationId: publicationId,
      payload: payload,
      headers: {
        'Authorization': `Bearer ${apiKey.substring(0, 10)}...`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      responseData = { error: 'Resposta inválida do servidor' };
    }

    console.log('Resposta do Beehiiv:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData
    });

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Inscrição realizada com sucesso!',
        data: responseData
      });
    } else {
      console.error('Erro do Beehiiv:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      
      // Tratar erros específicos
      let errorMessage = 'Erro ao inscrever no newsletter';
      if (response.status === 400) {
        errorMessage = responseData.message || 'Dados inválidos enviados';
      } else if (response.status === 401) {
        errorMessage = 'Chave de API inválida';
      } else if (response.status === 404) {
        errorMessage = 'Publicação não encontrada';
      } else if (response.status === 422) {
        errorMessage = responseData.message || 'Email já está inscrito ou inválido';
      }
      
      return res.status(response.status).json({
        success: false,
        error: errorMessage,
        details: responseData,
        status: response.status
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