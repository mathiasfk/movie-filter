import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';


const App: React.FC = () => {    
    return (
        <>
            <Outlet />
            <SpeedInsights />
            <Analytics />
        </>
    );
};

export default App;
