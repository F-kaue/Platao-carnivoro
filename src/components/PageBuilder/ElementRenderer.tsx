import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageElement } from '@/hooks/usePageBuilder';

interface ElementRendererProps {
  element: PageElement;
  onUpdate: (updates: Partial<PageElement>) => void;
  isSelected: boolean;
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  onUpdate,
  isSelected,
  deviceView
}) => {
  // Verificar se element existe
  if (!element) {
    return (
      <div className="p-4 border-2 border-dashed border-red-300 rounded-lg text-center text-red-500">
        <p>Elemento não encontrado</p>
      </div>
    );
  }

  const { type, props } = element;

  const handleTextChange = (newText: string) => {
    onUpdate({
      props: {
        ...props,
        text: newText
      }
    });
  };

  const handlePropChange = (key: string, value: any) => {
    onUpdate({
      props: {
        ...props,
        [key]: value
      }
    });
  };

  const getResponsiveClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'text-sm';
      case 'tablet':
        return 'text-base';
      default:
        return 'text-lg';
    }
  };

  const renderElement = () => {
    switch (type) {
      case 'heading':
        const HeadingTag = `h${element.element.props.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            style={{
              textAlign: element.element.props.align || 'left',
              color: element.element.props.color || '#000000',
              fontSize: element.element.props.fontSize || '2rem',
              fontWeight: element.element.props.fontWeight || 'bold',
              margin: '0 0 1rem 0'
            }}
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange(e.currentTarget.textContent || '')}
          >
            {element.element.props.text || 'Novo Cabeçalho'}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p
            style={{
              textAlign: element.props.align || 'left',
              color: element.props.color || '#666666',
              fontSize: element.props.fontSize || '1rem',
              lineHeight: element.props.lineHeight || '1.5',
              margin: '0 0 1rem 0'
            }}
            contentEditable={isSelected}
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange(e.currentTarget.textContent || '')}
          >
            {element.props.text || 'Este é um novo parágrafo. Clique para editar o texto.'}
          </p>
        );

      case 'button':
        return (
          <Button
            variant={element.props.variant || 'default'}
            size={element.props.size || 'default'}
            style={{
              margin: '0.5rem 0'
            }}
            onClick={() => {
              if (element.props.href && element.props.href !== '#') {
                if (element.props.target === '_blank') {
                  window.open(element.props.href, '_blank');
                } else {
                  window.location.href = element.props.href;
                }
              }
            }}
          >
            {isSelected ? (
              <input
                type="text"
                value={element.props.text || 'Clique Aqui'}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="bg-transparent border-none outline-none text-inherit"
                style={{ minWidth: '100px' }}
              />
            ) : (
              element.props.text || 'Clique Aqui'
            )}
          </Button>
        );

      case 'image':
        return (
          <div style={{ textAlign: element.props.align || 'center', margin: '1rem 0' }}>
            <img
              src={element.props.src || '/placeholder-image.jpg'}
              alt={element.props.alt || 'Imagem'}
              style={{
                width: element.props.width || '100%',
                height: element.props.height || 'auto',
                maxWidth: '100%',
                borderRadius: element.props.borderRadius || '0px'
              }}
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            {isSelected && (
              <div className="mt-2 space-y-2">
                <Input
                  placeholder="URL da imagem"
                  value={element.props.src || ''}
                  onChange={(e) => handlePropChange('src', e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder="Texto alternativo"
                  value={element.props.alt || ''}
                  onChange={(e) => handlePropChange('alt', e.target.value)}
                  className="text-sm"
                />
              </div>
            )}
          </div>
        );

      case 'container':
        return (
          <div
            style={{
              padding: element.props.padding || '20px',
              margin: element.props.margin || '0',
              backgroundColor: element.props.backgroundColor || 'transparent',
              borderRadius: element.props.borderRadius || '0px',
              border: element.props.border || 'none'
            }}
          >
            {element.props.children && element.props.children.length > 0 ? (
              element.props.children.map((child: PageElement, index: number) => (
                <ElementRenderer
                  key={child.id || index}
                  element={child}
                  onUpdate={(updates) => {
                    const newChildren = [...element.props.children];
                    newChildren[index] = { ...child, ...updates };
                    handlePropChange('children', newChildren);
                  }}
                  isSelected={isSelected}
                  deviceView={deviceView}
                />
              ))
            ) : (
              <div className="text-gray-400 text-center py-8">
                Container vazio - adicione elementos aqui
              </div>
            )}
          </div>
        );

      case 'columns':
        const columnCount = element.props.columns || 2;
        const columnWidth = `${100 / columnCount}%`;
        
        return (
          <div
            style={{
              display: 'flex',
              gap: element.props.gap || '20px',
              flexWrap: deviceView === 'mobile' ? 'wrap' : 'nowrap'
            }}
          >
            {Array.from({ length: columnCount }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: deviceView === 'mobile' ? '100%' : columnWidth,
                  minHeight: '100px',
                  border: isSelected ? '2px dashed #ccc' : 'none',
                  padding: '10px'
                }}
              >
                {element.props.children && element.props.children[index] ? (
                  <ElementRenderer
                    element={element.props.children[index]}
                    onUpdate={(updates) => {
                      const newChildren = [...(element.props.children || [])];
                      newChildren[index] = { ...newChildren[index], ...updates };
                      handlePropChange('children', newChildren);
                    }}
                    isSelected={isSelected}
                    deviceView={deviceView}
                  />
                ) : (
                  <div className="text-gray-400 text-center py-4">
                    Coluna {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'card':
        return (
          <Card className="max-w-sm mx-auto">
            {element.props.image && (
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={element.props.image}
                  alt={element.props.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>
                {isSelected ? (
                  <input
                    type="text"
                    value={element.props.title || 'Título do Card'}
                    onChange={(e) => handlePropChange('title', e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-semibold"
                  />
                ) : (
                  element.props.title || 'Título do Card'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isSelected ? (
                  <Textarea
                    value={element.props.content || 'Conteúdo do card aqui.'}
                    onChange={(e) => handlePropChange('content', e.target.value)}
                    className="w-full bg-transparent border-none outline-none resize-none"
                    rows={3}
                  />
                ) : (
                  element.props.content || 'Conteúdo do card aqui.'
                )}
              </p>
              <Button variant="outline" size="sm">
                {element.props.buttonText || 'Saiba Mais'}
              </Button>
            </CardContent>
          </Card>
        );

      case 'newsletter':
        return (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              {isSelected ? (
                <input
                  type="text"
                  value={element.props.title || 'Inscreva-se em nossa Newsletter'}
                  onChange={(e) => handlePropChange('title', e.target.value)}
                  className="w-full bg-transparent border-none outline-none font-semibold text-center"
                />
              ) : (
                element.props.title || 'Inscreva-se em nossa Newsletter'
              )}
            </h3>
            <p className="text-gray-600 mb-4">
              {isSelected ? (
                <Textarea
                  value={element.props.description || 'Receba as últimas novidades diretamente no seu email.'}
                  onChange={(e) => handlePropChange('description', e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none text-center"
                  rows={2}
                />
              ) : (
                element.props.description || 'Receba as últimas novidades diretamente no seu email.'
              )}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                placeholder={element.props.placeholder || 'Seu email'}
                className="flex-1"
              />
              <Button>
                {element.props.buttonText || 'Inscrever'}
              </Button>
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div
            style={{
              height: element.props.height || '40px',
              backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
              border: isSelected ? '2px dashed #ccc' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isSelected && (
              <span className="text-gray-500 text-sm">
                Espaçador ({element.props.height || '40px'})
              </span>
            )}
          </div>
        );

      case 'divider':
        return (
          <hr
            style={{
              border: 'none',
              height: element.props.height || '1px',
              backgroundColor: element.props.color || '#e0e0e0',
              margin: element.props.margin || '20px 0'
            }}
          />
        );

      case 'list':
        const ListTag = element.props.type === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag
            style={{
              color: element.props.color || '#666666',
              fontSize: element.props.fontSize || '1rem',
              margin: '1rem 0',
              paddingLeft: '1.5rem'
            }}
          >
            {element.props.items?.map((item: string, index: number) => (
              <li key={index} style={{ margin: '0.5rem 0' }}>
                {isSelected ? (
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(element.props.items || [])];
                      newItems[index] = e.target.value;
                      handlePropChange('items', newItems);
                    }}
                    className="bg-transparent border-none outline-none"
                    style={{ width: '100%' }}
                  />
                ) : (
                  item
                )}
              </li>
            ))}
          </ListTag>
        );

      case 'testimonial':
        return (
          <div
            style={{
              padding: '2rem',
              backgroundColor: element.props.backgroundColor || '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              margin: '2rem 0',
              ...(element.props.customCSS ? {} : {})
            }}
            className={element.props.customCSS ? '' : 'testimonial-default'}
          >
            <blockquote
              style={{
                fontSize: '1.2rem',
                fontStyle: 'italic',
                color: element.props.quoteColor || '#333',
                margin: '0 0 1rem 0',
                lineHeight: '1.6'
              }}
            >
              "{isSelected ? (
                <textarea
                  value={element.props.quote || ''}
                  onChange={(e) => handlePropChange('quote', e.target.value)}
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={3}
                />
              ) : (
                element.props.quote || 'Depoimento do cliente'
              )}"
            </blockquote>
            <div style={{ marginTop: '1rem' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  color: element.props.authorColor || '#666',
                  fontSize: '1rem'
                }}
              >
                {isSelected ? (
                  <input
                    type="text"
                    value={element.props.author || ''}
                    onChange={(e) => handlePropChange('author', e.target.value)}
                    className="bg-transparent border-none outline-none text-center"
                    placeholder="Nome do autor"
                  />
                ) : (
                  element.props.author || 'Nome do Cliente'
                )}
              </div>
              {element.props.role && (
                <div
                  style={{
                    color: element.props.roleColor || '#999',
                    fontSize: '0.9rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {isSelected ? (
                    <input
                      type="text"
                      value={element.props.role || ''}
                      onChange={(e) => handlePropChange('role', e.target.value)}
                      className="bg-transparent border-none outline-none text-center"
                      placeholder="Cargo/Função"
                    />
                  ) : (
                    element.props.role
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>Componente não encontrado: {type}</p>
            {isSelected && (
              <p className="text-sm mt-2">
                Este componente ainda não foi implementado.
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`element-renderer ${getResponsiveClass()}`}>
      {renderElement()}
    </div>
  );
};
