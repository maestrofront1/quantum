import { Link, Outlet } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Moon } from "lucide-react";
import CartDrawer from "@/components/shop/CartDrawer";
import { useCart } from "@/components/shop/CartContext";

export default function MainLayout() {
  const { count, setOpen } = useCart();

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_-20%,hsl(var(--primary)/0.15),transparent_60%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]">
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">N</span>
            <span>Ночная Лавка</span>
          </Link>
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="w-full max-w-xl">
              <Input placeholder="Поиск товаров..." />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
