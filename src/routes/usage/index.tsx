import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Kichwa cha Mfumo */}
      <h1 class="text-4xl font-bold text-center mb-6 animate-bounce text-primary">
        🧾 POSTECH - Mfumo wa Kisasa wa Biashara
      </h1>

      {/* Maelezo ya Awali */}
      <p class="text-lg text-gray-700 leading-relaxed mb-4 animate-fade-in">
        Karibu kwenye mfumo wa <strong>PosTech</strong> – suluhisho la kidigitali linalobadilisha jinsi biashara zinavyoendeshwa Afrika Mashariki. Mfumo huu umetengenezwa kwa teknolojia nyepesi lakini zenye nguvu, ukiwa na lengo la kurahisisha shughuli za kila siku za wafanyabiashara wa rejareja na jumla.
      </p>

      {/* Tatizo Lililotatuliwa */}
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md mb-6 animate-fade-in-up">
        <h2 class="text-2xl font-semibold mb-2 text-yellow-800">
          🧠 Tatizo Lililokuwepo
        </h2>
        <p class="text-gray-800">
          Wafanyabiashara wengi walikosa mfumo wa uhakika wa kufuatilia hisa, madeni, matumizi, na takwimu muhimu kwa biashara zao. POS hii imetatua tatizo la:
        </p>
        <ul class="list-disc list-inside text-gray-700 mt-2">
          <li>Kukosa ufuatiliaji wa bidhaa na hisa (stock).</li>
          <li>Madeni yasiyorekodiwa au yaliyosahaulika.</li>
          <li>Ukosefu wa takwimu za faida, wateja bora, bidhaa zinazouzwa zaidi.</li>
          <li>Kupoteza muda kwa kuandika kumbukumbu kwa mkono.</li>
        </ul>
      </div>

      {/* Teknolojia Zilizotumika */}
      <div class="bg-blue-100 p-4 rounded-xl shadow-md mb-6 animate-slide-in-left">
        <h2 class="text-2xl font-semibold mb-2 text-blue-800">
          ⚙️ Teknolojia Zilizotumika
        </h2>
        <ul class="list-disc list-inside text-gray-700">
          <li><strong>Qwik</strong>: Frontend framework ya kasi kubwa na SEO friendly.</li>
          <li><strong>Tailwind CSS</strong>: Kutengeneza UI ya kisasa na responsive.</li>
          <li><strong>Bun</strong>: Runtime ya JavaScript yenye kasi sana.</li>
          <li><strong>Elysia.js</strong>: REST API backend iliyorahisishwa na JWT auth, yenye kasi zaidi duniani (baada ya Rust na Golang).</li>
          <li><strong>PostgreSQL</strong> + <strong>Drizzle ORM</strong>: Database ya biashara na ORM rahisi kutumia.</li>
        </ul>
      </div>

      {/* Muongozo wa Kutumia Mfumo */}
      <div class="bg-green-100 p-4 rounded-xl shadow-md mb-6 animate-slide-in-right">
        <h2 class="text-2xl font-semibold mb-2 text-green-800">
          📘 Jinsi ya Kutumia Mfumo wa POS
        </h2>
        <ol class="list-decimal list-inside text-gray-800">
          <li>Jisajili kwa kuweka jina la duka, barua pepe na nenosiri.</li>
          <li>Ingia kwenye dashboard yako.</li>
          <li>Ongeza bidhaa mpya na hisa zake.</li>
          <li>Fanya mauzo kwa pesa taslimu au deni.</li>
          <li>Rekodi matumizi kama usafiri au malipo ya bidhaa.</li>
          <li>Fuatilia madeni ya wateja na toa risiti ukihitaji.</li>
          <li>Tazama takwimu za biashara: faida, bidhaa bora, nk.</li>
          <li>Tumia QR Code kufanikisha mauzo ya haraka na kurudia manunuzi.</li>
        </ol>
      </div>

      {/* Animations kwa Scroll */}
      <div class="bg-purple-100 p-4 rounded-xl shadow-md mb-6 animate-fade-in-scroll">
        <h2 class="text-2xl font-semibold mb-2 text-purple-800">
          🪄 Mbinu za Kipekee
        </h2>
        <ul class="list-disc list-inside text-gray-700">
          <li>Msaada wa lugha nyingi (Kiswahili, Kiingereza, Kifaransa, Kiarabu).</li>
          <li>QR Code ya kuchakata mauzo bila kuandika tena data.</li>
          <li>Urahisi wa kutumia hata kwa wafanyabiashara wasiobobea na tech.</li>
          <li>Trial ya siku 14 bure kwa watumiaji wapya.</li>
        </ul>
      </div>

      {/* Footer */}
      <p class="text-center text-sm text-gray-500 mt-12">
        &copy; 2025 POSTECH - Mfumo wa Biashara wa Kisasa 🌍 <span class="italic"> ~ By BlackCoder</span>
      </p>
    </div>
  );
});
