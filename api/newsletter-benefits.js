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
          title: 'Conteúdo Exclusivo',
          description: 'Receba artigos e insights exclusivos sobre carnívorismo e filosofia',
          icon: 'BookOpen',
          order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Dicas Práticas',
          description: 'Dicas práticas para implementar o estilo de vida carnívoro',
          icon: 'Lightbulb',
          order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Comunidade',
          description: 'Faça parte de uma comunidade de pessoas com ideais similares',
          icon: 'Users',
          order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Suporte',
          description: 'Suporte direto para suas dúvidas sobre carnívorismo',
          icon: 'MessageCircle',
          order: 4,
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
      const { title, description, icon, order, is_active } = req.body;

      if (!title || !description) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title e description são obrigatórios' 
        });
      }

      // Simular criação
      const newItem = {
        id: Date.now().toString(),
        title,
        description,
        icon: icon || 'Star',
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
      const { id, title, description, icon, order, is_active } = req.body;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'ID é obrigatório' 
        });
      }

      // Simular atualização
      const updatedItem = {
        id,
        title: title || 'Benefício',
        description: description || 'Descrição do benefício',
        icon: icon || 'Star',
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
        message: 'Benefício deletado com sucesso' 
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