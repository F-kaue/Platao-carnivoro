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
import { publicLinksService, PublicLink } from '@/services/publicLinksService';

// Usar a interface do serviço

const PublicLinksTab: React.FC = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<PublicLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Função para obter ícone baseado no nome
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'shopping-bag': return <ShoppingBag className="w-5 h-5" />;
      case 'test-tube': return <TestTube className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
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

  const saveLinks = async () => {
    setIsSaving(true);
    try {
      publicLinksService.updateAllLinks(links);
      
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

  const updateLink = (id: string, field: keyof PublicLink, value: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const resetToDefaults = () => {
    publicLinksService.resetToDefaults();
    const defaultLinks = publicLinksService.getAllLinks();
    setLinks(defaultLinks);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'product': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <LinkIcon className="w-4 h-4" />;
      case 'product': return <ShoppingBag className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
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
              onClick={resetToDefaults}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links por categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redes Sociais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <LinkIcon className="w-5 h-5" />
              Redes Sociais
            </CardTitle>
            <CardDescription>
              Links para as redes sociais oficiais do Platão Carnívoro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {links.filter(link => link.category === 'social').map((link) => (
              <div key={link.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {getIcon(link.icon)}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${link.id}-name`} className="font-medium">
                      {link.name}
                    </Label>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testLink(link.url)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`${link.id}-url`}>URL</Label>
                    <Input
                      id={`${link.id}-url`}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${link.id}-description`}>Descrição</Label>
                    <Textarea
                      id={`${link.id}-description`}
                      value={link.description}
                      onChange={(e) => updateLink(link.id, 'description', e.target.value)}
                      rows={2}
                      placeholder="Descrição do link..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <ShoppingBag className="w-5 h-5" />
              Produtos
            </CardTitle>
            <CardDescription>
              Links para produtos e páginas de vendas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {links.filter(link => link.category === 'product').map((link) => (
              <div key={link.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    {getIcon(link.icon)}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${link.id}-name`} className="font-medium">
                      {link.name}
                    </Label>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testLink(link.url)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`${link.id}-url`}>URL</Label>
                    <Input
                      id={`${link.id}-url`}
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://... ou /página"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${link.id}-description`}>Descrição</Label>
                    <Textarea
                      id={`${link.id}-description`}
                      value={link.description}
                      onChange={(e) => updateLink(link.id, 'description', e.target.value)}
                      rows={2}
                      placeholder="Descrição do produto..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preview dos links */}
      <Card>
        <CardHeader>
          <CardTitle>Preview dos Links</CardTitle>
          <CardDescription>
            Visualize como os links aparecerão no site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {links.map((link) => (
              <div key={link.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1 rounded ${getCategoryColor(link.category)}`}>
                    {getCategoryIcon(link.category)}
                  </div>
                  <span className="font-medium text-sm">{link.name}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{link.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-600 truncate flex-1">{link.url}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => testLink(link.url)}
                    className="h-6 w-6 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicLinksTab;
