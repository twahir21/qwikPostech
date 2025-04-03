import type { RequestHandler } from "@builder.io/qwik-city";

type Translation = Record<string, string>;

const translations: Record<string, Translation> = {
  en: {
    total_profit: "Total Profit",
    total_sales: "Total Sales",
    most_profitable_product: "Most Profitable Product",
    most_sold_product: "Most Sold Product",
    most_buying_user: "Most Buying User",
    most_debt_user: "Most Debt User",
    long_debt_user: "Long Debt User",
    low_stock: "Low Stock",
    total_expenses: "Total Expenses",
    total_return: "Total Return",
    top_asked_products: "Top Asked Products",
    total_expired_products: "Total Expired Products",
    saas_subscription: "SaaS Subscription",
    recently_added_products: "Recently Added Products", // English translation
    product: "Product",
    price: "Price",
    stock: "Stock",
    graph_title: "Sales Chart in a week", // English translation
    step_1: "Step 1 :",
    step_2: "Step 2 :",
    addPrd: "Add Product",
    addSupp: "Add Supplier",
  },
  fr: {
    total_profit: "Profit total",
    total_sales: "Ventes totales",
    most_profitable_product: "Produit le plus rentable",
    most_sold_product: "Produit le plus vendu",
    most_buying_user: "Utilisateur le plus acheteur",
    most_debt_user: "Utilisateur ayant le plus de dettes",
    long_debt_user: "Utilisateur ayant une dette longue",
    low_stock: "Stock faible",
    total_expenses: "Dépenses totales",
    total_return: "Retour total",
    top_asked_products: "Produits les plus demandés",
    total_expired_products: "Produits expirés",
    saas_subscription: "Abonnement SaaS",
    product: "Produit",
    price: "Prix",
    stock: "Stock",
    recently_added_products: "Produits Ajoutés Récemment", // French translation
    graph_title: "Graphique des ventes en une semaine", // French translatio
    step_1: "Étape 1 :",
    step_2: "Étape 2 :",
    addPrd: "Ajouter un produit",
    addSupp: "Ajouter un fournisseur",
  },
  sw: {
    total_profit: "Faida jumla",
    total_sales: "Mauzo jumla",
    most_profitable_product: "Bidhaa yenye faida kubwa",
    most_sold_product: "Bidhaa iliyouzwa zaidi",
    most_buying_user: "Mtumiaji anaye nunua zaidi",
    most_debt_user: "Mtumiaji mwenye madeni mengi",
    long_debt_user: "Mtumiaji mwenye deni la muda mrefu",
    low_stock: "Hifadhi ya chini",
    total_expenses: "Gharama jumla",
    total_return: "Kurudi jumla",
    top_asked_products: "Bidhaa zinazoulizwa sana",
    total_expired_products: "Bidhaa zilizokwisha",
    saas_subscription: "Usajili wa SaaS",
    product: "Bidhaa",
    price: "Bei",
    stock: "Hisa",
    recently_added_products: "Bidhaa Zilizoongezwa Hivi Karibuni", // Swahili translation
    graph_title: "Chati ya Mauzo kwa wiki", // Swahili translation
    step_1: "Hatua ya 1 :",
    step_2: "Hatua ya 2 :",
    addPrd: "Ongeza Bidhaa", // Swahili translation
    addSupp: "Ongeza Muuzaji", // Swahili translation

  },
  ar: {
    total_profit: "إجمالي الأرباح",
    total_sales: "إجمالي المبيعات",
    most_profitable_product: "أكثر المنتجات ربحاً",
    most_sold_product: "أكثر المنتجات مبيعاً",
    most_buying_user: "أكثر المستخدمين شراءً",
    most_debt_user: "أكثر المستخدمين دَيناً",
    long_debt_user: "المستخدم ذو الديون الطويلة",
    low_stock: "الحد الأدنى للمخزون",
    total_expenses: "إجمالي النفقات",
    total_return: "إجمالي المرتجعات",
    top_asked_products: "أكثر المنتجات طلباً",
    total_expired_products: "المنتجات المنتهية الصلاحية",
    saas_subscription: "اشتراك SaaS",
    recently_added_products: "المنتجات المضافة مؤخرًا", // Arabic translation
    product: "منتج",
    price: "السعر",
    stock: "المخزون",
    graph_title: "رسم بياني للمبيعات في أسبوع",
    step_1: ": الخطوة 1",
    step_2: ": الخطوة 2",
    addPrd: "إضافة منتج", // Arabic translation
    addSupp: "إضافة مورد", // Arabic translation
  },
};

export const onGet: RequestHandler = ({ query, json }) => {
  const lang = query.get("lang") || "en"; // Get the language from query params
  const key = query.get("key"); // Get the translation key
  
  // Ensure the lang exists in translations
  const translation = translations[lang];

  // Return the specific key translation
  if (key && translation[key]) {
    json(200, { message: translation[key] });
  } else {
    json(404, { message: "Translation not found" });
  }
};
