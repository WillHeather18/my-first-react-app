import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProfileCircle } from './ProfileCircle';
import { AuthContext } from '../context/Authcontext';

function Sidebar({ isSidebarOpen, toggleSidebar, strokeColor }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-links">
                    <button>
                        <Link to="/ourboxes">Our Boxes</Link>
                    </button>
                    <button>
                        <Link to="/aboutus">Contact</Link>
                    </button>
                </div>
                <div className="sidebar-footer">
                    {isAuthenticated ? (
                        <Link to="/profile">
                            <ProfileCircle strokeColor='#f5f5f5' />
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className='login-button-sidebar'>
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sidebar;