import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setGender,
    setAge,
    setHeight,
    setWeight,
    setActivity,
    calculateCalories,
    resetForm,
    validateForm,
    RootState,
} from '../app/features/counterSlice';

const CounterForm = () => {
    const dispatch = useDispatch();
    const {
        gender,
        age,
        height,
        weight,
        activity,
        isFormValid,
        ageError,
        heightError,
        weightError,
    } = useSelector((state: RootState) => state.counter);

    useEffect(() => {
        dispatch(validateForm());
    }, [dispatch, age, height, weight]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = Number(value);

        switch (name) {
            case 'age':
                dispatch(setAge(parsedValue));
                break;
            case 'height':
                dispatch(setHeight(parsedValue));
                break;
            case 'weight':
                dispatch(setWeight(parsedValue));
                break;
            default:
                break;
        }
    };


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'gender') {
            dispatch(setGender(e.target.value as 'male' | 'female'));
        } else if (e.target.name === 'activity') {
            dispatch(setActivity(e.target.id as 'min' | 'low' | 'mid' | 'high' | 'very-high'));
        }
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(calculateCalories());
    };

    const handleReset = () => {
        dispatch(resetForm());
    };

    return (
        <form className="form" onSubmit={handleCalculate} onReset={handleReset}>
            <fieldset className="form__group">
                <legend className="form__legend h2">Пол</legend>
                <div className="form__btn-radios">
                    <div className="form__btn-radio">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="male">Мужской</label>
                    </div>
                    <div className="form__btn-radio">
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="female">Женский</label>
                    </div>
                </div>
            </fieldset>

            <fieldset className="form__group form__row">
                <legend className="visually-hidden">Параметры человека</legend>
                <div className="form__group">
                    <label className="form__label h2" htmlFor="age">
                        Возраст <span className="text-light">лет</span>
                    </label>
                    <input
                        className={`form__control ${ageError ? 'form__control_error' : ''}`}
                        type="number"
                        id="age"
                        name="age"
                        value={age}
                        onChange={handleInputChange}
                    />
                    {ageError && <span className="form__error">{ageError}</span>}
                </div>
                <div className="form__group">
                    <label className="form__label h2" htmlFor="height">
                        Рост <span className="text-light">см</span>
                    </label>
                    <input
                        className={`form__control ${heightError ? 'form__control_error' : ''}`}
                        type="number"
                        id="height"
                        name="height"
                        value={height}
                        onChange={handleInputChange}
                    />
                    {heightError && <span className="form__error">{heightError}</span>}
                </div>
                <div className="form__group">
                    <label className="form__label h2" htmlFor="weight">
                        Вес <span className="text-light">кг</span>
                    </label>
                    <input
                        className={`form__control ${weightError ? 'form__control_error' : ''}`}
                        type="number"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={handleInputChange}
                    />
                    {weightError && <span className="form__error">{weightError}</span>}
                </div>
            </fieldset>

            <fieldset className="form__group">
                <legend className="form__legend h2">Физическая активность</legend>
                <div className="form__radio">
                    <input
                        type="radio"
                        name="activity"
                        id="min"
                        checked={activity === 'min'}
                        onChange={handleRadioChange}
                    />
                    <label className="text" htmlFor="min">
                        Минимальная <span className="text-light">Сидячая работа, отсутствие физических нагрузок</span>
                    </label>
                </div>
                <div className="form__radio">
                    <input
                        type="radio"
                        name="activity"
                        id="low"
                        checked={activity === 'low'}
                        onChange={handleRadioChange}
                    />
                    <label className="text" htmlFor="low">
                        Низкая <span className="text-light">Редкие, нерегулярные тренировки, активность в быту</span>
                    </label>
                </div>
                <div className="form__radio">
                    <input
                        type="radio"
                        name="activity"
                        id="mid"
                        checked={activity === 'mid'}
                        onChange={handleRadioChange}
                    />
                    <label className="text" htmlFor="mid">
                        Средняя <span className="text-light">Тренировки 3-5 раз в неделю</span>
                    </label>
                </div>
                <div className="form__radio">
                    <input
                        type="radio"
                        name="activity"
                        id="high"
                        checked={activity === 'high'}
                        onChange={handleRadioChange}
                    />
                    <label className="text" htmlFor="high">
                        Высокая <span className="text-light">Тренировки 6-7 раз в неделю</span>
                    </label>
                </div>
                <div className="form__radio">
                    <input
                        type="radio"
                        name="activity"
                        id="very-high"
                        checked={activity === 'very-high'}
                        onChange={handleRadioChange}
                    />
                    <label className="text" htmlFor="very-high">
                        Очень высокая <span className="text-light">Больше 6 тренировок в неделю и физическая работа</span>
                    </label>
                </div>
            </fieldset>

            <div className="form__btns">
                <button
                    className="form__submit btn"
                    type="submit"
                    disabled={!isFormValid}
                >
                    Рассчитать
                </button>
                <button className="form__reset btn btn_transparent" type="reset">
                    Очистить поля
                </button>
            </div>
        </form>
    );
};

export default CounterForm;