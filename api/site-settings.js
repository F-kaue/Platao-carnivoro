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
          key: 'site_title',
          value: 'Platão Carnívoro',
          description: 'Título principal do site',
          category: 'general',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          key: 'site_description',
          value: 'Filosofia, Carnivorismo e Desenvolvimento Pessoal',
          description: 'Descrição do site',
          category: 'general',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          key: 'contact_email',
          value: 'plataocarnivoro@gmail.com',
          description: 'Email de contato',
          category: 'contact',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          key: 'hero_title',
          value: 'Mantenha suas Raízes',
          description: 'Título da seção hero',
          category: 'content',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          key: 'hero_subtitle',
          value: 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo',
          description: 'Subtítulo da seção hero',
          category: 'content',
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
      const { key, value, description, category } = req.body;

      if (!key || !value) {
        return res.status(400).json({ 
          success: false, 
          error: 'Key e value são obrigatórios' 
        });
      }

      // Simular criação
      const newItem = {
        id: Date.now().toString(),
        key,
        value,
        description,
        category: category || 'general',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return res.status(201).json({ 
        success: true, 
        data: newItem 
      });
    }

    if (req.method === 'PUT') {
      const { id, key, value, description, category } = req.body;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'ID é obrigatório' 
        });
      }

      // Simular atualização
      const updatedItem = {
        id,
        key: key || 'site_title',
        value: value || 'Platão Carnívoro',
        description: description || 'Título principal do site',
        category: category || 'general',
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
        message: 'Configuração deletada com sucesso' 
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