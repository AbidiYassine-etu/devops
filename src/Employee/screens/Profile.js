import React from "react";
import Sidebar from "../components/sidebar"
import Header from "../components/Header"
import EditProfile from "./editProfile";

const Profile = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditProfile />
            </main>
        </>
    );
};

export default Profile;