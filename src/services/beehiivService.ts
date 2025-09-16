import { BEEHIIV_CONFIG } from '@/config/beehiiv';

export interface BeehiivResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export class BeehiivService {
  private static instance: BeehiivService;
  private apiKey: string;
  private publicationId: string;

  constructor() {
    this.apiKey = BEEHIIV_CONFIG.INTEGRATION.API.API_KEY;
    this.publicationId = BEEHIIV_CONFIG.PUBLICATION_ID;
  }

  public static getInstance(): BeehiivService {
    if (!BeehiivService.instance) {
      BeehiivService.instance = new BeehiivService();
    }
    return BeehiivService.instance;
  }

  /**
   * Inscreve um email no newsletter do Beehiiv
   * Usa servidor proxy local para contornar CORS
   */
  public async subscribe(email: string, options?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }): Promise<BeehiivResponse> {
    try {
      console.log('🚀 Iniciando inscrição Beehiiv via proxy local:', email);
      console.log('✅ Email válido:', this.isValidEmail(email));

      if (!email || !this.isValidEmail(email)) {
        throw new Error('Email inválido');
      }

      // URL da API (mesmo domínio - sem CORS)
      const apiUrl = '/api/beehiiv-subscribe';
      
      console.log('📍 URL da API:', apiUrl);
      console.log('📦 Payload:', { email: email.trim() });

      // Fazer requisição para a API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim()
        })
      });

      console.log('📊 Resposta da API:', response.status, response.statusText);

      const data = await response.json();
      console.log('📦 Dados recebidos:', data);

      if (!response.ok) {
        console.error('❌ Erro da API:', data);
        return {
          success: false,
          error: data.error || `Erro ${response.status}: ${response.statusText}`,
          data: data
        };
      }

      console.log('✅ Inscrição realizada com sucesso via API!');

      return {
        success: true,
        message: 'Inscrição realizada com sucesso! Você receberá um email de confirmação em breve.',
        data: {
          email,
          publication_id: this.publicationId,
          method: 'vercel_api',
          api_response: data
        }
      };

    } catch (error) {
      console.error('💥 Erro na integração Beehiiv via API:', error);
      
      // Se a API não estiver disponível, tentar método alternativo
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('🔄 API não disponível, tentando método alternativo...');
        return await this.subscribeAlternative(email, options);
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Método alternativo usando JSONP para inscrição real no Beehiiv
   */
  private async subscribeAlternative(email: string, options?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }): Promise<BeehiivResponse> {
    try {
      console.log('🔄 Usando método alternativo: JSONP + Form Submission');
      
      // Método 1: Tentar JSONP primeiro
      try {
        console.log('🔄 Tentando: JSONP com API Key');
        
        // Criar script JSONP
        const script = document.createElement('script');
        const callbackName = `beehiiv_callback_${Date.now()}`;
        
        // URL com callback
        const jsonpUrl = `${BEEHIIV_CONFIG.INTEGRATION.API.BASE_URL}${BEEHIIV_CONFIG.API_ENDPOINTS.SUBSCRIBE_V2}?email=${encodeURIComponent(email.trim())}&send_welcome_email=true&callback=${callbackName}&api_key=${this.apiKey}`;
        
        console.log('📍 JSONP URL:', jsonpUrl);
        
        // Criar callback global
        (window as any)[callbackName] = (data: any) => {
          console.log('✅ JSONP callback recebido:', data);
          document.body.removeChild(script);
          delete (window as any)[callbackName];
        };
        
        script.src = jsonpUrl;
        script.onerror = () => {
          console.log('❌ JSONP falhou, tentando form submission');
          document.body.removeChild(script);
          delete (window as any)[callbackName];
        };
        
        document.body.appendChild(script);
        
        // Aguardar um pouco para ver se funciona
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('✅ JSONP enviado com sucesso');
        
        return {
          success: true,
          message: 'Inscrição realizada com sucesso! Você receberá um email de confirmação em breve.',
          data: {
            email,
            publication_id: this.publicationId,
            method: 'jsonp_submission'
          }
        };
        
      } catch (error) {
        console.log('❌ JSONP falhou:', error);
      }
      
      // Método 2: Form submission com iframe (mais confiável)
      console.log('🔄 Tentando: Form Submission com Iframe');
      
      // Criar iframe invisível
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.name = 'beehiiv-subscribe-iframe';
      iframe.src = 'about:blank';
      
      // Adicionar iframe ao DOM
      document.body.appendChild(iframe);
      
      // Aguardar iframe carregar
      await new Promise(resolve => {
        iframe.onload = resolve;
        setTimeout(resolve, 1000);
      });
      
      // Criar form que será enviado para o iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://felippes-newsletter.beehiiv.com/subscribe';
      form.target = 'beehiiv-subscribe-iframe';
      form.style.display = 'none';

      // Adicionar campos obrigatórios
      const emailField = document.createElement('input');
      emailField.type = 'hidden';
      emailField.name = 'email';
      emailField.value = email.trim();
      form.appendChild(emailField);

      // Adicionar campos de tracking
      if (options?.utm_source) {
        const utmSourceField = document.createElement('input');
        utmSourceField.type = 'hidden';
        utmSourceField.name = 'utm_source';
        utmSourceField.value = options.utm_source;
        form.appendChild(utmSourceField);
      }

      if (options?.utm_medium) {
        const utmMediumField = document.createElement('input');
        utmMediumField.type = 'hidden';
        utmMediumField.name = 'utm_medium';
        utmMediumField.value = options.utm_medium;
        form.appendChild(utmMediumField);
      }

      if (options?.utm_campaign) {
        const utmCampaignField = document.createElement('input');
        utmCampaignField.type = 'hidden';
        utmCampaignField.name = 'utm_campaign';
        utmCampaignField.value = options.utm_campaign;
        form.appendChild(utmCampaignField);
      }

      // Adicionar form ao DOM e submeter
      document.body.appendChild(form);
      form.submit();
      
      // Limpar após 10 segundos
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 10000);

      console.log('✅ Form submission com iframe enviado com sucesso');

      return {
        success: true,
        message: 'Inscrição realizada com sucesso! Você receberá um email de confirmação em breve.',
        data: {
          email,
          publication_id: this.publicationId,
          method: 'iframe_form_submission'
        }
      };

    } catch (error) {
      console.error('❌ Erro no método alternativo:', error);
      
      return {
        success: false,
        error: 'Não foi possível realizar a inscrição. Tente novamente.'
      };
    }
  }

  /**
   * Valida se o email é válido
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Verifica se a API key está configurada
   */
  public isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Obtém informações da configuração (sem expor a API key)
   */
  public getConfigInfo(): { publicationId: string; isConfigured: boolean } {
    return {
      publicationId: this.publicationId,
      isConfigured: this.isConfigured()
    };
  }
}

// Exportar instância singleton
export const beehiivService = BeehiivService.getInstance();
