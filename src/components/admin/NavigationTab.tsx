import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Edit2, 
  Save, 
  X, 
  Eye, 
  Navigation, 
  Plus,
  Link,
  Home,
  Instagram,
  Youtube,
  Settings,
  Book,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useNavigationLinks } from '@/hooks/useCMS';
import { toast } from 'sonner';

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

interface EditingState {
  [key: string]: boolean;
}

const ICON_OPTIONS = [
  { value: 'Home', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { value: 'Book', label: 'Book', icon: <Book className="w-4 h-4" /> },
  { value: 'Settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  { value: 'Instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
  { value: 'Youtube', label: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
  { value: 'Link', label: 'Link', icon: <Link className="w-4 h-4" /> },
  { value: 'Mail', label: 'Mail', icon: <Link className="w-4 h-4" /> },
  { value: 'Phone', label: 'Phone', icon: <Link className="w-4 h-4" /> },
];

const POSITION_OPTIONS = [
  { value: 'header', label: 'Header (Menu Principal)' },
  { value: 'footer', label: 'Footer' },
  { value: 'social', label: 'Redes Sociais' },
  { value: 'sidebar', label: 'Sidebar' },
];

export function NavigationTab() {
  const { data: links, loading, error, updateLink, createLink, deleteLink } = useNavigationLinks();
  const [editing, setEditing] = useState<EditingState>({});
  const [editValues, setEditValues] = useState<{ [key: string]: Partial<NavigationLink> }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState<Partial<NavigationLink>>({
    title: '',
    url: '',
    icon: 'Link',
    position: 'header',
    order: 1,
    is_active: true,
  });

  // Agrupar links por posição
  const groupedLinks = links?.reduce((acc, link) => {
    if (!acc[link.position]) {
      acc[link.position] = [];
    }
    acc[link.position].push(link);
    return acc;
  }, {} as Record<string, NavigationLink[]>) || {};

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'header': return <Navigation className="w-4 h-4" />;
      case 'footer': return <Link className="w-4 h-4" />;
      case 'social': return <Instagram className="w-4 h-4" />;
      case 'sidebar': return <Settings className="w-4 h-4" />;
      default: return <Link className="w-4 h-4" />;
    }
  };

  const getPositionName = (position: string) => {
    return POSITION_OPTIONS.find(p => p.value === position)?.label || position;
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find(i => i.value === iconName);
    return iconOption?.icon || <Link className="w-4 h-4" />;
  };

  const handleEdit = (link: NavigationLink) => {
    setEditing(prev => ({ ...prev, [link.id]: true }));
    setEditValues(prev => ({ 
      ...prev, 
      [link.id]: {
        title: link.title,
        url: link.url,
        icon: link.icon,
        position: link.position,
        order: link.order,
        is_active: link.is_active,
      }
    }));
  };

  const handleCancel = (linkId: string) => {
    setEditing(prev => ({ ...prev, [linkId]: false }));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[linkId];
      return newValues;
    });
  };

  const handleSave = async (link: NavigationLink) => {
    const updates = editValues[link.id];
    if (!updates?.title || !updates?.url) {
      toast.error('Título e URL são obrigatórios');
      return;
    }

    setSaving(prev => ({ ...prev, [link.id]: true }));

    try {
      await updateLink(link.id, updates);
      setEditing(prev => ({ ...prev, [link.id]: false }));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[linkId];
        return newValues;
      });
      toast.success('Link atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar link');
    } finally {
      setSaving(prev => ({ ...prev, [link.id]: false }));
    }
  };

  const handleDelete = async (link: NavigationLink) => {
    if (!confirm(`Tem certeza que deseja deletar "${link.title}"?`)) {
      return;
    }

    try {
      await deleteLink(link.id);
      toast.success('Link deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar link');
    }
  };

  const handleAddNew = async () => {
    if (!newLink.title || !newLink.url) {
      toast.error('Título e URL são obrigatórios');
      return;
    }

    try {
      await createLink(newLink as Omit<NavigationLink, 'id' | 'created_at' | 'updated_at'>);
      setNewLink({
        title: '',
        url: '',
        icon: 'Link',
        position: 'header',
        order: 1,
        is_active: true,
      });
      setShowAddForm(false);
      toast.success('Link criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      toast.error('Erro ao criar link');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando links...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-2 text-red-500">Erro ao carregar links</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Links de Navegação</h2>
          <p className="text-muted-foreground">Gerencie menu, footer e links sociais</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
          </Button>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Link
          </Button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Eye className="w-5 h-5" />
              Preview da Navegação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Header Preview */}
              {groupedLinks.header && (
                <div>
                  <Label className="text-sm font-medium">Menu Principal:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groupedLinks.header
                      .filter(link => link.is_active)
                      .sort((a, b) => a.order - b.order)
                      .map(link => (
                        <Badge key={link.id} variant="outline" className="flex items-center gap-1">
                          {getIconComponent(link.icon)}
                          {link.title}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}

              {/* Social Links Preview */}
              {groupedLinks.social && (
                <div>
                  <Label className="text-sm font-medium">Redes Sociais:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groupedLinks.social
                      .filter(link => link.is_active)
                      .sort((a, b) => a.order - b.order)
                      .map(link => (
                        <Badge key={link.id} variant="secondary" className="flex items-center gap-1">
                          {getIconComponent(link.icon)}
                          {link.title}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulário de Adicionar */}
      {showAddForm && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Plus className="w-5 h-5" />
              Adicionar Novo Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={newLink.title || ''}
                  onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Início, Contato, etc."
                />
              </div>
              <div>
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  value={newLink.url || ''}
                  onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="Ex: /, /contato, https://..."
                />
              </div>
              <div>
                <Label htmlFor="icon">Ícone</Label>
                <Select
                  value={newLink.icon || 'Link'}
                  onValueChange={(value) => setNewLink(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map(icon => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <div className="flex items-center gap-2">
                          {icon.icon}
                          {icon.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Posição</Label>
                <Select
                  value={newLink.position || 'header'}
                  onValueChange={(value) => setNewLink(prev => ({ ...prev, position: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POSITION_OPTIONS.map(position => (
                      <SelectItem key={position.value} value={position.value}>
                        {position.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={newLink.order || 1}
                  onChange={(e) => setNewLink(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  min="1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newLink.is_active || false}
                  onCheckedChange={(checked) => setNewLink(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddNew} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Link
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links por Posição */}
      {Object.entries(groupedLinks).map(([position, positionLinks]) => (
        <Card key={position}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPositionIcon(position)}
              {getPositionName(position)}
              <Badge variant="secondary">{positionLinks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positionLinks
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                <div key={link.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIconComponent(link.icon)}
                      <Label className="font-medium">{link.title}</Label>
                      <Badge variant={link.is_active ? "default" : "secondary"}>
                        {link.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Badge variant="outline">Ordem: {link.order}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {editing[link.id] ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSave(link)}
                            disabled={saving[link.id]}
                            className="flex items-center gap-1"
                          >
                            {saving[link.id] ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Save className="w-3 h-3" />
                            )}
                            Salvar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(link.id)}
                            className="flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(link)}
                            className="flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(link)}
                            className="flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Deletar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {editing[link.id] ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Título</Label>
                        <Input
                          value={editValues[link.id]?.title || ''}
                          onChange={(e) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], title: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>URL</Label>
                        <Input
                          value={editValues[link.id]?.url || ''}
                          onChange={(e) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], url: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Ícone</Label>
                        <Select
                          value={editValues[link.id]?.icon || 'Link'}
                          onValueChange={(value) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], icon: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ICON_OPTIONS.map(icon => (
                              <SelectItem key={icon.value} value={icon.value}>
                                <div className="flex items-center gap-2">
                                  {icon.icon}
                                  {icon.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Posição</Label>
                        <Select
                          value={editValues[link.id]?.position || 'header'}
                          onValueChange={(value) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], position: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {POSITION_OPTIONS.map(position => (
                              <SelectItem key={position.value} value={position.value}>
                                {position.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Ordem</Label>
                        <Input
                          type="number"
                          value={editValues[link.id]?.order || 1}
                          onChange={(e) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], order: parseInt(e.target.value) || 1 }
                          }))}
                          min="1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editValues[link.id]?.is_active || false}
                          onCheckedChange={(checked) => setEditValues(prev => ({ 
                            ...prev, 
                            [link.id]: { ...prev[link.id], is_active: checked }
                          }))}
                        />
                        <Label>Ativo</Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {link.url}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Criado: {new Date(link.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <span>Atualizado: {new Date(link.updated_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{links?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total de Links</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {links?.filter(l => l.is_active).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Links Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Object.keys(groupedLinks).length}
              </div>
              <div className="text-sm text-muted-foreground">Posições</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {links?.filter(l => l.position === 'social').length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Redes Sociais</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}