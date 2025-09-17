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
    console.error('Erro na API newsletter-benefits:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// GET - Buscar benefícios do newsletter
async function handleGet(req, res) {
  try {
    const { is_active } = req.query;

    let query = supabase.from('newsletter_benefits').select('*');

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
    console.error('Erro ao buscar benefícios:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar benefícios',
      details: error.message
    });
  }
}

// POST - Criar novo benefício
async function handlePost(req, res) {
  try {
    const { title, description, icon, position, is_active } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({
        success: false,
        error: 'Title, description e icon são obrigatórios'
      });
    }

    const { data, error } = await supabase
      .from('newsletter_benefits')
      .insert([{
        title,
        description,
        icon,
        position: position || 0,
        is_active: is_active !== undefined ? is_active : true
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      data,
      message: 'Benefício criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar benefício:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar benefício',
      details: error.message
    });
  }
}

// PUT - Atualizar benefício
async function handlePut(req, res) {
  try {
    const { id, title, description, icon, position, is_active } = req.body;

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
    if (position !== undefined) updateData.position = position;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabase
      .from('newsletter_benefits')
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
      message: 'Benefício atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar benefício:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar benefício',
      details: error.message
    });
  }
}

// DELETE - Deletar benefício
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
      .from('newsletter_benefits')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Benefício deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar benefício:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar benefício',
      details: error.message
    });
  }
}
