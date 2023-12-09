import { createContext, useContext, useState } from 'react';
import languagePack from '../languagePack';
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru');
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };
    return (
        <LanguageContext.Provider value={{ language, changeLanguage, languagePack }}>
            {children}
        </LanguageContext.Provider>
    );
};

const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
export { LanguageProvider, useLanguage }