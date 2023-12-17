import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input';
import useTranslate from '../../hooks/use-translate';
import "./style.css"
import useStore from '../../hooks/use-store';
export const LoginForm = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslate();
    const store = useStore();
    const callbacks = {
        setToken: useCallback((name, token) => store.actions.session.setToken(name, token), [store]),
        getToken: useCallback(() => store.actions.session.getToken(), [store]),
        setAuthorization: useCallback((value) => store.actions.session.setAuthorization(value), [store]),
    }
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('/api/v1/users/sign', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const json = await response.json();
            setError(json?.error?.data?.issues[0]?.message);
            console.log(json);
            callbacks.setToken('token', json.result.token);
            callbacks.setAuthorization(true);
            navigate("/");
        }
        catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        console.log(callbacks.getToken())

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>{t('login')}</h2>
            <FormInput title={t('loginLabel')} type={'text'} name={'login'} value={formData.login} onChange={handleChange} />
            <FormInput title={t('passwordLabel')} type={'password'} name={'password'} value={formData.password} onChange={handleChange} />
            {error && <p className='error'>{error}</p>}
            <button type='submit'>Войти</button>
        </form>
    )
}

export default LoginForm