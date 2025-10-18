import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { isOpen, setOpen, items, increase, decrease, remove, total, clear } = useCart();
  const format = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:w-[420px]">
        <div className="flex h-full min-h-0 w-full flex-col">
          <SheetHeader>
            <SheetTitle>Корзина</SheetTitle>
          </SheetHeader>

          <div className="mt-4 flex flex-1 min-h-0 flex-col">
            {/* Scrollable items area */}
            <div className="flex-1 min-h-0 space-y-4 overflow-y-auto pr-2">
              {items.length === 0 ? (
                <p className="text-muted-foreground">В корзине пока пусто</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex gap-3 rounded-lg border p-3">
                    <img
                      src={i.product.images[0]}
                      alt={i.product.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="truncate font-medium">{i.product.name}</p>
                          <p className="text-sm text-muted-foreground">{format(i.product.price)} ₽</p>
                        </div>
                        <button
                          className="text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => remove(i.id)}
                        >
                          Удалить
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => decrease(i.id)}>
                          −
                        </Button>
                        <span className="w-8 text-center">{i.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => increase(i.id)}>
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer - sticky to bottom, separated visually */}
            <div className="sticky bottom-0 mt-4 bg-background/60 backdrop-blur-sm pt-4">
              <div className="space-y-3 border-t pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Итого</span>
                  <span className="font-semibold">{format(total)} ₽</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" disabled={items.length === 0}>
                    Оформить заказ
                  </Button>
                  <Button variant="outline" onClick={clear} disabled={items.length === 0}>
                    Очистить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
