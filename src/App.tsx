import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import MovieListPage from './pages/MovieListPage';
import MovieDetailsPage from './pages/MovieDetailsPage';


const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MovieListPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage/>} />
            </Routes>
            <SpeedInsights />
            <Analytics />
        </>
    );
};

export default App;
