import { useEffect, useState } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Avatar,
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineSettings } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { fetchUserData } from '../../../services/userServices';

const Profile = () => {
    const [userData, setUserData] = useState({});

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/signup';
    };

    useEffect(() => {
        fetchUserData().then(data => {
            if (data) {
                setUserData(data);
            }
        });
    }, []);

    return (
        <div>
            <Menu>
                <MenuButton as={Avatar} size="sm" cursor={'pointer'} src={userData.userImg} />
                <MenuList sx={{ backgroundColor: 'black' }}>
                    <MenuGroup title={userData.username}>
                        <Link to="/profile">
                            <MenuItem sx={{ backgroundColor: 'black', _hover: { bg: 'zinc.800' } }}>
                                <BsFillPersonFill className="text-xl mx-2" /> Profile
                            </MenuItem>
                        </Link>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Help'>
                        <Link to="/settings">
                            <MenuItem sx={{ backgroundColor: 'black', _hover: { bg: 'zinc.800' } }}>
                                <MdOutlineSettings className="text-xl mx-2" /> Settings
                            </MenuItem>
                        </Link>
                        <MenuItem sx={{ backgroundColor: 'black', _hover: { bg: 'zinc.800' } }} onClick={handleSignOut}>
                            <AiOutlineLogout className="text-xl mx-2 text-red-500" /> Sign Out
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Profile;
