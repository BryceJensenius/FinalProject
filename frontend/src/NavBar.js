import React from 'react';

const NavBar = ({ username, userRole }) => {

    // Nav Bar : Only TOggle with smaller screens
    const toggleButton = document.getElementById('toggleNav');
    const navItems = document.getElementById('navItems');
    const headNavigation = document.getElementById('headNavElem');
    const header = document.getElementById('heading');
    let headingToggleState = false;

    toggleButton.addEventListener('click', () => {
        if(!headingToggleState){ // Toggled go untoggle and make smaller
            navItems.classList.add('show');
            header.style.padding = '15px 10px';
            header.style.marginBottom = '3px';
            headingToggleState = true;
        }else{
            navItems.classList.remove('show');
            header.style.padding = '3px 10px';
            header.style.marginBottom = '15px';
            headingToggleState = false;
        }
    });

    function handleNavVisibility() {
        if (window.innerWidth > 800) {
            navItems.classList.add('show');  // Always show nav items on larger screens
            headNavigation.classList.add('justify-content-center');
            header.style.padding = '15px 0';
            header.style.marginBottom = '15px';
            toggleButton.style.display = 'none';
        } else {
            toggleButton.style.display = '';
            headNavigation.classList.remove('justify-content-center');
            if(navItems.classList.contains('show')){ // for larger screen getting shrunk
                navItems.classList.remove('show');
                header.style.padding = '3px 10px';
                header.style.marginBottom = '15px';
                headingToggleState = false;
            }
        }
    }

    window.addEventListener('resize', handleNavVisibility);
    handleNavVisibility();

  return (
    <>
      <header id="heading">
        <nav className="headNav" id="headNavElem">
          <button id="toggleNav" className="hamburger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
          <ul id="navItems">
            <li><a href="./index.html" className="currentPageIcon">Home</a></li>
            <li><a href="./getInvolved.html">Get Involved</a></li>
            <li><a href="./funzone.html">Fun Zone</a></li>
            <li><a href="./about.html">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <div className="title-heading">
            <img src="./images/logo.jpg" className="rounded-circle logo" alt="clubLogo" />
            <h1 className="page-title">Tree Climbing Club</h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default NavBar;
