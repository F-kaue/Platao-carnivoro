import { useState, useEffect } from 'react';
import { publicLinksService, PublicLink } from '@/services/publicLinksService';

export const usePublicLinks = () => {
  const [links, setLinks] = useState<PublicLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadLinks = () => {
    setIsLoading(true);
    try {
      const allLinks = publicLinksService.getAllLinks();
      setLinks(allLinks);
    } catch (error) {
      console.error('Erro ao carregar links:', error);
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLink = (id: string, updates: Partial<PublicLink>) => {
    const success = publicLinksService.updateLink(id, updates);
    if (success) {
      loadLinks(); // Recarregar após atualização
    }
    return success;
  };

  const updateAllLinks = (newLinks: PublicLink[]) => {
    publicLinksService.updateAllLinks(newLinks);
    loadLinks(); // Recarregar após atualização
  };

  const resetToDefaults = () => {
    publicLinksService.resetToDefaults();
    loadLinks(); // Recarregar após reset
  };

  const getLinkUrl = (id: string): string => {
    return publicLinksService.getUrl(id);
  };

  const getInstagramUrl = (): string => {
    return publicLinksService.getInstagramUrl();
  };

  const getTesto1kProductUrl = (): string => {
    return publicLinksService.getTesto1kProductUrl();
  };

  const forceReload = () => {
    publicLinksService.forceReload();
    loadLinks();
  };

  const clearAndReload = () => {
    publicLinksService.clearAndReload();
    loadLinks();
  };

  useEffect(() => {
    loadLinks();
  }, []);

  return {
    links,
    isLoading,
    loadLinks,
    updateLink,
    updateAllLinks,
    resetToDefaults,
    getLinkUrl,
    getInstagramUrl,
    getTesto1kProductUrl,
    forceReload,
    clearAndReload
  };
};
