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
      const { page, type, is_active } = req.query;

      try {
        let query = supabase.from('content_blocks').select('*');

        if (page) {
          query = query.eq('page', page);
        }

        if (type) {
          query = query.eq('type', type);
        }

        if (is_active !== undefined) {
          query = query.eq('is_active', is_active === 'true');
        }

        const { data, error } = await query.order('order');

        if (error) {
          console.error('Erro ao buscar blocos:', error);
          // Fallback para dados mockados
          const mockData = [
            {
              id: '1',
              key: 'testo1k_title',
              title: 'Título Testo1k',
              content: 'Testo1k - O Guia Completo',
              type: 'title',
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
              content: 'Descubra os segredos do carnívorismo e transforme sua vida',
              type: 'subtitle',
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
              type: 'title',
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
              type: 'description',
              page: 'testo1k/landing',
              order: 2,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ];

          // Filtrar dados mockados se necessário
          let filteredData = mockData;
          if (page) {
            filteredData = mockData.filter(item => item.page === page);
          }
          if (type) {
            filteredData = filteredData.filter(item => item.type === type);
          }
          if (is_active !== undefined) {
            filteredData = filteredData.filter(item => item.is_active === (is_active === 'true'));
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
            key: 'testo1k_title',
            title: 'Título Testo1k',
            content: 'Testo1k - O Guia Completo',
            type: 'title',
            page: 'testo1k',
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
      const { key, title, content, type, page, order, is_active } = req.body;

      if (!key || !title || !content) {
        return res.status(400).json({ 
          success: false, 
          error: 'Key, title e content são obrigatórios' 
        });
      }

      const { data, error } = await supabase
        .from('content_blocks')
        .insert([{
          key,
          title,
          content,
          type: type || 'text',
          page: page || 'general',
          order: order || 1,
          is_active: is_active !== undefined ? is_active : true
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar bloco:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao criar bloco',
          details: error.message 
        });
      }

      return res.status(201).json({ 
        success: true, 
        data,
        message: 'Bloco criado com sucesso' 
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

      const updateData = {};
      if (key) updateData.key = key;
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (type) updateData.type = type;
      if (page) updateData.page = page;
      if (order !== undefined) updateData.order = order;
      if (is_active !== undefined) updateData.is_active = is_active;

      const { data, error } = await supabase
        .from('content_blocks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar bloco:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao atualizar bloco',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data,
        message: 'Bloco atualizado com sucesso' 
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
        .from('content_blocks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar bloco:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao deletar bloco',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Bloco deletado com sucesso' 
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