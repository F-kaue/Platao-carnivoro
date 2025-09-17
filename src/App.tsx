
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Testo1k from "./pages/Testo1k";
import Testo1kHome from "./pages/Testo1kHome";
import { PageBuilderPage } from "./pages/PageBuilder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/pagebuilder/:pageId" element={<PageBuilderPage />} />
                <Route path="/testo1k" element={<Testo1kHome />} />
                <Route path="/testo1k/landing" element={<Testo1k />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
