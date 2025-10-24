import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { catalog } from "../app/data/products";
import ProductCard from "../features/shop/ProductCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const term = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return [];
    return catalog.filter((p) => {
      return (
        p.name.toLowerCase().includes(term) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(term)) ||
        (p.description || "").toLowerCase().includes(term)
      );
    });
  }, [term]);

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Результаты поиска</h1>
        <p className="text-sm text-muted-foreground">{q ? `��о запросу «${q}» найдено ${results.length} товаров` : "Введите запрос в поиске сверху"}</p>
      </div>

      {q ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
