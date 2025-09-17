import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettings, useContentBlocks } from '@/hooks/useCMS';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Edit, Settings, FileText, Mail } from 'lucide-react';

export function SiteSettingsTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Hooks para dados
  const { settings, loading: settingsLoading, getSetting, updateSetting } = useSiteSettings();
  const { blocks, loading: blocksLoading, getContent, updateContent } = useContentBlocks();
  
  // Estados para formulários
  const [editingSetting, setEditingSetting] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    description: '',
    category: 'general'
  });
  const [blockData, setBlockData] = useState({
    key: '',
    title: '',
    content: '',
    section: 'newsletter'
  });

  const handleSaveSetting = async (id: string) => {
    const result = await updateSetting(id, {
      value: formData.value,
      description: formData.description
    });
    
    if (result.success) {
      toast({
        title: "Configuração atualizada",
        description: "A configuração foi salva com sucesso.",
      });
      setEditingSetting(null);
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao salvar configuração",
        variant: "destructive",
      });
    }
  };

  const handleSaveBlock = async (id: string) => {
    const result = await updateContent(id, {
      title: blockData.title,
      content: blockData.content
    });
    
    if (result.success) {
      toast({
        title: "Conteúdo atualizado",
        description: "O conteúdo foi salvo com sucesso.",
      });
      setEditingBlock(null);
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao salvar conteúdo",
        variant: "destructive",
      });
    }
  };

  const startEditSetting = (setting: any) => {
    setEditingSetting(setting.id);
    setFormData({
      key: setting.key,
      value: setting.value,
      description: setting.description || '',
      category: setting.category
    });
  };

  const startEditBlock = (block: any) => {
    setEditingBlock(block.id);
    setBlockData({
      key: block.key,
      title: block.title || '',
      content: block.content,
      section: block.section
    });
  };

  if (settingsLoading || blocksLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-green-gray">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-brand-brown" />
        <h2 className="text-2xl font-diogenes font-bold text-foreground">
          Configurações do Site
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Newsletter
          </TabsTrigger>
        </TabsList>

        {/* Aba Geral */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Títulos, descrições e configurações básicas do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.filter(s => s.category === 'general').map((setting) => (
                <div key={setting.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {setting.description || setting.key}
                    </Label>
                    {editingSetting === setting.id ? (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={formData.value}
                          onChange={(e) => setFormData({...formData, value: e.target.value})}
                          placeholder="Valor da configuração"
                        />
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Descrição (opcional)"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveSetting(setting.id)}
                            className="bg-brand-brown hover:bg-brand-green-gray"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salvar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingSetting(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <p className="text-sm text-foreground">{setting.value}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditSetting(setting)}
                          className="mt-2 text-brand-brown hover:text-brand-green-gray"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Conteúdo */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blocos de Conteúdo</CardTitle>
              <CardDescription>
                Textos e descrições das páginas do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {blocks.map((block) => (
                <div key={block.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {block.title || block.key}
                    </Label>
                    <p className="text-xs text-brand-green-gray/70 mb-2">
                      Seção: {block.section}
                    </p>
                    {editingBlock === block.id ? (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={blockData.title}
                          onChange={(e) => setBlockData({...blockData, title: e.target.value})}
                          placeholder="Título (opcional)"
                        />
                        <Textarea
                          value={blockData.content}
                          onChange={(e) => setBlockData({...blockData, content: e.target.value})}
                          placeholder="Conteúdo"
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveBlock(block.id)}
                            className="bg-brand-brown hover:bg-brand-green-gray"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salvar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingBlock(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <p className="text-sm text-foreground whitespace-pre-wrap">{block.content}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditBlock(block)}
                          className="mt-2 text-brand-brown hover:text-brand-green-gray"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Newsletter */}
        <TabsContent value="newsletter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Newsletter</CardTitle>
              <CardDescription>
                Títulos, descrições e textos da seção newsletter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.filter(s => s.category === 'newsletter').map((setting) => (
                <div key={setting.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {setting.description || setting.key}
                    </Label>
                    {editingSetting === setting.id ? (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={formData.value}
                          onChange={(e) => setFormData({...formData, value: e.target.value})}
                          placeholder="Valor da configuração"
                        />
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Descrição (opcional)"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveSetting(setting.id)}
                            className="bg-brand-brown hover:bg-brand-green-gray"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Salvar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingSetting(null)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <p className="text-sm text-foreground">{setting.value}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditSetting(setting)}
                          className="mt-2 text-brand-brown hover:text-brand-green-gray"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
