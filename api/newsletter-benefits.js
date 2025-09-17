import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://ylkitmkjcmvtkgzxapcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2l0bWtqY212dGtnenhhcGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDg1MjYsImV4cCI6MjA3MjkyNDUyNn0.ofHoaODiDXVli1tf7UvIM_GmdfJ1vY6XNyt_uHlAie4"
);

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
      const { is_active } = req.query;

      try {
        let query = supabase.from('newsletter_benefits').select('*');

        if (is_active !== undefined) {
          query = query.eq('is_active', is_active === 'true');
        }

        const { data, error } = await query.order('order');

        if (error) {
          console.error('Erro ao buscar benefícios:', error);
          // Fallback para dados mockados
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

          // Filtrar dados mockados se necessário
          let filteredData = mockData;
          if (is_active !== undefined) {
            filteredData = mockData.filter(item => item.is_active === (is_active === 'true'));
          }

          return res.status(200).json({ 
            success: true, 
            data: filteredData 
          });
        }

        return res.status(200).json({ 
          success: true, 
          data: data || [] 
        });
      } catch (dbError) {
        console.error('Erro de conexão com banco:', dbError);
        // Fallback para dados mockados
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
          }
        ];

        return res.status(200).json({ 
          success: true, 
          data: mockData 
        });
      }
    }

    if (req.method === 'POST') {
      const { title, description, icon, order, is_active } = req.body;

      if (!title || !description) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title e description são obrigatórios' 
        });
      }

      const { data, error } = await supabase
        .from('newsletter_benefits')
        .insert([{
          title,
          description,
          icon: icon || 'Star',
          order: order || 1,
          is_active: is_active !== undefined ? is_active : true
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar benefício:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao criar benefício',
          details: error.message 
        });
      }

      return res.status(201).json({ 
        success: true, 
        data,
        message: 'Benefício criado com sucesso' 
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

      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (icon) updateData.icon = icon;
      if (order !== undefined) updateData.order = order;
      if (is_active !== undefined) updateData.is_active = is_active;

      const { data, error } = await supabase
        .from('newsletter_benefits')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar benefício:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao atualizar benefício',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data,
        message: 'Benefício atualizado com sucesso' 
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

      const { error } = await supabase
        .from('newsletter_benefits')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar benefício:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao deletar benefício',
          details: error.message 
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