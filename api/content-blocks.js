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
    console.error('Erro na API content-blocks:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
}

// GET - Buscar blocos de conteúdo
async function handleGet(req, res) {
  try {
    const { section, key, is_active } = req.query;

    let query = supabase.from('content_blocks').select('*');

    if (section) {
      query = query.eq('section', section);
    }

    if (key) {
      query = query.eq('key', key);
    }

    if (is_active !== undefined) {
      query = query.eq('is_active', is_active === 'true');
    }

    const { data, error } = await query.order('key');

    if (error) {
      throw error;
    }

    // Se buscar por key específica, retorna apenas o conteúdo
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
    console.error('Erro ao buscar blocos de conteúdo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar blocos de conteúdo',
      details: error.message
    });
  }
}

// POST - Criar novo bloco de conteúdo
async function handlePost(req, res) {
  try {
    const { key, title, content, type, section, is_active } = req.body;

    if (!key || !content || !section) {
      return res.status(400).json({
        success: false,
        error: 'Key, content e section são obrigatórios'
      });
    }

    const { data, error } = await supabase
      .from('content_blocks')
      .insert([{
        key,
        title: title || null,
        content,
        type: type || 'text',
        section,
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
      message: 'Bloco de conteúdo criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar bloco de conteúdo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar bloco de conteúdo',
      details: error.message
    });
  }
}

// PUT - Atualizar bloco de conteúdo
async function handlePut(req, res) {
  try {
    const { id, key, title, content, type, section, is_active } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    const updateData = {};
    if (key) updateData.key = key;
    if (title !== undefined) updateData.title = title;
    if (content) updateData.content = content;
    if (type) updateData.type = type;
    if (section) updateData.section = section;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabase
      .from('content_blocks')
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
      message: 'Bloco de conteúdo atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar bloco de conteúdo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar bloco de conteúdo',
      details: error.message
    });
  }
}

// DELETE - Deletar bloco de conteúdo
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
      .from('content_blocks')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: 'Bloco de conteúdo deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar bloco de conteúdo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar bloco de conteúdo',
      details: error.message
    });
  }
}
