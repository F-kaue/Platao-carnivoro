import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Tipos
interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface NavigationLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  position: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ContentBlock {
  id: string;
  key: string;
  title: string;
  content: string;
  type: string;
  page: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface NewsletterBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Função genérica para fazer requisições
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Usar a URL atual do site para evitar problemas de CORS
  const baseUrl = window.location.origin;
  
  const response = await fetch(`${baseUrl}/api/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Hook para configurações do site
export function useSiteSettings() {
  const [data, setData] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<{ success: boolean; data: SiteSetting[] }>('site-settings');
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar configurações:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id: string, updates: Partial<SiteSetting>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: SiteSetting }>('site-settings', {
        method: 'PUT',
        body: JSON.stringify({ id, ...updates }),
      });

      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...response.data } : item
      ));

      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar configuração:', err);
      throw err;
    }
  };

  const createSetting = async (setting: Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: SiteSetting }>('site-settings', {
        method: 'POST',
        body: JSON.stringify(setting),
      });

      setData(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Erro ao criar configuração:', err);
      throw err;
    }
  };

  const deleteSetting = async (id: string) => {
    try {
      await apiRequest('site-settings', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao deletar configuração:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateSetting,
    createSetting,
    deleteSetting,
  };
}

// Hook para links de navegação
export function useNavigationLinks() {
  const [data, setData] = useState<NavigationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<{ success: boolean; data: NavigationLink[] }>('navigation');
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar links:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async (id: string, updates: Partial<NavigationLink>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: NavigationLink }>('navigation', {
        method: 'PUT',
        body: JSON.stringify({ id, ...updates }),
      });

      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...response.data } : item
      ));

      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar link:', err);
      throw err;
    }
  };

  const createLink = async (link: Omit<NavigationLink, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: NavigationLink }>('navigation', {
        method: 'POST',
        body: JSON.stringify(link),
      });

      setData(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Erro ao criar link:', err);
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await apiRequest('navigation', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao deletar link:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateLink,
    createLink,
    deleteLink,
  };
}

// Hook para blocos de conteúdo
export function useContentBlocks() {
  const [data, setData] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<{ success: boolean; data: ContentBlock[] }>('content-blocks');
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar blocos:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBlock = async (id: string, updates: Partial<ContentBlock>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: ContentBlock }>('content-blocks', {
        method: 'PUT',
        body: JSON.stringify({ id, ...updates }),
      });

      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...response.data } : item
      ));

      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar bloco:', err);
      throw err;
    }
  };

  const createBlock = async (block: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: ContentBlock }>('content-blocks', {
        method: 'POST',
        body: JSON.stringify(block),
      });

      setData(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Erro ao criar bloco:', err);
      throw err;
    }
  };

  const deleteBlock = async (id: string) => {
    try {
      await apiRequest('content-blocks', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao deletar bloco:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateBlock,
    createBlock,
    deleteBlock,
  };
}

// Hook para benefícios do newsletter
export function useNewsletterBenefits() {
  const [data, setData] = useState<NewsletterBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<{ success: boolean; data: NewsletterBenefit[] }>('newsletter-benefits');
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar benefícios:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBenefit = async (id: string, updates: Partial<NewsletterBenefit>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: NewsletterBenefit }>('newsletter-benefits', {
        method: 'PUT',
        body: JSON.stringify({ id, ...updates }),
      });

      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...response.data } : item
      ));

      return response.data;
    } catch (err) {
      console.error('Erro ao atualizar benefício:', err);
      throw err;
    }
  };

  const createBenefit = async (benefit: Omit<NewsletterBenefit, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiRequest<{ success: boolean; data: NewsletterBenefit }>('newsletter-benefits', {
        method: 'POST',
        body: JSON.stringify(benefit),
      });

      setData(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Erro ao criar benefício:', err);
      throw err;
    }
  };

  const deleteBenefit = async (id: string) => {
    try {
      await apiRequest('newsletter-benefits', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erro ao deletar benefício:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateBenefit,
    createBenefit,
    deleteBenefit,
  };
}

// Hook para conteúdo específico do Testo1k
export function useTesto1kContent() {
  const { data: contentBlocks, ...rest } = useContentBlocks();
  
  const testo1kContent = contentBlocks?.filter(block => 
    block.page === 'testo1k' || block.page === 'testo1k/landing'
  ) || [];

  return {
    data: testo1kContent,
    ...rest,
  };
}