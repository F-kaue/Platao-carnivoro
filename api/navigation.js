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
      const { position, is_active } = req.query;

      let query = supabase.from('navigation_links').select('*');

      if (position) {
        query = query.eq('position', position);
      }

      if (is_active !== undefined) {
        query = query.eq('is_active', is_active === 'true');
      }

      const { data, error } = await query.order('order');

      if (error) {
        console.error('Erro ao buscar links:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao buscar links',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data: data || [] 
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

      const { data, error } = await supabase
        .from('navigation_links')
        .insert([{
          title,
          url,
          icon: icon || 'Link',
          position: position || 'header',
          order: order || 1,
          is_active: is_active !== undefined ? is_active : true
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar link:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao criar link',
          details: error.message 
        });
      }

      return res.status(201).json({ 
        success: true, 
        data,
        message: 'Link criado com sucesso' 
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

      const updateData = {};
      if (title) updateData.title = title;
      if (url) updateData.url = url;
      if (icon) updateData.icon = icon;
      if (position) updateData.position = position;
      if (order !== undefined) updateData.order = order;
      if (is_active !== undefined) updateData.is_active = is_active;

      const { data, error } = await supabase
        .from('navigation_links')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar link:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao atualizar link',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data,
        message: 'Link atualizado com sucesso' 
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
        .from('navigation_links')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar link:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao deletar link',
          details: error.message 
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