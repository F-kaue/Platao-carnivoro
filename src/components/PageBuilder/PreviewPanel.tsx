import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Eye, 
  ExternalLink, 
  Smartphone, 
  Tablet, 
  Monitor,
  RefreshCw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { PageContent } from '@/hooks/usePageBuilder';
import { ElementRenderer } from './ElementRenderer';

interface PreviewPanelProps {
  content: PageContent;
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  content,
  deviceView,
  onDeviceChange,
  isFullscreen = false,
  onToggleFullscreen
}) => {
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

  const getDeviceIcon = () => {
    switch (deviceView) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    // Prevenir cliques em elementos interativos durante o preview
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={`h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={deviceView === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('desktop')}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('tablet')}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDeviceChange('mobile')}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          {onToggleFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Abrir preview em nova aba
              const previewWindow = window.open('', '_blank');
              if (previewWindow) {
                previewWindow.document.write(`
                  <!DOCTYPE html>
                  <html lang="pt-BR">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${content.settings.title}</title>
                    <meta name="description" content="${content.settings.description}">
                    <style>
                      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                      .preview-container { max-width: 100%; margin: 0 auto; }
                    </style>
                  </head>
                  <body>
                    <div class="preview-container">
                      ${renderPreviewContent(content)}
                    </div>
                  </body>
                  </html>
                `);
                previewWindow.document.close();
              }
            }}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Nova Aba
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div 
          className={`${getDeviceClass()} bg-white shadow-lg min-h-full`}
          onClick={handlePreviewClick}
        >
          {content.elements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Preview Vazio</h3>
              <p className="text-sm text-center">
                Adicione elementos na aba de edição para ver o preview aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {content.elements.map((element) => (
                <ElementRenderer
                  key={element.id}
                  element={element}
                  onUpdate={() => {}} // Não permitir edição no preview
                  isSelected={false}
                  deviceView={deviceView}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {getDeviceIcon()}
            <span>Preview {deviceView === 'desktop' ? 'Desktop' : deviceView === 'tablet' ? 'Tablet' : 'Mobile'}</span>
          </div>
          <div>
            {content.elements.length} elemento{content.elements.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para renderizar o conteúdo no preview
const renderPreviewContent = (content: PageContent): string => {
  const renderElement = (element: any): string => {
    const { type, props } = element;

    switch (type) {
      case 'heading':
        const HeadingTag = `h${props.level || 1}`;
        return `<${HeadingTag} style="text-align: ${props.align || 'left'}; color: ${props.color || '#000000'}; font-size: ${props.fontSize || '2rem'}; font-weight: ${props.fontWeight || 'bold'}; margin: 0 0 1rem 0;">${props.text || 'Novo Cabeçalho'}</${HeadingTag}>`;

      case 'paragraph':
        return `<p style="text-align: ${props.align || 'left'}; color: ${props.color || '#666666'}; font-size: ${props.fontSize || '1rem'}; line-height: ${props.lineHeight || '1.5'}; margin: 0 0 1rem 0;">${props.text || 'Este é um novo parágrafo.'}</p>`;

      case 'button':
        return `<button style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 0.5rem 0;">${props.text || 'Clique Aqui'}</button>`;

      case 'image':
        return `<div style="text-align: ${props.align || 'center'}; margin: 1rem 0;"><img src="${props.src || '/placeholder-image.jpg'}" alt="${props.alt || 'Imagem'}" style="width: ${props.width || '100%'}; height: ${props.height || 'auto'}; max-width: 100%; border-radius: ${props.borderRadius || '0px'};" /></div>`;

      case 'container':
        const children = props.children ? props.children.map(renderElement).join('') : '<div style="color: #999; text-align: center; padding: 20px;">Container vazio</div>';
        return `<div style="padding: ${props.padding || '20px'}; margin: ${props.margin || '0'}; background-color: ${props.backgroundColor || 'transparent'}; border-radius: ${props.borderRadius || '0px'}; border: ${props.border || 'none'};">${children}</div>`;

      case 'columns':
        const columnCount = props.columns || 2;
        const columnWidth = `${100 / columnCount}%`;
        const columns = Array.from({ length: columnCount }).map((_, index) => {
          const columnContent = props.children && props.children[index] 
            ? renderElement(props.children[index])
            : `<div style="color: #999; text-align: center; padding: 20px;">Coluna ${index + 1}</div>`;
          return `<div style="width: ${columnWidth}; padding: 10px;">${columnContent}</div>`;
        }).join('');
        return `<div style="display: flex; gap: ${props.gap || '20px'}; flex-wrap: wrap;">${columns}</div>`;

      case 'spacer':
        return `<div style="height: ${props.height || '40px'};"></div>`;

      case 'divider':
        return `<hr style="border: none; height: ${props.height || '1px'}; background-color: ${props.color || '#e0e0e0'}; margin: ${props.margin || '20px 0'};" />`;

      default:
        return `<div style="padding: 20px; border: 2px dashed #ccc; text-align: center; color: #999;">Componente: ${type}</div>`;
    }
  };

  return content.elements.map(renderElement).join('');
};
