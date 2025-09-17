import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Save, 
  Smartphone, 
  Tablet, 
  Monitor,
  Type,
  Image,
  MousePointer,
  Layout,
  Plus
} from 'lucide-react';

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

// Componente para renderizar elementos
const ElementRenderer: React.FC<{
  element: SimpleElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SimpleElement>) => void;
}> = ({ element, isSelected, onSelect, onUpdate }) => {
  const handleClick = () => onSelect(element.id);

  const renderElement = () => {
    const baseStyle = {
      ...element.style,
      cursor: 'pointer',
      border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
      borderRadius: '4px',
      padding: element.style?.padding || '8px',
      margin: element.style?.margin || '4px 0'
    };

    switch (element.type) {
      case 'heading':
        return (
          <h2 
            style={baseStyle}
            onClick={handleClick}
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(element.id, { content: e.currentTarget.textContent || '' })}
          >
            {element.content || 'Clique para editar o título'}
          </h2>
        );

      case 'paragraph':
        return (
          <p 
            style={baseStyle}
            onClick={handleClick}
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(element.id, { content: e.currentTarget.textContent || '' })}
          >
            {element.content || 'Clique para editar o parágrafo'}
          </p>
        );

      case 'button':
        return (
          <button 
            style={{
              ...baseStyle,
              backgroundColor: element.style?.backgroundColor || '#3b82f6',
              color: element.style?.color || 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 24px',
              fontSize: element.style?.fontSize || '16px'
            }}
            onClick={handleClick}
          >
            {element.content || 'Clique Aqui'}
          </button>
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
              <input
                type="text"
                placeholder="URL da imagem"
                value={element.content}
                onChange={(e) => onUpdate(element.id, { content: e.target.value })}
                style={{ width: '100%', marginTop: '8px', padding: '4px' }}
              />
            )}
          </div>
        );

      default:
        return <div>Elemento não suportado</div>;
    }
  };

  return renderElement();
};

// Componente principal do Page Builder
export const SimplePageBuilder: React.FC<{
  pageId: string;
  initialContent?: SimplePageContent;
  onSave?: (content: SimplePageContent) => void;
}> = ({ pageId, initialContent, onSave }) => {
  const [content, setContent] = useState<SimplePageContent>(
    initialContent || {
      title: 'Nova Página',
      elements: []
    }
  );
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const addElement = useCallback((type: SimpleElement['type']) => {
    const newElement: SimpleElement = {
      id: `element-${Date.now()}`,
      type,
      content: '',
      style: {}
    };

    setContent(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<SimpleElement>) => {
    setContent(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setContent(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
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
          <h1 className="text-xl font-bold">Page Builder: {content.title}</h1>
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
        {/* Left Sidebar - Component Library */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Componentes</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addElement('heading')}
            >
              <Type className="h-4 w-4 mr-2" />
              Título
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addElement('paragraph')}
            >
              <Type className="h-4 w-4 mr-2" />
              Parágrafo
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addElement('button')}
            >
              <MousePointer className="h-4 w-4 mr-2" />
              Botão
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addElement('image')}
            >
              <Image className="h-4 w-4 mr-2" />
              Imagem
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
                Excluir Elemento
              </Button>
            </div>
          )}
        </div>

        {/* Center - Visual Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <div className={`${getDeviceClass()} bg-white shadow-lg min-h-full p-6`}>
              {content.elements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                  <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Comece a construir sua página</h3>
                  <p className="text-sm text-center">
                    Adicione componentes da barra lateral para começar
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {content.elements.map((element) => (
                    <ElementRenderer
                      key={element.id}
                      element={element}
                      isSelected={selectedElement === element.id}
                      onSelect={setSelectedElement}
                      onUpdate={updateElement}
                    />
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
                const element = content.elements.find(el => el.id === selectedElement);
                if (!element) return null;

                return (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Elemento: {element.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Conteúdo</label>
                        <textarea
                          value={element.content}
                          onChange={(e) => updateElement(element.id, { content: e.target.value })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Cor do Texto</label>
                        <input
                          type="color"
                          value={element.style?.color || '#000000'}
                          onChange={(e) => updateElement(element.id, { 
                            style: { ...element.style, color: e.target.value }
                          })}
                          className="w-full mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Tamanho da Fonte</label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={parseInt(element.style?.fontSize || '16')}
                          onChange={(e) => updateElement(element.id, { 
                            style: { ...element.style, fontSize: `${e.target.value}px` }
                          })}
                          className="w-full mt-1"
                        />
                        <span className="text-xs text-gray-500">
                          {element.style?.fontSize || '16px'}
                        </span>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Alinhamento</label>
                        <select
                          value={element.style?.textAlign || 'left'}
                          onChange={(e) => updateElement(element.id, { 
                            style: { ...element.style, textAlign: e.target.value as any }
                          })}
                          className="w-full mt-1 p-2 border border-gray-300 rounded"
                        >
                          <option value="left">Esquerda</option>
                          <option value="center">Centro</option>
                          <option value="right">Direita</option>
                        </select>
                      </div>
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
