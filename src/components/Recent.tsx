import { component$ } from "@builder.io/qwik";
import { Translate } from "./Language";

export const RecentProductsTable = component$((props: {lang: string}) => {
  const products = [
    { id: 1, name: "Laptop", price: "$1200", stock: 5 },
    { id: 2, name: "Smartphone", price: "$800", stock: 12 },
    { id: 3, name: "Headphones", price: "$150", stock: 30 },
    { id: 4, name: "Keyboard", price: "$70", stock: 20 },
    { id: 5, name: "Mouse", price: "$40", stock: 18 },
    { id: 6, name: "Monitor", price: "$300", stock: 8 },
  ];

  return (
    <div class="overflow-x-auto">
        <h1 class="font-semibold text-1xl">  

          <Translate lang={props.lang} keys={['recently_added_products']}/>
        </h1>
      <table class="min-w-full border border-gray-300 shadow-md">
        <thead>
          <tr class="bg-gray-700 text-white">
            <th class="border border-black px-4 py-2">#</th>
            <th class="border border-black px-4 py-2"><Translate lang={props.lang} keys={['product']}/></th>
            <th class="border border-black px-4 py-2"><Translate lang={props.lang} keys={['price']} /></th>
            <th class="border border-black px-4 py-2"><Translate lang={props.lang} keys={['stock']} /></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              class={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200`}
            >
              <td class="border border-gray-300 px-4 py-2">{product.id}</td>
              <td class="border border-gray-300 px-4 py-2">{product.name}</td>
              <td class="border border-gray-300 px-4 py-2">{product.price}</td>
              <td class="border border-gray-300 px-4 py-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
