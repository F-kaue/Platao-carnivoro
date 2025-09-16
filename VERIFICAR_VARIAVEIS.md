# 🔧 Verificar Variáveis de Ambiente no Vercel

## **📋 Passos para Verificar:**

### **1️⃣ Acesse o Dashboard:**
- Vá para: `https://vercel.com/f-kaues-projects/achadinhosdakaq`

### **2️⃣ Clique em "Settings":**
- No menu superior

### **3️⃣ Clique em "Environment Variables":**
- No menu lateral esquerdo

### **4️⃣ Verifique se existem:**
```
BEEHIIV_API_KEY = TtksxgFbx1FLnqoDyuc1ydDp77lEurz2INeVITHbLw1ZQhAajBJp43LsZFYFL43h
PUBLICATION_ID = pub_a719f540-5634-4fa5-96d4-527f8dcde0a3
```

### **5️⃣ Se NÃO existirem, adicione:**
- Clique em **"Add New"**
- **Name**: `BEEHIIV_API_KEY`
- **Value**: `TtksxgFbx1FLnqoDyuc1ydDp77lEurz2INeVITHbLw1ZQhAajBJp43LsZFYFL43h`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Clique em **"Save"**

- Clique em **"Add New"** novamente
- **Name**: `PUBLICATION_ID`
- **Value**: `pub_a719f540-5634-4fa5-96d4-527f8dcde0a3`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Clique em **"Save"**

---

## **🚀 Após Configurar:**

### **1️⃣ Fazer Push:**
```bash
git add .
git commit -m "Corrigir integração Beehiiv e fontes"
git push origin main
```

### **2️⃣ Aguardar Deploy:**
- Vercel vai fazer o build automaticamente
- Aguarde aparecer "Ready"

### **3️⃣ Testar:**
- **Site**: `https://www.plataocarnivoro.fkdev.com.br`
- **Newsletter**: Role até a seção Newsletter
- **Teste**: Digite um email e clique em "Conectar com as Raízes"

---

## **📊 Logs para Verificar:**

### **No Dashboard do Vercel:**
1. **Clique em "Deployments"**
2. **Clique no deployment mais recente**
3. **Verifique os logs** se houver erro

### **No Site:**
- **Console do navegador** (F12)
- **Logs da integração** Beehiiv

---

## **🎯 Problemas Resolvidos:**

✅ **Fontes**: Corrigido caminho no vercel.json
✅ **Proxy**: URL atualizada para produção
✅ **Variáveis**: Instruções para configurar
✅ **Deploy**: Configuração completa

**Siga os passos acima e me informe se funcionou!** 🚀✨
