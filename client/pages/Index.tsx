import { productsByCategory, categories } from "@/data/products";
import CategorySection from "@/components/shop/CategorySection";

export default function Index() {
  return (
    <div>
      <section className="relative overflow-hidden border-b">
        <div className="container grid gap-6 py-10 md:grid-cols-2 md:py-16">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Ночная доставка алкоголя, снеков, секс-товаров и товаров для питомцев
            </h1>
            <p className="text-muted-foreground">
              Быстро и незаметно привезём всё необходимое — от премиум напитков до лакомств для ваших питомцев. Работает 24/7.
            </p>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(400px_200px_at_70%_10%,hsl(var(--primary)/0.25),transparent_60%)]" />
            <img
              src="https://images.unsplash.com/photo-1547628641-ec2098bb5819?q=80&w=1600&auto=format&fit=crop"
              alt="Night delivery"
              className="aspect-video w-full rounded-2xl border object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <HomeCatalog />
    </div>
  );
}

function HomeCatalog() {
  return (
    <div className="space-y-2">
      <CategorySection
        title={categories.alcohol.title}
        description={categories.alcohol.description}
        products={productsByCategory.alcohol}
      />
      <CategorySection
        title={categories.snacks.title}
        description={categories.snacks.description}
        products={productsByCategory.snacks}
      />
      <CategorySection
        title={categories.intim.title}
        description={categories.intim.description}
        products={productsByCategory.intim}
      />
      <CategorySection
        title={categories.pets.title}
        description={categories.pets.description}
        products={productsByCategory.pets}
      />
    </div>
  );
}
