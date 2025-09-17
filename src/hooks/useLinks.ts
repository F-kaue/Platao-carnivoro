import { useState, useEffect } from 'react';

// Interface para links
export interface SiteLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'social' | 'product' | 'navigation';
  icon: string;
  isActive: boolean;
  targetBlank: boolean;
}

// Hook para gerenciar links do site
export function useLinks() {
  const [links, setLinks] = useState<SiteLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar links do localStorage
  const loadLinks = () => {
    try {
      const savedLinks = localStorage.getItem('site-links');
      if (savedLinks) {
        const parsedLinks = JSON.parse(savedLinks);
        setLinks(parsedLinks);
      } else {
        // Usar links padrão se não houver salvos
        const defaultLinks: SiteLink[] = [
          // Redes Sociais
          {
            id: 'instagram',
            title: 'Instagram',
            url: 'https://www.instagram.com/plataocarnivoro/',
            description: 'Siga nossa jornada de despertar e transformação no Instagram',
            category: 'social',
            icon: 'Instagram',
            isActive: true,
            targetBlank: true
          },
          {
            id: 'youtube',
            title: 'YouTube',
            url: 'https://youtube.com/@plataocarnivoro',
            description: 'Canal no YouTube com conteúdo sobre filosofia e carnívorismo',
            category: 'social',
            icon: 'Youtube',
            isActive: true,
            targetBlank: true
          },
          {
            id: 'whatsapp',
            title: 'WhatsApp',
            url: 'https://wa.me/5511999999999',
            description: 'Entre em contato conosco via WhatsApp',
            category: 'social',
            icon: 'MessageCircle',
            isActive: true,
            targetBlank: true
          },
          
          // Links de Produtos
          {
            id: 'testo1k-amazon',
            title: 'Testo1k na Amazon',
            url: 'https://amazon.com.br/testo1k',
            description: 'Link direto para comprar o Testo1k na Amazon',
            category: 'product',
            icon: 'ShoppingCart',
            isActive: true,
            targetBlank: true
          },
          {
            id: 'testo1k-landing',
            title: 'Página Testo1k',
            url: '/testo1k',
            description: 'Página principal do produto Testo1k',
            category: 'product',
            icon: 'Globe',
            isActive: true,
            targetBlank: false
          },
          {
            id: 'testo1k-landing-page',
            title: 'Landing Page Testo1k',
            url: '/testo1k/landing',
            description: 'Landing page de conversão do Testo1k',
            category: 'product',
            icon: 'Globe',
            isActive: true,
            targetBlank: false
          },
          
          // Navegação
          {
            id: 'home',
            title: 'Página Inicial',
            url: '/',
            description: 'Link para a página inicial do site',
            category: 'navigation',
            icon: 'Globe',
            isActive: true,
            targetBlank: false
          },
          {
            id: 'admin',
            title: 'Painel Admin',
            url: '/admin',
            description: 'Acesso ao painel administrativo',
            category: 'navigation',
            icon: 'Globe',
            isActive: true,
            targetBlank: false
          }
        ];
        setLinks(defaultLinks);
      }
    } catch (err) {
      setError('Erro ao carregar links');
      console.error('Erro ao carregar links:', err);
    } finally {
      setLoading(false);
    }
  };

  // Salvar links no localStorage
  const saveLinks = async (newLinks: SiteLink[]) => {
    try {
      localStorage.setItem('site-links', JSON.stringify(newLinks));
      setLinks(newLinks);
      return true;
    } catch (err) {
      setError('Erro ao salvar links');
      console.error('Erro ao salvar links:', err);
      return false;
    }
  };

  // Atualizar um link específico
  const updateLink = (linkId: string, updates: Partial<SiteLink>) => {
    const updatedLinks = links.map(link => 
      link.id === linkId ? { ...link, ...updates } : link
    );
    setLinks(updatedLinks);
    saveLinks(updatedLinks);
  };

  // Obter link por ID
  const getLinkById = (linkId: string): SiteLink | undefined => {
    return links.find(link => link.id === linkId);
  };

  // Obter links por categoria
  const getLinksByCategory = (category: 'social' | 'product' | 'navigation'): SiteLink[] => {
    return links.filter(link => link.category === category && link.isActive);
  };

  // Obter todos os links ativos
  const getActiveLinks = (): SiteLink[] => {
    return links.filter(link => link.isActive);
  };

  // Carregar links na inicialização
  useEffect(() => {
    loadLinks();
  }, []);

  return {
    links,
    loading,
    error,
    saveLinks,
    updateLink,
    getLinkById,
    getLinksByCategory,
    getActiveLinks,
    loadLinks
  };
}
