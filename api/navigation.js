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
          title: 'Início',
          url: '/',
          icon: 'Home',
          position: 'header',
          order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Testo1k',
          url: '/testo1k',
          icon: 'Book',
          position: 'header',
          order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Admin',
          url: '/admin',
          icon: 'Settings',
          position: 'header',
          order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Instagram',
          url: 'https://instagram.com/plataocarnivoro',
          icon: 'Instagram',
          position: 'social',
          order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          title: 'YouTube',
          url: 'https://youtube.com/@plataocarnivoro',
          icon: 'Youtube',
          position: 'social',
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
      const { title, url, icon, position, order, is_active } = req.body;

      if (!title || !url) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title e url são obrigatórios' 
        });
      }

      // Simular criação
      const newItem = {
        id: Date.now().toString(),
        title,
        url,
        icon: icon || 'Link',
        position: position || 'header',
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
      const { id, title, url, icon, position, order, is_active } = req.body;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'ID é obrigatório' 
        });
      }

      // Simular atualização
      const updatedItem = {
        id,
        title: title || 'Link',
        url: url || '/',
        icon: icon || 'Link',
        position: position || 'header',
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
        message: 'Link deletado com sucesso' 
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