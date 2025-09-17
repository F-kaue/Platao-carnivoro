# 🗄️ Configuração Final do Supabase - CMS

## ⚠️ IMPORTANTE: Execute este SQL no Supabase ANTES de usar o CMS!

### **1️⃣ Acesse o Supabase:**
1. Vá para: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: `ylkitmkjcmvtkgzxapcs`

### **2️⃣ Abra o SQL Editor:**
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### **3️⃣ Execute o SQL de Criação das Tabelas:**
Copie e cole **TODO** o conteúdo abaixo e execute:

```sql
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
  "order" INTEGER DEFAULT 1,
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
  "order" INTEGER DEFAULT 1,
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
  "order" INTEGER DEFAULT 1,
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
```

### **4️⃣ Execute o SQL de Dados Iniciais:**
Após criar as tabelas, execute este SQL para inserir dados iniciais:

```sql
-- Inserir configurações do site
INSERT INTO site_settings (key, value, description, category) VALUES
('site_title', 'Platão Carnívoro', 'Título principal do site', 'general'),
('site_description', 'Filosofia, Carnivorismo e Desenvolvimento Pessoal', 'Descrição do site', 'general'),
('contact_email', 'plataocarnivoro@gmail.com', 'Email de contato', 'contact'),
('hero_title', 'Mantenha suas Raízes', 'Título da seção hero', 'content'),
('hero_subtitle', 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo', 'Subtítulo da seção hero', 'content')
ON CONFLICT (key) DO UPDATE SET
value = EXCLUDED.value,
description = EXCLUDED.description,
category = EXCLUDED.category,
updated_at = NOW();

-- Inserir links de navegação
INSERT INTO navigation_links (title, url, icon, position, "order", is_active) VALUES
('Início', '/', 'Home', 'header', 1, true),
('Testo1k', '/testo1k', 'Book', 'header', 2, true),
('Admin', '/admin', 'Settings', 'header', 3, true),
('Instagram', 'https://instagram.com/plataocarnivoro', 'Instagram', 'social', 1, true),
('YouTube', 'https://youtube.com/@plataocarnivoro', 'Youtube', 'social', 2, true)
ON CONFLICT (title, position) DO UPDATE SET
url = EXCLUDED.url,
icon = EXCLUDED.icon,
"order" = EXCLUDED."order",
is_active = EXCLUDED.is_active,
updated_at = NOW();

-- Inserir blocos de conteúdo
INSERT INTO content_blocks (key, title, content, type, page, "order", is_active) VALUES
('testo1k_title', 'Título Testo1k', 'Testo1k - O Guia Completo', 'title', 'testo1k', 1, true),
('testo1k_subtitle', 'Subtítulo Testo1k', 'Descubra os segredos do carnívorismo e transforme sua vida', 'subtitle', 'testo1k', 2, true),
('testo1k_price', 'Preço Testo1k', 'R$ 97,00', 'price', 'testo1k', 3, true),
('landing_title', 'Título Landing', 'Transforme sua vida com o Testo1k', 'title', 'testo1k/landing', 1, true),
('landing_description', 'Descrição Landing', 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar', 'description', 'testo1k/landing', 2, true)
ON CONFLICT (key) DO UPDATE SET
title = EXCLUDED.title,
content = EXCLUDED.content,
type = EXCLUDED.type,
page = EXCLUDED.page,
"order" = EXCLUDED."order",
is_active = EXCLUDED.is_active,
updated_at = NOW();

-- Inserir benefícios do newsletter
INSERT INTO newsletter_benefits (title, description, icon, "order", is_active) VALUES
('Conteúdo Exclusivo', 'Receba artigos e insights exclusivos sobre carnívorismo e filosofia', 'BookOpen', 1, true),
('Dicas Práticas', 'Dicas práticas para implementar o estilo de vida carnívoro', 'Lightbulb', 2, true),
('Comunidade', 'Faça parte de uma comunidade de pessoas com ideais similares', 'Users', 3, true),
('Suporte', 'Suporte direto para suas dúvidas sobre carnívorismo', 'MessageCircle', 4, true)
ON CONFLICT (title) DO UPDATE SET
description = EXCLUDED.description,
icon = EXCLUDED.icon,
"order" = EXCLUDED."order",
is_active = EXCLUDED.is_active,
updated_at = NOW();
```

### **5️⃣ Verifique se as Tabelas Foram Criadas:**
1. Vá para **"Table Editor"** no menu lateral
2. Você deve ver estas tabelas:
   - ✅ `site_settings`
   - ✅ `navigation_links`
   - ✅ `content_blocks`
   - ✅ `newsletter_benefits`
   - ✅ `theme_settings`

---

## **🎯 URLs Atualizadas:**

### **Site Principal:**
- **URL**: `https://platao-carnivoro-3gju0lupf-f-kaues-projects.vercel.app`

### **Painel Admin:**
- **URL**: `https://platao-carnivoro-3gju0lupf-f-kaues-projects.vercel.app/admin`
- **Login**: `plataocarnivoro@gmail.com` / `Platao@1997`

### **APIs CMS (agora com Supabase real):**
- **Configurações**: `/api/site-settings` ✅
- **Navegação**: `/api/navigation` ✅
- **Conteúdo**: `/api/content-blocks` ✅
- **Newsletter**: `/api/newsletter-benefits` ✅

---

## **✅ Após Configurar o Banco:**

1. **Acesse `/admin`** - Painel administrativo
2. **Faça login** - Credenciais acima
3. **Explore as abas**:
   - **Configurações** - Dados reais do Supabase
   - **Navegação** - Links funcionando
   - **Newsletter** - Benefícios visíveis
   - **Testo1k** - Conteúdo carregado

**O CMS estará funcionando com dados reais do Supabase!** 🚀
