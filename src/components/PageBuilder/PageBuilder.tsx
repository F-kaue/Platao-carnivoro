import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Save, 
  Undo, 
  Redo, 
  Smartphone, 
  Tablet, 
  Monitor,
  Palette,
  Type,
  Image,
  Layout,
  Settings,
  Plus,
  Trash2,
  Copy,
  Move,
  MoreVertical
} from 'lucide-react';
import { ComponentLibrary } from './ComponentLibrary';
import { VisualEditor } from './VisualEditor';
import { PropertyPanel } from './PropertyPanel';
import { PreviewPanel } from './PreviewPanel';
import { usePageBuilder } from '@/hooks/usePageBuilder';

interface PageBuilderProps {
  pageId: string;
  initialContent?: any;
  onSave?: (content: any) => void;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({
  pageId,
  initialContent,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const {
    content,
    updateContent,
    addElement,
    removeElement,
    updateElement,
    moveElement,
    duplicateElement,
    undo,
    redo,
    canUndo,
    canRedo
  } = usePageBuilder(initialContent);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
    }
  }, [content, onSave]);

  const handleUndo = useCallback(() => {
    if (canUndo) {
      undo();
    }
  }, [canUndo, undo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      redo();
    }
  }, [canRedo, redo]);

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
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Page Builder</h1>
            <div className="flex items-center space-x-2">
              <Button
                variant={deviceView === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeviceView('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
            >
              <Eye className="w-4 h-4 mr-2" />
              {activeTab === 'edit' ? 'Preview' : 'Editar'}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Component Library */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <Tabs defaultValue="components" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="components">Componentes</TabsTrigger>
                <TabsTrigger value="styles">Estilos</TabsTrigger>
                <TabsTrigger value="pages">Páginas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="flex-1 overflow-y-auto">
                <ComponentLibrary onAddElement={addElement} />
              </TabsContent>
              
              <TabsContent value="styles" className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Temas</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Tema Claro
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Tema Escuro
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Tema Personalizado
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pages" className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Páginas</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Layout className="w-4 h-4 mr-2" />
                      Página Inicial
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Layout className="w-4 h-4 mr-2" />
                      Testo1k
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Layout className="w-4 h-4 mr-2" />
                      Landing Page
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Visual Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
              <div className={`${getDeviceClass()} bg-white shadow-lg min-h-full`}>
                <VisualEditor
                  content={content}
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                  onUpdateElement={updateElement}
                  onRemoveElement={removeElement}
                  onMoveElement={moveElement}
                  onDuplicateElement={duplicateElement}
                  deviceView={deviceView}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties Panel */}
          <div className="w-80 bg-white border-l border-gray-200">
            <PropertyPanel
              selectedElement={selectedElement}
              content={content}
              onUpdateElement={updateElement}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
