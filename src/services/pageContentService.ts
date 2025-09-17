import { PageContent, PageElement } from '@/hooks/usePageBuilder';

// Serviço para extrair conteúdo real das páginas existentes
export class PageContentService {
  
  // Extrair conteúdo da página inicial
  static getHomePageContent(): PageContent {
    return {
      elements: [
        {
          id: 'hero-title',
          type: 'heading',
          props: {
            text: 'PLATÃO CARNÍVORO',
            level: 1,
            align: 'left',
            color: '#1a1a1a',
            fontSize: '4rem',
            fontWeight: 'bold',
            customCSS: 'font-family: "Diogenes", serif; text-transform: uppercase;'
          }
        },
        {
          id: 'hero-subtitle',
          type: 'heading',
          props: {
            text: 'FILOSOFIA, CARNE E TRADIÇÃO',
            level: 2,
            align: 'left',
            color: '#8B4513',
            fontSize: '1.5rem',
            fontWeight: 'normal',
            customCSS: 'font-family: "Augustus", sans-serif; text-transform: uppercase; margin-top: 0.5rem;'
          }
        },
        {
          id: 'hero-description',
          type: 'paragraph',
          props: {
            text: 'Uma curadoria exclusiva de produtos da Amazon para quem valoriza força, disciplina e autenticidade. Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.',
            align: 'left',
            color: '#2c2c2c',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            customCSS: 'font-family: "Body", sans-serif; margin: 1.5rem 0;'
          }
        },
        {
          id: 'cta-button',
          type: 'button',
          props: {
            text: 'ENTRAR NA REVOLUÇÃO',
            variant: 'default',
            size: 'lg',
            href: '/testo1k',
            target: '_self',
            customCSS: 'background: linear-gradient(135deg, #8B4513, #A0522D); color: white; padding: 1rem 2rem; border-radius: 8px; font-weight: bold; text-transform: uppercase; font-family: "Augustus", sans-serif;'
          }
        },
        {
          id: 'features-list',
          type: 'list',
          props: {
            items: [
              'Curadoria Exclusiva',
              'Qualidade Premium', 
              'Valores Tradicionais'
            ],
            type: 'bullet',
            color: '#8B4513',
            fontSize: '1rem',
            customCSS: 'font-family: "Body", sans-serif; margin: 1rem 0;'
          }
        },
        {
          id: 'newsletter-section',
          type: 'newsletter',
          props: {
            title: 'Mantenha suas Raízes',
            description: 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo. Descubra como transformar sua vida com conhecimento milenar e práticas modernas.',
            placeholder: 'Seu email',
            buttonText: 'Conectar com as Raízes',
            successMessage: 'Obrigado por se conectar!',
            customCSS: 'background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.05)); padding: 3rem 2rem; border-radius: 12px; text-align: center;'
          }
        }
      ],
      settings: {
        title: 'Platão Carnívoro - Filosofia e Carnívorismo',
        description: 'Uma curadoria exclusiva de produtos para quem valoriza força, disciplina e autenticidade',
        theme: 'light',
        customCSS: `
          body {
            font-family: "Body", sans-serif;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
          }
          .hero-section {
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.05), rgba(160, 82, 45, 0.02));
            padding: 4rem 2rem;
            border-radius: 16px;
            margin: 2rem 0;
          }
        `
      }
    };
  }

