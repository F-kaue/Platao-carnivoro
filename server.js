import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente do arquivo server.env
try {
  const envFile = readFileSync(path.join(__dirname, 'server.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.log('⚠️ Arquivo server.env não encontrado, usando valores padrão');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Key do Beehiiv
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || 'TtksxgFbx1FLnqoDyuc1ydDp77lEurz2INeVITHbLw1ZQhAajBJp43LsZFYFL43h';
const PUBLICATION_ID = process.env.PUBLICATION_ID || 'pub_a719f540-5634-4fa5-96d4-527f8dcde0a3';

// Rota para inscrição no Beehiiv
app.post('/api/beehiiv-subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email é obrigatório' 
      });
    }

    console.log('🚀 Iniciando inscrição Beehiiv via proxy:', email);

    // Fazer requisição para a API do Beehiiv
    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          send_welcome_email: true
        })
      }
    );

    const data = await beehiivResponse.json();

    console.log('📊 Resposta do Beehiiv:', beehiivResponse.status, beehiivResponse.statusText);
    console.log('📦 Dados:', data);

    if (!beehiivResponse.ok) {
      console.error('❌ Erro do Beehiiv:', data);
      return res.status(beehiivResponse.status).json({ 
        success: false, 
        error: data.message || `Erro ${beehiivResponse.status}: ${beehiivResponse.statusText}`,
        data: data
      });
    }

    console.log('✅ Inscrição realizada com sucesso!');

    return res.status(200).json({ 
      success: true, 
      message: 'Inscrição realizada com sucesso!',
      data: {
        email,
        publication_id: PUBLICATION_ID,
        beehiiv_response: data
      }
    });

  } catch (error) {
    console.error('💥 Erro no servidor proxy:', error);
    
    return res.status(500).json({ 
      success: false, 
      error: 'Erro interno no servidor',
      details: error.message
    });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor proxy funcionando',
    timestamp: new Date().toISOString()
  });
});

// Servir arquivos estáticos do Vite (para produção)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Para Vercel, exportar o app como handler
export default app;

// Para desenvolvimento local, iniciar o servidor
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor proxy rodando na porta ${PORT}`);
    console.log(`📡 API Key configurada: ${BEEHIIV_API_KEY.substring(0, 10)}...`);
    console.log(`📋 Publication ID: ${PUBLICATION_ID}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Subscribe endpoint: http://localhost:${PORT}/api/beehiiv-subscribe`);
  });
}
