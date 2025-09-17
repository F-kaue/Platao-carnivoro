import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Edit2, 
  Save, 
  X, 
  Eye, 
  Mail, 
  Plus,
  BookOpen,
  Lightbulb,
  Users,
  MessageCircle,
  Star,
  Heart,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  GripVertical
} from 'lucide-react';
import { useNewsletterBenefits } from '@/hooks/useCMS';
import { toast } from 'sonner';

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

interface EditingState {
  [key: string]: boolean;
}

const ICON_OPTIONS = [
  { value: 'BookOpen', label: 'Livro Aberto', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'Lightbulb', label: 'Lâmpada', icon: <Lightbulb className="w-4 h-4" /> },
  { value: 'Users', label: 'Usuários', icon: <Users className="w-4 h-4" /> },
  { value: 'MessageCircle', label: 'Mensagem', icon: <MessageCircle className="w-4 h-4" /> },
  { value: 'Star', label: 'Estrela', icon: <Star className="w-4 h-4" /> },
  { value: 'Heart', label: 'Coração', icon: <Heart className="w-4 h-4" /> },
  { value: 'Zap', label: 'Raio', icon: <Zap className="w-4 h-4" /> },
  { value: 'Shield', label: 'Escudo', icon: <Shield className="w-4 h-4" /> },
  { value: 'Mail', label: 'Email', icon: <Mail className="w-4 h-4" /> },
];

