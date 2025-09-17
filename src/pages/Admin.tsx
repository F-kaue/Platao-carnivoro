import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Link as LinkIcon,
  ExternalLink,
  Instagram,
  Youtube,
  MessageCircle,
  ShoppingCart,
  Globe,
  Settings,
  Save,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { LinksManager } from '@/components/admin/LinksManager';
import { useLinks } from '@/hooks/useLinks';

const Admin = () => {
  const navigate = useNavigate();
  const { links, getActiveLinks, getLinksByCategory } = useLinks();
  
  const activeLinks = getActiveLinks();
  const socialLinks = getLinksByCategory('social');
  const productLinks = getLinksByCategory('product');
  const navigationLinks = getLinksByCategory('navigation');

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-8 h-8 text-brand-brown" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
                  <p className="text-sm text-muted-foreground">Platão Carnívoro</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Conectado
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-brand-brown/5 to-brand-lilac/5 border-brand-brown/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <LinkIcon className="w-6 h-6 text-brand-brown" />
              Gerenciador de Links Públicos
            </CardTitle>
            <CardDescription className="text-lg">
              Gerencie todos os links públicos do site: redes sociais, produtos e navegação. 
              Edite URLs, descrições e configurações de forma intuitiva.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <Instagram className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                <div className="text-2xl font-bold text-pink-600">{socialLinks.length}</div>
                <div className="text-sm text-gray-600">Redes Sociais</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-green-600">{productLinks.length}</div>
                <div className="text-sm text-gray-600">Links de Produtos</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-blue-600">{navigationLinks.length}</div>
                <div className="text-sm text-gray-600">Navegação</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate('/')}
              >
                <Eye className="w-6 h-6" />
                <span className="font-medium">Ver Site</span>
                <span className="text-xs text-muted-foreground">Visualizar site público</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => window.open('https://www.instagram.com/plataocarnivoro/', '_blank')}
              >
                <Instagram className="w-6 h-6 text-pink-500" />
                <span className="font-medium">Instagram</span>
                <span className="text-xs text-muted-foreground">Abrir perfil</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate('/testo1k')}
              >
                <ShoppingCart className="w-6 h-6 text-green-500" />
                <span className="font-medium">Testo1k</span>
                <span className="text-xs text-muted-foreground">Página do produto</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => navigate('/testo1k/landing')}
              >
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="font-medium">Landing</span>
                <span className="text-xs text-muted-foreground">Página de conversão</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Links Manager */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-brand-brown" />
              Gerenciador de Links
            </CardTitle>
            <CardDescription>
              Edite e gerencie todos os links públicos do site. Clique em "Editar" para modificar qualquer link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinksManager />
          </CardContent>
        </Card>

        {/* Status dos Links */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Status dos Links
            </CardTitle>
            <CardDescription>
              Visão geral do status de todos os links do site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {links.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {link.category === 'social' && <Instagram className="w-4 h-4 text-pink-500" />}
                    {link.category === 'product' && <ShoppingCart className="w-4 h-4 text-green-500" />}
                    {link.category === 'navigation' && <Globe className="w-4 h-4 text-blue-500" />}
                    <div>
                      <div className="font-medium">{link.title}</div>
                      <div className="text-sm text-muted-foreground">{link.url}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={link.isActive ? "default" : "secondary"}>
                      {link.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                    {link.isActive ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;