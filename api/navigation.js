import { supabase } from '../src/integrations/supabase/client.js';

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
    const { method } = req;

    switch (method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Erro na API navigation:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// GET - Buscar links de navegação
async function handleGet(req, res) {
  try {
    const { location, is_active } = req.query;

    let query = supabase.from('navigation_links').select('*');

    if (location) {
      query = query.eq('location', location);
    }

    if (is_active !== undefined) {
      query = query.eq('is_active', is_active === 'true');
    }

    const { data, error } = await query.order('position');

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erro ao buscar links:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar links',
      details: error.message
    });
  }
}

// POST - Criar novo link
async function handlePost(req, res) {
  try {
    const { title, url, icon, position, location, is_active, target_blank } = req.body;

    if (!title || !url || !location) {
      return res.status(400).json({
        success: false,
        error: 'Title, url e location são obrigatórios'
      });
    }

    const { data, error } = await supabase
      .from('navigation_links')
      .insert([{
        title,
        url,
        icon: icon || null,
        position: position || 0,
        location,
        is_active: is_active !== undefined ? is_active : true,
        target_blank: target_blank || false
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      data,
      message: 'Link criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar link:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar link',
      details: error.message
    });
  }
}

// PUT - Atualizar link
async function handlePut(req, res) {
  try {
    const { id, title, url, icon, position, location, is_active, target_blank } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (url) updateData.url = url;
    if (icon !== undefined) updateData.icon = icon;
    if (position !== undefined) updateData.position = position;
    if (location) updateData.location = location;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (target_blank !== undefined) updateData.target_blank = target_blank;

    const { data, error } = await supabase
      .from('navigation_links')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      data,
      message: 'Link atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar link:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar link',
      details: error.message
    });
  }
}

// DELETE - Deletar link
async function handleDelete(req, res) {
  try {
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
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Link deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar link:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar link',
      details: error.message
    });
  }
}
