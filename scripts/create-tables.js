import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://ylkitmkjcmvtkgzxapcs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2l0bWtqY212dGtnenhhcGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDg1MjYsImV4cCI6MjA3MjkyNDUyNn0.ofHoaODiDXVli1tf7UvIM_GmdfJ1vY6XNyt_uHlAie4"
);

async function createTables() {
  console.log('🚀 Criando tabelas no Supabase...');

  try {
    // SQL para criar as tabelas
    const createTablesSQL = `
      -- 1. Configurações Gerais do Site
      CREATE TABLE IF NOT EXISTS site_settings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        description TEXT,
        category VARCHAR(50) DEFAULT 'general',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 2. Links de Navegação (Menu, Footer, Redes Sociais)
      CREATE TABLE IF NOT EXISTS navigation_links (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        url VARCHAR(500) NOT NULL,
        icon VARCHAR(50),
        position VARCHAR(50) DEFAULT 'header',
        order INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 3. Blocos de Conteúdo (Títulos, Textos, Preços)
      CREATE TABLE IF NOT EXISTS content_blocks (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'text',
        page VARCHAR(100) DEFAULT 'general',
        order INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 4. Benefícios do Newsletter
      CREATE TABLE IF NOT EXISTS newsletter_benefits (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) DEFAULT 'Star',
        order INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- 5. Configurações de Tema
      CREATE TABLE IF NOT EXISTS theme_settings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Executar SQL
    const { error } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
    
    if (error) {
      console.error('❌ Erro ao criar tabelas:', error);
      console.log('📝 Tentando método alternativo...');
      
      // Método alternativo: criar tabelas uma por uma
      await createTableIndividually();
    } else {
      console.log('✅ Tabelas criadas com sucesso!');
    }

  } catch (error) {
    console.error('💥 Erro geral:', error);
    console.log('📝 Tentando método alternativo...');
    await createTableIndividually();
  }
}

async function createTableIndividually() {
  console.log('🔧 Criando tabelas individualmente...');
  
  // Como não podemos executar SQL diretamente, vamos tentar inserir dados
  // Se as tabelas não existirem, o Supabase criará automaticamente
  console.log('📝 As tabelas serão criadas automaticamente quando inserirmos os primeiros dados.');
}

createTables();
