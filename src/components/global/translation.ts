// translations.ts
export const translations = {
  en: {
    home: "Home",
    sales: "Sales",
    analytics: "Analytics",
    receipts: "Receipts",
    debt: "Debt",
    expenses: "Expenses",
    graph: "Graph",
    products: "Products",
    customers: "Customers",
    suppliers: "Suppliers",
    settings: "Settings",
  },
  ar: {
    home: "الصفحة الرئيسية",
    sales: "المبيعات",
    analytics: "التحليلات",
    receipts: "الإيصالات",
    debt: "الدين",
    expenses: "النفقات",
    graph: "الرسم البياني",
    products: "المنتجات",
    customers: "العملاء",
    suppliers: "الموردين",
    settings: "الإعدادات",
  },
  // Add other languages here
  sw:{
    home: "Nyumbani",
    sales: "Mauzo",
  }
};

export type LanguageCode = keyof typeof translations;
