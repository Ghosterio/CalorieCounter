import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    gender: 'male' | 'female';
    age: number;
    height: number;
    weight: number;
    activity: 'min' | 'low' | 'mid' | 'high' | 'very-high';
    dailyCalories: number | null;
    caloriesForWeight: number | null;
    isResultVisible: boolean;
    isFormValid: boolean;
    ageError: string;
    heightError: string;
    weightError: string;
}

const initialState: CounterState = {
    gender: 'male',
    age: 0,
    height: 0,
    weight: 0,
    activity: 'min',
    dailyCalories: null,
    caloriesForWeight: null,
    isResultVisible: false,
    isFormValid: false,
    ageError: '',
    heightError: '',
    weightError: '',
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setGender: (state, action: PayloadAction<'male' | 'female'>) => {
            state.gender = action.payload;
        },
        setAge: (state, action: PayloadAction<number>) => {
            state.age = action.payload;

            if (action.payload === 0) {
                state.ageError = 'Возраст не может быть равен 0';
            }
            else if (action.payload > 150) {
                state.ageError = 'Возраст не может быть больше 150';
            } else {
                state.ageError = '';
            }
        },
        setHeight: (state, action: PayloadAction<number>) => {

            state.height = action.payload;

            if (action.payload === 0) {
                state.heightError = 'Рост не может быть равен 0';
            } else {
                state.heightError = '';
            }
        },
        setWeight: (state, action: PayloadAction<number>) => {

            state.weight = action.payload;

            if (action.payload === 0) {
                state.weightError = 'Вес не может быть равен 0';
            } else {
                state.weightError = '';
            }
        },
        setActivity: (state, action: PayloadAction<'min' | 'low' | 'mid' | 'high' | 'very-high'>) => {
            state.activity = action.payload;
        },
        calculateCalories: (state) => {
            let bmr: number;
            if (state.gender === 'male') {
                bmr = 66.5 + (13.75 * state.weight) + (5.003 * state.height) - (6.775 * state.age);
            } else {
                bmr = 655.1 + (9.563 * state.weight) + (1.85 * state.height) - (4.676 * state.age);
            }
            state.dailyCalories = Math.round(bmr);

            let activityMultiplier: number;
            switch (state.activity) {
                case 'min':
                    activityMultiplier = 1.2;
                    break;
                case 'low':
                    activityMultiplier = 1.375;
                    break;
                case 'mid':
                    activityMultiplier = 1.55;
                    break;
                case 'high':
                    activityMultiplier = 1.7;
                    break;
                case 'very-high':
                    activityMultiplier = 1.9;
                    break;
                default:
                    activityMultiplier = 1.2;
            }

            state.caloriesForWeight = Math.round(bmr * activityMultiplier);
            state.isResultVisible = true;
        },
        resetForm: (state) => {
            return { ...initialState };
        },
        validateForm: (state) => {
            state.isFormValid = !(state.age === 0 || state.height === 0 || state.weight === 0 || !!state.ageError || !!state.heightError || !!state.weightError);
        }
    },
});

export const {
    setGender,
    setAge,
    setHeight,
    setWeight,
    setActivity,
    calculateCalories,
    resetForm,
    validateForm,
} = counterSlice.actions;
export default counterSlice.reducer;

export type RootState = {
    counter: ReturnType<typeof counterSlice.reducer>;
};
