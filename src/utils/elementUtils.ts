import { PageElement } from '@/hooks/usePageBuilder';

// Função para garantir que um elemento tenha props válidas
export const ensureElementProps = (element: any): PageElement | null => {
  if (!element || typeof element !== 'object') {
    console.error('ElementUtils: Elemento inválido:', element);
    return null;
  }

  // Garantir que props seja sempre um objeto válido
  const safeProps = element.props && typeof element.props === 'object' 
    ? element.props 
    : {};

  return {
    id: element.id || `element-${Date.now()}`,
    type: element.type || 'paragraph',
    props: safeProps,
    children: element.children || [],
    parentId: element.parentId
  };
};

// Função para garantir que um array de elementos tenha props válidas
export const ensureElementsProps = (elements: any[]): PageElement[] => {
  if (!Array.isArray(elements)) {
    console.error('ElementUtils: Array de elementos inválido:', elements);
    return [];
  }

  return elements
    .map(ensureElementProps)
    .filter((element): element is PageElement => element !== null);
};

// Função para validar se um elemento é válido
export const isValidElement = (element: any): element is PageElement => {
  return (
    element &&
    typeof element === 'object' &&
    typeof element.id === 'string' &&
    typeof element.type === 'string' &&
    element.props &&
    typeof element.props === 'object'
  );
};

// Função para criar props padrão baseado no tipo
export const getDefaultProps = (type: string): Record<string, any> => {
  const defaultProps: Record<string, any> = {
    heading: {
      text: 'Novo Cabeçalho',
      level: 1,
      align: 'left',
      color: '#000000',
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    paragraph: {
      text: 'Este é um novo parágrafo. Clique para editar o texto.',
      align: 'left',
      color: '#666666',
      fontSize: '1rem',
      lineHeight: '1.5'
    },
    button: {
      text: 'Clique Aqui',
      variant: 'default',
      size: 'default',
      href: '#',
      target: '_self'
    },
    image: {
      src: '/placeholder-image.jpg',
      alt: 'Imagem',
      width: '100%',
      height: 'auto',
      borderRadius: '0px'
    },
    container: {
      padding: '20px',
      margin: '0',
      backgroundColor: 'transparent',
      borderRadius: '0px',
      border: 'none'
    },
    columns: {
      columns: 2,
      gap: '20px',
      padding: '0',
      margin: '0'
    },
    card: {
      title: 'Título do Card',
      content: 'Conteúdo do card aqui.',
      image: '',
      buttonText: 'Saiba Mais',
      buttonLink: '#'
    },
    newsletter: {
      title: 'Inscreva-se em nossa Newsletter',
      description: 'Receba as últimas novidades diretamente no seu email.',
      placeholder: 'Seu email',
      buttonText: 'Inscrever',
      successMessage: 'Obrigado por se inscrever!'
    },
    spacer: {
      height: '40px',
      backgroundColor: 'transparent',
      margin: '0'
    },
    divider: {
      height: '1px',
      color: '#e0e0e0',
      margin: '20px 0'
    },
    list: {
      type: 'unordered',
      items: ['Item 1', 'Item 2', 'Item 3'],
      color: '#666666',
      fontSize: '1rem'
    },
    testimonial: {
      quote: 'Depoimento do cliente',
      author: 'Nome do Cliente',
      role: '',
      backgroundColor: '#f8f9fa',
      quoteColor: '#333',
      authorColor: '#666',
      roleColor: '#999'
    }
  };

  return defaultProps[type] || {};
};
