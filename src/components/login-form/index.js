import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from 'react-router-dom';
import FormInput from '../form-input';
import useTranslate from '../../hooks/use-translate';
import "./style.css"
import useStore from '../../hooks/use-store';
export const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslate();
    const store = useStore();
    const callbacks = {
        setToken: useCallback((name, token) => store.actions.session.setToken(name, token), [store]),
        getToken: useCallback(() => store.actions.session.getToken(), [store]),

        setAuthorization: useCallback((value) => store.actions.session.setAuthorization(value), [store]),

    }
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('/api/v1/users/sign', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            setError(json?.error?.data?.issues[0]?.message);
            console.log(json);
            callbacks.setToken('token', json.result.token);
            callbacks.setAuthorization(true);
            // localStorage.setItem('token', json.result.token);
            navigate("/");
        }
        catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        console.log(callbacks.getToken())
        // if (callbacks.getToken()) {
        //     navigate("/");
        // }
    })


    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <h2>{t('login')}</h2>
            <FormInput title={t('loginLabel')} name={'login'} register={register} />
            <FormInput title={t('passwordLabel')} name={'password'} register={register} />
            {error && <p className='error'>{error}</p>}
            <button type='submit'>Войти</button>
        </form>
    )
}

export default LoginForm