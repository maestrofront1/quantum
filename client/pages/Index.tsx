import CategorySection from "@/components/shop/CategorySection";
import SubcategoryTile from "@/components/shop/SubCategoryTile";
import { productsByCategory, categories } from "@/data/products";

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
              Быстро и незаметно пр��везём всё необходимое — от премиум напитков до лакомств для ваших питомцев. Работает 24/7.
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
    <div className="space-y-8">
      {/* Alcohol subcategories tiles on homepage */}
      <section className="container py-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{categories.alcohol.title}</h2>
          <p className="text-sm text-muted-foreground">{categories.alcohol.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(categories.alcohol.subcategories || {}).map(([key, val]) => (
            <SubcategoryTile key={key} category="alcohol" keyName={key} title={val.title} icon={val.icon} />
          ))}
        </div>
      </section>

      {/* Snacks subcategories */}
      {categories.snacks.subcategories ? (
        <section className="container py-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{categories.snacks.title}</h2>
            <p className="text-sm text-muted-foreground">{categories.snacks.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Object.entries(categories.snacks.subcategories || {}).map(([key, val]) => (
              <SubcategoryTile key={key} category="snacks" keyName={key} title={val.title} icon={"img"} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Intim subcategories */}
      {categories.intim.subcategories ? (
        <section className="container py-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{categories.intim.title}</h2>
            <p className="text-sm text-muted-foreground">{categories.intim.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Object.entries(categories.intim.subcategories || {}).map(([key, val]) => (
              <SubcategoryTile key={key} category="intim" keyName={key} title={val.title} icon={val.icon} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Pets subcategories */}
      {categories.pets.subcategories ? (
        <section className="container py-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{categories.pets.title}</h2>
            <p className="text-sm text-muted-foreground">{categories.pets.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Object.entries(categories.pets.subcategories || {}).map(([key, val]) => (
              <SubcategoryTile key={key} category="pets" keyName={key} title={val.title} icon={val.icon} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
