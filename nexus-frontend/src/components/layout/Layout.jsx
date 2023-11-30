import LeftSidebar from './sidebar/LeftSidebar';
import MobileNav from './mobileNav/Nav';
import Profile from "./profile/Profile";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/nexus-website-favicon-white.png';
import { fetchUserData } from '../../services/userServices';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';

const Layout = ({ children }) => {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData().then((data) => {
      if (data) {
        setUserData(data);
      }
    });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/signup';
  }

  return (
    <div className="w-full h-screen flex flex-col bg-zinc-950">
      <div className="navbar flex justify-between items-center p-2">
        <Link to="/" className="h-14 w-14 mx-8">
          <img src={logo} alt="Logo" />
        </Link>
        {
          userData.role === "admin" ? (
            <Button
              leftIcon={<AiOutlineLogout className="text-xl mx-2 text-red-500" />}
              colorScheme="blackAlpha"
              variant="solid"
              onClick={handleSignOut}
              className='hover:bg-zinc-800'
            >
              Sign Out
            </Button>
          ) : (
            <Profile />
          )
        }
      </div>
      <div className="h-full w-full flex overflow-hidden">
        <LeftSidebar />
        <div className="w-full h-full p-2 flex flex-col overflow-y-auto scrollbar-none rounded-3xl space-y-10 bg-zinc-900 ">
          {children}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;
