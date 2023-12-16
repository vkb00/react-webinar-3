import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input';
import "./style.css"
export const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('/api/v1/users/sign', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            setError(json?.error?.message);
            console.log(json);
            localStorage.setItem('token', json.result.token);
            navigate("/");
        }
        catch (e) {
            console.log(e)
        }

    }



    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <FormInput title={'Логин'} name={'login'} register={register} />
            <FormInput title={'Пароль'} name={'password'} register={register} />
            {error && <p className='error'>{error}</p>}
            <button type='submit'>Войти</button>
        </form>
    )
}

export default LoginForm