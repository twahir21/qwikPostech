import { $, component$, useStore, useResource$, useTask$ } from "@builder.io/qwik";
import { SupplierComponent } from "./Supplier";
import { fetchWithLang } from "~/routes/function/fetchLang";

interface Supplier {
  id: string;
  company: string;
}

interface Product {
  name: string;
  priceSold: string;
  stock: string;
  minStock: string;
  unit: string;
}

interface Purchase {
  priceBought: string;
  date: string;
}

interface Store {
  category: string;
  supplierId: string;
  product: Product;
  purchases: Purchase;
  categories: string[]; // To store categories
  suppliers: Supplier[]; // To store suppliers
  message: string; // To show success/error messages
  isSuccess: boolean; // To track success or failure
}

export const ProductComponent = component$(() => {
  const store = useStore<Store>({
    category: "",
    supplierId: "",
    product: { name: "", priceSold: "", stock: "", minStock: "", unit: "" },
    purchases: { priceBought: "", date: "" },
    categories: [],
    suppliers: [],
    message: "",
    isSuccess: false,
  });

  // Fetch categories from backend with error handling
  const categoriesResource = useResource$<string[]>(async () => {
    try {
      const res = await fetchWithLang("http://localhost:3000/categories", {
        method: "GET",
        credentials: "include", // Send cookies
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
      }

      const data = await res.json();

      if (!data || data.length === 0) {
        console.warn("No categories found.");
        return []; // Return an empty array instead of failing
      }
      const generalNames = data.data.map((item: any) => item.generalName);
      store.categories = generalNames; // Array of general names
      store.message = data.message || "Categories fetched successfully";
      store.isSuccess = true;


      return data.data;
    } catch (error) {
      store.categories = [];
      store.message = "Tatizo limejitokeza"; // Error message
      store.isSuccess = false;
      return []; // Return empty array to avoid breaking UI
    }
  });

  console.log(store.categories)

  // Fetch suppliers from backend with error handling
  const suppliersResource = useResource$<Supplier[]>(async () => {
    try {
      const res = await fetchWithLang("http://localhost:3000/suppliers", {
        method: "GET",
        credentials: "include", // Send cookies
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch suppliers: ${res.statusText}`);
      }

      const data = await res.json();

      if (!data || data.length === 0) {
        console.warn("No suppliers found.");
        return []; // Prevent breaking the page
      }

      return data;
    } catch (error) {
      return []; // Avoid breaking the UI
    }
  });

  // Handle input changes for the form
  const handleInputChange = $((field: keyof Store, value: string) => {
    store[field] = value as never;
  });

  // Handle nested input changes for product and purchases
  const handleNestedInputChange = $((field: keyof Store, key: string, value: string) => {
    (store[field] as any)[key] = value;
  });

  // Handle form submission
  const handleSubmit = $(async () => {
    const formData = new FormData();
    formData.append("category", store.category);
    formData.append("supplierId", store.supplierId);
    formData.append("product[name]", store.product.name);
    formData.append("product[priceSold]", store.product.priceSold);
    formData.append("product[stock]", store.product.stock);
    formData.append("product[minStock]", store.product.minStock);
    formData.append("product[unit]", store.product.unit);
    formData.append("purchases[priceBought]", store.purchases.priceBought);
    formData.append("purchases[date]", store.purchases.date);

    console.log("Form Data Submitted:", formData);
  });

  
  return (
    <>
      <h1 class="text-xl font-bold text-gray-700 mt-6 mb-2 border-b-2 pb-2">Step 1:</h1>
      <SupplierComponent />
      <h1 class="text-xl font-bold text-gray-700 mt-6 mb-2 border-b-2 pb-2">Step 2:</h1>

      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5 border-2 border-gray-600">
        <h2 class="text-2xl font-bold mb-4">Add Product</h2>
        <div class="grid grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <select class="border p-2 rounded" onChange$={(e) => handleInputChange("category", (e.target as HTMLSelectElement).value)}>
            <option value="">Select Category</option>
            {
              store.categories.length > 0 ? (
                store.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              ) : (
                <option disabled>No Categories Found</option>
              )
            }
          </select>

          {/* Supplier Dropdown */}
          <select class="border p-2 rounded" onChange$={(e) => handleInputChange("supplierId", (e.target as HTMLSelectElement).value)}>
            <option value="">Select Supplier</option>
            {suppliersResource.value && suppliersResource.value.length > 0 ? (
              suppliersResource.value.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>{supplier.company}</option>
              ))
            ) : (
              <option disabled>No Suppliers Found</option>
            )}
          </select>

          <input class="border p-2 rounded" placeholder="Product Name" onInput$={(e) => handleNestedInputChange("product", "name", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Price Sold" type="number" onInput$={(e) => handleNestedInputChange("product", "priceSold", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Stock" type="number" onInput$={(e) => handleNestedInputChange("product", "stock", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Min Stock" type="number" onInput$={(e) => handleNestedInputChange("product", "minStock", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Unit (e.g., kg)" onInput$={(e) => handleNestedInputChange("product", "unit", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Price Bought" type="number" onInput$={(e) => handleNestedInputChange("purchases", "priceBought", (e.target as HTMLInputElement).value)} />
          <input class="border p-2 rounded" placeholder="Purchase Date" type="date" onInput$={(e) => handleNestedInputChange("purchases", "date", (e.target as HTMLInputElement).value)} />
        </div>
        <button class="bg-gray-700 text-white px-4 py-2 rounded mt-4 w-full hover:bg-gray-500" onClick$={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
});
