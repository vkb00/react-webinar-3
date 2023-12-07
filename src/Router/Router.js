import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "../app"
import ItemInfo from '../pages/ItemInfo';
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:itemId" element={<ItemInfo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router