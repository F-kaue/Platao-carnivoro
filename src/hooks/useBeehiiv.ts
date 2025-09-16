import { useState } from 'react';
import { BEEHIIV_CONFIG, getBeehiivSubscribeUrl } from '@/config/beehiiv';
import { beehiivService, BeehiivResponse } from '@/services/beehiivService';

export const useBeehiiv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Método 1: Redirecionamento para página do Beehiiv com email preenchido
  const subscribeWithRedirect = (email: string) => {
    const subscribeUrl = getBeehiivSubscribeUrl(email);
    // Abre em nova aba com o email já preenchido
    window.open(subscribeUrl, '_blank');
  };

  // Método 2: Integração via API do Beehiiv (usando serviço)
  const subscribeWithAPI = async (email: string): Promise<BeehiivResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Iniciando inscrição via Beehiiv Service:', { email });

      const result = await beehiivService.subscribe(email, {
        utm_source: 'plataocarnivoro-website',
        utm_medium: 'newsletter-form',
        utm_campaign: 'newsletter-signup'
      });

      console.log('Resultado do Beehiiv Service:', result);

      if (!result.success) {
        throw new Error(result.error || 'Erro desconhecido');
      }

      setIsLoading(false);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('Erro na integração Beehiiv:', err);
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Método 3: Integração via Embed (mais comum)
  const subscribeWithEmbed = (email: string) => {
    // O Beehiiv fornece um código HTML que pode ser embedado
    // Este método seria usado se o formulário fosse embedado diretamente
    console.log('Embed subscription for:', email);
  };

  // Função principal de inscrição
  const subscribe = async (email: string, method: 'redirect' | 'api' | 'embed' = 'redirect') => {
    switch (method) {
      case 'redirect':
        subscribeWithRedirect(email);
        return { success: true };
      
      case 'api':
        return await subscribeWithAPI(email);
      
      case 'embed':
        subscribeWithEmbed(email);
        return { success: true };
      
      default:
        return { success: false, error: 'Método de integração não suportado' };
    }
  };

  return {
    subscribe,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};
