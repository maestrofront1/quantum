import "./global.css";

import { Toaster } from "../shared/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "../shared/ui/sonner";
import { TooltipProvider } from "../shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import CategoryPage from "../pages/Category";

const queryClient = new QueryClient();

import MainLayout from "../features/layout/MainLayout";
import { CartProvider } from "../features/shop/CartContext";
import ProductPage from "../pages/Product";
import SearchPage from "../pages/Search";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/:category/:sub" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root");
if (container) {
  // Avoid calling createRoot twice during HMR or re-renders
  const win = window as any;
  if (!win.__root) {
    win.__root = createRoot(container);
  }
  win.__root.render(<App />);
}
