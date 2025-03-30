import { $, component$, useStore } from '@builder.io/qwik';

interface AuthFormProps {
  isLogin: boolean;
}

export const AuthForm = component$<AuthFormProps>(({ isLogin }) => {
  const state = useStore({
    isLogin, // Use prop value
    shopname: '',
    email: '',
    username: '',
    password: '',
    errors: {} as Record<string, string>,
  });

  const validateForm = $(() => {
    const errors: Record<string, string> = {};
    if (!state.isLogin && !state.shopname.trim()) errors.shopname = 'Jina la duka linahitajika';
    if (!state.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = 'Barua pepe sahihi inahitajika';
    if (!state.username.trim() || state.username.length < 3) errors.username = 'Jina la mtumiaji lazima liwe na herufi 3 au zaidi';
    if (!state.password.trim() || state.password.length < 6) errors.password = 'Nenosiri lazima liwe na herufi 6 au zaidi';
    state.errors = errors;
    return Object.keys(errors).length === 0;
  });

  const handleSubmit = $(() => {
    if (validateForm()) {
      console.log(state.isLogin ? 'Inaingia:' : 'Inasajili:', state);
    }
  });

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col items-center relative">
        <div class={`absolute -top-12 flex justify-center items-center w-24 h-24 rounded-full border-4 ${state.isLogin ? 'border-double' : 'border-dotted'}`}>
          <img src={state.isLogin ? '/login-image.jpg' : '/register-image.jpg'} class="w-20 h-20 rounded-full" alt={state.isLogin ? 'Ingia' : 'Jisajili'} />
        </div>

        <h2 class="text-2xl font-bold mb-12 mt-16">{state.isLogin ? 'Ingia' : 'Jisajili'}</h2>
        {!state.isLogin && (
          <input class="w-full p-2 border rounded mb-2" type="text" placeholder="Jina la Duka" value={state.shopname} onInput$={(e) => (state.shopname = e.target.value)} />
        )}
        {!state.isLogin && state.errors.shopname && <p class="text-red-500 text-sm">{state.errors.shopname}</p>}
        {
          !state.isLogin && (
            <input class="w-full p-2 border rounded mb-2" type="email" placeholder="Barua Pepe (email)" value={state.email} onInput$={(e) => (state.email = e.target.value)} />
          )
        }
        {!state.isLogin && state.errors.email && <p class="text-red-500 text-sm">{state.errors.email}</p>}

        <input class="w-full p-2 border rounded mb-2" type="text" placeholder="Jina la Mtumiaji" value={state.username} onInput$={(e) => (state.username = e.target.value)} />
        {state.errors.username && <p class="text-red-500 text-sm">{state.errors.username}</p>}

        <input class="w-full p-2 border rounded mb-2" type="password" placeholder="Nenosiri" value={state.password} onInput$={(e) => (state.password = e.target.value)} />
        {state.errors.password && <p class="text-red-500 text-sm">{state.errors.password}</p>}

        {state.isLogin && <a href="#" class="text-gray-900 text-sm block text-right mb-2">Umesahau nenosiri?</a>}

        <button class={`w-full p-2 rounded mt-2 ${state.isLogin ? 'bg-gray-900 text-white' : 'bg-gray-600 text-white'}`} onClick$={handleSubmit}>
          {state.isLogin ? 'Ingia' : 'Jisajili'}
        </button>

        <button class="w-full text-gray-700 mt-4 underline" onClick$={() => (state.isLogin = !state.isLogin)}>
          {state.isLogin ? "Huna akaunti? Jisajili" : "Tayari una akaunti? Ingia"}
        </button>
      </div>
    </div>
  );
});
