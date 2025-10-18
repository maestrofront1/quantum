export type CategoryKey = "alcohol" | "snacks" | "intim" | "pets";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryKey;
  images: string[];
  description: string;
}

export const categories: Record<CategoryKey, { title: string; description: string }> = {
  alcohol: { title: "Алкоголь", description: "Напитки для ночных встреч" },
  snacks: { title: "Снеки", description: "Закуски к фильму и вечеринке" },
  intim: { title: "Секс-товары", description: "Интимные товары и аксессуары" },
  pets: { title: "Для питомцев", description: "Лакомства и товары для любимцев" },
};

export const catalog: Product[] = [
  {
    id: "alc-001",
    name: "Виски Glenbrook 12y",
    price: 5490,
    category: "alcohol",
    images: [
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554123168-b18dbdeea38b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514362215649-06fbf54d0f3f?q=80&w=1600&auto=format&fit=crop"
    ],
    description: "Бочковая выдержка, мягкий вкус ванили и карамели. Идеален для вечера."
  },
  {
    id: "alc-002",
    name: "Игристое Brut Rosé",
    price: 1890,
    category: "alcohol",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16d7ae812?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519659528534-7fd733ae1d5f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542302573-1d832b47f987?q=80&w=1600&auto=format&fit=crop"
    ],
    description: "Сухое розовое игристое с яркими нотами ягод."
  },
  {
    id: "snk-001",
    name: "Набор сыров к вину",
    price: 1290,
    category: "snacks",
    images: [
      "https://images.unsplash.com/photo-1546549039-49c0508d3ed1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1600&auto=format&fit=crop"
    ],
    description: "Ассорти выдержанных сыров, орехи и виноград."
  },
  {
    id: "int-001",
    name: "Вибратор Nova Flex",
    price: 4590,
    category: "intim",
    images: [
      "https://images.unsplash.com/photo-1615004912156-52727d3d976c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615005125774-e37a1fb6d27a?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615004912150-9b283a1d4ed4?q=80&w=1600&auto=format&fit=crop"
    ],
    description: "Силиконовый, водонепроницаемый, несколько режимов вибрации."
  },
  {
    id: "pet-001",
    name: "Лакомства для собак Beef Bites",
    price: 390,
    category: "pets",
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726600524664-116dd3ac38bd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1600&auto=format&fit=crop"
    ],
    description: "Натуральные кусочки говядины, без искусственных добавок."
  }
];

export const productsByCategory = catalog.reduce<Record<CategoryKey, Product[]>>((acc, p) => {
  if (!acc[p.category]) acc[p.category] = [] as Product[];
  acc[p.category]!.push(p);
  return acc;
}, { alcohol: [], snacks: [], intim: [], pets: [] });
