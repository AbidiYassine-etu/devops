import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import CalendarGfg from '../components/Main';

const EmployeeScreen = () => {
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

export default EmployeeScreen;