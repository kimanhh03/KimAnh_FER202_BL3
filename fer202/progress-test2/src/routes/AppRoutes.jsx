
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetail from '../pages/ProductDetails';
import LoginPage from '../pages/LoginPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
    );
}