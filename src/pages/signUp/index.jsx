import React, { useState } from 'react';
import style from "./style.module.css";
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [userInput, setUserInput] = useState({
        name: "",
        phone: "+9989",
        login: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        login: false,
        password: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        let hasError = false;

        // Проверяем, заполнены ли все поля
        Object.keys(userInput).forEach(key => {
            if (!userInput[key]) {
                setErrors(prev => ({ ...prev, [key]: true }));
                hasError = true;
            } else {
                setErrors(prev => ({ ...prev, [key]: false }));
            }
        });

        // Если есть незаполненные поля, не отправляем форму
        if (hasError) return;

        console.log(userInput);
        const data = JSON.parse(localStorage.getItem("usersData")) ?? [];
        localStorage.setItem("usersData", JSON.stringify([...data, userInput]));
        setUserInput({
            name: "",
            phone: "+9989",
            login: "",
            password: "",
        });
    }

    return (
        <section>
            <div className={style.container}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        <input
                            value={userInput.name}
                            className={`${style.input} ${errors.name && style.error}`}
                            onChange={(e) => setUserInput((prev) => ({ ...prev, name: e.target.value }))}
                            type="text"
                            id="name"
                            placeholder='First Name'
                        />
                        {errors.name && <span className={style.errorMessage}>Bu joy bo'sh qolib ketti!</span>}
                    </label>

                    <label htmlFor="phone">
                        <input
                            value={userInput.phone}
                            className={`${style.input} ${errors.phone && style.error}`}
                            onChange={(e) => setUserInput((prev) => ({ ...prev, phone: e.target.value }))}
                            type="tel"
                            id="phone"
                            placeholder='Phone Number'
                        />
                        {errors.phone && <span className={style.errorMessage}>Bu joy bo'sh qolib ketti!</span>}
                    </label>

                    <label htmlFor="login">
                        <input
                            value={userInput.login}
                            className={`${style.input} ${errors.login && style.error}`}
                            onChange={(e) => setUserInput((prev) => ({ ...prev, login: e.target.value }))}
                            type="text"
                            id="login"
                            placeholder='Username'
                        />
                        {errors.login && <span className={style.errorMessage}>Bu joy bo'sh qolib ketti!</span>}
                    </label>

                    <label htmlFor="password">
                        <input
                            value={userInput.password}
                            className={`${style.input} ${errors.password && style.error}`}
                            onChange={(e) => setUserInput((prev) => ({ ...prev, password: e.target.value }))}
                            type="password"
                            id="password"
                            placeholder='Password'
                        />
                        {errors.password && <span className={style.errorMessage}>Bu joy bo'sh qolib ketti!</span>}
                    </label>

                    <button type='submit' className={style.button}>Submit</button>
                      <Link to={"/"} className={style.login}>Login</Link>
                </form>
                
            </div>
        </section>
    );
}
