import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux'; // Correct import statement for useDispatch

import { firebaseAuth } from '../Utils/firebase-config';
import { searchMovies } from '../../Store/store';

const Navbar = ({ isScrolled }) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            dispatch(searchMovies(searchQuery));
        }
    };

    const links = [
        { name: "Home", link: '/' },
        { name: "Series", link: '/series' },
        { name: "Movies", link: '/movies' },
        { name: "My List", link: '/mylist' },
    ];

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
    });

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="navbar-brand">
                <img src={logo} alt="Netflix Logo" className="logo" />
            </div>
            <ul className="navbar-links">
                {links.map((linkItem) => (
                    <li key={linkItem.name}>
                        <Link to={linkItem.link}>{linkItem.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="navbar-actions">
                <div className={`search-bar ${showSearch ? "active" : ""}`}>
                    <input 
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => setShowSearch(false)}
                        onMouseEnter={() => setInputHover(true)}
                        onMouseLeave={() => setInputHover(false)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                    <button onClick={handleSearch} className="search-icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <div className="icon-container">
                    <button className="logout-button" onClick={() => signOut(firebaseAuth)}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
