import { $, component$, useStore } from "@builder.io/qwik";

interface Supplier {
  company: string;
  contact: string;
}

interface Product {
  name: string;
  priceSold: string;
  stock: string;
  minStock: string;
  unit: string;
}

interface Purchase {
  quantity: string;
  priceBought: string;
  date: string;
}

interface Store {
  category: string;
  supplier: Supplier;
  product: Product;
  purchases: Purchase;
}

export default component$(() => {
  const store = useStore<Store>({
    category: "",
    supplier: { company: "", contact: "" },
    product: { name: "", priceSold: "", stock: "", minStock: "", unit: "" },
    purchases: { quantity: "", priceBought: "", date: "" },
  });

  const handleInputChange = $((field: keyof Store, value: string) => {
    store[field] = value as never;
  });

  const handleNestedInputChange = $((field: keyof Store, key: string, value: string) => {
    (store[field] as any)[key] = value;
  });

  const handleSubmit = $(async () => {
    const formData = new FormData();
    formData.append("category", store.category);
    formData.append("supplier[company]", store.supplier.company);
    formData.append("supplier[contact]", store.supplier.contact);
    formData.append("product[name]", store.product.name);
    formData.append("product[priceSold]", store.product.priceSold);
    formData.append("product[stock]", store.product.stock);
    formData.append("product[minStock]", store.product.minStock);
    formData.append("product[unit]", store.product.unit);
    formData.append("purchases[quantity]", store.purchases.quantity);
    formData.append("purchases[priceBought]", store.purchases.priceBought);
    formData.append("purchases[date]", store.purchases.date);

    await fetch("http://localhost/api", {
      method: "POST",
      body: formData,
    });
  });

  return (
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5">
      <h2 class="text-2xl font-bold mb-4">Add Product</h2>
      <div class="grid grid-cols-2 gap-4">
        <input class="border p-2 rounded" placeholder="Category" onInput$={(e) => handleInputChange("category", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Supplier Company" onInput$={(e) => handleNestedInputChange("supplier", "company", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Supplier Contact" onInput$={(e) => handleNestedInputChange("supplier", "contact", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Product Name" onInput$={(e) => handleNestedInputChange("product", "name", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Price Sold" type="number" onInput$={(e) => handleNestedInputChange("product", "priceSold", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Stock" type="number" onInput$={(e) => handleNestedInputChange("product", "stock", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Min Stock" type="number" onInput$={(e) => handleNestedInputChange("product", "minStock", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Unit (e.g., kg)" onInput$={(e) => handleNestedInputChange("product", "unit", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Quantity Purchased" type="number" onInput$={(e) => handleNestedInputChange("purchases", "quantity", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Price Bought" type="number" onInput$={(e) => handleNestedInputChange("purchases", "priceBought", (e.target as HTMLInputElement).value)} />
        <input class="border p-2 rounded" placeholder="Purchase Date" type="date" onInput$={(e) => handleNestedInputChange("purchases", "date", (e.target as HTMLInputElement).value)} />
      </div>
      <button class="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-700" onClick$={handleSubmit}>
        Submit
      </button>
    </div>
  );
});
