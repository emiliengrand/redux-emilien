import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";


// Configuration du store Redux
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  // Ajout des middleware par défaut (utile pour des middlewares additionnels)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Types pour le typage de l'état global et des dispatchs
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;