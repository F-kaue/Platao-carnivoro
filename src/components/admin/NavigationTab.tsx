import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigation } from '@/hooks/useCMS';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Edit, Navigation, Menu, Share2, ExternalLink } from 'lucide-react';

export function NavigationTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('header');
  
  // Hooks para dados
  const { links, loading, createLink, updateLink, deleteLink } = useNavigation();
  
  // Estados para formulários
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: '',
    position: 0,
    location: 'header' as 'header' | 'footer' | 'social',
    is_active: true,
    target_blank: false
  });

  const iconOptions = [
    'Package', 'BookOpen', 'Mail', 'Instagram', 'MessageCircle', 'Facebook',
    'Twitter', 'Youtube', 'Linkedin', 'ExternalLink', 'Home', 'User',
    'Settings', 'Search', 'Heart', 'Star', 'Crown', 'Shield'
  ];

  const handleSaveLink = async () => {
    if (!formData.title || !formData.url) {
      toast({
        title: "Erro",
        description: "Título e URL são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const result = editingLink 
      ? await updateLink(editingLink, formData)
      : await createLink(formData);
    
    if (result.success) {
      toast({
        title: editingLink ? "Link atualizado" : "Link criado",
        description: `O link foi ${editingLink ? 'atualizado' : 'criado'} com sucesso.`,
      });
      resetForm();
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao salvar link",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este link?')) {
      const result = await deleteLink(id);
      if (result.success) {
        toast({
          title: "Link deletado",
          description: "O link foi removido com sucesso.",
        });
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao deletar link",
          variant: "destructive",
        });
      }
    }
  };

  const startEditLink = (link: any) => {
    setEditingLink(link.id);
    setIsCreating(false);
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon || '',
      position: link.position,
      location: link.location,
      is_active: link.is_active,
      target_blank: link.target_blank
    });
  };

  const startCreateLink = (location: 'header' | 'footer' | 'social') => {
    setEditingLink(null);
    setIsCreating(true);
    setFormData({
      title: '',
      url: '',
      icon: '',
      position: 0,
      location,
      is_active: true,
      target_blank: false
    });
  };

  const resetForm = () => {
    setEditingLink(null);
    setIsCreating(false);
    setFormData({
      title: '',
      url: '',
      icon: '',
      position: 0,
      location: 'header',
      is_active: true,
      target_blank: false
    });
  };

  const getLinksByLocation = (location: string) => {
    return links.filter(link => link.location === location).sort((a, b) => a.position - b.position);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-green-gray">Carregando links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Navigation className="w-6 h-6 text-brand-brown" />
        <h2 className="text-2xl font-diogenes font-bold text-foreground">
          Links de Navegação
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header" className="flex items-center gap-2">
            <Menu className="w-4 h-4" />
            Menu Principal
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Footer
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Redes Sociais
          </TabsTrigger>
        </TabsList>

        {/* Aba Menu Principal */}
        <TabsContent value="header" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Menu Principal</CardTitle>
                <CardDescription>
                  Links que aparecem no menu de navegação do site
                </CardDescription>
              </div>
              <Button 
                onClick={() => startCreateLink('header')}
                className="bg-brand-brown hover:bg-brand-green-gray"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {getLinksByLocation('header').map((link) => (
                <div key={link.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="font-augustus font-semibold text-brand-green-gray">
                        {link.title}
                      </Label>
                      {!link.is_active && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground mt-1">{link.url}</p>
                    <p className="text-xs text-brand-green-gray/70">
                      Posição: {link.position} | Ícone: {link.icon || 'Nenhum'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditLink(link)}
                      className="text-brand-brown hover:text-brand-green-gray"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Footer */}
        <TabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Links do Footer</CardTitle>
                <CardDescription>
                  Links que aparecem no rodapé do site
                </CardDescription>
              </div>
              <Button 
                onClick={() => startCreateLink('footer')}
                className="bg-brand-brown hover:bg-brand-green-gray"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {getLinksByLocation('footer').map((link) => (
                <div key={link.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="font-augustus font-semibold text-brand-green-gray">
                        {link.title}
                      </Label>
                      {!link.is_active && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground mt-1">{link.url}</p>
                    <p className="text-xs text-brand-green-gray/70">
                      Posição: {link.position} | Ícone: {link.icon || 'Nenhum'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditLink(link)}
                      className="text-brand-brown hover:text-brand-green-gray"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Redes Sociais */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>
                  Links para redes sociais e contato
                </CardDescription>
              </div>
              <Button 
                onClick={() => startCreateLink('social')}
                className="bg-brand-brown hover:bg-brand-green-gray"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {getLinksByLocation('social').map((link) => (
                <div key={link.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="font-augustus font-semibold text-brand-green-gray">
                        {link.title}
                      </Label>
                      {!link.is_active && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Inativo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground mt-1">{link.url}</p>
                    <p className="text-xs text-brand-green-gray/70">
                      Posição: {link.position} | Ícone: {link.icon || 'Nenhum'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditLink(link)}
                      className="text-brand-brown hover:text-brand-green-gray"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formulário de Edição/Criação */}
      {(editingLink || isCreating) && (
        <Card className="fixed inset-x-4 bottom-4 z-50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {editingLink ? 'Editar Link' : 'Criar Novo Link'}
            </CardTitle>
            <CardDescription>
              {editingLink ? 'Modifique as informações do link' : 'Adicione um novo link de navegação'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Produtos"
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="Ex: /produtos"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Ícone</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar ícone" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Posição</Label>
                <Input
                  id="position"
                  type="number"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="target_blank"
                  checked={formData.target_blank}
                  onCheckedChange={(checked) => setFormData({...formData, target_blank: checked})}
                />
                <Label htmlFor="target_blank">Abrir em nova aba</Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSaveLink}
                className="bg-brand-brown hover:bg-brand-green-gray"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingLink ? 'Atualizar' : 'Criar'}
              </Button>
              <Button 
                variant="outline"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
