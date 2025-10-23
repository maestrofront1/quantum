import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Moon, Search } from "lucide-react";
import CartDrawer from "@/components/shop/CartDrawer";
import { useCart } from "@/components/shop/CartContext";
import { useState, useMemo, useRef, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { catalog } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";

export default function MainLayout() {
  const { count, setOpen } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollYRef = useRef(0);

  const onFocusMobile = () => {
    // small delay to allow the virtual keyboard to resize the viewport
    setTimeout(() => {
      if (typeof window !== "undefined" && window.visualViewport) {
        // attempt to scroll the visual viewport so the input is visible
        const y = window.visualViewport.offsetTop || 0;
        window.scrollTo({ top: window.scrollY + y, behavior: "smooth" });
      }
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  // prevent body from jumping when the dialog opens on mobile
  useEffect(() => {
    if (!dialogOpen) {
      // restore
      document.body.style.position = "";
      document.body.style.top = "";
      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current);
      }
      return;
    }

    scrollYRef.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [dialogOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = q.trim();
      if (v) {
        setDialogOpen(false);
        navigate(`/search?q=${encodeURIComponent(v)}`);
      }
    }
  };

  const term = q.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (!term) return [] as typeof catalog;
    return catalog
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(term) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(term)) ||
          (p.description || "").toLowerCase().includes(term)
        );
      })
      .slice(0, 6);
  }, [term]);

  function SuggestionList({ query, onSelect }: { query: string; onSelect: (id: string) => void }) {
    const list = suggestions;
    if (list.length === 0) {
      return <div className="text-sm text-muted-foreground">Ничего не найдено</div>;
    }
    return (
      <ul className="space-y-2">
        {list.map((p) => (
          <li key={p.id}>
            <button
              onClick={() => onSelect(p.id)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-accent"
            >
              <img src={p.images?.[0]} alt={p.name} className="h-12 w-12 flex-shrink-0 rounded-md object-cover" />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">{new Intl.NumberFormat("ru-RU").format(p.price)} ₽</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">N</span>
            <span>Ночная Лавка</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Mobile search dialog trigger */}
            <div className="flex">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="��оиск">
                    <Search className="size-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="left-0 top-0 right-0 bottom-0 inset-0 translate-x-0 translate-y-0 flex items-center justify-center p-4 sm:inset-auto sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:max-w-lg sm:rounded-lg">
                  <DialogTitle className="sr-only">Поиск</DialogTitle>
                  <div className="w-full">
                    <Input
                      ref={inputRef}
                      autoFocus
                      placeholder="Поиск товаров..."
                      onChange={(e) => setQ(e.target.value)}
                      value={q}
                      onKeyDown={onKeyDown}
                      onFocus={onFocusMobile}
                    />
                    <p className="mt-2 text-sm text-muted-foreground">Нажмите Enter чтобы перейти к результатам</p>
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
