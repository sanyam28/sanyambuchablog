import React, { useState } from 'react'
import Link from 'next/link';
import { FaBars } from "react-icons/fa";
import Script from 'next/script';

const Navbar = ({user}) => {
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!isOpen);

  return (
    <div>
      <nav className='desktop-nav'>
        <div className="navbar">
          <div className="nav-branding">
            <Link href={'/'}><span className='nav-branding-name'>Sanyam Bucha</span></Link>
          </div>
          <ul>
            <Link href={'/'}><li className="nav-style"><span className='lia'>Home</span></li></Link>
            <Link href={'/blogs'}><li className="nav-style"><span className='lia'>Blogs</span></li></Link>
            {user.value && <Link href={'/admin'}><li className="nav-style"><span className='lia'>Admin</span></li></Link>}
            {!user.value && <Link href={'/admin/login'}><li className="nav-style"><span className='lia'>Login</span></li></Link>}
          </ul>
        </div>
      </nav>
      <nav className='mobile-nav'>
        <div className="navbar">
          <div className="ham"><span className='lia' onClick={toggleMenu}><FaBars/></span></div>
          <div className="nav-branding">
            <Link href={'/'}><span className='nav-branding-name'>Sanyam Bucha</span></Link>
          </div>
          {isOpen && (
            <ul>
              <li className="nav-style cross"><span className='lia' onClick={toggleMenu}>&times;</span></li>
              <Link href={'/'}><li className="nav-style"><span className='lia'>Home</span></li></Link>
              <Link href={'/blogs'}><li className="nav-style"><span className='lia'>Blogs</span></li></Link>
              {user.value && <Link href={'/admin'}><li className="nav-style"><span className='lia'>Admin</span></li></Link>}
              {!user.value && <Link href={'/admin/login'}><li className="nav-style"><span className='lia'>Login</span></li></Link>}
            </ul>
          )}
        </div>
      </nav>
    </div >
  )
}

export default Navbar