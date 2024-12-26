import React from "react";
import Sidebar from "../components/sidebar"
import Header from "../components/Header"
import FeuilleTemps from "../components/Feuille";

const Feuille = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <FeuilleTemps />
            </main>
        </>
    );
};

export default Feuille;