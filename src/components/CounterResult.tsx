import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/features/counterSlice';

const CounterResult = () => {
    const { dailyCalories, caloriesForWeight, isResultVisible } = useSelector(
        (state: RootState) => state.counter
    );

    return (
        <div className={`counter-result ${isResultVisible ? 'counter-result_active' : ''}`}>
            <h2 className="counter-result__title h2">Ваш результат</h2>
            <div className="counter-result__body">
                {dailyCalories !== null && (
                    <p className="counter-result__text text">
                        Суточная норма - <strong>{dailyCalories} ккал</strong>, необходимая организму для нормального функционирования.
                    </p>
                )}
                {caloriesForWeight !== null && (
                    <p className="counter-result__text text">
                        Для поддержания веса нужно употреблять <strong>{caloriesForWeight} ккал</strong> в день.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CounterResult;