import React, { useState, useEffect } from 'react';
import { SimplePageBuilder } from '@/components/SimplePageBuilder/SimplePageBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Save,
  Undo,
  Redo,
  Eye,
  Code,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Interface simples para elementos
interface SimpleElement {
  id: string;
  type: 'heading' | 'paragraph' | 'button' | 'image';
  content: string;
  style?: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    padding?: string;
    margin?: string;
  };
}

// Interface para conteúdo da página
interface SimplePageContent {
  title: string;
  elements: SimpleElement[];
}

// Serviço simples para gerenciar conteúdo
class SimplePageContentService {
  static getPageContent(pageId: string): SimplePageContent {
    const defaultContent: Record<string, SimplePageContent> = {
      home: {
        title: 'Página Inicial',
        elements: [
          {
            id: 'hero-title',
            type: 'heading',
            content: 'PLATÃO CARNÍVORO',
            style: {
              fontSize: '48px',
              color: '#1a1a1a',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'hero-subtitle',
            type: 'heading',
            content: 'FILOSOFIA, CARNE E TRADIÇÃO',
            style: {
              fontSize: '24px',
              color: '#8B4513',
              textAlign: 'center',
              margin: '10px 0 30px 0'
            }
          },
          {
            id: 'hero-description',
            type: 'paragraph',
            content: 'Uma curadoria exclusiva de produtos da Amazon para quem valoriza força, disciplina e autenticidade. Descubra itens selecionados que refletem os valores clássicos em um mundo moderno.',
            style: {
              fontSize: '18px',
              color: '#2c2c2c',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'cta-button',
            type: 'button',
            content: 'EXPLORAR PRODUTOS',
            style: {
              backgroundColor: '#8B4513',
              color: 'white',
              fontSize: '18px',
              padding: '15px 30px',
              margin: '30px auto',
              textAlign: 'center'
            }
          }
        ]
      },
      testo1k: {
        title: 'Testo1k',
        elements: [
          {
            id: 'product-title',
            type: 'heading',
            content: 'TESTO1K - FORÇA E DISCIPLINA',
            style: {
              fontSize: '36px',
              color: '#1a1a1a',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'product-description',
            type: 'paragraph',
            content: 'O Testo1k é o suplemento ideal para quem busca força, disciplina e resultados consistentes. Formulado com ingredientes de alta qualidade para maximizar seu potencial.',
            style: {
              fontSize: '16px',
              color: '#2c2c2c',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'product-button',
            type: 'button',
            content: 'COMPRAR AGORA',
            style: {
              backgroundColor: '#8B4513',
              color: 'white',
              fontSize: '18px',
              padding: '15px 30px',
              margin: '30px auto',
              textAlign: 'center'
            }
          }
        ]
      },
      landing: {
        title: 'Landing Page',
        elements: [
          {
            id: 'landing-title',
            type: 'heading',
            content: 'TRANSFORME SUA VIDA HOJE',
            style: {
              fontSize: '42px',
              color: '#1a1a1a',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'landing-description',
            type: 'paragraph',
            content: 'Descubra os produtos que vão revolucionar sua rotina e te ajudar a alcançar seus objetivos com mais eficiência e disciplina.',
            style: {
              fontSize: '18px',
              color: '#2c2c2c',
              textAlign: 'center',
              margin: '20px 0'
            }
          },
          {
            id: 'landing-button',
            type: 'button',
            content: 'COMEÇAR AGORA',
            style: {
              backgroundColor: '#8B4513',
              color: 'white',
              fontSize: '20px',
              padding: '18px 35px',
              margin: '30px auto',
              textAlign: 'center'
            }
          }
        ]
      }
    };

    return defaultContent[pageId] || {
      title: 'Nova Página',
      elements: []
    };
  }

  static savePageContent(pageId: string, content: SimplePageContent): boolean {
    try {
      // Simular salvamento - em produção, salvaria no banco de dados
      localStorage.setItem(`page-content-${pageId}`, JSON.stringify(content));
      return true;
    } catch (error) {
      console.error('Erro ao salvar:', error);
      return false;
    }
  }
}

export const SimplePageBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [currentPage, setCurrentPage] = useState<SimplePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'preview'>('builder');

  useEffect(() => {
    // Carregar conteúdo da página
    const pageKey = pageId || 'home';
    const pageData = SimplePageContentService.getPageContent(pageKey);
    
    setCurrentPage(pageData);
    setIsLoading(false);
  }, [pageId]);

  const handleSave = async (content: SimplePageContent) => {
    try {
      const pageKey = pageId || 'home';
      const success = SimplePageContentService.savePageContent(pageKey, content);
      
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
          <p>Carregando Page Builder...</p>
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
        <h1 className="text-xl font-bold">Page Builder: {currentPage.title}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
            Voltar ao Admin
          </Button>
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
            <SimplePageBuilder
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full">
            <div className="h-full p-6">
              <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-full p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">{currentPage.title}</h1>
                <div className="space-y-6">
                  {currentPage.elements.map((element) => (
                    <div key={element.id}>
                      {element.type === 'heading' && (
                        <h2 style={element.style}>{element.content}</h2>
                      )}
                      {element.type === 'paragraph' && (
                        <p style={element.style}>{element.content}</p>
                      )}
                      {element.type === 'button' && (
                        <div style={{ textAlign: element.style?.textAlign || 'center' }}>
                          <button style={element.style}>{element.content}</button>
                        </div>
                      )}
                      {element.type === 'image' && (
                        <div style={{ textAlign: element.style?.textAlign || 'center' }}>
                          <img 
                            src={element.content} 
                            alt="Imagem" 
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        </div>
                      )}
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
