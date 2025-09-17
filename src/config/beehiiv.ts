// Configuração do Beehiiv
export const BEEHIIV_CONFIG = {
  // ID da publicação do cliente no Beehiiv (atualizado)
  PUBLICATION_ID: '5951e46f-6568-49e6-9f88-9a882ecd001d', // Nova publicação
  PUBLICATION_ID_V2: '5951e46f-6568-49e6-9f88-9a882ecd001d', // Nova publicação
  
  // URL base da publicação
  BASE_URL: 'https://plataocarnivoro.beehiiv.com',
  
  // Endpoints da API do Beehiiv (atualizados)
  API_ENDPOINTS: {
    // API V1 - mais estável
    SUBSCRIBE_V1: '/v1/publications/5951e46f-6568-49e6-9f88-9a882ecd001d/subscriptions',
    // API V2 - mais recente
    SUBSCRIBE_V2: '/v2/publications/5951e46f-6568-49e6-9f88-9a882ecd001d/subscriptions',
    // Endpoints padrão
    SUBSCRIBE: '/v1/publications/5951e46f-6568-49e6-9f88-9a882ecd001d/subscriptions',
    UNSUBSCRIBE: '/v1/publications/5951e46f-6568-49e6-9f88-9a882ecd001d/subscriptions',
    SUBSCRIBERS: '/v1/publications/5951e46f-6568-49e6-9f88-9a882ecd001d/subscribers'
  },
  
  // Configurações de integração
  INTEGRATION: {
    // Método de integração preferido
    METHOD: 'embed' as 'embed' | 'api' | 'redirect',
    
    // Configurações do formulário embed
    EMBED: {
      // Se usar embed, o Beehiiv fornece um código HTML
      FORM_ID: 'beehiiv-form', // ID do formulário embed
      CONTAINER_ID: 'beehiiv-container' // ID do container
    },
    
    // Configurações da API
    API: {
      // Chave da API do Beehiiv - será lida das variáveis de ambiente
      API_KEY: process.env.BEEHIIV_API_KEY || 'LF0v80f4yQNRrToqiBw7aM17eEOp7HJbhVIoXe6Tb9mupF90SI1jZv3QLXLzOR9L',
      // URL base da API
      BASE_URL: 'https://api.beehiiv.com',
      // Headers padrão
      HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  }
};

// Função para gerar URL de inscrição
export const getBeehiivSubscribeUrl = (email?: string) => {
  const baseUrl = `${BEEHIIV_CONFIG.BASE_URL}/subscribe`;
  return email ? `${baseUrl}?email=${encodeURIComponent(email)}` : baseUrl;
};

// Função para gerar URL de cancelamento
export const getBeehiivUnsubscribeUrl = () => {
  return `${BEEHIIV_CONFIG.BASE_URL}/unsubscribe`;
};

// Função para gerar URL da publicação
export const getBeehiivPublicationUrl = () => {
  return BEEHIIV_CONFIG.BASE_URL;
};
