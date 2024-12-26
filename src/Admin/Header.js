import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import $ from "jquery";

const Header = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState(false);

    // Logout function
    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
    };

    // Connect to WebSocket server
    useEffect(() => {
        const socket = new SockJS("http://localhost:8082/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/notifications", (message) => {
                const notification = JSON.parse(message.body);
                console.log(notification)
                setNotifications((prev) => [notification, ...prev]);
                setNewNotification(true); // Indicate there's a new notification
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    useEffect(() => {
        $("[data-trigger]").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var offcanvas_id = $(this).attr("data-trigger");
            $(offcanvas_id).toggleClass("show");
        });

        $(".btn-aside-minimize").on("click", function () {
            if (window.innerWidth < 768) {
                $("body").removeClass("aside-mini");
                $(".navbar-aside").removeClass("show");
            } else {
                // minimize sidebar on desktop
                $("body").toggleClass("aside-mini");
            }
        });
    }, []);

    // Handle bell icon click
    const handleBellClick = () => {
        // This will show notifications and reset the newNotification flag
        setNewNotification(false);
    };

    return (
        <header className="main-header navbar">
                        <div className="col-search">
                <form className="searchform">
                    <div className="input-group">
                        <input
                            list="search_terms"
                            type="text"
                            className="form-control"
                            placeholder="Search term"
                        />
                        <button className="btn btn-light bg" type="button">
                            <i className="far fa-search"></i>
                        </button>
                    </div>
                    <datalist id="search-terms">
                        <option value="Products" />
                        <option value="New orders" />
                        <option value="Apple iphone" />
                        <option value="Ahmed Hassan" />
                    </datalist>
                </form>
            </div>
            <div className="col-nav">
                <button
                    className="btn btn-icon btn-mobile me-auto"
                    data-trigger="offcanvas_aside"
                >
                    <i className="md-28 fas fa-bars"></i>
                </button>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link btn-icon" title="dark mode" to="#">
                            <i className="fas fa-moon"></i>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <button
                            className="nav-link btn-icon"
                            onClick={handleBellClick}
                            data-bs-toggle="dropdown"
                        >
                            <i className="fas fa-bell"></i>
                            {newNotification && <span className="notification-dot"></span>}
                        </button>
                        <div className="dropdown-menu drop-menu-end notifications-dropdown">
                            {notifications.length === 0 ? (
                                <div className="notification-item">No notifications</div>
                            ) : (
                                notifications.map((notification, index) => (
                                    <div key={index} className="notification-item">
                                        {notification.message}
                                    </div>
                                ))
                            )}
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link btn-icon" to="#">
                            English
                        </Link>
                    </li>
                    <li className="dropdown nav-item">
                        <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                            <img
                                className="img-xs rounded-circle"
                                src="/images/black.png"
                                alt="User"
                            />
                        </Link>
                        <div className="dropdown-menu drop-menu-end">
                            <Link className="dropdown-item" to="/editprofile">
                                My profile
                            </Link>
                            <button
                                className="dropdown-item text-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
