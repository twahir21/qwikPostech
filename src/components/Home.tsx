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
    profitableProductProfit: '' as string,
    mostFreqPrd: '' as string,
    mostFreqPrdquantity: '' as string,
    mostPrdQuantity: '' as string,
    mostPrdQuantitytimes: '' as string,
    longDebt: "" as string,
    amount: '' as string,
    mostDebt: '' as string,
    amountDebt: '' as string,
    daysDebt: '' as string,
    lowestPrdName: '' as string,
    lowestPrdStock: 0 as number
  });
  const netSalesStore = useStore<{ day: string; netSales: number }[]>([]);


  useVisibleTask$(async() => {
    const res = await fetchWithLang("http://localhost:3000/analytics", {
      credentials: 'include'
    });

    if (!res.ok) {
      console.error("Analytics failed to fetch");
      return;
    }
    const data = await res.json();// Helper function for safe money formatting
    const formatMoney = (amount: number | undefined) =>
      typeof amount === 'number' ? new Intl.NumberFormat().format(amount) : '0';
    
    // Net profit summary
    analyticsStore.profit = formatMoney(data?.netProfit?.netProfit);
    analyticsStore.purchases = formatMoney(data?.netProfit?.totalPurchases);
    analyticsStore.sales = formatMoney(data?.netProfit?.totalSales);
    analyticsStore.expenses = formatMoney(data?.netProfit?.totalExpenses);
    
    // Most profitable product
    analyticsStore.profitableProductname = data?.highestProfitProduct?.productname ?? 'N/A';
    analyticsStore.profitableProductProfit = formatMoney(data?.highestProfitProduct?.profit);
    
    // Most sold product by quantity
    analyticsStore.mostPrdQuantity = data?.mostSoldProductByQuantity?.productname ?? 'N/A';
    analyticsStore.mostPrdQuantitytimes = data?.mostSoldProductByQuantity?.totalquantitysold ?? 0;
    
    // Most frequent product
    analyticsStore.mostFreqPrd = data?.mostFrequentProduct?.productname ?? 'N/A';
    analyticsStore.mostFreqPrdquantity = data?.mostFrequentProduct?.timessold ?? 0;
    
    // Longest unpaid debt user
    analyticsStore.longDebt = data?.longTermDebtUser?.name ?? 'N/A';
    analyticsStore.amount = formatMoney(data?.longTermDebtUser?.remainingAmount);
    
    // User with highest total debt
    analyticsStore.mostDebt = data?.mostDebtUser?.name ?? 'N/A';
    analyticsStore.amountDebt = formatMoney(data?.mostDebtUser?.remainingAmount);
    
    // Days since oldest debt
    analyticsStore.daysDebt = data?.daysSinceDebt ?? 0;
    
    // lowest product
    if (data.lowestProduct?.length > 0) {
      analyticsStore.lowestPrdName = data.lowestProduct[0].name;
      analyticsStore.lowestPrdStock = data.lowestProduct[0].stock;
    }
    
    // restructure and obtain netSales
    type DaySales = {
      day: string;
      sales: string;
    };
    
    type DayExpenses = {
      day: string;
      expenses: string;
    };

    const salesByDay: DaySales[] = data?.salesByDay ?? [];
    const expensesByDay: DayExpenses[] = data?.expensesByDay ?? [];
    

    // Convert to a map for faster lookup
    const expensesMap: Record<string, number> = Object.fromEntries(
      expensesByDay.map((e: DayExpenses): [string, number] => [e.day, parseInt(e.expenses)])
    );

    // Merge and calculate net sales
    const netSales = salesByDay.map(({ day, sales }: DaySales) => {
      const salesAmount = parseInt(sales) || 0;
      const expenseAmount = expensesMap[day] || 0;

      return {
        day,
        netSales: salesAmount - expenseAmount
      };
    });

    netSalesStore.push(...netSales);

  });
  return (
    <>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Profit */}
      <div class="bg-blue-200 text-blue-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="profit" class="pr-1.5">💵</span> 
          <Translate lang={props.lang} keys={['total_profit']} />
        </h3>
        <p class="text-xl font-bold">{analyticsStore.profit}/=</p>
      </div>

      {/* Total Sales */}
      <div class="bg-green-200 text-green-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="sales" class="pr-1.5">📈</span> 
          <Translate lang={props.lang} keys={['total_sales']} />
        </h3>
        <p class="text-xl font-bold">{analyticsStore.sales}/=</p>
      </div>

      {/* Total Expenses */}
      <div class="bg-red-200 text-red-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="expenses" class="pr-1.5">💸</span> 
          <Translate lang={props.lang} keys={['total_expenses']} />
        </h3>
        <p class="text-xl font-semibold">{analyticsStore.expenses}/=</p>
      </div>

      {/* Most Profitable Product */}
      <div class="bg-yellow-200 text-yellow-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="product" class="pr-1.5">🛒</span> 
          <Translate lang={props.lang} keys={['most_profitable_product']} />
        </h3>
        <p class="text-lg font-semibold">
          {analyticsStore.profitableProductname} ({analyticsStore.profitableProductProfit}/=)
        </p>
      </div>

      {/* Most Sold Product */}
      <div class="bg-purple-200 text-purple-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="sold" class="pr-1.5">🔥</span> 
          <Translate lang={props.lang} keys={['most_sold_product']} />
        </h3>
        <p class="text-sm font-semibold">
          Quantity: {analyticsStore.mostPrdQuantity} – ({analyticsStore.mostPrdQuantitytimes} units)
        </p>
        <p class="text-sm font-semibold">
          Frequent: {analyticsStore.mostFreqPrd} – ({analyticsStore.mostFreqPrdquantity} times)
        </p>
      </div>

      {/* Most Debt User */}
      <div class="bg-gray-200 text-gray-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="debt" class="pr-1.5">💳</span> 
          <Translate lang={props.lang} keys={['most_debt_user']} />
        </h3>
        <p class="text-lg font-semibold">{analyticsStore.mostDebt} – ({analyticsStore.amountDebt}/=)</p>
      </div>

      {/* Long Debt User */}
      <div class="bg-teal-200 text-teal-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="long-debt" class="pr-1.5">⏳</span> 
          <Translate lang={props.lang} keys={['long_debt_user']} />
        </h3>
        <p class="text-lg font-semibold">{analyticsStore.longDebt} – ({analyticsStore.amount}/=)</p>
        <p class="text-xs text-gray-600 italic">(Last payment: {analyticsStore.daysDebt})</p>
      </div>

      {/* Low Stock */}
      <div class="bg-orange-200 text-orange-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="low-stock" class="pr-1.5">⚠️</span> 
          <Translate lang={props.lang} keys={['low_stock']} />
        </h3>
        <p class="text-lg font-semibold">
          {analyticsStore.lowestPrdName} – ({analyticsStore.lowestPrdStock} units)
        </p>
      </div>

      {/* SaaS Countdown */}
      <div class="bg-indigo-200 text-indigo-800 p-4 rounded shadow text-center">
        <h3 class="text-sm flex items-center justify-center">
          <span role="img" aria-label="countdown" class="pr-1.5">⏰</span> 
          <Translate lang={props.lang} keys={['saas_subscription']} />
        </h3>
        <p class="text-lg font-semibold">Expires in 20 days</p>
      </div>

        {/* Total Return */}
        {/* <div class="bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="return" class="pr-1.5">🔄</span> 
            <Translate lang={props.lang} keys={['total_return']} />
          </h3>
          <p class="text-1xl font-semibold">$1,200</p>
        </div> */}

        {/* Top Asked Products */}
        {/* <div class="bg-gradient-to-r from-yellow-300 to-yellow-500 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="asked-product" class="pr-1.5">❓</span> 
            <Translate lang={props.lang} keys={['top_asked_products']} />
          </h3>
          <p class="text-1xl font-semibold">Product Y</p>
        </div> */}

        {/* Total Expired Products */}
        {/* <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded-lg">
          <h3 class="text-lg font-medium flex items-center">
            <span role="img" aria-label="expired" class="pr-1.5">📅</span> 
            <Translate lang={props.lang} keys={['total_expired_products']} />
          </h3>
          <p class="text-1xl font-semibold">0</p>
        </div> */}


      </div>
      <Graph lang={props.lang} data={netSalesStore}/>
      <RecentProductsTable lang={props.lang}/>
    </>
  );
});
