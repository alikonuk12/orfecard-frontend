import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        ADD_TO_CART(state, action) {
            switch (action.type) {
                case 'cart/ADD_TO_CART':
                    return [...state, action.payload];
                default:
                    return state;
            }
        },
        REMOVE_FROM_CART(state, action) {
            switch (action.type) {
                case 'cart/REMOVE_FROM_CART':
                    const newCart = state.filter(el => el.pid !== action.payload.pid);
                    return newCart;
                default:
                    return state;
            }
        },
        CLEAN_CART(state, action) {
            switch (action.type) {
                case 'cart/CLEAN_CART':
                    return [];
                default:
                    return state;
            }
        }
    }
})

export const { ADD_TO_CART, REMOVE_FROM_CART, CLEAN_CART } = cartSlice.actions;
export default cartSlice.reducer;