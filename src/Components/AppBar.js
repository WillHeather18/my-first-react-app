import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { ProfileCircle } from './ProfileCircle';
import { HamburgerMenu} from './HamburgerMenu';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import "../styles/AppBar.css"

function AppBar({ transparent }) {
    const appBarClass = transparent ? 'app-bar-transparent' : '';
    const { isAuthenticated } = useContext(AuthContext);
    const strokeColor = transparent ? '#f5f5f5' : '#292D32';
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      console.log("clicked")
        setSidebarOpen(!isSidebarOpen);
        console.log(isSidebarOpen)
    };

    return (
            <nav className={`app-bar ${appBarClass}`}>
              <HamburgerMenu strokeColor={strokeColor} onClick={toggleSidebar} />
              <div className="left-items">
              <Link to="/">
              <h1 className="title">Bibliobox</h1>
              </Link>
              <div className="nav-links">
                  {isAuthenticated && (
                        <button className='dashboard-button'>
                            <Link to="/dashboard">Your Plan</Link>
                        </button>
                  )}
                  <button>
                    <Link to="/ourboxes">Our Boxes</Link>
                  </button>
                  <button>
                    <Link to="/aboutus">Contact</Link>
                  </button>
                </div>
              </div>
              <div className="profile-icon">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <ProfileCircle strokeColor={strokeColor} />
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className='login-button'>
                      Login
                    </button>
                  </Link>
                )}
              </div>
              <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </nav>
    );
  }

    export default AppBar;