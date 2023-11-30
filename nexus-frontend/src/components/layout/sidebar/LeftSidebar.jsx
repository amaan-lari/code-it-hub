import { Link, useLocation } from 'react-router-dom';
import { AiFillFlag } from "react-icons/ai";
import { MdLeaderboard } from 'react-icons/md';
import { HiSpeakerphone } from 'react-icons/hi';

const LeftSidebar = () => {
    const navLinks = [
        { to: '/challenges', name: 'Challenges', icon: <AiFillFlag className="w-5 h-5 mx-2" /> },
        { to: '/leaderboard', name: 'Leaderboard', icon: <MdLeaderboard className="w-5 h-5 mx-2" /> },
        { to: '/announcement', name: 'Annoucement', icon: <HiSpeakerphone className="w-5 h-5 mx-2" /> },
    ];
    const location = useLocation();

    return (
        <div className="h-full w-1/4 flex flex-col justify-between sm:max-lg:w-1/6 min-[320px]:max-sm:hidden">
            <div className="flex flex-col space-y-5 justify-between my-5">
                {navLinks.map((link) => {
                    const isActive = location.pathname.startsWith(link.to);
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center rounded ${isActive ? 'bg-zinc-700/50' : 'bg-zinc-900/25 hover:bg-zinc-800/40'
                                } font-bold py-2 px-4 mx-5`}
                        >
                            {link.icon}
                            <span className="sm:max-lg:hidden">{link.name}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex flex-col justify-between mt-auto mx-5 mb-3 space-y-5">
            </div>
        </div>
    );
}

export default LeftSidebar;
