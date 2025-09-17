import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface PageElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: PageElement[];
  parentId?: string;
}

export interface PageContent {
  elements: PageElement[];
  settings: {
    title: string;
    description: string;
    theme: string;
    customCSS?: string;
  };
}

const defaultContent: PageContent = {
  elements: [],
  settings: {
    title: 'Nova Página',
    description: 'Descrição da página',
    theme: 'light'
  }
};

export const usePageBuilder = (initialContent?: PageContent) => {
  const [content, setContent] = useState<PageContent>(initialContent || defaultContent);
  const historyRef = useRef<PageContent[]>([]);
  const historyIndexRef = useRef(-1);

  const saveToHistory = useCallback((newContent: PageContent) => {
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(JSON.parse(JSON.stringify(newContent)));
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
  }, []);

  const updateContent = useCallback((newContent: PageContent) => {
    saveToHistory(content);
    setContent(newContent);
  }, [content, saveToHistory]);

  const addElement = useCallback((element: Omit<PageElement, 'id'>, parentId?: string) => {
    const newElement: PageElement = {
      ...element,
      id: uuidv4()
    };

    const newContent = { ...content };
    
    if (parentId) {
      // Adicionar como filho de um elemento específico
      const addToParent = (elements: PageElement[]): PageElement[] => {
        return elements.map(el => {
          if (el.id === parentId) {
            return {
              ...el,
              children: [...(el.children || []), newElement]
            };
          }
          if (el.children) {
            return {
              ...el,
              children: addToParent(el.children)
            };
          }
          return el;
        });
      };
      newContent.elements = addToParent(newContent.elements);
    } else {
      // Adicionar no nível raiz
      newContent.elements = [...newContent.elements, newElement];
    }

    updateContent(newContent);
  }, [content, updateContent]);

  const removeElement = useCallback((elementId: string) => {
    const removeFromElements = (elements: PageElement[]): PageElement[] => {
      return elements.filter(el => {
        if (el.id === elementId) {
          return false;
        }
        if (el.children) {
          el.children = removeFromElements(el.children);
        }
        return true;
      });
    };

    const newContent = { ...content };
    newContent.elements = removeFromElements(newContent.elements);
    updateContent(newContent);
  }, [content, updateContent]);

  const updateElement = useCallback((elementId: string, updates: Partial<PageElement>) => {
    const updateInElements = (elements: PageElement[]): PageElement[] => {
      return elements.map(el => {
        if (el.id === elementId) {
          // Garantir que props seja sempre um objeto válido
          const safeUpdates = { ...updates };
          if (safeUpdates.props && typeof safeUpdates.props === 'object') {
            safeUpdates.props = { ...el.props, ...safeUpdates.props };
          }
          return { ...el, ...safeUpdates };
        }
        if (el.children) {
          return {
            ...el,
            children: updateInElements(el.children)
          };
        }
        return el;
      });
    };

    const newContent = { ...content };
    newContent.elements = updateInElements(newContent.elements);
    updateContent(newContent);
  }, [content, updateContent]);

  const moveElement = useCallback((elementId: string, newIndex: number, parentId?: string) => {
    // Implementar lógica de movimentação
    // Por enquanto, apenas atualizar o conteúdo
    updateContent(content);
  }, [content, updateContent]);

  const duplicateElement = useCallback((elementId: string) => {
    const findAndDuplicate = (elements: PageElement[]): PageElement[] => {
      return elements.map(el => {
        if (el.id === elementId) {
          const duplicated: PageElement = {
            ...el,
            id: uuidv4(),
            children: el.children ? findAndDuplicate(el.children) : undefined
          };
          return el;
        }
        if (el.children) {
          return {
            ...el,
            children: findAndDuplicate(el.children)
          };
        }
        return el;
      });
    };

    const newContent = { ...content };
    newContent.elements = findAndDuplicate(newContent.elements);
    updateContent(newContent);
  }, [content, updateContent]);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setContent(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])));
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setContent(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])));
    }
  }, []);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  return {
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
  };
};
