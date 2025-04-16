import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Translate } from "./Language";  // Make sure this is the correct path
import { RecentProductsTable } from "./Recent";
import { Graph } from "./Graph";
import { fetchWithLang } from "~/routes/function/fetchLang";

export const HomeComponent = component$((props: { lang: string }) => {

  const analyticsStore = useStore({
    profit: "0" as string,
    sales: "0" as string,
    expenses: "0" as string,
    purchases: "0" as string,
    profitableProductname: '' as string,
    profitableProductProfit: '' as string
  })

  useVisibleTask$(async() => {
    const res = await fetchWithLang("http://localhost:3000/analytics", {
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error("Invalid request")
    }
    const data = await res.json();

    // assign data to the store and format to be money
    analyticsStore.profit = new Intl.NumberFormat().format(data.netProfit.netProfit);
    analyticsStore.purchases = new Intl.NumberFormat().format(data.netProfit.totalPurchases);
    analyticsStore.sales = new Intl.NumberFormat().format(data.netProfit.totalSales);
    analyticsStore.expenses = new Intl.NumberFormat().format(data.netProfit.totalExpenses);

    // most profitable product
    analyticsStore.profitableProductname = data.highestProfitProduct.productname;
    analyticsStore.profitableProductProfit = new Intl.NumberFormat().format(data.highestProfitProduct.profit);


    console.log("Home req: ", data)
  })
  return (
    <>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Profit */}
        <div class="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="profit" class="pr-1.5">💵</span> 
            <Translate lang={props.lang} keys={['total_profit']} />
          </h3>
          <p class="text-1xl font-bold">{analyticsStore.profit}/=</p>
        </div>

        {/* Total Sales */}
        <div class="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="sales" class="pr-1.5">📈</span> 
            <Translate lang={props.lang} keys={['total_sales']} />
          </h3>
          <p class="text-1xl font-bold">{analyticsStore.sales}/=</p>
        </div>

        {/* Total Expenses */}
        <div class="bg-gradient-to-r from-indigo-400 to-blue-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="expenses" class="pr-1.5">💸</span> 
            <Translate lang={props.lang} keys={['total_expenses']} />
          </h3>
          <p class="text-1xl font-semibold">{analyticsStore.expenses}/=</p>
        </div>

        {/* Most Profitable Product */}
        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="product" class="pr-1.5">🛒</span> 
            <Translate lang={props.lang} keys={['most_profitable_product']} />
          </h3>
          <p class="text-1xl font-semibold">{analyticsStore.profitableProductname}, ( {analyticsStore.profitableProductProfit}/=)</p>
        </div>

        {/* Most Sold Product */}
        <div class="bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="sold" class="pr-1.5">🔥</span> 
            <Translate lang={props.lang} keys={['most_sold_product']} />
          </h3>
          <p class="text-1xl font-semibold">Product B</p>
        </div>

        {/* Most Debt User */}
        <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="debt" class="pr-1.5">💳</span> 
            <Translate lang={props.lang} keys={['most_debt_user']} />
          </h3>
          <p class="text-1xl font-semibold">Jane Smith</p>
        </div>

        {/* Long Debt User */}
        <div class="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="long-debt" class="pr-1.5">⏳</span> 
            <Translate lang={props.lang} keys={['long_debt_user']} />
          </h3>
          <p class="text-1xl font-semibold">Alice Johnson <span class="text-sm text-gray-200">(Last payment: 2 months ago)</span></p>
        </div>

        {/* Low Stock */}
        <div class="bg-gradient-to-r from-red-500 to-yellow-600 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="low-stock" class="pr-1.5">⚠️</span> 
            <Translate lang={props.lang} keys={['low_stock']} />
          </h3>
          <p class="text-1xl font-semibold">Product X</p>
        </div>

        {/* Total Return */}
        <div class="bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="return" class="pr-1.5">🔄</span> 
            <Translate lang={props.lang} keys={['total_return']} />
          </h3>
          <p class="text-1xl font-semibold">$1,200</p>
        </div>

        {/* Top Asked Products */}
        <div class="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="asked-product" class="pr-1.5">❓</span> 
            <Translate lang={props.lang} keys={['top_asked_products']} />
          </h3>
          <p class="text-1xl font-semibold">Product Y</p>
        </div>

        {/* Total Expired Products */}
        <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="expired" class="pr-1.5">📅</span> 
            <Translate lang={props.lang} keys={['total_expired_products']} />
          </h3>
          <p class="text-1xl font-semibold">5</p>
        </div>

        {/* Remained Time for SaaS (Countdown) */}
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="countdown" class="pr-1.5">⏰</span> 
            <Translate lang={props.lang} keys={['saas_subscription']} />
          </h3>
          <p class="text-1xl font-semibold">Expires in 20 days</p>
        </div>
      </div>
      <Graph lang={props.lang} />
      <RecentProductsTable lang={props.lang}/>
    </>
  );
});
