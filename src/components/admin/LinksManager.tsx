import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  ExternalLink, 
  Instagram, 
  Youtube, 
  MessageCircle,
  ShoppingCart,
  Link as LinkIcon,
  Globe,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

// Interface para links
interface SiteLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'social' | 'product' | 'navigation';
  icon: string;
  isActive: boolean;
  targetBlank: boolean;
}

// Links padrão do site
const DEFAULT_LINKS: SiteLink[] = [
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

export function LinksManager() {
  const [links, setLinks] = useState<SiteLink[]>(DEFAULT_LINKS);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<SiteLink>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Carregar links salvos do localStorage
  useEffect(() => {
    const savedLinks = localStorage.getItem('site-links');
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks);
        setLinks(parsedLinks);
      } catch (error) {
        console.error('Erro ao carregar links salvos:', error);
      }
    }
  }, []);

  // Salvar links no localStorage
  const saveLinks = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('site-links', JSON.stringify(links));
      toast.success('Links salvos com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar links');
    } finally {
      setIsSaving(false);
    }
  };

  // Iniciar edição de link
  const startEditing = (linkId: string) => {
    const link = links.find(l => l.id === linkId);
    if (link) {
      setEditingLink(linkId);
      setEditValues(link);
    }
  };

  // Salvar edição de link
  const saveEdit = () => {
    if (editingLink && editValues) {
      setLinks(prev => prev.map(link => 
        link.id === editingLink 
          ? { ...link, ...editValues }
          : link
      ));
      setEditingLink(null);
      setEditValues({});
      toast.success('Link atualizado!');
    }
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingLink(null);
    setEditValues({});
  };

  // Copiar link para clipboard
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copiado!');
  };

  // Testar link
  const testLink = (url: string, targetBlank: boolean) => {
    if (targetBlank) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  };

  // Obter ícone do link
  const getLinkIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Youtube': return <Youtube className="w-4 h-4" />;
      case 'MessageCircle': return <MessageCircle className="w-4 h-4" />;
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  // Obter cor do badge por categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-pink-100 text-pink-800';
      case 'product': return 'bg-green-100 text-green-800';
      case 'navigation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtrar links por categoria
  const socialLinks = links.filter(link => link.category === 'social');
  const productLinks = links.filter(link => link.category === 'product');
  const navigationLinks = links.filter(link => link.category === 'navigation');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gerenciador de Links</h2>
          <p className="text-muted-foreground">
            Gerencie todos os links públicos do site: redes sociais, produtos e navegação
          </p>
        </div>
        <Button 
          onClick={saveLinks} 
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Salvando...' : 'Salvar Todos'}
        </Button>
      </div>

      {/* Tabs para categorias */}
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Redes Sociais ({socialLinks.length})
          </TabsTrigger>
          <TabsTrigger value="product" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Produtos ({productLinks.length})
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Navegação ({navigationLinks.length})
          </TabsTrigger>
        </TabsList>

        {/* Redes Sociais */}
        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4">
            {socialLinks.map((link) => (
              <Card key={link.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getLinkIcon(link.icon)}
                      <div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(link.category)}>
                        {link.category}
                      </Badge>
                      {link.isActive ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingLink === link.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={editValues.title || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={editValues.url || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://exemplo.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={editValues.description || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.isActive ?? true}
                            onChange={(e) => setEditValues(prev => ({ ...prev, isActive: e.target.checked }))}
                          />
                          <span className="text-sm">Ativo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.targetBlank ?? false}
                            onChange={(e) => setEditValues(prev => ({ ...prev, targetBlank: e.target.checked }))}
                          />
                          <span className="text-sm">Abrir em nova aba</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-sm flex-1">{link.url}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(link.url)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => testLink(link.url, link.targetBlank)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEditing(link.id)}
                          variant="outline"
                          size="sm"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => testLink(link.url, link.targetBlank)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Testar Link
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Produtos */}
        <TabsContent value="product" className="space-y-4">
          <div className="grid gap-4">
            {productLinks.map((link) => (
              <Card key={link.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getLinkIcon(link.icon)}
                      <div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(link.category)}>
                        {link.category}
                      </Badge>
                      {link.isActive ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingLink === link.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={editValues.title || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={editValues.url || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://exemplo.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={editValues.description || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.isActive ?? true}
                            onChange={(e) => setEditValues(prev => ({ ...prev, isActive: e.target.checked }))}
                          />
                          <span className="text-sm">Ativo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.targetBlank ?? false}
                            onChange={(e) => setEditValues(prev => ({ ...prev, targetBlank: e.target.checked }))}
                          />
                          <span className="text-sm">Abrir em nova aba</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-sm flex-1">{link.url}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(link.url)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => testLink(link.url, link.targetBlank)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEditing(link.id)}
                          variant="outline"
                          size="sm"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => testLink(link.url, link.targetBlank)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Testar Link
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Navegação */}
        <TabsContent value="navigation" className="space-y-4">
          <div className="grid gap-4">
            {navigationLinks.map((link) => (
              <Card key={link.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getLinkIcon(link.icon)}
                      <div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(link.category)}>
                        {link.category}
                      </Badge>
                      {link.isActive ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingLink === link.id ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={editValues.title || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={editValues.url || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://exemplo.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={editValues.description || ''}
                          onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.isActive ?? true}
                            onChange={(e) => setEditValues(prev => ({ ...prev, isActive: e.target.checked }))}
                          />
                          <span className="text-sm">Ativo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editValues.targetBlank ?? false}
                            onChange={(e) => setEditValues(prev => ({ ...prev, targetBlank: e.target.checked }))}
                          />
                          <span className="text-sm">Abrir em nova aba</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                        <span className="font-mono text-sm flex-1">{link.url}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(link.url)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => testLink(link.url, link.targetBlank)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEditing(link.id)}
                          variant="outline"
                          size="sm"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => testLink(link.url, link.targetBlank)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Testar Link
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Resumo */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Resumo dos Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{socialLinks.length}</div>
              <div className="text-green-700">Redes Sociais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{productLinks.length}</div>
              <div className="text-green-700">Links de Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{navigationLinks.length}</div>
              <div className="text-green-700">Links de Navegação</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
