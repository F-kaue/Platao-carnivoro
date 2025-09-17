import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContentBlocks } from '@/hooks/useCMS';
import { useToast } from '@/hooks/use-toast';
import { Save, Edit, FileText, Target, Users, Clock, TrendingUp } from 'lucide-react';

export function Testo1kContentTab() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  
  // Hooks para dados
  const { blocks, loading, getContent, updateContent } = useContentBlocks();
  
  // Estados para formulários
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // Configurações específicas do Testo1k
  const testo1kSections = {
    home: {
      title: 'Página Principal Testo1k',
      description: 'Conteúdo da página /testo1k',
      blocks: [
        { key: 'testo1k_hero_title', title: 'Título Principal', placeholder: 'Ex: TRANSFORMAÇÃO' },
        { key: 'testo1k_hero_subtitle', title: 'Subtítulo Principal', placeholder: 'Ex: Descubra a sabedoria ancestral...' },
        { key: 'testo1k_benefits_title', title: 'Título dos Benefícios', placeholder: 'Ex: O que você receberá:' },
        { key: 'testo1k_benefits_subtitle', title: 'Subtítulo dos Benefícios', placeholder: 'Ex: Conteúdo exclusivo que fortalece...' }
      ]
    },
    landing: {
      title: 'Landing Page Testo1k',
      description: 'Conteúdo da página /testo1k/landing',
      blocks: [
        { key: 'testo1k_landing_title', title: 'Título da Landing', placeholder: 'Ex: Testosterona 1k' },
        { key: 'testo1k_landing_subtitle', title: 'Subtítulo da Landing', placeholder: 'Ex: Aumente sua testosterona naturalmente...' },
        { key: 'testo1k_landing_description', title: 'Descrição Principal', placeholder: 'Ex: Descrição detalhada do produto...' },
        { key: 'testo1k_landing_benefits_title', title: 'Título dos Benefícios', placeholder: 'Ex: Benefícios do Testo1k' },
        { key: 'testo1k_landing_price', title: 'Preço', placeholder: 'Ex: R$ 97,00' },
        { key: 'testo1k_landing_original_price', title: 'Preço Original', placeholder: 'Ex: R$ 197,00' }
      ]
    }
  };

  const handleSaveBlock = async (key: string) => {
    // Busca o bloco existente
    const existingBlock = blocks.find(b => b.key === key);
    
    if (existingBlock) {
      const result = await updateContent(existingBlock.id, {
        title: formData.title,
        content: formData.content
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
    } else {
      toast({
        title: "Erro",
        description: "Bloco de conteúdo não encontrado",
        variant: "destructive",
      });
    }
  };

  const startEditBlock = (key: string) => {
    const block = blocks.find(b => b.key === key);
    if (block) {
      setEditingBlock(key);
      setFormData({
        title: block.title || '',
        content: block.content
      });
    }
  };

  const getBlockContent = (key: string): string => {
    return getContent(key);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-green-gray">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-brand-brown" />
        <h2 className="text-2xl font-diogenes font-bold text-foreground">
          Conteúdo Testo1k
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Página Principal
          </TabsTrigger>
          <TabsTrigger value="landing" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Landing Page
          </TabsTrigger>
        </TabsList>

        {/* Aba Página Principal */}
        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{testo1kSections.home.title}</CardTitle>
              <CardDescription>
                {testo1kSections.home.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testo1kSections.home.blocks.map((block) => (
                <div key={block.key} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {block.title}
                    </Label>
                    {editingBlock === block.key ? (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Título (opcional)"
                        />
                        <Textarea
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          placeholder={block.placeholder}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveBlock(block.key)}
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
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {getBlockContent(block.key) || block.placeholder}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditBlock(block.key)}
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

        {/* Aba Landing Page */}
        <TabsContent value="landing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{testo1kSections.landing.title}</CardTitle>
              <CardDescription>
                {testo1kSections.landing.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testo1kSections.landing.blocks.map((block) => (
                <div key={block.key} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {block.title}
                    </Label>
                    {editingBlock === block.key ? (
                      <div className="mt-2 space-y-2">
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Título (opcional)"
                        />
                        <Textarea
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          placeholder={block.placeholder}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleSaveBlock(block.key)}
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
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {getBlockContent(block.key) || block.placeholder}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditBlock(block.key)}
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
