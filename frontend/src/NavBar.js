import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({ username, userRole }) => {
  const [headingToggleState, setHeadingToggleState] = useState(false);

  // Use useRef to access DOM elements
  const toggleButtonRef = useRef(null);
  const navItemsRef = useRef(null);
  const headNavigationRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Function to handle nav visibility based on screen size
    const handleNavVisibility = () => {
      if (navItemsRef.current && headNavigationRef.current && headerRef.current && toggleButtonRef.current) {
        if (window.innerWidth > 800) {
          // Always show nav items on larger screens
          navItemsRef.current.classList.add('show');
          headNavigationRef.current.classList.add('justify-content-center');
          headerRef.current.style.padding = '15px 0';
          headerRef.current.style.marginBottom = '15px';
          toggleButtonRef.current.style.display = 'none';
        } else {
          toggleButtonRef.current.style.display = '';
          headNavigationRef.current.classList.remove('justify-content-center');
          if (navItemsRef.current.classList.contains('show')) {
            navItemsRef.current.classList.remove('show');
            headerRef.current.style.padding = '3px 10px';
            headerRef.current.style.marginBottom = '15px';
            setHeadingToggleState(false);
          }
        }
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleNavVisibility);

    // Initial call to handleNavVisibility
    handleNavVisibility();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleNavVisibility);
    };
  }, []);

  // Event handler for toggle button click
  const handleToggleClick = () => {
    if (navItemsRef.current && headerRef.current) {
      if (!headingToggleState) {
        navItemsRef.current.classList.add('show');
        headerRef.current.style.padding = '15px 10px';
        headerRef.current.style.marginBottom = '3px';
        setHeadingToggleState(true);
      } else {
        navItemsRef.current.classList.remove('show');
        headerRef.current.style.padding = '3px 10px';
        headerRef.current.style.marginBottom = '15px';
        setHeadingToggleState(false);
      }
    }
  };

  return (
    <>
      <header id="heading" ref={headerRef}>
        <nav className="headNav" id="headNavElem" ref={headNavigationRef}>
          <button
            id="toggleNav"
            className="hamburger"
            ref={toggleButtonRef}
            onClick={handleToggleClick}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
          <ul id="navItems" ref={navItemsRef}>
            <li><Link to="/" className="currentPageIcon">Home</Link></li>
            <li><Link to="/getInvolved">Get Involved</Link></li>
            <li><Link to="/funZone">Fun Zone</Link></li>
            <li><Link to="/aboutPage">Contact</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
