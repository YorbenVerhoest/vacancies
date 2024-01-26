import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../assets/css/Navigation.scss"
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import StoreIcon from '@mui/icons-material/Store';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const Navigation = (props) => {

    const [activeMenu, setActiveMenu] = useState(window.location.pathname)
    const [closeMenu, setCloseMenu] = useState(false)

    return (
        <section id="navigation" className={closeMenu ? `S` : `L`}>
            <div className="menu pt-6">
                <MenuIcon onClick={() => setCloseMenu(!closeMenu)} /> <h1>Vacancies</h1>
            </div>
            <div className="devider"><span>Main menu</span></div>
            <ul>
                <Link title="Dashboard" onClick={() => setActiveMenu('/')} className={activeMenu === '/' ? 'active' : ''} to="/"><li><HomeIcon /> <span>Dashboard</span></li></Link>
                <Link title="Vacancies" onClick={() => setActiveMenu('/vacancies')} className={activeMenu === '/vacancies' ? 'active' : ''} to="/vacancies"><li><MailIcon /> <span>Vacancies</span></li></Link>
                <Link title="Companies" onClick={() => setActiveMenu('/companies')} className={activeMenu === '/companies' ? 'active' : ''} to="/companies"><li><StoreIcon /> <span>Companies</span></li></Link>
            </ul>
            <div className="devider"><span>Usefull links</span></div>
            <ul>
                <a rel="noreferrer" title="LinkedIn" target="_blank" href="https://www.linkedin.com/in/yorben-verhoest/"><li><LinkedInIcon /> <span>LinkedIn</span></li></a>
                <a rel="noreferrer" title="Github" target="_blank" href="https://github.com/YorbenVerhoest"><li><GitHubIcon /> <span>GitHub</span></li></a>
                <a rel="noreferrer" title="Resume" target="_blank" href={require('../assets/cv.pdf')}><li><FilePresentIcon /> <span>Resume</span></li></a>
            </ul>

        </section>
    );
}

export default Navigation;
