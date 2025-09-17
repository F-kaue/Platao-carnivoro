import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Move, 
  MoreVertical,
  Eye,
  Edit,
  Settings
} from 'lucide-react';
import { PageElement } from '@/hooks/usePageBuilder';
import { ElementRenderer } from './ElementRenderer';
import { ensureElementsProps, isValidElement, getDefaultProps } from '@/utils/elementUtils';

interface VisualEditorProps {
  content: any;
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<PageElement>) => void;
  onRemoveElement: (id: string) => void;
  onMoveElement: (id: string, newIndex: number, parentId?: string) => void;
  onDuplicateElement: (id: string) => void;
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  content,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onRemoveElement,
  onMoveElement,
  onDuplicateElement,
  deviceView
}) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: any) => {
      // Verificar se item e item.type existem
      if (!item || !item.type) {
        console.error('Item inválido recebido:', item);
        return;
      }

      // Adicionar novo elemento
      const newElement: PageElement = {
        id: `element-${Date.now()}`,
        type: item.type,
        props: getDefaultProps(item.type) || {}
      };
      
      // Aqui você chamaria onAddElement se tivesse acesso
      console.log('Dropped element:', newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), []);

  // Usar função utilitária para props padrão

  const handleElementClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    onSelectElement(elementId);
  }, [onSelectElement]);

  const handleElementHover = useCallback((elementId: string | null) => {
    setHoveredElement(elementId);
  }, []);

  const renderElement = (element: PageElement, index: number) => {
    const isSelected = selectedElement === element.id;
    const isHovered = hoveredElement === element.id;

    return (
      <div
        key={element.id}
        className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''} ${
          isHovered ? 'ring-1 ring-gray-300' : ''
        }`}
        onClick={(e) => handleElementClick(e, element.id)}
        onMouseEnter={() => handleElementHover(element.id)}
        onMouseLeave={() => handleElementHover(null)}
      >
        {/* Element Controls */}
        {(isSelected || isHovered) && (
          <div className="absolute -top-8 left-0 z-10 flex items-center space-x-1 bg-white border border-gray-200 rounded shadow-sm">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateElement(element.id);
              }}
              className="h-6 w-6 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveElement(element.id);
              }}
              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                // Implementar menu de opções
              }}
              className="h-6 w-6 p-0"
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Element Content */}
        <ElementRenderer
          element={element}
          onUpdate={(updates) => onUpdateElement(element.id, updates)}
          isSelected={isSelected}
          deviceView={deviceView}
        />

        {/* Drop Zone */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isOver ? 'bg-blue-100 border-2 border-dashed border-blue-300' : ''
          }`}
        />
      </div>
    );
  };

  return (
    <div
      ref={drop}
      className={`min-h-screen p-4 ${isOver ? 'bg-blue-50' : ''}`}
      onClick={() => onSelectElement(null)}
    >
      {content.elements.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Comece a construir sua página</h3>
            <p className="text-sm">
              Arraste componentes da barra lateral para começar
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {ensureElementsProps(content.elements).map((element: PageElement, index: number) => 
            renderElement(element, index)
          )}
        </div>
      )}

      {/* Add Element Button */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => {
            // Implementar modal de seleção de componentes
            console.log('Add new element');
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Elemento</span>
        </Button>
      </div>
    </div>
  );
};
