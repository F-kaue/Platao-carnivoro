import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useNewsletterBenefits } from '@/hooks/useCMS';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Edit, Mail, BookOpen, Target, Users, Crown, Shield, Heart, Star, Award, Zap } from 'lucide-react';

// Mapeamento de ícones para preview
const iconMap: { [key: string]: any } = {
  BookOpen,
  Target,
  Users,
  Crown,
  Shield,
  Heart,
  Star,
  Award,
  Zap,
  Mail
};

export function NewsletterBenefitsTab() {
  const { toast } = useToast();
  
  // Hooks para dados
  const { benefits, loading, createBenefit, updateBenefit, deleteBenefit } = useNewsletterBenefits();
  
  // Estados para formulários
  const [editingBenefit, setEditingBenefit] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'BookOpen',
    position: 0,
    is_active: true
  });

  const iconOptions = [
    'BookOpen', 'Target', 'Users', 'Crown', 'Shield', 'Heart', 
    'Star', 'Award', 'Zap', 'Mail', 'Package', 'ExternalLink'
  ];

  const handleSaveBenefit = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Erro",
        description: "Título e descrição são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const result = editingBenefit 
      ? await updateBenefit(editingBenefit, formData)
      : await createBenefit(formData);
    
    if (result.success) {
      toast({
        title: editingBenefit ? "Benefício atualizado" : "Benefício criado",
        description: `O benefício foi ${editingBenefit ? 'atualizado' : 'criado'} com sucesso.`,
      });
      resetForm();
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao salvar benefício",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBenefit = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este benefício?')) {
      const result = await deleteBenefit(id);
      if (result.success) {
        toast({
          title: "Benefício deletado",
          description: "O benefício foi removido com sucesso.",
        });
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao deletar benefício",
          variant: "destructive",
        });
      }
    }
  };

  const startEditBenefit = (benefit: any) => {
    setEditingBenefit(benefit.id);
    setIsCreating(false);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
      position: benefit.position,
      is_active: benefit.is_active
    });
  };

  const startCreateBenefit = () => {
    setEditingBenefit(null);
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      icon: 'BookOpen',
      position: benefits.length,
      is_active: true
    });
  };

  const resetForm = () => {
    setEditingBenefit(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      icon: 'BookOpen',
      position: 0,
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-green-gray">Carregando benefícios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="w-6 h-6 text-brand-brown" />
        <h2 className="text-2xl font-diogenes font-bold text-foreground">
          Benefícios do Newsletter
        </h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cards do Newsletter</CardTitle>
            <CardDescription>
              Gerencie os benefícios exibidos na seção newsletter
            </CardDescription>
          </div>
          <Button 
            onClick={startCreateBenefit}
            className="bg-brand-brown hover:bg-brand-green-gray"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Benefício
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {benefits.sort((a, b) => a.position - b.position).map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || BookOpen;
            
            return (
              <div key={benefit.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="font-augustus font-semibold text-brand-green-gray">
                      {benefit.title}
                    </Label>
                    {!benefit.is_active && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Inativo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground mb-2">{benefit.description}</p>
                  <p className="text-xs text-brand-green-gray/70">
                    Posição: {benefit.position} | Ícone: {benefit.icon}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditBenefit(benefit)}
                    className="text-brand-brown hover:text-brand-green-gray"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteBenefit(benefit.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Formulário de Edição/Criação */}
      {(editingBenefit || isCreating) && (
        <Card className="fixed inset-x-4 bottom-4 z-50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {editingBenefit ? 'Editar Benefício' : 'Criar Novo Benefício'}
            </CardTitle>
            <CardDescription>
              {editingBenefit ? 'Modifique as informações do benefício' : 'Adicione um novo benefício ao newsletter'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Sabedoria Ancestral"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ex: Conteúdo exclusivo sobre filosofia clássica e tradições"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Ícone</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar ícone" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => {
                      const IconComponent = iconMap[icon] || BookOpen;
                      return (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {icon}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="position">Posição</Label>
                <Input
                  id="position"
                  type="number"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
              />
              <Label htmlFor="is_active">Ativo</Label>
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Preview:</Label>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {(() => {
                    const IconComponent = iconMap[formData.icon] || BookOpen;
                    return <IconComponent className="w-4 h-4" />;
                  })()}
                </div>
                <div>
                  <p className="font-augustus font-semibold text-sm text-foreground">
                    {formData.title || 'Título do benefício'}
                  </p>
                  <p className="text-xs text-brand-green-gray/70">
                    {formData.description || 'Descrição do benefício'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSaveBenefit}
                className="bg-brand-brown hover:bg-brand-green-gray"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingBenefit ? 'Atualizar' : 'Criar'}
              </Button>
              <Button 
                variant="outline"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