  // Extrair conteúdo da página Testo1k
  static getTesto1kPageContent(): PageContent {
    return {
      elements: [
        {
          id: 'testo1k-hero',
          type: 'heading',
          props: {
            text: 'Testo1k - O Guia Completo',
            level: 1,
            align: 'center',
            color: '#1a1a1a',
            fontSize: '3rem',
            fontWeight: 'bold',
            customCSS: 'font-family: "Diogenes", serif; margin-bottom: 1rem;'
          }
        },
        {
          id: 'testo1k-subtitle',
          type: 'paragraph',
          props: {
            text: 'Dobre sua testosterona naturalmente em 60 dias com nosso protocolo baseado em evidências científicas e sabedoria ancestral.',
            align: 'center',
            color: '#666666',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            customCSS: 'font-family: "Body", sans-serif; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;'
          }
        },
        {
          id: 'testo1k-price',
          type: 'heading',
          props: {
            text: 'R$ 97,00',
            level: 2,
            align: 'center',
            color: '#059669',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            customCSS: 'font-family: "Augustus", sans-serif; margin: 2rem 0;'
          }
        },
        {
          id: 'testo1k-benefits',
          type: 'container',
          props: {
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            customCSS: 'margin: 2rem 0;'
          },
          children: [
            {
              id: 'benefit-1',
              type: 'card',
              props: {
                title: 'Aumento de Testosterona',
                content: 'Protocolo comprovado para aumentar naturalmente os níveis de testosterona em 60 dias.',
                image: '/placeholder-testosterone.jpg',
                buttonText: 'Saiba Mais',
                buttonLink: '#'
              }
            },
            {
              id: 'benefit-2',
              type: 'card',
              props: {
                title: 'Melhora da Energia',
                content: 'Sinta-se mais energizado e focado durante todo o dia com níveis otimizados.',
                image: '/placeholder-energy.jpg',
                buttonText: 'Saiba Mais',
                buttonLink: '#'
              }
            },
            {
              id: 'benefit-3',
              type: 'card',
              props: {
                title: 'Ganho de Massa Muscular',
                content: 'Construa músculos de forma mais eficiente com níveis otimizados de testosterona.',
                image: '/placeholder-muscle.jpg',
                buttonText: 'Saiba Mais',
                buttonLink: '#'
              }
            }
          ]
        },
        {
          id: 'testo1k-cta',
          type: 'button',
          props: {
            text: 'Adquirir Agora',
            variant: 'default',
            size: 'lg',
            href: '/testo1k/landing',
            target: '_self',
            customCSS: 'background: linear-gradient(135deg, #059669, #047857); color: white; padding: 1.2rem 3rem; border-radius: 8px; font-weight: bold; font-size: 1.2rem; font-family: "Augustus", sans-serif; margin: 2rem 0;'
          }
        }
      ],
      settings: {
        title: 'Testo1k - O Guia Completo',
        description: 'Dobre sua testosterona naturalmente em 60 dias',
        theme: 'light',
        customCSS: `
          body {
            font-family: "Body", sans-serif;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
          }
          .testo1k-hero {
            background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(4, 120, 87, 0.05));
            padding: 4rem 2rem;
            border-radius: 16px;
            margin: 2rem 0;
            text-align: center;
          }
        `
      }
    };
  }

