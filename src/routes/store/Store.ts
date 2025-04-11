// src/store.ts
import { useSignal } from '@builder.io/qwik';
import { Signal } from '@builder.io/qwik';

export const refreshSignals = {
  supplier: useSignal(0),
  category: useSignal(0),
  product: useSignal(0),
  // Add more as needed
};

