import React from "react";
import Sidebar from "./sidebar"
import Header from "./Header"
import AddFeuilleMain from "../main/addFeuilleMain";

const AddFeuille = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddFeuilleMain />
            </main>
        </>
    );
};

export default AddFeuille;