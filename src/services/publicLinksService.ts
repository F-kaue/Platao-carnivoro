// Serviço para gerenciar links públicos do site
export interface PublicLink {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: 'social' | 'product' | 'other';
}

class PublicLinksService {
  private static instance: PublicLinksService;
  private links: PublicLink[] = [];

  // Links padrão com valores atuais do site
  private defaultLinks: PublicLink[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Siga nossa jornada de despertar e transformação no Instagram',
      url: 'https://www.instagram.com/plataocarnivoro/',
      icon: 'instagram',
      category: 'social'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Canal oficial com vídeos sobre filosofia, carne e tradição',
      url: 'https://www.youtube.com/@plataocarnivoro',
      icon: 'youtube',
      category: 'social'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Página oficial no Facebook',
      url: 'https://www.facebook.com/plataocarnivoro',
      icon: 'facebook',
      category: 'social'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Acompanhe nossas atualizações no Twitter',
      url: 'https://twitter.com/plataocarnivoro',
      icon: 'twitter',
      category: 'social'
    },
    {
      id: 'testo1k-amazon',
      name: 'Testo1k - Amazon',
      description: 'Link direto para comprar o Testo1k na Amazon',
      url: 'https://amazon.com.br/testo1k',
      icon: 'shopping-bag',
      category: 'product'
    },
    {
      id: 'testo1k-landing',
      name: 'Testo1k - Landing Page',
      description: 'Página de vendas do Testo1k',
      url: '/testo1k/landing',
      icon: 'test-tube',
      category: 'product'
    }
  ];

  private constructor() {
    this.loadLinks();
  }

  public static getInstance(): PublicLinksService {
    if (!PublicLinksService.instance) {
      PublicLinksService.instance = new PublicLinksService();
    }
    return PublicLinksService.instance;
  }

  // Carregar links salvos ou usar padrões
  private loadLinks(): void {
    try {
      const savedLinks = localStorage.getItem('public-links');
      if (savedLinks) {
        this.links = JSON.parse(savedLinks);
      } else {
        this.links = [...this.defaultLinks];
        this.saveLinks();
      }
    } catch (error) {
      console.error('Erro ao carregar links:', error);
      this.links = [...this.defaultLinks];
    }
  }

  // Salvar links no localStorage
  private saveLinks(): void {
    try {
      localStorage.setItem('public-links', JSON.stringify(this.links));
    } catch (error) {
      console.error('Erro ao salvar links:', error);
    }
  }

  // Obter todos os links
  public getAllLinks(): PublicLink[] {
    return [...this.links];
  }

  // Obter links por categoria
  public getLinksByCategory(category: 'social' | 'product' | 'other'): PublicLink[] {
    return this.links.filter(link => link.category === category);
  }

  // Obter link específico por ID
  public getLinkById(id: string): PublicLink | undefined {
    return this.links.find(link => link.id === id);
  }

  // Atualizar link
  public updateLink(id: string, updates: Partial<PublicLink>): boolean {
    const linkIndex = this.links.findIndex(link => link.id === id);
    if (linkIndex !== -1) {
      this.links[linkIndex] = { ...this.links[linkIndex], ...updates };
      this.saveLinks();
      return true;
    }
    return false;
  }

  // Atualizar todos os links
  public updateAllLinks(links: PublicLink[]): void {
    this.links = [...links];
    this.saveLinks();
  }

  // Resetar para links padrão
  public resetToDefaults(): void {
    this.links = [...this.defaultLinks];
    this.saveLinks();
  }

  // Obter URL específica por ID
  public getUrl(id: string): string {
    const link = this.getLinkById(id);
    return link ? link.url : '';
  }

  // Métodos específicos para links importantes
  public getInstagramUrl(): string {
    return this.getUrl('instagram');
  }

  public getYouTubeUrl(): string {
    return this.getUrl('youtube');
  }

  public getFacebookUrl(): string {
    return this.getUrl('facebook');
  }

  public getTwitterUrl(): string {
    return this.getUrl('twitter');
  }

  public getTesto1kAmazonUrl(): string {
    return this.getUrl('testo1k-amazon');
  }

  public getTesto1kLandingUrl(): string {
    return this.getUrl('testo1k-landing');
  }
}

// Exportar instância singleton
export const publicLinksService = PublicLinksService.getInstance();

// Funções utilitárias para uso direto nos componentes
export const getPublicLink = (id: string): string => {
  return publicLinksService.getUrl(id);
};

export const getInstagramUrl = (): string => {
  return publicLinksService.getInstagramUrl();
};

export const getYouTubeUrl = (): string => {
  return publicLinksService.getYouTubeUrl();
};

export const getFacebookUrl = (): string => {
  return publicLinksService.getFacebookUrl();
};

export const getTwitterUrl = (): string => {
  return publicLinksService.getTwitterUrl();
};

export const getTesto1kAmazonUrl = (): string => {
  return publicLinksService.getTesto1kAmazonUrl();
};

export const getTesto1kLandingUrl = (): string => {
  return publicLinksService.getTesto1kLandingUrl();
};
