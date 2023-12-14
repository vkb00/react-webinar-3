import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import "./style.css"
export const LoginForm = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch('/api/v1/users/sign', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json.result.token);
        localStorage.setItem('token', json.result.token);
        navigate("/");
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <label>Логин</label>
            <input {...register('login')} />
            <label>Пароль</label>
            <input {...register('password')} />
            <button type='submit'>Войти</button>
        </form>
    )
}

export default LoginForm