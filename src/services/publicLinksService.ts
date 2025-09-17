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
      description: 'Link do botão "SEGUIR E JUNTAR-SE À REVOLUÇÃO"',
      url: 'https://www.instagram.com/plataocarnivoro/',
      icon: 'instagram',
      category: 'social'
    },
    {
      id: 'testo1k-product',
      name: 'Testo1k - Produto',
      description: 'Link para TODOS os botões da landing page (/testo1k/landing)',
      url: 'https://chk.eduzz.com/Z0BBQ1360A?a=35814376',
      icon: 'shopping-bag',
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
      console.log('Loading links from localStorage:', savedLinks);
      if (savedLinks) {
        this.links = JSON.parse(savedLinks);
        console.log('Loaded links:', this.links);
      } else {
        this.links = [...this.defaultLinks];
        console.log('Using default links:', this.links);
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


  public getTesto1kProductUrl(): string {
    const url = this.getUrl('testo1k-product');
    console.log('getTesto1kProductUrl called, returning:', url);
    return url;
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


export const getTesto1kProductUrl = (): string => {
  return publicLinksService.getTesto1kProductUrl();
};
