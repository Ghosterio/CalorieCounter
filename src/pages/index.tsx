import React from 'react';
import CounterForm from '../components/CounterForm';
import CounterResult from '../components/CounterResult';

const Home: React.FC = () => {
    return (
        <div className="bg">
            <div className="bg__overlay"></div>
            <picture className="bg__img">
                <source src="/assets/images/bg.webp" type="image/webp" />
                <img src="/assets/images/bg.jpeg" alt="Фоновое изображение" />
            </picture>
            <div className="counter">
                <h1 className="counter__title h1">Счетчик калорий</h1>
                <div className="counter__body wrapper">
                    <CounterForm />
                    <CounterResult />
                </div>
            </div>
        </div>
    );
};

export default Home;