
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  Package, Users, BarChart, LogOut, Plus, Trash2, Edit, 
  ShoppingBag, RefreshCw, Image, Link as LinkIcon, ExternalLink
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Product, Category, Marketplace } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Product form schema
const productFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  originalPrice: z.coerce.number().min(1, "O preço original deve ser maior que zero"),
  salePrice: z.coerce.number().min(0, "O preço de venda deve ser maior ou igual a zero"),
  category: z.string().min(1, "Selecione uma categoria"),
  marketplace: z.string().min(1, "Selecione uma loja"),
  affiliateLink: z.string().url("Insira uma URL válida"),
  images: z.array(z.string()).min(1, "Adicione pelo menos uma imagem")
});

type ProductFormData = z.infer<typeof productFormSchema>;

const Admin = () => {
  const { isLoggedIn, logout } = useAuth();
  const { products, getAdminStats, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  // States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Get admin stats
  const stats = getAdminStats();

  // Form for adding/editing products
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      originalPrice: 0,
      salePrice: 0,
      category: "",
      marketplace: "",
      affiliateLink: "",
      images: []
    }
  });

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Handle form submission
  const onSubmit = (data: ProductFormData) => {
    if (currentProduct) {
      // Editing existing product
      updateProduct(currentProduct.id, {
        ...data,
        category: data.category as Category,
        marketplace: data.marketplace as Marketplace,
      });
      setIsEditDialogOpen(false);
    } else {
      // Adding new product
      addProduct({
        ...data,
        category: data.category as Category,
        marketplace: data.marketplace as Marketplace,
      });
      setIsAddDialogOpen(false);
    }
    // Reset form and image URLs
    form.reset();
    setImageUrls([]);
  };

  // Handle adding a new image URL
  const handleAddImageUrl = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      const updatedUrls = [...imageUrls, newImageUrl];
      setImageUrls(updatedUrls);
      form.setValue("images", updatedUrls);
      setNewImageUrl("");
    }
  };

  // Handle removing an image URL
  const handleRemoveImageUrl = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    form.setValue("images", updatedUrls);
  };

  // Setup product editing
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    form.reset({
      title: product.title,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      category: product.category,
      marketplace: product.marketplace,
      affiliateLink: product.affiliateLink,
      images: product.images
    });
    setImageUrls(product.images);
    setIsEditDialogOpen(true);
  };

  // Setup product deletion
  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Confirm product deletion
  const confirmDelete = () => {
    if (currentProduct) {
      deleteProduct(currentProduct.id);
      setIsDeleteDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  // Reset form for new product
  const handleAddNewProduct = () => {
    setCurrentProduct(null);
    form.reset({
      title: "",
      originalPrice: 0,
      salePrice: 0,
      category: "",
      marketplace: "",
      affiliateLink: "",
      images: []
    });
    setImageUrls([]);
    setIsAddDialogOpen(true);
  };

  // Category and marketplace options
  const categories: Category[] = [
    'Eletrônicos', 'Casa e Decoração', 'Moda', 'Beleza', 'Cozinha', 
    'Brinquedos', 'Esportes', 'Livros', 'Pets', 'Outros'
  ];
  
  const marketplaces: Marketplace[] = [
    'Amazon', 'Shopee', 'Mercado Livre', 'AliExpress', 'Magalu', 'Americanas', 'Outros'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => logout()}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          
          <Button 
            onClick={handleAddNewProduct}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold">{stats.totalProducts}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Cliques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold">{stats.totalClicks}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Média de Cliques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold">
                      {stats.averageClicksPerProduct.toFixed(1)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho dos Últimos 7 Dias</CardTitle>
                <CardDescription>
                  Total de cliques em produtos por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={stats.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} cliques`, 'Cliques']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit',
                            year: 'numeric'
                          });
                        }}
                      />
                      <Bar 
                        dataKey="clicks" 
                        fill="#9b87f5" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Populares</CardTitle>
                <CardDescription>
                  Os 5 produtos com mais cliques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Loja</TableHead>
                      <TableHead>Cliques</TableHead>
                      <TableHead className="text-right">Preço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-muted flex-shrink-0">
                              {product.images.length > 0 && (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.title} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <span className="line-clamp-1">{product.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.marketplace}</TableCell>
                        <TableCell className="font-semibold text-purple-600 dark:text-purple-400">
                          {product.clicks}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.salePrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Produtos</CardTitle>
                <CardDescription>
                  Lista de todos os produtos cadastrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Loja</TableHead>
                        <TableHead>Preço Original</TableHead>
                        <TableHead>Preço Promocional</TableHead>
                        <TableHead>Cliques</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-muted flex-shrink-0">
                                {product.images.length > 0 && (
                                  <img 
                                    src={product.images[0]} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="line-clamp-1">{product.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.marketplace}</TableCell>
                          <TableCell className="line-through text-muted-foreground">
                            {product.originalPrice.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {product.salePrice.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </TableCell>
                          <TableCell>{product.clicks}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(product.affiliateLink, '_blank')}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Visitar link</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditProduct(product)}
                                className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(product)}
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Smartphone Premium com Câmera de Alta Resolução" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Prices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Original (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Promocional (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Category and Marketplace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loja</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar loja" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {marketplaces.map((marketplace) => (
                            <SelectItem key={marketplace} value={marketplace}>
                              {marketplace}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Affiliate Link */}
              <FormField
                control={form.control}
                name="affiliateLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link de Afiliado</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Product Images */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagens do Produto</FormLabel>
                    <div className="space-y-4">
                      {/* Image URLs list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="flex items-center gap-2 group">
                            <div className="w-12 h-12 border rounded overflow-hidden bg-muted flex-shrink-0">
                              <img src={url} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Input 
                              readOnly 
                              value={url} 
                              className="flex-grow text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveImageUrl(index)}
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remover imagem</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add new image URL */}
                      <div className="flex gap-2">
                        <Input 
                          type="url"
                          placeholder="URL da imagem (https://...)"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          onClick={handleAddImageUrl}
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Produto
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Same form fields as Add Product Dialog */}
              {/* Product Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Smartphone Premium com Câmera de Alta Resolução" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Prices */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Original (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço Promocional (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Category and Marketplace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loja</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar loja" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {marketplaces.map((marketplace) => (
                            <SelectItem key={marketplace} value={marketplace}>
                              {marketplace}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Affiliate Link */}
              <FormField
                control={form.control}
                name="affiliateLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link de Afiliado</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Product Images */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagens do Produto</FormLabel>
                    <div className="space-y-4">
                      {/* Image URLs list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {imageUrls.map((url, index) => (
                          <div key={index} className="flex items-center gap-2 group">
                            <div className="w-12 h-12 border rounded overflow-hidden bg-muted flex-shrink-0">
                              <img src={url} alt="" className="w-full h-full object-cover" />
                            </div>
                            <Input 
                              readOnly 
                              value={url} 
                              className="flex-grow text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveImageUrl(index)}
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remover imagem</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add new image URL */}
                      <div className="flex gap-2">
                        <Input 
                          type="url"
                          placeholder="URL da imagem (https://...)"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          onClick={handleAddImageUrl}
                          variant="outline"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Atualizar Produto
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              Tem certeza que deseja excluir o produto:
              <span className="font-semibold block mt-2">
                {currentProduct?.title}
              </span>
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
