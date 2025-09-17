-- Schema para CMS Headless - Platão Carnívoro
-- Execute este SQL no Supabase SQL Editor

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
  icon VARCHAR(50), -- Nome do ícone Lucide
  position INTEGER DEFAULT 0, -- Ordem de exibição
  location VARCHAR(20) NOT NULL, -- 'header', 'footer', 'social'
  is_active BOOLEAN DEFAULT true,
  target_blank BOOLEAN DEFAULT false, -- Abrir em nova aba
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blocos de Conteúdo (Textos, Banners, Descrições)
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200),
  content TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text', -- 'text', 'html', 'markdown'
  section VARCHAR(50) NOT NULL, -- 'newsletter', 'hero', 'about', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Configurações de Tema/Cores
CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value VARCHAR(50) NOT NULL, -- Código da cor
  description TEXT,
  category VARCHAR(50) DEFAULT 'colors', -- 'colors', 'fonts', 'spacing'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Newsletter Benefits (Cards do Newsletter)
CREATE TABLE IF NOT EXISTS newsletter_benefits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL, -- Nome do ícone Lucide
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_navigation_links_location ON navigation_links(location);
CREATE INDEX IF NOT EXISTS idx_content_blocks_section ON content_blocks(section);
CREATE INDEX IF NOT EXISTS idx_newsletter_benefits_position ON newsletter_benefits(position);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_links_updated_at BEFORE UPDATE ON navigation_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_theme_settings_updated_at BEFORE UPDATE ON theme_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_benefits_updated_at BEFORE UPDATE ON newsletter_benefits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Dados iniciais
INSERT INTO site_settings (key, value, description, category) VALUES
('site_title', 'Platão Carnívoro', 'Título principal do site', 'general'),
('site_description', 'Filosofia, carne e tradição', 'Descrição do site', 'general'),
('contact_email', 'contato@plataocarnivoro.com', 'Email de contato', 'contact'),
('newsletter_title', 'Mantenha suas Raízes', 'Título da seção newsletter', 'newsletter'),
('newsletter_subtitle', 'Conecte-se com a sabedoria ancestral e mantenha-se atualizado com nossa jornada de despertar e transformação', 'Subtítulo da seção newsletter', 'newsletter');

INSERT INTO navigation_links (title, url, icon, position, location, is_active) VALUES
('Produtos', '/', 'Package', 1, 'header', true),
('Filosofia', '/filosofia', 'BookOpen', 2, 'header', true),
('Contato', '/contato', 'Mail', 3, 'header', true),
('Instagram', 'https://instagram.com/plataocarnivoro', 'Instagram', 1, 'social', true),
('WhatsApp', 'https://wa.me/5511999999999', 'MessageCircle', 2, 'social', true);

INSERT INTO content_blocks (key, title, content, section) VALUES
('newsletter_benefits_title', 'O que você receberá:', 'O que você receberá:', 'newsletter'),
('newsletter_benefits_subtitle', 'Descrição dos benefícios', 'Conteúdo exclusivo que fortalece corpo, mente e espírito através da sabedoria clássica', 'newsletter'),
('hero_title', 'Título Principal', 'TRANSFORMAÇÃO', 'hero'),
('hero_subtitle', 'Subtítulo Principal', 'Descubra a sabedoria ancestral através da filosofia e tradição', 'hero'),
-- Conteúdo Testo1k - Página Principal
('testo1k_hero_title', 'Título Principal Testo1k', 'TRANSFORMAÇÃO', 'testo1k'),
('testo1k_hero_subtitle', 'Subtítulo Principal Testo1k', 'Descubra a sabedoria ancestral através da filosofia e tradição', 'testo1k'),
('testo1k_benefits_title', 'Título dos Benefícios Testo1k', 'O que você receberá:', 'testo1k'),
('testo1k_benefits_subtitle', 'Subtítulo dos Benefícios Testo1k', 'Conteúdo exclusivo que fortalece corpo, mente e espírito através da sabedoria clássica', 'testo1k'),
-- Conteúdo Testo1k - Landing Page
('testo1k_landing_title', 'Título da Landing Testo1k', 'Testosterona 1k', 'testo1k_landing'),
('testo1k_landing_subtitle', 'Subtítulo da Landing Testo1k', 'Aumente sua testosterona naturalmente com métodos comprovados', 'testo1k_landing'),
('testo1k_landing_description', 'Descrição Principal Testo1k', 'Descubra os segredos ancestrais para aumentar sua testosterona de forma natural e sustentável. Um guia completo baseado em evidências científicas e sabedoria tradicional.', 'testo1k_landing'),
('testo1k_landing_benefits_title', 'Título dos Benefícios Landing', 'Benefícios do Testo1k', 'testo1k_landing'),
('testo1k_landing_price', 'Preço Testo1k', 'R$ 97,00', 'testo1k_landing'),
('testo1k_landing_original_price', 'Preço Original Testo1k', 'R$ 197,00', 'testo1k_landing');

INSERT INTO newsletter_benefits (title, description, icon, position) VALUES
('Sabedoria Ancestral', 'Conteúdo exclusivo sobre filosofia clássica e tradições', 'BookOpen', 1),
('Curadoria Premium', 'Primeiro acesso a produtos selecionados da Amazon', 'Target', 2),
('Comunidade Exclusiva', 'Conecte-se com pessoas que valorizam excelência', 'Users', 3),
('Conteúdo VIP', 'Reflexões profundas e insights únicos', 'Crown', 4);

-- RLS (Row Level Security) - Opcional, para maior segurança
-- ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE navigation_links ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE newsletter_benefits ENABLE ROW LEVEL SECURITY;
