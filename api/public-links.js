// API para servir links públicos para todos os usuários
export default async function handler(req, res) {
  // Configurar CORS para permitir acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Links padrão que funcionam para todos os usuários
      const defaultLinks = {
        instagram: {
          id: 'instagram',
          name: 'Instagram',
          description: 'Link do botão "SEGUIR E JUNTAR-SE À REVOLUÇÃO"',
          url: 'https://www.instagram.com/plataocarnivoro/',
          icon: 'instagram',
          category: 'social'
        },
        testo1k: {
          id: 'testo1k-product',
          name: 'Testo1k - Produto',
          description: 'Link para TODOS os botões da landing page (/testo1k/landing)',
          url: 'https://chk.eduzz.com/Z0BBQ1360A?a=35814376',
          icon: 'shopping-bag',
          category: 'product'
        }
      };

      return res.status(200).json({
        success: true,
        data: defaultLinks
      });

    } catch (error) {
      console.error('Erro ao buscar links públicos:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { links } = req.body;
      
      // Aqui você pode salvar no banco de dados ou outro sistema
      // Por enquanto, vamos simular o salvamento
      console.log('Links atualizados:', links);
      
      return res.status(200).json({
        success: true,
        message: 'Links atualizados com sucesso',
        data: links
      });

    } catch (error) {
      console.error('Erro ao salvar links:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao salvar links'
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Método não permitido'
  });
}
