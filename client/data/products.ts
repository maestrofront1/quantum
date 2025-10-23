export type CategoryKey = "alcohol" | "snacks" | "intim" | "pets";
export type AlcoholSub = "wine" | "beer" | "whiskey" | "cognac" | "brandy";

export interface Product {
  id: string;
  name: string;
  price: number; // in local currency units
  category: CategoryKey;
  subcategory?: AlcoholSub | string; // optional finer-grain category (e.g. wine, beer, whiskey, cognac, brandy)
  images: string[];
  description: string;
  tags?: string[];
}

const svgToData = (s: string) => "data:image/svg+xml;utf8," + encodeURIComponent(s);

const wineSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M8 2h8l-1 7a4 4 0 01-6 0L8 2z' fill='%23b91c1c'/>
  <path d='M12 13v6' stroke='%23000' stroke-width='1.5' stroke-linecap='round'/>
  <path d='M9 22h6' stroke='%23000' stroke-width='1.5' stroke-linecap='round'/>
</svg>`;

const beerSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <rect x='3' y='5' width='12' height='11' rx='2' fill='%23f59e0b'/>
  <path d='M15 7h4v7a2 2 0 01-2 2h-2V7z' fill='%23fff' opacity='0.06'/>
  <path d='M7 16v2a1 1 0 001 1h6' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/>
</svg>`;

const whiskeySvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <rect x='4' y='6' width='12' height='9' rx='2' fill='%23d97706'/>
  <rect x='7' y='8' width='3' height='2' rx='0.5' fill='%23fff' opacity='0.3'/>
  <rect x='11' y='8' width='3' height='2' rx='0.5' fill='%23fff' opacity='0.3'/>
  <path d='M6 15h8' stroke='%23000' stroke-width='1.5' stroke-linecap='round'/>
</svg>`;

const cognacSvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M7 6c0 4 5 6 5 6s5-2 5-6' fill='%236b211a'/>
  <path d='M9 18h6' stroke='%23000' stroke-width='1.5' stroke-linecap='round'/>
</svg>`;

const brandySvg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M6 6c0 4 6 6 6 6s6-2 6-6' fill='%237b341e'/>
  <circle cx='10' cy='9' r='1' fill='%23fff' opacity='0.3'/>
  <path d='M8 18h8' stroke='%23000' stroke-width='1.5' stroke-linecap='round'/>
