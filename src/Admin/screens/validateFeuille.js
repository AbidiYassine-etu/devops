import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import ValidateFeuilleMain from '../main/validateFeuilleMain';
const ValidateFeuille = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <ValidateFeuilleMain />
            </main>
        </>
    );
};

export default ValidateFeuille;