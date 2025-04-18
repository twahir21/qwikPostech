import { component$ } from '@builder.io/qwik';

export const ExpensesComponent = component$(() => {
  const dummyExpenses = [
    {
      id: 1,
      category: 'Usafiri',
      amount: 5000,
      date: '2025-04-10',
      note: 'Nauli ya kwenda sokoni',
    },
    {
      id: 2,
      category: 'Matumizi ya Nyumbani',
      amount: 8000,
      date: '2025-04-12',
      note: 'Ununuzi wa chakula',
    },
    {
      id: 3,
      category: 'Mengineyo',
      amount: 2500,
      date: '2025-04-15',
      note: 'Vocha ya simu',
    },
  ];

  return (
    <div class="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Summary */}
      <div class="bg-white rounded-xl shadow p-4 md:p-6 text-gray-800">
        <h2 class="text-lg md:text-2xl font-bold mb-3">📉 Muhtasari wa Matumizi</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
          <div class="bg-rose-100 p-3 rounded-xl">💸 Jumla ya Matumizi: <strong>15,500 TZS</strong></div>
          <div class="bg-yellow-100 p-3 rounded-xl">📅 Matumizi ya Hivi Karibuni: <strong>3</strong></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div class="bg-white rounded-xl shadow p-4 md:p-6 text-gray-800">
        <h2 class="text-lg font-bold mb-2">⚙️ Hatua za Haraka</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <button class="bg-rose-500 text-white p-2 rounded-md">👁️ Angalia Gharama</button>
          <button class="bg-blue-500 text-white p-2 rounded-md">📊 Tazama Ripoti</button>
          <button class="bg-green-600 text-white p-2 rounded-md">🖨️ Chapisha</button>
        </div>
      </div>

      {/* Expense List */}
      <div>
        <h2 class="text-xl font-bold mb-3 text-teal-700">📋 Orodha ya Matumizi</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dummyExpenses.map((expense) => (
            <div key={expense.id} class="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-lg text-gray-800">📁 {expense.category}</h3>
                <span class="text-sm text-gray-500">{expense.date}</span>
              </div>
              <div class="text-sm text-gray-700 space-y-1">
                <p>💰 Gharama: <span class="font-semibold text-red-600">{expense.amount.toLocaleString()} TZS</span></p>
                <p>📝 Maelezo: {expense.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
