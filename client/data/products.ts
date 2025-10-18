export type CategoryKey = "alcohol" | "snacks" | "intim" | "pets";

export interface Product {
  id: string;
  name: string;
  price: number; // in local currency units
  category: CategoryKey;
  images: string[];
  description: string;
  tags?: string[];
}

export const categories: Record<CategoryKey, { title: string; description: string }> = {
  alcohol: { title: "Алкоголь", description: "Напитки для ночных встреч" },
  snacks: { title: "Снеки", description: "Закуски к фильму и вечеринке" },
  intim: { title: "Секс-товары", description: "Интимные товары и аксессуары" },
  pets: { title: "Для питомцев", description: "Лакомства и товары для любимцев" },
};

export const catalog: Product[] = [
  // Alcohol
  {
    id: "alc-001",
    name: "Виски Glenbrook 12y",
    price: 5490,
    category: "alcohol",
    images: [
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554123168-b18dbdeea38b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514362215649-06fbf54d0f3f?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "Бочковая выдержка, мягкий вкус ванили и карамели. Идеален для вечера.",
    tags: ["виски", "12 лет", "премиум"],
  },
  {
    id: "alc-002",
    name: "Игристое Brut Rosé",
    price: 1890,
    category: "alcohol",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16d7ae812?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519659528534-7fd733ae1d5f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542302573-1d832b47f987?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Сухое розовое игристое с яркими нотами ягод.",
  },
  // Snacks
  {
    id: "snk-001",
    name: "Набор сыров к вину",
    price: 1290,
    category: "snacks",
    images: [
      "https://images.unsplash.com/photo-1546549039-49c0508d3ed1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Ассорти выдержанных сыров, орехи и виноград.",
  },
  {
    id: "snk-002",
    name: "Начос с соусами",
    price: 690,
    category: "snacks",
    images: [
      "https://images.unsplash.com/photo-1604908554027-367b1f329702?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Хрустящие начос, сальса, сырный и гуакамоле.",
  },
  // Intim
  {
    id: "int-001",
    name: "Вибратор Nova Flex",
    price: 4590,
    category: "intim",
    images: [
      "https://images.unsplash.com/photo-1615004912156-52727d3d976c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615005125774-e37a1fb6d27a?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615004912150-9b283a1d4ed4?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Силиконовый, водонепроницаемый, несколько режимов вибрации.",
  },
  {
    id: "int-002",
    name: "Набор аксессуаров Velvet",
    price: 2590,
    category: "intim",
    images: [
      "https://images.unsplash.com/photo-1594498845190-1884be0b2186?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571431745754-c043abf00ca7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608542037079-cd5a51e06151?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Аксессуары для пар с бархатной отделкой.",
  },
  // Pets
  {
    id: "pet-001",
    name: "Лакомства для собак Beef Bites",
    price: 390,
    category: "pets",
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726600524664-116dd3ac38bd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Натуральные кусочки говядины, без искусственных добавок.",
  },
  {
    id: "pet-002",
    name: "Игрушка-удочка для котов",
    price: 290,
    category: "pets",
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596854373439-83d7f84bdc00?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Прочная палочка с перьями для активных игр.",
  },
];

export const productsByCategory = catalog.reduce<Record<CategoryKey, Product[]>>(
  (acc, p) => {
    if (!acc[p.category]) acc[p.category] = [] as Product[];
    acc[p.category]!.push(p);
    return acc;
  },
  { alcohol: [], snacks: [], intim: [], pets: [] },
);
