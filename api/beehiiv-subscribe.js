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

    // Lista de Publication IDs para testar (caso o principal não funcione)
    const possiblePublicationIds = [
      publicationId,
      `pub_${publicationId}`,
      `pub-${publicationId}`,
      publicationId.replace(/-/g, ''),
      'a719f540-5634-4fa5-96d4-527f8dcde0a3', // ID anterior
      `pub_a719f540-5634-4fa5-96d4-527f8dcde0a3` // ID anterior com prefixo
    ];

    // Payload para o Beehiiv (formato simplificado)
    const payload = {
      email: email
    };

    // Tentar diferentes Publication IDs até encontrar um que funcione
    for (let i = 0; i < possiblePublicationIds.length; i++) {
      const testPublicationId = possiblePublicationIds[i];
      const beehiivUrl = `https://api.beehiiv.com/v1/publications/${testPublicationId}/subscriptions`;

      console.log(`Tentativa ${i + 1}/${possiblePublicationIds.length} - Testando Publication ID:`, testPublicationId);
      console.log('URL:', beehiivUrl);

      try {
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

        console.log(`Resposta para Publication ID ${testPublicationId}:`, {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });

        if (response.ok) {
          console.log(`✅ SUCESSO! Publication ID correto encontrado: ${testPublicationId}`);
          return res.status(200).json({
            success: true,
            message: 'Inscrição realizada com sucesso!',
            data: responseData,
            publicationId: testPublicationId
          });
        } else if (response.status === 404) {
          console.log(`❌ Publication ID ${testPublicationId} não encontrado, tentando próximo...`);
          continue; // Tentar próximo Publication ID
        } else {
          // Outros erros (400, 401, 422, etc.)
          console.error('Erro do Beehiiv:', {
            publicationId: testPublicationId,
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
          } else if (response.status === 422) {
            errorMessage = responseData.message || 'Email já está inscrito ou inválido';
          }
          
          return res.status(response.status).json({
            success: false,
            error: errorMessage,
            details: responseData,
            status: response.status,
            publicationId: testPublicationId
          });
        }
      } catch (fetchError) {
        console.error(`Erro de rede para Publication ID ${testPublicationId}:`, fetchError);
        continue; // Tentar próximo Publication ID
      }
    }

    // Se chegou aqui, nenhum Publication ID funcionou
    console.error('❌ Nenhum Publication ID funcionou!');
    return res.status(404).json({
      success: false,
      error: 'Nenhuma publicação encontrada com os IDs testados',
      details: {
        testedIds: possiblePublicationIds,
        message: 'Verifique se o Publication ID está correto no painel do Beehiiv'
      }
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
}