import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import InfoIcon from '@mui/icons-material/Info';
import LogOutButton from '../LogOutButton/LogOutButton';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">MemorEase</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              <HomeIcon />
            </Link>

            <Link className="navLink" to="/list">
              <PhotoLibraryIcon />
            </Link>

            <Link className='navLink' to="/upload">
              <AddAPhotoIcon />
            </Link>
            
          </>
        )}

        <Link className="navLink" to="/about">
          <InfoIcon />
        </Link>

        <LogOutButton className="logOut" />
      </div>
    </div>
  );
}

export default Nav;
