import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
    name: 'view',
    initialState: { mode: 'DESKTOP' },
    reducers: {
        MODE(state, action) {
            switch (action.type) {
                case 'view/MODE':
                    if (action.payload.size < 850) {
                        return { ...state, mode: 'MOBILE' };
                    }
                    return { ...state, mode: 'DESKTOP' };
                default:
                    return state;
            }
        },
        TAKE_OFFSET(state, action) {
            switch (action.type) {
                case 'view/TAKE_OFFSET':
                    const { socialUtilityOffset, featuresOffset } = action.payload;
                    return { ...state, socialUtilityOffset, featuresOffset };
                default:
                    return state;
            }
        }
    }
})

export const { MODE, TAKE_OFFSET } = viewSlice.actions;
export default viewSlice.reducer;