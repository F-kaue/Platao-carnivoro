import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Eye, 
  Save, 
  Smartphone, 
  Tablet, 
  Monitor,
  Type,
  Image,
  MousePointer,
  Link,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';

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

// Componente para renderizar elementos editáveis
const EditableElement: React.FC<{
  element: EditableElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<EditableElement>) => void;
}> = ({ element, isSelected, onSelect, onUpdate }) => {
  const handleClick = () => onSelect(element.id);

  const renderElement = () => {
    const baseStyle = {
      ...element.style,
      cursor: 'pointer',
      border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
      borderRadius: '4px',
      padding: '8px',
      margin: '4px 0',
      transition: 'all 0.2s ease'
    };

    switch (element.type) {
      case 'text':
        return (
          <div 
            style={baseStyle}
            onClick={handleClick}
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(element.id, { content: e.currentTarget.textContent || '' })}
          >
            {element.content || 'Clique para editar o texto'}
          </div>
        );

      case 'image':
        return (
          <div style={baseStyle} onClick={handleClick}>
            <img 
              src={element.content || '/placeholder-image.jpg'} 
              alt="Imagem"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            {isSelected && (
              <div className="mt-2">
                <Input
                  type="text"
                  placeholder="URL da imagem"
                  value={element.content}
                  onChange={(e) => onUpdate(element.id, { content: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div style={{ textAlign: element.style?.textAlign || 'center' }}>
            <button 
              style={{
                ...baseStyle,
                backgroundColor: element.style?.backgroundColor || '#8B4513',
                color: element.style?.color || 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 24px',
                fontSize: element.style?.fontSize || '16px',
                fontWeight: element.style?.fontWeight || 'bold'
              }}
              onClick={handleClick}
            >
              {element.content || 'Clique Aqui'}
            </button>
            {isSelected && (
              <div className="mt-2 space-y-2">
                <Input
                  type="text"
                  placeholder="Texto do botão"
                  value={element.content}
                  onChange={(e) => onUpdate(element.id, { content: e.target.value })}
                />
                <Input
                  type="url"
                  placeholder="Link do botão (opcional)"
                  value={element.link || ''}
                  onChange={(e) => onUpdate(element.id, { link: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 'link':
        return (
          <a
            href={element.link || '#'}
            target={element.target || '_self'}
            style={{
              ...baseStyle,
              color: element.style?.color || '#3b82f6',
              textDecoration: 'underline'
            }}
            onClick={handleClick}
          >
            {element.content || 'Clique para editar o link'}
          </a>
        );

      default:
        return <div>Elemento não suportado</div>;
    }
  };

  return renderElement();
};

// Componente principal do Real Page Builder
export const RealPageBuilder: React.FC<{
  pageId: string;
  initialContent?: RealPageContent;
  onSave?: (content: RealPageContent) => void;
}> = ({ pageId, initialContent, onSave }) => {
  const [content, setContent] = useState<RealPageContent>(
    initialContent || {
      title: 'Nova Página',
      sections: []
    }
  );
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const addElement = useCallback((sectionId: string, type: EditableElement['type']) => {
    const newElement: EditableElement = {
      id: `element-${Date.now()}`,
      type,
      content: '',
      style: {}
    };

    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId 
          ? { ...section, elements: [...section.elements, newElement] }
          : section
      )
    }));
  }, []);

  const updateElement = useCallback((elementId: string, updates: Partial<EditableElement>) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => ({
        ...section,
        elements: section.elements.map(element => 
          element.id === elementId ? { ...element, ...updates } : element
        )
      }))
    }));
  }, []);

  const deleteElement = useCallback((elementId: string) => {
    setContent(prev => ({
      ...prev,
      sections: prev.sections.map(section => ({
        ...section,
        elements: section.elements.filter(element => element.id !== elementId)
      }))
    }));
    setSelectedElement(null);
  }, []);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
    }
  }, [content, onSave]);

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Real Page Builder: {content.title}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeviceView('desktop')}
              className={deviceView === 'desktop' ? 'bg-blue-100' : ''}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeviceView('tablet')}
              className={deviceView === 'tablet' ? 'bg-blue-100' : ''}
            >
              <Tablet className="h-4 w-4 mr-2" />
              Tablet
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeviceView('mobile')}
              className={deviceView === 'mobile' ? 'bg-blue-100' : ''}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Sections and Elements */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <Tabs defaultValue="sections" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sections">Seções</TabsTrigger>
              <TabsTrigger value="elements">Elementos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sections" className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {content.sections.map((section) => (
                  <Card 
                    key={section.id}
                    className={`cursor-pointer ${selectedSection === section.id ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{section.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-500">
                        {section.elements.length} elementos
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="elements" className="flex-1 overflow-y-auto">
              <h3 className="font-semibold mb-4">Adicionar Elementos</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => selectedSection && addElement(selectedSection, 'text')}
                  disabled={!selectedSection}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Texto
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => selectedSection && addElement(selectedSection, 'image')}
                  disabled={!selectedSection}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Imagem
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => selectedSection && addElement(selectedSection, 'button')}
                  disabled={!selectedSection}
                >
                  <MousePointer className="h-4 w-4 mr-2" />
                  Botão
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => selectedSection && addElement(selectedSection, 'link')}
                  disabled={!selectedSection}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Link
                </Button>
              </div>

              {/* Element Controls */}
              {selectedElement && (
                <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">Controles do Elemento</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteElement(selectedElement)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir Elemento
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Visual Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <div className={`${getDeviceClass()} bg-white shadow-lg min-h-full p-6`}>
              {content.sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                  <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma seção encontrada</h3>
                  <p className="text-sm text-center">
                    Esta página ainda não foi configurada com conteúdo real
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {content.sections.map((section) => (
                    <div key={section.id} className="border-b border-gray-200 pb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        {section.name}
                      </h2>
                      <div className="space-y-4">
                        {section.elements.map((element) => (
                          <EditableElement
                            key={element.id}
                            element={element}
                            isSelected={selectedElement === element.id}
                            onSelect={setSelectedElement}
                            onUpdate={updateElement}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Propriedades</h3>
          {selectedElement ? (
            <div className="space-y-4">
              {(() => {
                let element: EditableElement | null = null;
                for (const section of content.sections) {
                  element = section.elements.find(el => el.id === selectedElement) || null;
                  if (element) break;
                }
                
                if (!element) return null;

                return (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Elemento: {element.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Conteúdo</Label>
                        <Textarea
                          value={element.content}
                          onChange={(e) => updateElement(element!.id, { content: e.target.value })}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label>Cor do Texto</Label>
                        <Input
                          type="color"
                          value={element.style?.color || '#000000'}
                          onChange={(e) => updateElement(element!.id, { 
                            style: { ...element!.style, color: e.target.value }
                          })}
                        />
                      </div>

                      <div>
                        <Label>Tamanho da Fonte</Label>
                        <Input
                          type="range"
                          min="12"
                          max="48"
                          value={parseInt(element.style?.fontSize || '16')}
                          onChange={(e) => updateElement(element!.id, { 
                            style: { ...element!.style, fontSize: `${e.target.value}px` }
                          })}
                        />
                        <span className="text-xs text-gray-500">
                          {element.style?.fontSize || '16px'}
                        </span>
                      </div>

                      <div>
                        <Label>Alinhamento</Label>
                        <select
                          value={element.style?.textAlign || 'left'}
                          onChange={(e) => updateElement(element!.id, { 
                            style: { ...element!.style, textAlign: e.target.value as any }
                          })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded"
                        >
                          <option value="left">Esquerda</option>
                          <option value="center">Centro</option>
                          <option value="right">Direita</option>
                        </select>
                      </div>

                      {element.type === 'button' && (
                        <div>
                          <Label>Cor de Fundo</Label>
                          <Input
                            type="color"
                            value={element.style?.backgroundColor || '#8B4513'}
                            onChange={(e) => updateElement(element!.id, { 
                              style: { ...element!.style, backgroundColor: e.target.value }
                            })}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <p>Selecione um elemento para editar suas propriedades</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