  // Extrair conteúdo da landing page
  static getLandingPageContent(): PageContent {
    return {
      elements: [
        {
          id: 'landing-hero',
          type: 'heading',
          props: {
            text: 'Transforme sua vida com o Testo1k',
            level: 1,
            align: 'center',
            color: '#1a1a1a',
            fontSize: '3.5rem',
            fontWeight: 'bold',
            customCSS: 'font-family: "Diogenes", serif; margin-bottom: 1.5rem;'
          }
        },
        {
          id: 'landing-description',
          type: 'paragraph',
          props: {
            text: 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar. Um protocolo completo baseado em evidências científicas e sabedoria ancestral que já transformou milhares de vidas.',
            align: 'center',
            color: '#666666',
            fontSize: '1.3rem',
            lineHeight: '1.7',
            customCSS: 'font-family: "Body", sans-serif; margin-bottom: 3rem; max-width: 700px; margin-left: auto; margin-right: auto;'
          }
        },
        {
          id: 'landing-benefits',
          type: 'container',
          props: {
            padding: '3rem 2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '16px',
            customCSS: 'margin: 3rem 0;'
          },
          children: [
            {
              id: 'landing-benefit-1',
              type: 'card',
              props: {
                title: 'Aumento de Testosterona',
                content: 'Protocolo comprovado para aumentar naturalmente os níveis de testosterona em 60 dias. Baseado em estudos científicos e sabedoria ancestral.',
                image: '/placeholder-testosterone.jpg',
                buttonText: 'Ver Resultados',
                buttonLink: '#'
              }
            },
            {
              id: 'landing-benefit-2',
              type: 'card',
              props: {
                title: 'Melhora da Energia',
                content: 'Sinta-se mais energizado e focado durante todo o dia. Elimine a fadiga e recupere sua vitalidade natural.',
                image: '/placeholder-energy.jpg',
                buttonText: 'Ver Resultados',
                buttonLink: '#'
              }
            },
            {
              id: 'landing-benefit-3',
              type: 'card',
              props: {
                title: 'Ganho de Massa Muscular',
                content: 'Construa músculos de forma mais eficiente com níveis otimizados de testosterona. Transforme seu corpo naturalmente.',
                image: '/placeholder-muscle.jpg',
                buttonText: 'Ver Resultados',
                buttonLink: '#'
              }
            }
          ]
        },
        {
          id: 'landing-testimonial',
          type: 'testimonial',
          props: {
            quote: 'O Testo1k mudou completamente minha vida. Em 60 dias, minha energia, foco e massa muscular aumentaram drasticamente. Recomendo para qualquer homem que queira se tornar a melhor versão de si mesmo.',
            author: 'João Silva',
            role: 'Empresário',
            image: '/placeholder-testimonial.jpg',
            customCSS: 'background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.05)); padding: 2rem; border-radius: 12px; text-align: center; margin: 2rem 0;'
          }
        },
        {
          id: 'landing-cta',
          type: 'button',
          props: {
            text: 'Quero Transformar Minha Vida',
            variant: 'default',
            size: 'lg',
            href: '#checkout',
            target: '_self',
            customCSS: 'background: linear-gradient(135deg, #059669, #047857); color: white; padding: 1.5rem 4rem; border-radius: 12px; font-weight: bold; font-size: 1.3rem; font-family: "Augustus", sans-serif; margin: 3rem 0; box-shadow: 0 10px 30px rgba(5, 150, 105, 0.3);'
          }
        },
        {
          id: 'landing-guarantee',
          type: 'container',
          props: {
            padding: '2rem',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            customCSS: 'text-align: center; margin: 2rem 0; border: 2px solid #0ea5e9;'
          },
          children: [
            {
              id: 'guarantee-text',
              type: 'paragraph',
              props: {
                text: 'Garantia de 30 dias ou seu dinheiro de volta. Se você não ficar satisfeito com os resultados, devolvemos 100% do seu investimento.',
                align: 'center',
                color: '#0369a1',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                customCSS: 'font-family: "Augustus", sans-serif; margin: 0;'
              }
            }
          ]
        }
      ],
      settings: {
        title: 'Testo1k - Transforme sua vida',
        description: 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar',
        theme: 'light',
        customCSS: `
          body {
            font-family: "Body", sans-serif;
            background: linear-gradient(135deg, #f8f9fa, #ffffff);
          }
          .landing-hero {
            background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(4, 120, 87, 0.05));
            padding: 4rem 2rem;
            border-radius: 16px;
            margin: 2rem 0;
            text-align: center;
          }
          .landing-cta {
            text-align: center;
            margin: 3rem 0;
          }
        `
      }
    };
  }

  // Método para obter conteúdo baseado no ID da página
  static getPageContent(pageId: string): PageContent {
    switch (pageId) {
      case 'home':
        return this.getHomePageContent();
      case 'testo1k':
        return this.getTesto1kPageContent();
      case 'landing':
        return this.getLandingPageContent();
      default:
        return this.getHomePageContent();
    }
  }

  // Método para salvar conteúdo (futuro: integrar com API)
  static async savePageContent(pageId: string, content: PageContent): Promise<boolean> {
    try {
      // Aqui você integraria com a API real
      console.log(`Salvando conteúdo da página ${pageId}:`, content);
      
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar conteúdo:', error);
      return false;
    }
  }
}
