import type { Product } from "../../app/data/products";
import ProductCard from "./ProductCard";
import * as Router from "react-router-dom";

export default function CategorySection({
                                          title,
                                          description,
                                          products,
                                          categoryKey,
                                        }: {
  title: string;
  description?: string;
  products: Product[];
  categoryKey?: string;
}) {
  return (
    <section className="container py-6 sm:py-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          {categoryKey ? (
            <h2 className="text-xl font-semibold sm:text-2xl">
              <Router.Link to={`/category/${categoryKey}`} className="hover:underline">{title}</Router.Link>
            </h2>
          ) : (
            <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          )}

          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
