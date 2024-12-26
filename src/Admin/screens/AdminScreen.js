import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import CalendarGfg from '../main/adminMain';

const AdminScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <CalendarGfg />
            </main>
        </>
    );
};

export default AdminScreen;