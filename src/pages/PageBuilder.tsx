import React, { useState, useEffect } from 'react';
import { PageBuilder } from '@/components/PageBuilder/PageBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Settings,
  Layout,
  Palette,
  Code,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContent } from '@/hooks/usePageBuilder';
import { PageContentService } from '@/services/pageContentService';

interface PageBuilderPageProps {
  pageId?: string;
}

export const PageBuilderPage: React.FC<PageBuilderPageProps> = ({ pageId }) => {
  const navigate = useNavigate();
  const { pageId: paramPageId } = useParams<{ pageId: string }>();
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'preview'>('builder');

  useEffect(() => {
    // Carregar conteúdo real da página baseado no ID
    const pageKey = pageId || paramPageId || 'home';
    const pageData = PageContentService.getPageContent(pageKey);
    
    setCurrentPage(pageData);
    setIsLoading(false);
  }, [pageId, paramPageId]);

  const handleSave = async (content: PageContent) => {
    try {
      const pageKey = pageId || paramPageId || 'home';
      const success = await PageContentService.savePageContent(pageKey, content);
      
      if (success) {
        alert('Página salva com sucesso!');
      } else {
        alert('Erro ao salvar a página');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar a página');
    }
  };

  const handlePageSettingsChange = (key: string, value: string) => {
    if (currentPage) {
      setCurrentPage({
        ...currentPage,
        settings: {
          ...currentPage.settings,
          [key]: value
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Page Builder...</p>
        </div>
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Admin
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Page Builder</h1>
              <p className="text-sm text-gray-600">
                Editando: {currentPage.settings.title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setActiveTab('preview')}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={() => handleSave(currentPage)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Página
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">
              <Layout className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="h-full">
            {currentPage && (
              <PageBuilder
                pageId={pageId || paramPageId || 'home'}
                initialContent={currentPage}
                onSave={handleSave}
              />
            )}
          </TabsContent>

          <TabsContent value="settings" className="p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Página</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título da Página</Label>
                    <Input
                      id="title"
                      value={currentPage.settings.title}
                      onChange={(e) => handlePageSettingsChange('title', e.target.value)}
                      placeholder="Título da página"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={currentPage.settings.description}
                      onChange={(e) => handlePageSettingsChange('description', e.target.value)}
                      placeholder="Descrição da página"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={currentPage.settings.theme}
                      onValueChange={(value) => handlePageSettingsChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Título</Label>
                    <Input
                      id="metaTitle"
                      value={currentPage.settings.title}
                      onChange={(e) => handlePageSettingsChange('title', e.target.value)}
                      placeholder="Título para SEO"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metaDescription">Meta Descrição</Label>
                    <Textarea
                      id="metaDescription"
                      value={currentPage.settings.description}
                      onChange={(e) => handlePageSettingsChange('description', e.target.value)}
                      placeholder="Descrição para SEO"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full">
            <div className="h-full">
              {currentPage && (
                <PageBuilder
                  pageId={pageId || paramPageId || 'home'}
                  initialContent={currentPage}
                  onSave={handleSave}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
