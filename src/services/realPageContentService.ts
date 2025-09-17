// Serviço para extrair conteúdo real das páginas existentes
export class RealPageContentService {
  
  // Extrair conteúdo da página inicial
  static getHomePageContent() {
    return {
      title: 'Página Inicial',
      sections: [
        {
          id: 'hero-section',
          name: 'Hero Section',
          elements: [
            {
              id: 'hero-title',
              type: 'text' as const,
              content: 'PLATÃO CARNÍVORO',
              style: {
                fontSize: '48px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'hero-subtitle',
              type: 'text' as const,
              content: 'FILOSOFIA, CARNE E TRADIÇÃO',
              style: {
                fontSize: '24px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'hero-description',
              type: 'text' as const,
              content: 'Uma curadoria exclusiva de produtos da Amazon para quem valoriza força, disciplina e autenticidade. Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'hero-button',
              type: 'button' as const,
              content: 'ENTRAR NA REVOLUÇÃO',
              style: {
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold' as const
              },
              link: '#produtos'
            },
            {
              id: 'hero-image',
              type: 'image' as const,
              content: '/logo-personagem.png',
              style: {
                textAlign: 'center' as const
              }
            }
          ]
        },
        {
          id: 'products-section',
          name: 'Seção de Produtos',
          elements: [
            {
              id: 'products-title',
              type: 'text' as const,
              content: 'Curadoria Carnívora',
              style: {
                fontSize: '36px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'products-description',
              type: 'text' as const,
              content: 'Produtos cuidadosamente selecionados que refletem os valores de força, disciplina e autenticidade',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            }
          ]
        },
        {
          id: 'philosophy-section',
          name: 'Seção de Filosofia',
          elements: [
            {
              id: 'philosophy-title',
              type: 'text' as const,
              content: 'A Filosofia Platão Carnívoro',
              style: {
                fontSize: '36px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'philosophy-description',
              type: 'text' as const,
              content: '"Conhece-te a ti mesmo" - Sócrates. Nossa curadoria reflete os valores eternos da filosofia clássica aplicados ao mundo moderno.',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            }
          ]
        }
      ]
    };
  }

  // Extrair conteúdo da página Testo1k
  static getTesto1kContent() {
    return {
      title: 'Testo1k',
      sections: [
        {
          id: 'hero-section',
          name: 'Hero Section',
          elements: [
            {
              id: 'product-title',
              type: 'text' as const,
              content: 'TESTO1K - FORÇA E DISCIPLINA',
              style: {
                fontSize: '42px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'product-subtitle',
              type: 'text' as const,
              content: 'O suplemento que vai revolucionar sua rotina',
              style: {
                fontSize: '24px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'product-description',
              type: 'text' as const,
              content: 'O Testo1k é o suplemento ideal para quem busca força, disciplina e resultados consistentes. Formulado com ingredientes de alta qualidade para maximizar seu potencial.',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'product-button',
              type: 'button' as const,
              content: 'COMPRAR AGORA',
              style: {
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold' as const
              },
              link: 'https://amazon.com.br/testo1k'
            }
          ]
        },
        {
          id: 'benefits-section',
          name: 'Seção de Benefícios',
          elements: [
            {
              id: 'benefits-title',
              type: 'text' as const,
              content: 'Por que escolher o Testo1k?',
              style: {
                fontSize: '32px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'benefit-1',
              type: 'text' as const,
              content: '✓ Alimentação Otimizada - Estratégias nutricionais específicas',
              style: {
                fontSize: '16px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'benefit-2',
              type: 'text' as const,
              content: '✓ Treino Inteligente - Exercícios que realmente funcionam',
              style: {
                fontSize: '16px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'benefit-3',
              type: 'text' as const,
              content: '✓ Suplementação Estratégica - Ingredientes de alta qualidade',
              style: {
                fontSize: '16px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            }
          ]
        },
        {
          id: 'pricing-section',
          name: 'Seção de Preços',
          elements: [
            {
              id: 'pricing-title',
              type: 'text' as const,
              content: 'Oferta Especial - Por Tempo Limitado',
              style: {
                fontSize: '28px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'price-original',
              type: 'text' as const,
              content: 'De R$ 197,00',
              style: {
                fontSize: '20px',
                color: '#666666',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'price-current',
              type: 'text' as const,
              content: 'Por apenas R$ 97,00',
              style: {
                fontSize: '32px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'pricing-button',
              type: 'button' as const,
              content: 'GARANTIR MINHA VAGA',
              style: {
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold' as const
              },
              link: 'https://amazon.com.br/testo1k'
            }
          ]
        }
      ]
    };
  }

  // Extrair conteúdo da landing page
  static getLandingContent() {
    return {
      title: 'Landing Page',
      sections: [
        {
          id: 'hero-section',
          name: 'Hero Section',
          elements: [
            {
              id: 'landing-title',
              type: 'text' as const,
              content: 'TRANSFORME SUA VIDA HOJE',
              style: {
                fontSize: '48px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'landing-subtitle',
              type: 'text' as const,
              content: 'Descubra o segredo que está mudando vidas',
              style: {
                fontSize: '24px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'landing-description',
              type: 'text' as const,
              content: 'Descubra os produtos que vão revolucionar sua rotina e te ajudar a alcançar seus objetivos com mais eficiência e disciplina.',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'landing-button',
              type: 'button' as const,
              content: 'COMEÇAR AGORA',
              style: {
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold' as const
              },
              link: '#form'
            }
          ]
        },
        {
          id: 'features-section',
          name: 'Seção de Recursos',
          elements: [
            {
              id: 'features-title',
              type: 'text' as const,
              content: 'O que você vai receber:',
              style: {
                fontSize: '32px',
                color: '#1a1a1a',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'feature-1',
              type: 'text' as const,
              content: '🎯 Guia Completo de Transformação',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'feature-2',
              type: 'text' as const,
              content: '💪 Estratégias Comprovadas',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'feature-3',
              type: 'text' as const,
              content: '🚀 Resultados em 30 Dias',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'left' as const,
                fontWeight: 'normal' as const
              }
            }
          ]
        },
        {
          id: 'cta-section',
          name: 'Seção de Call-to-Action',
          elements: [
            {
              id: 'cta-title',
              type: 'text' as const,
              content: 'Não perca esta oportunidade única!',
              style: {
                fontSize: '28px',
                color: '#8B4513',
                textAlign: 'center' as const,
                fontWeight: 'bold' as const
              }
            },
            {
              id: 'cta-description',
              type: 'text' as const,
              content: 'Garanta sua vaga agora e comece sua transformação hoje mesmo.',
              style: {
                fontSize: '18px',
                color: '#2c2c2c',
                textAlign: 'center' as const,
                fontWeight: 'normal' as const
              }
            },
            {
              id: 'cta-button',
              type: 'button' as const,
              content: 'QUERO MINHA VAGA',
              style: {
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold' as const
              },
              link: '#form'
            }
          ]
        }
      ]
    };
  }

  // Método principal para obter conteúdo baseado no pageId
  static getPageContent(pageId: string) {
    switch (pageId) {
      case 'home':
        return this.getHomePageContent();
      case 'testo1k':
        return this.getTesto1kContent();
      case 'landing':
        return this.getLandingContent();
      default:
        return this.getHomePageContent();
    }
  }

  // Salvar conteúdo (simular salvamento)
  static savePageContent(pageId: string, content: any): boolean {
    try {
      // Em produção, salvaria no banco de dados
      localStorage.setItem(`real-page-content-${pageId}`, JSON.stringify(content));
      console.log('Conteúdo salvo:', content);
      return true;
    } catch (error) {
      console.error('Erro ao salvar:', error);
      return false;
    }
  }
}
