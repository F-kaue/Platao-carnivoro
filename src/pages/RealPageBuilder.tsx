import React, { useState, useEffect } from 'react';
import { RealPageBuilder } from '@/components/RealPageBuilder/RealPageBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Save,
  Eye,
  Code,
  Smartphone,
  Tablet,
  Monitor,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { RealPageContentService } from '@/services/realPageContentService';

// Interface para elementos editáveis
interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'link';
  content: string;
  style?: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold';
  };
  link?: string;
  target?: '_blank' | '_self';
}

// Interface para seções da página
interface PageSection {
  id: string;
  name: string;
  elements: EditableElement[];
}

// Interface para conteúdo da página
interface RealPageContent {
  title: string;
  sections: PageSection[];
}

export const RealPageBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [currentPage, setCurrentPage] = useState<RealPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'preview'>('builder');

  useEffect(() => {
    // Carregar conteúdo real da página
    const pageKey = pageId || 'home';
    const pageData = RealPageContentService.getPageContent(pageKey);
    
    setCurrentPage(pageData);
    setIsLoading(false);
  }, [pageId]);

  const handleSave = async (content: RealPageContent) => {
    try {
      const pageKey = pageId || 'home';
      const success = RealPageContentService.savePageContent(pageKey, content);
      
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
        [key]: value,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Carregando conteúdo real da página...</p>
        </div>
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p>Página não encontrada.</p>
        <Button onClick={() => navigate('/admin')}>Voltar ao Admin</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
      <header className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Admin
          </Button>
          <h1 className="text-xl font-bold">Real Page Builder: {currentPage.title}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="default" size="sm" onClick={() => handleSave(currentPage)}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mt-4">
            <TabsTrigger value="builder">
              <Code className="h-4 w-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Monitor className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="h-full">
            <RealPageBuilder
              pageId={pageId || 'home'}
              initialContent={currentPage}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="settings" className="p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Página</CardTitle>
                  <CardDescription>Ajuste as configurações gerais da página.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="pageTitle">Título da Página</Label>
                    <Input
                      id="pageTitle"
                      value={currentPage.title || ''}
                      onChange={(e) => handlePageSettingsChange('title', e.target.value)}
                      placeholder="Título da Página"
                    />
                  </div>
                  
                  <div>
                    <Label>Informações da Página</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>ID da Página:</strong> {pageId || 'home'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Seções:</strong> {currentPage.sections.length}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Total de Elementos:</strong> {currentPage.sections.reduce((acc, section) => acc + section.elements.length, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seções da Página</CardTitle>
                  <CardDescription>Visualize as seções disponíveis nesta página.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentPage.sections.map((section) => (
                      <div key={section.id} className="p-3 border border-gray-200 rounded-lg">
                        <h4 className="font-medium">{section.name}</h4>
                        <p className="text-sm text-gray-500">
                          {section.elements.length} elementos
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full">
            <div className="h-full p-6">
              <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-full p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">{currentPage.title}</h1>
                <div className="space-y-8">
                  {currentPage.sections.map((section) => (
                    <div key={section.id} className="border-b border-gray-200 pb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {section.name}
                      </h2>
                      <div className="space-y-4">
                        {section.elements.map((element) => (
                          <div key={element.id}>
                            {element.type === 'text' && (
                              <div style={element.style}>{element.content}</div>
                            )}
                            {element.type === 'button' && (
                              <div style={{ textAlign: element.style?.textAlign || 'center' }}>
                                <button 
                                  style={{
                                    backgroundColor: element.style?.backgroundColor || '#8B4513',
                                    color: element.style?.color || 'white',
                                    fontSize: element.style?.fontSize || '16px',
                                    fontWeight: element.style?.fontWeight || 'bold',
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {element.content}
                                </button>
                              </div>
                            )}
                            {element.type === 'image' && (
                              <div style={{ textAlign: element.style?.textAlign || 'center' }}>
                                <img 
                                  src={element.content} 
                                  alt="Imagem" 
                                  style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto',
                                    borderRadius: '4px'
                                  }}
                                />
                              </div>
                            )}
                            {element.type === 'link' && (
                              <a
                                href={element.link || '#'}
                                target={element.target || '_self'}
                                style={{
                                  color: element.style?.color || '#3b82f6',
                                  textDecoration: 'underline',
                                  fontSize: element.style?.fontSize || '16px'
                                }}
                              >
                                {element.content}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
