import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
    name: 'view',
    initialState: 'DESKTOP',
    reducers: {
        MODE(state, action) {
            switch (action.type) {
                case 'view/MODE':
                    if (action.payload.size < 850) return 'MOBILE';
                    return 'DESKTOP';
                default:
                    return state;
            }
        }
    }
})

export const { MODE } = viewSlice.actions;
export default viewSlice.reducer;