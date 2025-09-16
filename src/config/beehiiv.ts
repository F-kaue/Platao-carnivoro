// Configuração do Beehiiv
export const BEEHIIV_CONFIG = {
  // ID da publicação do cliente no Beehiiv (testando API V1 primeiro)
  PUBLICATION_ID: 'a719f540-5634-4fa5-96d4-527f8dcde0a3', // API V1
  PUBLICATION_ID_V2: 'pub_a719f540-5634-4fa5-96d4-527f8dcde0a3', // API V2
  
  // URL base da publicação
  BASE_URL: 'https://plataocarnivoro.beehiiv.com',
  
  // Endpoints da API do Beehiiv (testando V1 primeiro)
  API_ENDPOINTS: {
    // API V1 - mais estável
    SUBSCRIBE_V1: '/v1/publications/a719f540-5634-4fa5-96d4-527f8dcde0a3/subscriptions',
    // API V2 - mais recente
    SUBSCRIBE_V2: '/v2/publications/pub_a719f540-5634-4fa5-96d4-527f8dcde0a3/subscriptions',
    // Endpoints padrão
    SUBSCRIBE: '/v1/publications/a719f540-5634-4fa5-96d4-527f8dcde0a3/subscriptions',
    UNSUBSCRIBE: '/v1/publications/a719f540-5634-4fa5-96d4-527f8dcde0a3/subscriptions',
    SUBSCRIBERS: '/v1/publications/a719f540-5634-4fa5-96d4-527f8dcde0a3/subscribers'
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
      // Chave da API do Beehiiv - configure manualmente
      API_KEY: 'TtksxgFbx1FLnqoDyuc1ydDp77lEurz2INeVITHbLw1ZQhAajBJp43LsZFYFL43h', // Nova API key
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
