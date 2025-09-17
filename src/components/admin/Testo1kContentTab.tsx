import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Edit2, 
  Save, 
  X, 
  Eye, 
  Book, 
  Plus,
  FileText,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
  GripVertical,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useTesto1kContent } from '@/hooks/useCMS';
import { toast } from 'sonner';

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

interface EditingState {
  [key: string]: boolean;
}

const TYPE_OPTIONS = [
  { value: 'text', label: 'Texto' },
  { value: 'title', label: 'Título' },
  { value: 'subtitle', label: 'Subtítulo' },
  { value: 'price', label: 'Preço' },
  { value: 'description', label: 'Descrição' },
  { value: 'button', label: 'Botão' },
];

const PAGE_OPTIONS = [
  { value: 'testo1k', label: 'Página Testo1k' },
  { value: 'testo1k/landing', label: 'Landing Page Testo1k' },
];

export function Testo1kContentTab() {
  const { data: contentBlocks, loading, error, updateBlock, createBlock, deleteBlock } = useTesto1kContent();
  const [editing, setEditing] = useState<EditingState>({});
  const [editValues, setEditValues] = useState<{ [key: string]: Partial<ContentBlock> }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBlock, setNewBlock] = useState<Partial<ContentBlock>>({
    key: '',
    title: '',
    content: '',
    type: 'text',
    page: 'testo1k',
    order: 1,
    is_active: true,
  });

  // Agrupar blocos por página
  const groupedBlocks = contentBlocks?.reduce((acc, block) => {
    if (!acc[block.page]) {
      acc[block.page] = [];
    }
    acc[block.page].push(block);
    return acc;
  }, {} as Record<string, ContentBlock[]>) || {};

  const getPageIcon = (page: string) => {
    switch (page) {
      case 'testo1k': return <Book className="w-4 h-4" />;
      case 'testo1k/landing': return <Monitor className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPageName = (page: string) => {
    return PAGE_OPTIONS.find(p => p.value === page)?.label || page;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'title': return <FileText className="w-4 h-4" />;
      case 'subtitle': return <FileText className="w-4 h-4" />;
      case 'price': return <DollarSign className="w-4 h-4" />;
      case 'description': return <FileText className="w-4 h-4" />;
      case 'button': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleEdit = (block: ContentBlock) => {
    setEditing(prev => ({ ...prev, [block.id]: true }));
    setEditValues(prev => ({ 
      ...prev, 
      [block.id]: {
        key: block.key,
        title: block.title,
        content: block.content,
        type: block.type,
        page: block.page,
        order: block.order,
        is_active: block.is_active,
      }
    }));
  };

  const handleCancel = (blockId: string) => {
    setEditing(prev => ({ ...prev, [blockId]: false }));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[blockId];
      return newValues;
    });
  };

  const handleSave = async (block: ContentBlock) => {
    const updates = editValues[block.id];
    if (!updates?.key || !updates?.title || !updates?.content) {
      toast.error('Chave, título e conteúdo são obrigatórios');
      return;
    }

    setSaving(prev => ({ ...prev, [block.id]: true }));

    try {
      await updateBlock(block.id, updates);
      setEditing(prev => ({ ...prev, [block.id]: false }));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[block.id];
        return newValues;
      });
      toast.success('Bloco atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar bloco');
    } finally {
      setSaving(prev => ({ ...prev, [block.id]: false }));
    }
  };

  const handleDelete = async (block: ContentBlock) => {
    if (!confirm(`Tem certeza que deseja deletar "${block.title}"?`)) {
      return;
    }

    try {
      await deleteBlock(block.id);
      toast.success('Bloco deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar bloco');
    }
  };

  const handleAddNew = async () => {
    if (!newBlock.key || !newBlock.title || !newBlock.content) {
      toast.error('Chave, título e conteúdo são obrigatórios');
      return;
    }

    try {
      await createBlock(newBlock as Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>);
      setNewBlock({
        key: '',
        title: '',
        content: '',
        type: 'text',
        page: 'testo1k',
        order: 1,
        is_active: true,
      });
      setShowAddForm(false);
      toast.success('Bloco criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      toast.error('Erro ao criar bloco');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando conteúdo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-2 text-red-500">Erro ao carregar conteúdo</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Conteúdo Testo1k</h2>
          <p className="text-muted-foreground">Gerencie títulos, descrições e preços das páginas Testo1k</p>
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
            Adicionar Bloco
          </Button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Eye className="w-5 h-5" />
              Preview das Páginas Testo1k
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="testo1k" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="testo1k" className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Página Testo1k
                </TabsTrigger>
                <TabsTrigger value="testo1k/landing" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Landing Page
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(groupedBlocks).map(([page, blocks]) => (
                <TabsContent key={page} value={page} className="space-y-4">
                  <div className="space-y-4">
                    {blocks
                      .filter(block => block.is_active)
                      .sort((a, b) => a.order - b.order)
                      .map(block => (
                        <div key={block.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(block.type)}
                            <Badge variant="outline">{block.type}</Badge>
                            <Badge variant="secondary">{block.key}</Badge>
                          </div>
                          {block.type === 'title' ? (
                            <h1 className="text-2xl font-bold text-foreground">{block.content}</h1>
                          ) : block.type === 'subtitle' ? (
                            <h2 className="text-xl font-semibold text-foreground">{block.content}</h2>
                          ) : block.type === 'price' ? (
                            <div className="text-3xl font-bold text-brand-brown">{block.content}</div>
                          ) : (
                            <p className="text-foreground">{block.content}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Formulário de Adicionar */}
      {showAddForm && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Plus className="w-5 h-5" />
              Adicionar Novo Bloco
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key">Chave *</Label>
                <Input
                  id="key"
                  value={newBlock.key || ''}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, key: e.target.value }))}
                  placeholder="Ex: testo1k_title"
                />
              </div>
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={newBlock.title || ''}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Título Testo1k"
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={newBlock.type || 'text'}
                  onValueChange={(value) => setNewBlock(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="page">Página</Label>
                <Select
                  value={newBlock.page || 'testo1k'}
                  onValueChange={(value) => setNewBlock(prev => ({ ...prev, page: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_OPTIONS.map(page => (
                      <SelectItem key={page.value} value={page.value}>
                        {page.label}
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
                  value={newBlock.order || 1}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  min="1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newBlock.is_active || false}
                  onCheckedChange={(checked) => setNewBlock(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  value={newBlock.content || ''}
                  onChange={(e) => setNewBlock(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Ex: Testo1k - O Guia Completo"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddNew} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Bloco
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

      {/* Conteúdo por Página */}
      <Tabs defaultValue="testo1k" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="testo1k" className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            Página Testo1k
            <Badge variant="secondary">{groupedBlocks['testo1k']?.length || 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="testo1k/landing" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Landing Page
            <Badge variant="secondary">{groupedBlocks['testo1k/landing']?.length || 0}</Badge>
          </TabsTrigger>
        </TabsList>
        
        {Object.entries(groupedBlocks).map(([page, blocks]) => (
          <TabsContent key={page} value={page} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getPageIcon(page)}
                  {getPageName(page)}
                  <Badge variant="secondary">{blocks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blocks
                    .sort((a, b) => a.order - b.order)
                    .map((block) => (
                    <div key={block.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                          {getTypeIcon(block.type)}
                          <Label className="font-medium">{block.title}</Label>
                          <Badge variant={block.is_active ? "default" : "secondary"}>
                            {block.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Badge variant="outline">{block.type}</Badge>
                          <Badge variant="outline">Ordem: {block.order}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {editing[block.id] ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleSave(block)}
                                disabled={saving[block.id]}
                                className="flex items-center gap-1"
                              >
                                {saving[block.id] ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <Save className="w-3 h-3" />
                                )}
                                Salvar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancel(block.id)}
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
                                onClick={() => handleEdit(block)}
                                className="flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                Editar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(block)}
                                className="flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Deletar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <span className="font-mono bg-muted px-2 py-1 rounded">{block.key}</span>
                      </div>

                      {editing[block.id] ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Chave</Label>
                            <Input
                              value={editValues[block.id]?.key || ''}
                              onChange={(e) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], key: e.target.value }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Título</Label>
                            <Input
                              value={editValues[block.id]?.title || ''}
                              onChange={(e) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], title: e.target.value }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Tipo</Label>
                            <Select
                              value={editValues[block.id]?.type || 'text'}
                              onValueChange={(value) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], type: value }
                              }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {TYPE_OPTIONS.map(type => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Página</Label>
                            <Select
                              value={editValues[block.id]?.page || 'testo1k'}
                              onValueChange={(value) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], page: value }
                              }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {PAGE_OPTIONS.map(page => (
                                  <SelectItem key={page.value} value={page.value}>
                                    {page.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Ordem</Label>
                            <Input
                              type="number"
                              value={editValues[block.id]?.order || 1}
                              onChange={(e) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], order: parseInt(e.target.value) || 1 }
                              }))}
                              min="1"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editValues[block.id]?.is_active || false}
                              onCheckedChange={(checked) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], is_active: checked }
                              }))}
                            />
                            <Label>Ativo</Label>
                          </div>
                          <div className="md:col-span-2">
                            <Label>Conteúdo</Label>
                            <Textarea
                              value={editValues[block.id]?.content || ''}
                              onChange={(e) => setEditValues(prev => ({ 
                                ...prev, 
                                [block.id]: { ...prev[block.id], content: e.target.value }
                              }))}
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="p-3 bg-muted/50 rounded-md">
                            <p className="text-sm font-medium">{block.content}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Criado: {new Date(block.created_at).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>Atualizado: {new Date(block.updated_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

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
              <div className="text-2xl font-bold text-foreground">{contentBlocks?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total de Blocos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {contentBlocks?.filter(b => b.is_active).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Blocos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {contentBlocks?.filter(b => b.type === 'price').length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Preços</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {Object.keys(groupedBlocks).length}
              </div>
              <div className="text-sm text-muted-foreground">Páginas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}