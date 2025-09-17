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
import { useNavigate } from 'react-router-dom';
import { PageContent } from '@/hooks/usePageBuilder';

interface PageBuilderPageProps {
  pageId?: string;
}

export const PageBuilderPage: React.FC<PageBuilderPageProps> = ({ pageId }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'preview'>('builder');

  // Páginas pré-definidas
  const predefinedPages = {
    'home': {
      elements: [
        {
          id: 'hero-1',
          type: 'heading',
          props: {
            text: 'Bem-vindo ao Platão Carnívoro',
            level: 1,
            align: 'center',
            color: '#1a1a1a',
            fontSize: '3rem',
            fontWeight: 'bold'
          }
        },
        {
          id: 'hero-2',
          type: 'paragraph',
          props: {
            text: 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo. Descubra como transformar sua vida com conhecimento milenar e práticas modernas.',
            align: 'center',
            color: '#666666',
            fontSize: '1.2rem',
            lineHeight: '1.6'
          }
        },
        {
          id: 'cta-1',
          type: 'button',
          props: {
            text: 'Começar Jornada',
            variant: 'default',
            size: 'lg',
            href: '/testo1k'
          }
        }
      ],
      settings: {
        title: 'Platão Carnívoro - Filosofia e Carnívorismo',
        description: 'Conecte-se com a sabedoria ancestral através da filosofia e do carnívorismo',
        theme: 'light'
      }
    },
    'testo1k': {
      elements: [
        {
          id: 'hero-testo1k',
          type: 'heading',
          props: {
            text: 'Testo1k - O Guia Completo',
            level: 1,
            align: 'center',
            color: '#1a1a1a',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }
        },
        {
          id: 'subtitle-testo1k',
          type: 'paragraph',
          props: {
            text: 'Dobre sua testosterona naturalmente em 60 dias com nosso protocolo baseado em evidências científicas e sabedoria ancestral.',
            align: 'center',
            color: '#666666',
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }
        },
        {
          id: 'price-testo1k',
          type: 'heading',
          props: {
            text: 'R$ 97,00',
            level: 2,
            align: 'center',
            color: '#059669',
            fontSize: '2rem',
            fontWeight: 'bold'
          }
        },
        {
          id: 'cta-testo1k',
          type: 'button',
          props: {
            text: 'Adquirir Agora',
            variant: 'default',
            size: 'lg',
            href: '/testo1k/landing'
          }
        }
      ],
      settings: {
        title: 'Testo1k - O Guia Completo',
        description: 'Dobre sua testosterona naturalmente em 60 dias',
        theme: 'light'
      }
    },
    'landing': {
      elements: [
        {
          id: 'hero-landing',
          type: 'heading',
          props: {
            text: 'Transforme sua vida com o Testo1k',
            level: 1,
            align: 'center',
            color: '#1a1a1a',
            fontSize: '3rem',
            fontWeight: 'bold'
          }
        },
        {
          id: 'description-landing',
          type: 'paragraph',
          props: {
            text: 'Descubra como o carnívorismo pode revolucionar sua saúde e bem-estar. Um protocolo completo baseado em evidências científicas.',
            align: 'center',
            color: '#666666',
            fontSize: '1.2rem',
            lineHeight: '1.6'
          }
        },
        {
          id: 'benefits-container',
          type: 'container',
          props: {
            padding: '40px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px'
          },
          children: [
            {
              id: 'benefit-1',
              type: 'card',
              props: {
                title: 'Aumento de Testosterona',
                content: 'Protocolo comprovado para aumentar naturalmente os níveis de testosterona.',
                image: '/placeholder-benefit-1.jpg'
              }
            },
            {
              id: 'benefit-2',
              type: 'card',
              props: {
                title: 'Melhora da Energia',
                content: 'Sinta-se mais energizado e focado durante todo o dia.',
                image: '/placeholder-benefit-2.jpg'
              }
            },
            {
              id: 'benefit-3',
              type: 'card',
              props: {
                title: 'Ganho de Massa Muscular',
                content: 'Construa músculos de forma mais eficiente com níveis otimizados de testosterona.',
                image: '/placeholder-benefit-3.jpg'
              }
            }
          ]
        },
        {
          id: 'cta-landing',
          type: 'button',
          props: {
            text: 'Quero Transformar Minha Vida',
            variant: 'default',
            size: 'lg',
            href: '#checkout'
          }
        }
      ],
      settings: {
        title: 'Testo1k - Transforme sua vida',
        description: 'Descubra como o carnívorismo pode revolucionar sua saúde',
        theme: 'light'
      }
    }
  };

  useEffect(() => {
    // Carregar página baseada no ID ou usar página padrão
    const pageKey = pageId || 'home';
    const pageData = predefinedPages[pageKey as keyof typeof predefinedPages] || predefinedPages.home;
    
    setCurrentPage(pageData);
    setIsLoading(false);
  }, [pageId]);

  const handleSave = async (content: PageContent) => {
    try {
      // Aqui você salvaria no banco de dados
      console.log('Salvando página:', content);
      
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Página salva com sucesso!');
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
            <PageBuilder
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
              <PageBuilder
                pageId={pageId || 'home'}
                initialContent={currentPage}
                onSave={handleSave}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
