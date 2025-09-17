import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Edit2, 
  Save, 
  X, 
  Eye, 
  Settings, 
  Globe, 
  Mail, 
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useSiteSettings } from '@/hooks/useCMS';
import { toast } from 'sonner';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface EditingState {
  [key: string]: boolean;
}

export function SiteSettingsTab() {
  const { data: settings, loading, error, updateSetting, createSetting, deleteSetting } = useSiteSettings();
  const [editing, setEditing] = useState<EditingState>({});
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState<{ [key: string]: boolean }>({});

  // Agrupar configurações por categoria
  const groupedSettings = settings?.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>) || {};

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <Globe className="w-4 h-4" />;
      case 'contact': return <Mail className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'general': return 'Geral';
      case 'contact': return 'Contato';
      case 'content': return 'Conteúdo';
      default: return category;
    }
  };

  const handleEdit = (setting: SiteSetting) => {
    setEditing(prev => ({ ...prev, [setting.id]: true }));
    setEditValues(prev => ({ ...prev, [setting.id]: setting.value }));
  };

  const handleCancel = (settingId: string) => {
    setEditing(prev => ({ ...prev, [settingId]: false }));
    setEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[settingId];
      return newValues;
    });
  };

  const handleSave = async (setting: SiteSetting) => {
    const newValue = editValues[setting.id];
    if (!newValue || newValue.trim() === '') {
      toast.error('Valor não pode estar vazio');
      return;
    }

    setSaving(prev => ({ ...prev, [setting.id]: true }));

    try {
      await updateSetting(setting.id, {
        key: setting.key,
        value: newValue.trim(),
        description: setting.description,
        category: setting.category
      });

      setEditing(prev => ({ ...prev, [setting.id]: false }));
      setEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[setting.id];
        return newValues;
      });

      toast.success('Configuração atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configuração');
    } finally {
      setSaving(prev => ({ ...prev, [setting.id]: false }));
    }
  };

  const handleDelete = async (setting: SiteSetting) => {
    if (!confirm(`Tem certeza que deseja deletar "${setting.key}"?`)) {
      return;
    }

    try {
      await deleteSetting(setting.id);
      toast.success('Configuração deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar configuração');
    }
  };

  const handleAddNew = async () => {
    const key = prompt('Digite a chave da configuração:');
    const value = prompt('Digite o valor:');
    const description = prompt('Digite a descrição (opcional):');
    const category = prompt('Digite a categoria (general, contact, content):') || 'general';

    if (!key || !value) {
      toast.error('Chave e valor são obrigatórios');
      return;
    }

    try {
      await createSetting({
        key: key.trim(),
        value: value.trim(),
        description: description?.trim() || '',
        category: category.trim()
      });
      toast.success('Configuração criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar:', error);
      toast.error('Erro ao criar configuração');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando configurações...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-2 text-red-500">Erro ao carregar configurações</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Configurações do Site</h2>
          <p className="text-muted-foreground">Gerencie títulos, descrições e configurações básicas</p>
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
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Adicionar Configuração
          </Button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Eye className="w-5 h-5" />
              Preview do Site
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {settings?.find(s => s.key === 'site_title')?.value || 'Platão Carnívoro'}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {settings?.find(s => s.key === 'site_description')?.value || 'Filosofia, Carnivorismo e Desenvolvimento Pessoal'}
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email de Contato:</Label>
                  <p className="text-sm text-muted-foreground">
                    {settings?.find(s => s.key === 'contact_email')?.value || 'plataocarnivoro@gmail.com'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Título Hero:</Label>
                  <p className="text-sm text-muted-foreground">
                    {settings?.find(s => s.key === 'hero_title')?.value || 'Mantenha suas Raízes'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configurações por Categoria */}
      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCategoryIcon(category)}
              {getCategoryName(category)}
              <Badge variant="secondary">{categorySettings.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categorySettings.map((setting) => (
                <div key={setting.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{setting.key}</Label>
                      <Badge variant="outline" className="text-xs">
                        {setting.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {editing[setting.id] ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSave(setting)}
                            disabled={saving[setting.id]}
                            className="flex items-center gap-1"
                          >
                            {saving[setting.id] ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Save className="w-3 h-3" />
                            )}
                            Salvar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(setting.id)}
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
                            onClick={() => handleEdit(setting)}
                            className="flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(setting)}
                            className="flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Deletar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {setting.description && (
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  )}

                  {editing[setting.id] ? (
                    <div className="space-y-2">
                      {setting.key.includes('description') || setting.key.includes('subtitle') ? (
                        <Textarea
                          value={editValues[setting.id] || ''}
                          onChange={(e) => setEditValues(prev => ({ 
                            ...prev, 
                            [setting.id]: e.target.value 
                          }))}
                          placeholder="Digite o valor..."
                          rows={3}
                        />
                      ) : (
                        <Input
                          value={editValues[setting.id] || ''}
                          onChange={(e) => setEditValues(prev => ({ 
                            ...prev, 
                            [setting.id]: e.target.value 
                          }))}
                          placeholder="Digite o valor..."
                        />
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium">{setting.value}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Criado: {new Date(setting.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <span>Atualizado: {new Date(setting.updated_at).toLocaleDateString('pt-BR')}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{settings?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total de Configurações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Object.keys(groupedSettings).length}
              </div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {settings?.filter(s => s.value && s.value.trim() !== '').length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Configurações Preenchidas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}