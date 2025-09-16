# 🐝 Instruções para Configurar o Beehiiv

## 📋 O que você precisa fornecer:

### **1️⃣ API Key (Chave da API)**
- **Clique** no botão **"+ Create New API Key"** (botão preto)
- **Copie** a chave gerada
- **Cole** no arquivo de configuração

### **2️⃣ Publication ID**
- **Já está visível**: `a719f540-5634-4fa5-96d4-527f8dcde0a3`
- **Clique** no botão **"Copy"** (com ícone de corrente)
- **Já foi configurado** no sistema

---

## 🔧 Como configurar:

### **Passo 1: Gerar API Key**
1. **Clique** em **"+ Create New API Key"**
2. **Copie** a chave gerada
3. **Guarde** em local seguro

### **Passo 2: Atualizar configuração**
Edite o arquivo `src/config/beehiiv.ts`:

```typescript
// Configurações da API
API: {
  // Chave da API do Beehiiv - configure manualmente
  API_KEY: 'SUA_API_KEY_AQUI', // ← COLE SUA API KEY AQUI
  // URL base da API
  BASE_URL: 'https://api.beehiiv.com',
  // ... resto da configuração
}
```

---

## ✅ Status atual:

- ✅ **Publication ID** - Já configurado
- ⏳ **API Key** - Precisa ser gerada e configurada
- ✅ **Endpoints** - Já configurados
- ✅ **Sistema** - Pronto para funcionar

---

## 🚀 Após configurar:

1. **Teste** o formulário no site
2. **Verifique** se o email aparece no Beehiiv
3. **Confirme** que está funcionando

---

## 📞 Precisa de ajuda?

- **Documentação**: https://help.beehiiv.com
- **Suporte**: Chat do Beehiiv
- **Comunidade**: Fóruns do Beehiiv

**Só falta gerar a API Key e está 100% funcional!** 🎉
