import { useState, useEffect } from 'react';

// Tipos para o CMS
export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface NavigationLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  position: number;
  location: 'header' | 'footer' | 'social';
  is_active: boolean;
  target_blank: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  key: string;
  title?: string;
  content: string;
  type: 'text' | 'html' | 'markdown';
  section: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Hook para configurações do site
export function useSiteSettings(category?: string) {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, [category]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const url = category 
        ? `/api/site-settings?category=${category}`
        : '/api/site-settings';
      
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setSettings(result.data);
        setError(null);
      } else {
        setError(result.error || 'Erro ao carregar configurações');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar configurações:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string): string => {
    const setting = settings.find(s => s.key === key);
    return setting?.value || '';
  };

  const updateSetting = async (id: string, data: Partial<SiteSetting>) => {
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data })
      });

      const result = await response.json();
      if (result.success) {
        await fetchSettings(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  return {
    settings,
    loading,
    error,
    getSetting,
    updateSetting,
    refetch: fetchSettings
  };
}

// Hook para links de navegação
export function useNavigation(location?: string) {
  const [links, setLinks] = useState<NavigationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, [location]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const url = location 
        ? `/api/navigation?location=${location}&is_active=true`
        : '/api/navigation?is_active=true';
      
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setLinks(result.data);
        setError(null);
      } else {
        setError(result.error || 'Erro ao carregar links');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar links:', err);
    } finally {
      setLoading(false);
    }
  };

  const createLink = async (data: Omit<NavigationLink, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        await fetchLinks(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const updateLink = async (id: string, data: Partial<NavigationLink>) => {
    try {
      const response = await fetch('/api/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data })
      });

      const result = await response.json();
      if (result.success) {
        await fetchLinks(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const response = await fetch(`/api/navigation?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        await fetchLinks(); // Recarregar dados
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  return {
    links,
    loading,
    error,
    createLink,
    updateLink,
    deleteLink,
    refetch: fetchLinks
  };
}

// Hook para blocos de conteúdo
export function useContentBlocks(section?: string) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlocks();
  }, [section]);

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const url = section 
        ? `/api/content-blocks?section=${section}&is_active=true`
        : '/api/content-blocks?is_active=true';
      
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setBlocks(result.data);
        setError(null);
      } else {
        setError(result.error || 'Erro ao carregar blocos de conteúdo');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar blocos de conteúdo:', err);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string): string => {
    const block = blocks.find(b => b.key === key);
    return block?.content || '';
  };

  const updateContent = async (id: string, data: Partial<ContentBlock>) => {
    try {
      const response = await fetch('/api/content-blocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data })
      });

      const result = await response.json();
      if (result.success) {
        await fetchBlocks(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  return {
    blocks,
    loading,
    error,
    getContent,
    updateContent,
    refetch: fetchBlocks
  };
}

// Hook para benefícios do newsletter
export function useNewsletterBenefits() {
  const [benefits, setBenefits] = useState<NewsletterBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter-benefits?is_active=true');
      const result = await response.json();

      if (result.success) {
        setBenefits(result.data);
        setError(null);
      } else {
        setError(result.error || 'Erro ao carregar benefícios');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao buscar benefícios:', err);
    } finally {
      setLoading(false);
    }
  };

  const createBenefit = async (data: Omit<NewsletterBenefit, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/newsletter-benefits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        await fetchBenefits(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const updateBenefit = async (id: string, data: Partial<NewsletterBenefit>) => {
    try {
      const response = await fetch('/api/newsletter-benefits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data })
      });

      const result = await response.json();
      if (result.success) {
        await fetchBenefits(); // Recarregar dados
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const deleteBenefit = async (id: string) => {
    try {
      const response = await fetch(`/api/newsletter-benefits?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        await fetchBenefits(); // Recarregar dados
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Erro de conexão' };
    }
  };

  return {
    benefits,
    loading,
    error,
    createBenefit,
    updateBenefit,
    deleteBenefit,
    refetch: fetchBenefits
  };
}
