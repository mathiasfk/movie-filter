import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { Outlet } from 'react-router-dom'; 


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
