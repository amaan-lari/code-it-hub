import { Avatar, Image, Tag } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { GiPodiumSecond, GiPodiumWinner, GiPodiumThird } from "react-icons/gi";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { fetchUserData } from "../../../services/userServices";

const UserBio = () => {

    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
    const apiKey = import.meta.env.VITE_API_KEY;
    const [userData, setUserData] = useState({});
    const [updatedBio, setUpdatedBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);

    useEffect(() => {
        fetchUserData().then((data) => {
            if (data) {
                setUserData(data);
            }
        });
    }, []);

    const showToast = (status, description) => {
        toast({
            title: status,
            description: description,
            status,
            duration: 3000,
            isClosable: true,
        });
    };

    const handleUpdateBio = async () => {
        if (!updatedBio.trim()) {
            showToast("warning", "The Bio cannot be empty.");
            return;
        }
        try {
            const response = await axios.put(
                `${backendUrl}/api/users/${userData._id}`,
                {
                    bio: updatedBio,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", "Bio updated successfully");
                setIsEditingBio(false);
                setUserData({ ...userData, bio: updatedBio });
            }
        } catch (error) {
            console.error("Error updating Bio", error);
            showToast("error", "Error updating Bio");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex justify-center m-4 p-2">
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    as={Avatar}
                    src={userData.userImg}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mx-3 justify-center items-center flex space-x-4">
                    <Tag>
                        {" "}
                        <GiPodiumSecond className="w-5 h-5" /> 4{" "}
                    </Tag>
                    <Tag>
                        {" "}
                        <GiPodiumWinner className="w-8 h-8" /> 4{" "}
                    </Tag>
                    <Tag>
                        {" "}
                        <GiPodiumThird className="w-5 h-5" /> 4{" "}
                    </Tag>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center mx-1">
                <p className="w-fit mx-2 mt-3 my-2 font-bold text-2xl"> Bio </p>
                {isEditingBio ? (
                    <div className="w-full flex flex-col justify-center items-center">
                        <textarea
                            className="w-full p-2 px-3 h-28 mt-1 shadow appearance-none border border-gray-700 hover:border-gray-400 bg-neutral-900 text-white rounded leading-tight focus:outline-none focus:shadow-outline"
                            name="text"
                            type="text"
                            value={updatedBio}
                            onChange={(e) => setUpdatedBio(e.target.value)}
                        />
                        <button
                            className="w-1/4 mt-1 py-1 bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleUpdateBio}
                        >
                            Update
                        </button>
                        <button
                            className="w-1/4 mt-1 py-1 bg-red-800 hover:bg-red-700 text-white text-xs font-bold rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                                setIsEditingBio(false);
                                setUpdatedBio(userData.bio);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center text-center items-center flex-col">
                        <Tag fontWeight="" colorScheme="" className="mt-4">
                            {userData.bio}.
                        </Tag>
                        <Tag
                            fontWeight="bold"
                            colorScheme="gray"
                            className="w-fit cursor-pointer mx-2 my-2 mt-5"
                            onClick={() => setIsEditingBio(true)}
                        >
                            Edit
                            <AiFillEdit className="w-4 h-4" />
                        </Tag>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserBio
