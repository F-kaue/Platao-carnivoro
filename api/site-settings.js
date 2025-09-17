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
    console.error('Erro na API site-settings:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// GET - Buscar configurações
async function handleGet(req, res) {
  try {
    const { category, key } = req.query;

    let query = supabase.from('site_settings').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (key) {
      query = query.eq('key', key);
    }

    const { data, error } = await query.order('key');

    if (error) {
      throw error;
    }

    // Se buscar por key específica, retorna apenas o valor
    if (key && data.length > 0) {
      return res.status(200).json({
        success: true,
        data: data[0]
      });
    }

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar configurações',
      details: error.message
    });
  }
}

// POST - Criar nova configuração
async function handlePost(req, res) {
  try {
    const { key, value, description, category } = req.body;

    if (!key || !value) {
      return res.status(400).json({
        success: false,
        error: 'Key e value são obrigatórios'
      });
    }

    const { data, error } = await supabase
      .from('site_settings')
      .insert([{
        key,
        value,
        description: description || null,
        category: category || 'general'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      data,
      message: 'Configuração criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar configuração:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar configuração',
      details: error.message
    });
  }
}

// PUT - Atualizar configuração
async function handlePut(req, res) {
  try {
    const { id, key, value, description, category } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    const updateData = {};
    if (key) updateData.key = key;
    if (value) updateData.value = value;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;

    const { data, error } = await supabase
      .from('site_settings')
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
      message: 'Configuração atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar configuração',
      details: error.message
    });
  }
}

// DELETE - Deletar configuração
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
      .from('site_settings')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Configuração deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar configuração:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar configuração',
      details: error.message
    });
  }
}
