import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import AddEmployeeMain from '../main/addEmployeeMain';

const AddEmployee = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddEmployeeMain />
            </main>
        </>
    );
};

export default AddEmployee;