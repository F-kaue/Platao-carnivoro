import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Type, 
  Palette, 
  Layout, 
  Settings,
  Eye,
  Code,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { PageElement, PageContent } from '@/hooks/usePageBuilder';

interface PropertyPanelProps {
  selectedElement: string | null;
  content: PageContent;
  onUpdateElement: (id: string, updates: Partial<PageElement>) => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElement,
  content,
  onUpdateElement
}) => {
  const [selectedElementData, setSelectedElementData] = useState<PageElement | null>(null);

  useEffect(() => {
    if (selectedElement) {
      const findElement = (elements: PageElement[]): PageElement | null => {
        for (const element of elements) {
          if (element.id === selectedElement) {
            return element;
          }
          if (element.children) {
            const found = findElement(element.children);
            if (found) return found;
          }
        }
        return null;
      };

      const element = findElement(content.elements);
      setSelectedElementData(element);
    } else {
      setSelectedElementData(null);
    }
  }, [selectedElement, content]);

  const handlePropChange = (key: string, value: any) => {
    if (selectedElement && selectedElementData) {
      onUpdateElement(selectedElement, {
        props: {
          ...selectedElementData.props,
          [key]: value
        }
      });
    }
  };

  const renderElementProperties = () => {
    if (!selectedElementData || !selectedElementData.props) return null;

    const { type, props } = selectedElementData;

    switch (type) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto</Label>
              <Input
                id="text"
                value={props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                placeholder="Digite o texto do cabeçalho"
              />
            </div>
            
            <div>
              <Label htmlFor="level">Nível</Label>
              <Select
                value={props.level?.toString() || '1'}
                onValueChange={(value) => handlePropChange('level', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1 - Principal</SelectItem>
                  <SelectItem value="2">H2 - Secundário</SelectItem>
                  <SelectItem value="3">H3 - Terciário</SelectItem>
                  <SelectItem value="4">H4 - Quaternário</SelectItem>
                  <SelectItem value="5">H5 - Quinário</SelectItem>
                  <SelectItem value="6">H6 - Senário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="align">Alinhamento</Label>
              <Select
                value={props.align || 'left'}
                onValueChange={(value) => handlePropChange('align', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                  <SelectItem value="justify">Justificado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={props.color || '#000000'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={props.color || '#000000'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fontSize">Tamanho da Fonte</Label>
              <Input
                id="fontSize"
                value={props.fontSize || '2rem'}
                onChange={(e) => handlePropChange('fontSize', e.target.value)}
                placeholder="2rem"
              />
            </div>

            <div>
              <Label htmlFor="fontWeight">Peso da Fonte</Label>
              <Select
                value={props.fontWeight || 'bold'}
                onValueChange={(value) => handlePropChange('fontWeight', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Negrito</SelectItem>
                  <SelectItem value="lighter">Mais leve</SelectItem>
                  <SelectItem value="bolder">Mais pesado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto</Label>
              <Textarea
                id="text"
                value={props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                placeholder="Digite o texto do parágrafo"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="align">Alinhamento</Label>
              <Select
                value={props.align || 'left'}
                onValueChange={(value) => handlePropChange('align', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                  <SelectItem value="justify">Justificado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={props.color || '#666666'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={props.color || '#666666'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  placeholder="#666666"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="fontSize">Tamanho da Fonte</Label>
              <Input
                id="fontSize"
                value={props.fontSize || '1rem'}
                onChange={(e) => handlePropChange('fontSize', e.target.value)}
                placeholder="1rem"
              />
            </div>

            <div>
              <Label htmlFor="lineHeight">Altura da Linha</Label>
              <Input
                id="lineHeight"
                value={props.lineHeight || '1.5'}
                onChange={(e) => handlePropChange('lineHeight', e.target.value)}
                placeholder="1.5"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto</Label>
              <Input
                id="text"
                value={props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                placeholder="Texto do botão"
              />
            </div>

            <div>
              <Label htmlFor="variant">Variante</Label>
              <Select
                value={props.variant || 'default'}
                onValueChange={(value) => handlePropChange('variant', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Padrão</SelectItem>
                  <SelectItem value="destructive">Destrutivo</SelectItem>
                  <SelectItem value="outline">Contorno</SelectItem>
                  <SelectItem value="secondary">Secundário</SelectItem>
                  <SelectItem value="ghost">Fantasma</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="size">Tamanho</Label>
              <Select
                value={props.size || 'default'}
                onValueChange={(value) => handlePropChange('size', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="default">Médio</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="href">Link</Label>
              <Input
                id="href"
                value={props.href || ''}
                onChange={(e) => handlePropChange('href', e.target.value)}
                placeholder="https://exemplo.com"
              />
            </div>

            <div>
              <Label htmlFor="target">Abrir em</Label>
              <Select
                value={props.target || '_self'}
                onValueChange={(value) => handlePropChange('target', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Mesma aba</SelectItem>
                  <SelectItem value="_blank">Nova aba</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">URL da Imagem</Label>
              <Input
                id="src"
                value={props.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div>
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={props.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>

            <div>
              <Label htmlFor="width">Largura</Label>
              <Input
                id="width"
                value={props.width || '100%'}
                onChange={(e) => handlePropChange('width', e.target.value)}
                placeholder="100%"
              />
            </div>

            <div>
              <Label htmlFor="height">Altura</Label>
              <Input
                id="height"
                value={props.height || 'auto'}
                onChange={(e) => handlePropChange('height', e.target.value)}
                placeholder="auto"
              />
            </div>

            <div>
              <Label htmlFor="align">Alinhamento</Label>
              <Select
                value={props.align || 'center'}
                onValueChange={(value) => handlePropChange('align', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="borderRadius">Bordas Arredondadas</Label>
              <Input
                id="borderRadius"
                value={props.borderRadius || '0px'}
                onChange={(e) => handlePropChange('borderRadius', e.target.value)}
                placeholder="0px"
              />
            </div>
          </div>
        );

      case 'container':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={props.padding || '20px'}
                onChange={(e) => handlePropChange('padding', e.target.value)}
                placeholder="20px"
              />
            </div>

            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={props.margin || '0'}
                onChange={(e) => handlePropChange('margin', e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={props.backgroundColor || '#ffffff'}
                  onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={props.backgroundColor || '#ffffff'}
                  onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="borderRadius">Bordas Arredondadas</Label>
              <Input
                id="borderRadius"
                value={props.borderRadius || '0px'}
                onChange={(e) => handlePropChange('borderRadius', e.target.value)}
                placeholder="0px"
              />
            </div>

            <div>
              <Label htmlFor="border">Borda</Label>
              <Input
                id="border"
                value={props.border || 'none'}
                onChange={(e) => handlePropChange('border', e.target.value)}
                placeholder="1px solid #ccc"
              />
            </div>
          </div>
        );

      case 'columns':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="columns">Número de Colunas</Label>
              <Select
                value={props.columns?.toString() || '2'}
                onValueChange={(value) => handlePropChange('columns', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Coluna</SelectItem>
                  <SelectItem value="2">2 Colunas</SelectItem>
                  <SelectItem value="3">3 Colunas</SelectItem>
                  <SelectItem value="4">4 Colunas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gap">Espaçamento</Label>
              <Input
                id="gap"
                value={props.gap || '20px'}
                onChange={(e) => handlePropChange('gap', e.target.value)}
                placeholder="20px"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="responsive"
                checked={props.responsive !== false}
                onCheckedChange={(checked) => handlePropChange('responsive', checked)}
              />
              <Label htmlFor="responsive">Responsivo</Label>
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="height">Altura</Label>
              <Input
                id="height"
                value={props.height || '40px'}
                onChange={(e) => handlePropChange('height', e.target.value)}
                placeholder="40px"
              />
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="height">Altura</Label>
              <Input
                id="height"
                value={props.height || '1px'}
                onChange={(e) => handlePropChange('height', e.target.value)}
                placeholder="1px"
              />
            </div>

            <div>
              <Label htmlFor="color">Cor</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="color"
                  type="color"
                  value={props.color || '#e0e0e0'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={props.color || '#e0e0e0'}
                  onChange={(e) => handlePropChange('color', e.target.value)}
                  placeholder="#e0e0e0"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={props.margin || '20px 0'}
                onChange={(e) => handlePropChange('margin', e.target.value)}
                placeholder="20px 0"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <Settings className="w-8 h-8 mx-auto mb-2" />
            <p>Propriedades não disponíveis para este elemento.</p>
          </div>
        );
    }
  };

  if (!selectedElementData) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500 py-8">
          <Eye className="w-8 h-8 mx-auto mb-2" />
          <p>Selecione um elemento para editar suas propriedades.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">
            <Type className="w-4 h-4 mr-1" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="style">
            <Palette className="w-4 h-4 mr-1" />
            Estilo
          </TabsTrigger>
          <TabsTrigger value="layout">
            <Layout className="w-4 h-4 mr-1" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Propriedades do Elemento</CardTitle>
            </CardHeader>
            <CardContent>
              {renderElementProperties()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Estilos Avançados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customCSS">CSS Personalizado</Label>
                  <Textarea
                    id="customCSS"
                    value={props.customCSS || ''}
                    onChange={(e) => handlePropChange('customCSS', e.target.value)}
                    placeholder="/* CSS personalizado */"
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Layout Responsivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">Desktop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tablet className="w-4 h-4" />
                  <span className="text-sm">Tablet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">Mobile</span>
                </div>
                <p className="text-xs text-gray-500">
                  Configurações responsivas serão implementadas em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
