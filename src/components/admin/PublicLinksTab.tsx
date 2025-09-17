import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  ExternalLink,
  Save,
  RefreshCw,
  Link as LinkIcon,
  ShoppingBag,
  TestTube
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePublicLinks } from '@/hooks/usePublicLinks';
import { PublicLink } from '@/services/publicLinksService';

// Usar a interface do serviço

const PublicLinksTab: React.FC = () => {
  const { toast } = useToast();
  const { 
    links, 
    isLoading, 
    updateLink, 
    updateAllLinks, 
    resetToDefaults,
    forceReload,
    clearAndReload
  } = usePublicLinks();
  const [isSaving, setIsSaving] = useState(false);

  // Função para obter ícone baseado no nome
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'shopping-bag': return <ShoppingBag className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  const saveLinks = async () => {
    setIsSaving(true);
    try {
      updateAllLinks(links);
      
      toast({
        title: "Links salvos com sucesso!",
        description: "Todos os links públicos foram atualizados.",
      });
    } catch (error) {
      console.error('Erro ao salvar links:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os links. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLinkUpdate = (id: string, field: keyof PublicLink, value: string) => {
    const success = updateLink(id, { [field]: value });
    if (success) {
      toast({
        title: "Link atualizado!",
        description: "O link foi atualizado com sucesso.",
      });
    }
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    toast({
      title: "Links resetados",
      description: "Todos os links foram restaurados para os valores padrão.",
    });
  };

  const testLink = (url: string) => {
    if (url.startsWith('/')) {
      // Link interno
      window.open(url, '_blank');
    } else {
      // Link externo
      window.open(url, '_blank');
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-brown" />
          <p className="text-gray-600">Carregando links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-brand-brown" />
            Links Públicos
          </CardTitle>
          <CardDescription>
            Gerencie todos os links públicos do site, incluindo redes sociais e produtos.
            As alterações serão aplicadas imediatamente em todo o site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button 
              onClick={saveLinks} 
              disabled={isSaving}
              className="bg-brand-brown hover:bg-brand-brown/90 text-white"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
            <Button 
              variant="outline" 
              onClick={handleResetToDefaults}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                forceReload();
                toast({
                  title: "Links recarregados!",
                  description: "Os links foram forçados a recarregar.",
                });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Forçar Recarga
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                clearAndReload();
                toast({
                  title: "LocalStorage limpo!",
                  description: "LocalStorage foi limpo e links recarregados.",
                });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links Principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-brand-brown" />
            Links Principais do Site
          </CardTitle>
          <CardDescription>
            Gerencie os links mais importantes do site - Instagram e Testo1k
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {links.map((link) => (
            <div key={link.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${link.category === 'social' ? 'bg-blue-50' : 'bg-green-50'}`}>
                  {getIcon(link.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{link.name}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testLink(link.url)}
                  className="shrink-0"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Testar
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`${link.id}-url`} className="text-sm font-medium">
                    URL do Link
                  </Label>
                  <Input
                    id={`${link.id}-url`}
                    value={link.url}
                    onChange={(e) => handleLinkUpdate(link.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
};

export default PublicLinksTab;
