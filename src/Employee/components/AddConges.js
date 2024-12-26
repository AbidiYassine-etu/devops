import React from "react";
import Sidebar from "./sidebar"
import Header from "./Header"
import AddCongesMain from "../main/addCongesMain";

const AddConges = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddCongesMain />
            </main>
        </>
    );
};

export default AddConges;