export function NewsletterBenefitsTab() {
  const { data: benefits, loading, error, updateBenefit, createBenefit, deleteBenefit } = useNewsletterBenefits();
  const [editing, setEditing] = useState<EditingState>({});
  const [editValues, setEditValues] = useState<{ [key: string]: Partial<NewsletterBenefit> }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState<Partial<NewsletterBenefit>>({
    title: '',
    description: '',
    icon: 'Star',
    order: 1,
    is_active: true,
  });

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find(i => i.value === iconName);
    return iconOption?.icon || <Star className="w-4 h-4" />;
  };

  const handleEdit = (benefit: NewsletterBenefit) => {
    setEditing(prev => ({ ...prev, [benefit.id]: true }));
    setEditValues(prev => ({ 
      ...prev, 
      [benefit.id]: {
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        order: benefit.order,
        is_active: benefit.is_active,
      }
    }));
  };

  const handleCancel = (benefitId: string) => {
    setEditing(prev => ({ ...prev, [benefitId]: false }));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[benefitId];
      return newValues;
    });
  };

  const handleSave = async (benefit: NewsletterBenefit) => {
    const updates = editValues[benefit.id];
    if (!updates?.title || !updates?.description) {
      toast.error('Título e descrição são obrigatórios');
      return;
    }

    setSaving(prev => ({ ...prev, [benefit.id]: true }));

    try {
      await updateBenefit(benefit.id, updates);
      setEditing(prev => ({ ...prev, [benefit.id]: false }));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[benefit.id];
        return newValues;
      });
      toast.success('Benefício atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar benefício');
    } finally {
      setSaving(prev => ({ ...prev, [benefit.id]: false }));
    }
  };

  const handleDelete = async (benefit: NewsletterBenefit) => {
    if (!confirm(`Tem certeza que deseja deletar "${benefit.title}"?`)) {
      return;
    }

    try {
      await deleteBenefit(benefit.id);
      toast.success('Benefício deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar benefício');
    }
  };

  const handleAddNew = async () => {
    if (!newBenefit.title || !newBenefit.description) {
      toast.error('Título e descrição são obrigatórios');
      return;
    }

    try {
      await createBenefit(newBenefit as Omit<NewsletterBenefit, 'id' | 'created_at' | 'updated_at'>);
      setNewBenefit({
        title: '',
        description: '',
        icon: 'Star',
        order: 1,
        is_active: true,
      });
      setShowAddForm(false);
      toast.success('Benefício criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      toast.error('Erro ao criar benefício');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando benefícios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-2 text-red-500">Erro ao carregar benefícios</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Benefícios do Newsletter</h2>
          <p className="text-muted-foreground">Gerencie os benefícios exibidos na seção de newsletter</p>
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
            Adicionar Benefício
          </Button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Eye className="w-5 h-5" />
              Preview da Seção Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits
                ?.filter(benefit => benefit.is_active)
                .sort((a, b) => a.order - b.order)
                .map(benefit => (
                  <div key={benefit.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {getIconComponent(benefit.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-augustus font-bold text-sm text-foreground mb-1 leading-tight">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-brand-green-gray/70 font-body leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
              Adicionar Novo Benefício
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={newBenefit.title || ''}
                  onChange={(e) => setNewBenefit(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Conteúdo Exclusivo"
                />
              </div>
              <div>
                <Label htmlFor="icon">Ícone</Label>
                <Select
                  value={newBenefit.icon || 'Star'}
                  onValueChange={(value) => setNewBenefit(prev => ({ ...prev, icon: value }))}
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
              <div className="md:col-span-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={newBenefit.description || ''}
                  onChange={(e) => setNewBenefit(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Ex: Receba artigos e insights exclusivos sobre carnívorismo e filosofia"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="order">Ordem</Label>
                <Input
                  id="order"
                  type="number"
                  value={newBenefit.order || 1}
                  onChange={(e) => setNewBenefit(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  min="1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newBenefit.is_active || false}
                  onCheckedChange={(checked) => setNewBenefit(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Ativo</Label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddNew} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Benefício
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

      {/* Lista de Benefícios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Benefícios do Newsletter
            <Badge variant="secondary">{benefits?.length || 0}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benefits
              ?.sort((a, b) => a.order - b.order)
              .map((benefit) => (
              <div key={benefit.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    {getIconComponent(benefit.icon)}
                    <Label className="font-medium">{benefit.title}</Label>
                    <Badge variant={benefit.is_active ? "default" : "secondary"}>
                      {benefit.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                    <Badge variant="outline">Ordem: {benefit.order}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {editing[benefit.id] ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleSave(benefit)}
                          disabled={saving[benefit.id]}
                          className="flex items-center gap-1"
                        >
                          {saving[benefit.id] ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Save className="w-3 h-3" />
                          )}
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(benefit.id)}
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
                          onClick={() => handleEdit(benefit)}
                          className="flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(benefit)}
                          className="flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Deletar
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {editing[benefit.id] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={editValues[benefit.id]?.title || ''}
                        onChange={(e) => setEditValues(prev => ({ 
                          ...prev, 
                          [benefit.id]: { ...prev[benefit.id], title: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Ícone</Label>
                      <Select
                        value={editValues[benefit.id]?.icon || 'Star'}
                        onValueChange={(value) => setEditValues(prev => ({ 
                          ...prev, 
                          [benefit.id]: { ...prev[benefit.id], icon: value }
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
                    <div className="md:col-span-2">
                      <Label>Descrição</Label>
                      <Textarea
                        value={editValues[benefit.id]?.description || ''}
                        onChange={(e) => setEditValues(prev => ({ 
                          ...prev, 
                          [benefit.id]: { ...prev[benefit.id], description: e.target.value }
                        }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Ordem</Label>
                      <Input
                        type="number"
                        value={editValues[benefit.id]?.order || 1}
                        onChange={(e) => setEditValues(prev => ({ 
                          ...prev, 
                          [benefit.id]: { ...prev[benefit.id], order: parseInt(e.target.value) || 1 }
                        }))}
                        min="1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editValues[benefit.id]?.is_active || false}
                        onCheckedChange={(checked) => setEditValues(prev => ({ 
                          ...prev, 
                          [benefit.id]: { ...prev[benefit.id], is_active: checked }
                        }))}
                      />
                      <Label>Ativo</Label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Criado: {new Date(benefit.created_at).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>Atualizado: {new Date(benefit.updated_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{benefits?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total de Benefícios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {benefits?.filter(b => b.is_active).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Benefícios Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {benefits?.filter(b => b.is_active).length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Exibidos no Site</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}