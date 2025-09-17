
import { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CategorySelector } from "@/components/CategorySelector";
import { Button } from "@/components/ui/button";
import { 
  Package, Users, BarChart, LogOut, Plus, Trash2, Edit, 
  ShoppingBag, RefreshCw, Image, Link as LinkIcon, ExternalLink, Upload, X, TrendingUp, ChevronDown,
  Layout, Palette, Code
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
import { uploadProductImage } from "@/services/imageUpload";
import { useToast } from "@/hooks/use-toast";
import { SiteSettingsTab } from "@/components/admin/SiteSettingsTab";
import { NavigationTab } from "@/components/admin/NavigationTab";
import { NewsletterBenefitsTab } from "@/components/admin/NewsletterBenefitsTab";
import { Testo1kContentTab } from "@/components/admin/Testo1kContentTab";

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
  const { toast } = useToast();

  // States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // Fix: Ensure all required properties are present when adding a new product
      const newProductData = {
        title: data.title,
        originalPrice: data.originalPrice,
        salePrice: data.salePrice,
        category: data.category as Category,
        marketplace: data.marketplace as Marketplace,
        affiliateLink: data.affiliateLink,
        images: data.images
      };
      
      addProduct(newProductData);
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

  // Handle file selection for image upload
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Tipo de arquivo inválido",
            description: "Por favor, selecione apenas arquivos de imagem.",
            variant: "destructive",
          });
          continue;
        }
        
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Arquivo muito grande",
            description: "O tamanho máximo permitido é 5MB.",
            variant: "destructive",
          });
          continue;
        }
        
        // Upload file to Supabase
        const imageUrl = await uploadProductImage(file);
        
        if (imageUrl) {
          const updatedUrls = [...imageUrls, imageUrl];
          setImageUrls(updatedUrls);
          form.setValue("images", updatedUrls);
          
          toast({
            title: "Upload concluído",
            description: "A imagem foi adicionada com sucesso.",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao processar arquivo:", error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao fazer o upload da imagem.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

  // Get unique categories from products
  const availableCategories = Array.from(new Set(products.map(product => product.category))).sort();

  // Category and marketplace options
  const categories: Category[] = availableCategories;
  
  const marketplaces: Marketplace[] = [
    'Amazon', 'Shopee', 'Mercado Livre', 'AliExpress', 'Magalu', 'Americanas', 'Outros'
  ];

  // Product image upload component
  const ProductImageUpload = () => {
    return (
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagens do Produto</FormLabel>
            <div className="space-y-4">
              {/* Preview of uploaded images */}
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group aspect-square rounded-md overflow-hidden border bg-muted">
                      <img 
                        src={url} 
                        alt="" 
                        className="w-full h-full object-cover transition-all group-hover:opacity-80" 
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveImageUrl(index)}
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remover imagem</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Options to add images */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Upload from device option */}
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Upload da Galeria</h3>
                      <p className="text-xs text-muted-foreground text-center">
                        Selecione imagens do seu dispositivo
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="mt-2"
                      >
                        {isUploading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Image className="h-4 w-4 mr-2" />
                            Selecionar Arquivos
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* URL option */}
                  <div className="border rounded-md p-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <LinkIcon className="h-8 w-8 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Adicionar por URL</h3>
                      <p className="text-xs text-muted-foreground text-center">
                        Cole o endereço da imagem na web
                      </p>
                      <div className="flex w-full gap-2 mt-2">
                        <Input 
                          type="url"
                          placeholder="https://..."
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-grow text-xs"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddImageUrl}
                          disabled={!newImageUrl}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <FormMessage />
              </div>
            </div>
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
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
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">Painel Administrativo</h1>
          
          <Button 
            onClick={handleAddNewProduct}
            className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Adicionar Produto</span>
            <span className="sm:hidden">Adicionar</span>
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-7 w-full max-w-4xl mx-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="products" className="text-xs sm:text-sm">Produtos</TabsTrigger>
            <TabsTrigger value="pagebuilder" className="text-xs sm:text-sm">Page Builder</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">Configurações</TabsTrigger>
            <TabsTrigger value="navigation" className="text-xs sm:text-sm">Navegação</TabsTrigger>
            <TabsTrigger value="newsletter" className="text-xs sm:text-sm">Newsletter</TabsTrigger>
            <TabsTrigger value="testo1k" className="text-xs sm:text-sm">Testo1k</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2 bg-gradient-to-r from-brand-lilac/10 to-brand-gray-rose/10">
                  <CardTitle className="text-sm font-augustus font-medium text-brand-green-gray">
                    Total de Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-diogenes font-bold text-brand-brown">{stats.totalProducts}</span>
                      <p className="text-sm text-brand-green-gray/70 font-body mt-1">Produtos cadastrados</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2 bg-gradient-to-r from-brand-lilac/10 to-brand-gray-rose/10">
                  <CardTitle className="text-sm font-augustus font-medium text-brand-green-gray">
                    Total de Cliques
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-diogenes font-bold text-brand-brown">{stats.totalClicks}</span>
                      <p className="text-sm text-brand-green-gray/70 font-body mt-1">Cliques registrados</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2 bg-gradient-to-r from-brand-lilac/10 to-brand-gray-rose/10">
                  <CardTitle className="text-sm font-augustus font-medium text-brand-green-gray">
                    Média de Cliques
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-diogenes font-bold text-brand-brown">
                      {stats.averageClicksPerProduct.toFixed(1)}
                    </span>
                      <p className="text-sm text-brand-green-gray/70 font-body mt-1">Cliques por produto</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-2xl flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-white" />
                    </div>
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
            <Card className="border-brand-gray-rose/30">
              <CardHeader className="bg-gradient-to-r from-brand-lilac/10 to-brand-gray-rose/10">
                <CardTitle className="flex items-center gap-2 text-brand-green-gray">
                  <TrendingUp className="w-5 h-5 text-brand-brown" />
                  Produtos Mais Populares
                </CardTitle>
                <CardDescription className="text-brand-green-gray/70">
                  Os 5 produtos com mais cliques - validados pela comunidade
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {stats.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center p-4 hover:bg-brand-lilac/5 transition-colors border-b border-brand-gray-rose/20 last:border-b-0">
                      {/* Ranking Badge */}
                      <div className="flex-shrink-0 mr-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-augustus font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                          index === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                          'bg-gradient-to-r from-brand-brown to-brand-green-gray'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Product Image */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 bg-muted flex-shrink-0">
                        {product.images.length > 0 ? (
                                <img 
                                  src={product.images[0]} 
                                  alt={product.title} 
                                  className="w-full h-full object-cover"
                                />
                        ) : (
                          <div className="w-full h-full bg-brand-lilac/20 flex items-center justify-center">
                            <Package className="w-6 h-6 text-brand-green-gray/50" />
                          </div>
                              )}
                            </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-augustus font-semibold text-foreground truncate">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-brand-green-gray/70 font-body">
                            {product.marketplace}
                          </span>
                          <span className="text-sm font-augustus text-brand-brown">
                          {product.salePrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                          </span>
                        </div>
                      </div>
                      
                      {/* Clicks Counter */}
                      <div className="flex-shrink-0 ml-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-brand-brown to-brand-green-gray rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="font-augustus font-bold text-brand-brown text-lg">
                              {product.clicks}
                            </div>
                            <div className="text-xs text-brand-green-gray/70 font-body">
                              cliques
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
          
          {/* Page Builder Tab */}
          <TabsContent value="pagebuilder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-brand-brown" />
                  Page Builder Visual
                </CardTitle>
                <CardDescription>
                  Crie e edite páginas com interface visual intuitiva, similar ao Hostinger
                </CardDescription>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎯 Real Page Builder (Recomendado)</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Edite o conteúdo real das páginas existentes com elementos extraídos diretamente do site.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate('/admin/real-pagebuilder/home')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Layout className="w-4 h-4 mr-2" />
                        Real Page Builder
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🚀 Versão Simplificada</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Use a versão simplificada para uma experiência mais básica e estável.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate('/admin/simple-pagebuilder/home')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Layout className="w-4 h-4 mr-2" />
                        Page Builder Simples
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Página Inicial */}
                  <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-brown to-brand-green-gray rounded-lg flex items-center justify-center">
                          <Layout className="w-5 h-5 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/admin/pagebuilder/home')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-augustus font-semibold text-foreground mb-2">Página Inicial</h3>
                      <p className="text-sm text-brand-green-gray/70 font-body mb-4">
                        Hero section, newsletter e seções principais
                      </p>
                      <Button
                        onClick={() => navigate('/admin/pagebuilder/home')}
                        className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white"
                      >
                        <Layout className="w-4 h-4 mr-2" />
                        Editar Página
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Testo1k */}
                  <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-green-gray to-brand-brown rounded-lg flex items-center justify-center">
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/admin/pagebuilder/testo1k')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-augustus font-semibold text-foreground mb-2">Testo1k</h3>
                      <p className="text-sm text-brand-green-gray/70 font-body mb-4">
                        Página de produto com preços e benefícios
                      </p>
                      <Button
                        onClick={() => navigate('/admin/pagebuilder/testo1k')}
                        className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white"
                      >
                        <Palette className="w-4 h-4 mr-2" />
                        Editar Página
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Landing Page */}
                  <Card className="border-brand-gray-rose/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-lilac to-brand-brown rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/admin/pagebuilder/landing')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-augustus font-semibold text-foreground mb-2">Landing Page</h3>
                      <p className="text-sm text-brand-green-gray/70 font-body mb-4">
                        Página de conversão com formulários e CTAs
                      </p>
                      <Button
                        onClick={() => navigate('/admin/pagebuilder/landing')}
                        className="w-full bg-gradient-to-r from-brand-brown to-brand-green-gray hover:from-brand-green-gray hover:to-brand-brown text-white"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Editar Página
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Features */}
                <div className="mt-8 p-6 bg-gradient-to-r from-brand-lilac/10 to-brand-gray-rose/10 rounded-lg">
                  <h3 className="font-augustus font-semibold text-brand-green-gray mb-4">Recursos do Page Builder</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-brown/20 rounded-lg flex items-center justify-center">
                        <Layout className="w-4 h-4 text-brand-brown" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Drag & Drop</p>
                        <p className="text-xs text-brand-green-gray/70">Arraste componentes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-brown/20 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-brand-brown" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Preview em Tempo Real</p>
                        <p className="text-xs text-brand-green-gray/70">Veja mudanças instantaneamente</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-brown/20 rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-brand-brown" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Responsivo</p>
                        <p className="text-xs text-brand-green-gray/70">Mobile, tablet e desktop</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brand-brown/20 rounded-lg flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-brand-brown" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Edição Inline</p>
                        <p className="text-xs text-brand-green-gray/70">Clique e edite diretamente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <SiteSettingsTab />
          </TabsContent>
          
          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <NavigationTab />
          </TabsContent>
          
          {/* Newsletter Tab */}
          <TabsContent value="newsletter" className="space-y-6">
            <NewsletterBenefitsTab />
          </TabsContent>
          
          {/* Testo1k Tab */}
          <TabsContent value="testo1k" className="space-y-6">
            <Testo1kContentTab />
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
                        <FormControl>
                        <CategorySelector
                          value={field.value}
                          onChange={field.onChange}
                          categories={categories}
                          placeholder="Selecionar categoria"
                        />
                        </FormControl>
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
              
              {/* Product Images - New component */}
              <ProductImageUpload />
              
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
                        <FormControl>
                        <CategorySelector
                          value={field.value}
                          onChange={field.onChange}
                          categories={categories}
                          placeholder="Selecionar categoria"
                        />
                        </FormControl>
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
              
              {/* Product Images - New component */}
              <ProductImageUpload />
              
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
