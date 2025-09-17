export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Dados mockados para funcionar sem banco
      const mockData = [
        {
          id: '1',
          key: 'testo1k_title',
          title: 'Testo1k - O Guia Completo',
          content: 'Descubra os segredos do carnívorismo e transforme sua vida',
          type: 'text',
          page: 'testo1k',
          order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          key: 'testo1k_subtitle',
          title: 'Subtítulo Testo1k',
          content: 'Um guia completo sobre carnívorismo e filosofia de vida',
          type: 'text',
          page: 'testo1k',
          order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          key: 'testo1k_price',
          title: 'Preço Testo1k',
          content: 'R$ 97,00',
          type: 'price',
          page: 'testo1k',
          order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          key: 'landing_title',
          title: 'Título Landing',
          content: 'Transforme sua vida com o Testo1k',
          type: 'text',
          page: 'testo1k/landing',
          order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          key: 'landing_description',
          title: 'Descrição Landing',
          content: 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar',
          type: 'text',
          page: 'testo1k/landing',
          order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      return res.status(200).json({ 
        success: true, 
        data: mockData 
      });
    }

    if (req.method === 'POST') {
      const { key, title, content, type, page, order, is_active } = req.body;

      if (!key || !title || !content) {
        return res.status(400).json({ 
          success: false, 
          error: 'Key, title e content são obrigatórios' 
        });
      }

      // Simular criação
      const newItem = {
        id: Date.now().toString(),
        key,
        title,
        content,
        type: type || 'text',
        page: page || 'general',
        order: order || 1,
        is_active: is_active !== undefined ? is_active : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return res.status(201).json({ 
        success: true, 
        data: newItem 
      });
    }

    if (req.method === 'PUT') {
      const { id, key, title, content, type, page, order, is_active } = req.body;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'ID é obrigatório' 
        });
      }

      // Simular atualização
      const updatedItem = {
        id,
        key: key || 'content_block',
        title: title || 'Bloco de Conteúdo',
        content: content || 'Conteúdo do bloco',
        type: type || 'text',
        page: page || 'general',
        order: order || 1,
        is_active: is_active !== undefined ? is_active : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return res.status(200).json({ 
        success: true, 
        data: updatedItem 
      });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'ID é obrigatório' 
        });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Bloco de conteúdo deletado com sucesso' 
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: 'Método não permitido' 
    });

  } catch (error) {
    console.error('Erro interno:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}