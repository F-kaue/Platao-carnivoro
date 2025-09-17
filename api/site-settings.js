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
        console.error('Erro ao buscar configurações:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao buscar configurações',
          details: error.message 
        });
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
        data: data || [] 
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
        console.error('Erro ao criar configuração:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao criar configuração',
          details: error.message 
        });
      }

      return res.status(201).json({ 
        success: true, 
        data,
        message: 'Configuração criada com sucesso' 
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
        console.error('Erro ao atualizar configuração:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao atualizar configuração',
          details: error.message 
        });
      }

      return res.status(200).json({ 
        success: true, 
        data,
        message: 'Configuração atualizada com sucesso' 
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
        .from('site_settings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar configuração:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Erro ao deletar configuração',
          details: error.message 
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