import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import ValidateCongeMain from '../main/validateCongeMain';
const ValidateConge = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <ValidateCongeMain />
            </main>
        </>
    );
};

export default ValidateConge;