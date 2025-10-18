import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import type { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const nav = useNavigate();
  const addAndOpen = () => {
    add(product, 1);
    setOpen(true);
  };
  const format = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md">
      <button
        onClick={() => nav(`/product/${product.id}`)}
        className="block w-full overflow-hidden"
        aria-label={product.name}
      >
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </button>
      <div className="space-y-1 p-3">
        <p className="line-clamp-1 font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">{format(product.price)} ₽</p>
        <Button onClick={addAndOpen} className="w-full">В корзину</Button>
      </div>
    </div>
  );
}
