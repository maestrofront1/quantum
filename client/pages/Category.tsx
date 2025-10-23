// import { useParams, Link } from "react-router-dom";
import { categories, getProductsByCategoryAndSub } from "@/data/products";
import CategorySection from "@/components/shop/CategorySection";
import ProductCard from "@/components/shop/ProductCard";
import SubcategoryTile from "@/components/shop/SubCategoryTile";
import * as Router from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoryPage() {
  const { category, sub } = Router.useParams<{ category: string; sub?: string }>();
  if (!category || !(category in categories)) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Категория не найдена</p>
      </div>
    );
  }
  const catKey = category as keyof typeof categories;
  const cat = categories[catKey];

  if (cat.subcategories && !sub) {
    // show subcategory tiles
    return (
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{cat.title}</h1>
          <p className="text-sm text-muted-foreground">{cat.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(cat.subcategories).map(([key, val]) => (
            <SubcategoryTile key={key} category={category!} keyName={key} title={val.title} icon={""} />
          ))}
        </div>
      </div>
    );
  }

  // show products filtered by category and optional subcategory
  const products = getProductsByCategoryAndSub(catKey as any, sub);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
  const [popularity, setPopularity] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (p.description || "").toLowerCase().includes(q)
      );
    });
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOrder === "asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [filteredProducts, sortOrder]);

  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{cat.title} {sub ? `· ${cat.subcategories?.[sub!].title}` : ''}</h1>
          <p className="text-sm text-muted-foreground">{cat.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block w-64">
            <Input placeholder="Поиск внутри категории..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          {/* popularity toggle styled like price buttons */}
          <Button size="sm" variant={popularity ? "secondary" : "ghost"} onClick={() => { setPopularity(prev => !prev); setSortOrder(""); }}>
            По популярности
          </Button>

          <Button size="sm" variant={sortOrder === "asc" ? "secondary" : "ghost"} onClick={() => { setPopularity(false); setSortOrder(prev => prev === "asc" ? "" : "asc"); }}>
            Цена <span className="ml-1 text-lg font-extrabold leading-none">↑</span>
          </Button>
          <Button size="sm" variant={sortOrder === "desc" ? "secondary" : "ghost"} onClick={() => { setPopularity(false); setSortOrder(prev => prev === "desc" ? "" : "desc"); }}>
            Цена <span className="ml-1 text-lg font-extrabold leading-none">↓</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
