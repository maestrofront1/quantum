import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Moon, Search } from "lucide-react";
import CartDrawer from "@/components/shop/CartDrawer";
import { useCart } from "@/components/shop/CartContext";
import { useState, useMemo } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { catalog } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";

export default function MainLayout() {
  const { count, setOpen } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = q.trim();
      if (v) {
        setDialogOpen(false);
        navigate(`/search?q=${encodeURIComponent(v)}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container flex h-16 items-center justify-between gap-3">
          <RouterLink to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">N</span>
            <span>Ночная Лавка</span>
          </RouterLink>
          <div className="hidden sm:flex sm:flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <Input placeholder="Поиск товаров..." value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile search dialog trigger */}
            <div className="sm:hidden">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Поиск">
                    <Search className="size-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Поиск</DialogTitle>
                  <div className="mt-2">
                    <Input autoFocus placeholder="Поиск товаров..." onChange={(e) => setQ(e.target.value)} value={q} onKeyDown={onKeyDown} />
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {catalog
                        .filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
                        .slice(0, 20)
                        .map((p) => (
                          <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Button variant="ghost" size="icon" aria-label="Тема">
              <Moon className="size-5" />
            </Button>
            <Button variant="default" onClick={() => setOpen(true)} className="relative">
              <ShoppingBag className="mr-2 size-5" />
              Корзина
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-foreground/10 px-1 text-xs font-semibold text-primary-foreground/90 ring-1 ring-inset ring-primary/50">
                {count}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-10 border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container">© {new Date().getFullYear()} Ночная Лавка · Ночная доставка 24/7</div>
      </footer>

      <CartDrawer />
    </div>
  );
}
