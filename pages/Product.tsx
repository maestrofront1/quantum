import { useParams } from "react-router-dom";
import { catalog } from "../app/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../shared/ui/carousel";
import { Button } from "../shared/ui/button";
import { useCart } from "../features/shop/CartContext";
import { useMemo, useState } from "react";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => catalog.find((p) => p.id === id), [id]);
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const format = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

  if (!product) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Товар не найден</p>
      </div>
    );
  }

  const handleAdd = () => {
    add(product, qty);
    setOpen(true);
  };

  return (
    <div className="container grid gap-8 py-6 md:grid-cols-2 md:py-10">
      <div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {product.images.map((src, i) => (
              <CarouselItem key={i}>
                <div className="overflow-hidden rounded-xl border">
                  <img src={src} alt={`${product.name} ${i + 1}`} className="aspect-square w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/*<CarouselPrevious />*/}
          {/*<CarouselNext />*/}
        </Carousel>
        {/*<div className="mt-3 grid grid-cols-5 gap-2">*/}
        {/*  {product.images.map((src, i) => (*/}
        {/*    <img key={i} src={src} alt="thumb" className="aspect-square w-full rounded-md border object-cover" />*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="text-2xl font-semibold">{format(product.price)} ₽</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md border">
            <button className="h-10 w-10" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <div className="w-10 text-center">{qty}</div>
            <button className="h-10 w-10" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
          </div>
          <Button className="flex-1" onClick={handleAdd}>Добавить в корзину</Button>
        </div>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          <li>Доставка ночью за 15–30 минут</li>
          <li>Товар запакован и герметично защищён</li>
          <li>Оплата онлайн или курьеру</li>
        </ul>
      </div>
    </div>
  );
}
