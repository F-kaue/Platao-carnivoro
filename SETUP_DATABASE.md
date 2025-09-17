# 🗄️ Configuração do Banco de Dados - CMS

## ⚠️ IMPORTANTE: Execute este SQL no Supabase ANTES de usar o CMS!

### **1️⃣ Acesse o Supabase:**
1. Vá para: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione o projeto: `ylkitmkjcmvtkgzxapcs`

### **2️⃣ Abra o SQL Editor:**
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### **3️⃣ Execute o Schema:**
Copie e cole **TODO** o conteúdo do arquivo `database/schema.sql` e execute:

```sql
-- Cole aqui TODO o conteúdo do arquivo database/schema.sql
-- Isso criará todas as tabelas e dados iniciais
```

### **4️⃣ Verifique se as Tabelas Foram Criadas:**
1. Vá para **"Table Editor"** no menu lateral
2. Você deve ver estas tabelas:
   - ✅ `site_settings`
   - ✅ `navigation_links`
   - ✅ `content_blocks`
   - ✅ `theme_settings`
   - ✅ `newsletter_benefits`

### **5️⃣ Teste as APIs:**
Após configurar o banco, teste as APIs:

```bash
# Teste configurações
curl https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/site-settings

# Teste links
curl https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/navigation

# Teste conteúdo
curl https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/content-blocks
```

---

## 🎯 URLs Atualizadas:

### **Site Principal:**
- **URL**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app`

### **Painel Admin:**
- **URL**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/admin`
- **Login**: `plataocarnivoro@gmail.com` / `Platao@1997`

### **APIs CMS:**
- **Configurações**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/site-settings`
- **Navegação**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/navigation`
- **Conteúdo**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/content-blocks`
- **Newsletter**: `https://platao-carnivoro-7w3a9ga45-f-kaues-projects.vercel.app/api/newsletter-benefits`

---

## ✅ Após Configurar o Banco:

1. **Acesse o painel admin** em `/admin`
2. **Faça login** com as credenciais
3. **Explore as novas abas**:
   - **Configurações** - Títulos e textos
   - **Navegação** - Links do menu
   - **Newsletter** - Benefícios
   - **Testo1k** - Conteúdo das páginas

**O CMS estará funcionando perfeitamente!** 🚀