</svg>`;

export const categories: Record<
  CategoryKey,
  { title: string; description: string; subcategories?: Record<string, { title: string; icon?: string }> }
> = {
  alcohol: {
    title: "Алкоголь",
    description: "Напитки для ночных встреч",
    subcategories: {
      wine: { title: "Вино", icon: svgToData(wineSvg) },
      beer: { title: "Пиво", icon: svgToData(beerSvg) },
      whiskey: { title: "Виски", icon: svgToData(whiskeySvg) },
      cognac: { title: "Коньяк", icon: svgToData(cognacSvg) },
      brandy: { title: "Бренди", icon: svgToData(brandySvg) },
    },
  },
  snacks: {
    title: "Снеки",
    description: "Закуски к фильму и вечеринке",
    subcategories: {
      chips: { title: "Чипсы", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M4 7c2-3 6-3 8 0s6 3 8 0v10c-2 3-6 3-8 0s-6-3-8 0V7z' fill='%23f59e0b' />
  <circle cx='9' cy='10' r='1' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      cheese: { title: "Сыр", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M3 13v-2l9-6 9 6v4l-9 6L3 13z' fill='%23f59e0b' />
  <circle cx='8' cy='12' r='1.2' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      nachos: { title: "Начос", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M12 2l10 18H2L12 2z' fill='%23f97316' />
  <path d='M9 15h6v2H9z' fill='%23fff' opacity='0.6'/>
</svg>
`) },
    },
  },
  intim: {
    title: "Секс-товары",
    description: "Интимные товары и аксессуары",
    subcategories: {
      toys: { title: "Игрушки", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M7 3l10 6-10 6-4-2 4-4-4-2 4-4z' fill='%23ec4899'/>
  <circle cx='16' cy='9' r='1.2' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      accessories: { title: "Аксессуары", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M5 12c2-4 8-4 10 0s-6 8-10 4V12z' fill='%238b5cf6'/>
  <circle cx='11' cy='11' r='1' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      lingerie: { title: "Бельё", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M4 7c2-2 6-2 8 0s6 2 8 0v10c-2 2-6 2-8 0s-6-2-8 0V7z' fill='%23fb7185'/>
  <path d='M8 12h8' stroke='%23fff' stroke-width='1.2' stroke-linecap='round' opacity='0.6'/>
</svg>
`) },
    },
  },
  pets: {
    title: "Для питомцев",
    description: "Лакомства и товары для любимцев",
    subcategories: {
      dogs: { title: "Собаки", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M5 12c0-3 3-5 7-5s7 2 7 5v4c0 3-3 5-7 5s-7-2-7-5v-4z' fill='%239ca3af'/>
  <circle cx='9' cy='11' r='1' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      cats: { title: "Кошки", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M4 8c2-3 6-3 8 0s6 3 8 0v8c-2 3-6 3-8 0s-6-3-8 0V8z' fill='%23f59e0b'/>
  <circle cx='12' cy='12' r='1.2' fill='%23fff' opacity='0.6'/>
</svg>
`) },
      treats: { title: "Лакомства", icon: svgToData(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='96' height='96'>
  <path d='M12 2a5 5 0 015 5v10a5 5 0 01-10 0V7a5 5 0 015-5z' fill='%23f97316'/>
  <circle cx='12' cy='9' r='1' fill='%23fff' opacity='0.6'/>
</svg>
`) },
    },
  },
};

export const catalog: Product[] = [
  // Alcohol - Whiskey
  {
    id: "alc-001",
    name: "Виски Glenbrook 12y",
    price: 5490,
    category: "alcohol",
    subcategory: "whiskey",
    images: [
      "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554123168-b18dbdeea38b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514362215649-06fbf54d0f3f?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Бочковая выдержка, мягкий вкус ванили и карамели. Идеален для вечера.",
    tags: ["виски", "12 лет", "премиум"],
  },
  // Alcohol - Wine
  {
    id: "alc-002",
    name: "Игристое Brut Rosé",
    price: 1890,
    category: "alcohol",
    subcategory: "wine",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16d7ae812?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519659528534-7fd733ae1d5f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542302573-1d832b47f987?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Сухое розовое игристое с яркими нотами ягод.",
  },
  // Alcohol - Beer (example)
  {
    id: "alc-003",
    name: "Крафтовое IPA Night",
    price: 350,
    category: "alcohol",
    subcategory: "beer",
    images: [
      "https://images.unsplash.com/photo-1542496654-7c3b4c9e1b6d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496654-7c3b4c9e1b6d?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Горькое IPA с цитрусовыми нотами, идеально к закускам.",
  },
  // Alcohol - Cognac
  {
    id: "alc-004",
    name: "Коньяк Chateau Lumiere VS",
    price: 3990,
    category: "alcohol",
    subcategory: "cognac",
    images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560844352-01f2d6f4d6b3?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Нежный коньяк с нотами дуба и карамели.",
  },
  // Alcohol - Brandy
  {
    id: "alc-005",
    name: "Бренди Old Harbor",
    price: 2790,
    category: "alcohol",
    subcategory: "brandy",
    images: [
      "https://images.unsplash.com/photo-1546309160-8b1a1e9b0f0b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Классический бренди с тёплыми пряными тонами.",
  },
  // Snacks
  {
    id: "snk-001",
    name: "Набор сыров к вину",
    price: 1290,
    category: "snacks",
    subcategory: "cheese",
    images: [
      "https://images.unsplash.com/photo-1546549039-49c0508d3ed1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Ассорти выдержанных сыров, орехи и виноград.",
    tags: ["сыр", "закуски"],
  },
  {
    id: "snk-002",
    name: "Начос с соусами",
    price: 690,
    category: "snacks",
    subcategory: "nachos",
    images: [
      "https://images.unsplash.com/photo-1604908554027-367b1f329702?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Хрустящие начос, сальса, сырный и гуакамоле.",
    tags: ["начос", "соусы"],
  },
  {
    id: "snk-003",
    name: "Чипсы JP Crunch",
    price: 299,
    category: "snacks",
    subcategory: "chips",
    images: [
      "https://images.unsplash.com/photo-1564869737001-42e2b3d0b68e?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Разнообразие вкусов: сыр, соль и уксус, барбекю. Идеальны к пиву.",
    tags: ["чипсы", "снэк"],
  },
  {
    id: "snk-004",
    name: "Попкорн Gourmet",
    price: 450,
    category: "snacks",
    subcategory: "chips",
    images: [
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Тёплый попкорн с карамельной и сырной посыпкой.",
    tags: ["попкорн", "кино"],
  },
  {
    id: "snk-005",
    name: "Крендели хрустящие",
    price: 240,
    category: "snacks",
    subcategory: "chips",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Сольные крендели с мягким хрустом.",
    tags: ["крендели", "закуски"],
  },

  // Intim
  {
    id: "int-001",
    name: "Вибратор Nova Flex",
    price: 4590,
    category: "intim",
    subcategory: "toys",
    images: [
      "https://images.unsplash.com/photo-1615004912156-52727d3d976c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615005125774-e37a1fb6d27a?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615004912150-9b283a1d4ed4?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Силиконовый, водонепроницаемый, несколько режимов вибрации.",
    tags: ["вибратор", "секс-игрушки"],
  },
  {
    id: "int-002",
    name: "Набор аксессуаров Velvet",
    price: 2590,
    category: "intim",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1594498845190-1884be0b2186?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571431745754-c043abf00ca7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608542037079-cd5a51e06151?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Аксессуары для пар с бархатной отделк��й.",
    tags: ["аксессуары", "для пар"],
  },
  {
    id: "int-003",
    name: "Смазка Silk Glide",
    price: 490,
    category: "intim",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1585238341977-5a3e1d52f63d?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Нежная водная смазка, безопасна для игрушек и презервативов.",
    tags: ["смазка", "интим"],
  },
  {
    id: "int-004",
    name: "Массажное масло Relax",
    price: 720,
    category: "intim",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1562184550-68c9b7e70d52?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Ароматическое масло для массажа, гипоаллергенно.",
    tags: ["массаж", "аромат"],
  },
  {
    id: "int-005",
    name: "Комплект кружевного белья",
    price: 1990,
    category: "intim",
    subcategory: "lingerie",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Элегантный комплект из мягкого кружева.",
    tags: ["бельё", "подарок"],
  },

  // Pets
  {
    id: "pet-001",
    name: "Лакомства для собак Beef Bites",
    price: 390,
    category: "pets",
    subcategory: "treats",
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1726600524664-116dd3ac38bd?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Натуральные кусочки говядины, без искусственных добавок.",
    tags: ["лакомства", "собаки"],
  },
  {
    id: "pet-002",
    name: "Игрушка-удочка для котов",
    price: 290,
    category: "pets",
    subcategory: "cats",
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596854373439-83d7f84bdc00?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Прочная палочка с перьями для активных игр.",
    tags: ["кот", "игрушка"],
  },
  {
    id: "pet-003",
    name: "Жевательная кость StrongChew",
    price: 520,
    category: "pets",
    subcategory: "dogs",
    images: [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Прочная жевательная кость для активных собак.",
    tags: ["собаки", "жевательное"],
  },
  {
    id: "pet-004",
    name: "Игрушка с кошачьей мятой",
    price: 220,
    category: "pets",
    subcategory: "cats",
    images: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Мягкая игрушка с кошачьей мятой для активных игр.",
    tags: ["кот", "мята"],
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

export function getProductsByCategoryAndSub(category: CategoryKey, sub?: string) {
  return catalog.filter((p) => p.category === category && (sub ? p.subcategory === sub : true));
}
