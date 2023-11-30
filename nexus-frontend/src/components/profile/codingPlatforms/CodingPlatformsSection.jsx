import { useEffect, useState } from 'react';
import { fetchUserData } from '../../../services/userServices';
import { useToast } from '@chakra-ui/react';
import axios from "axios";

const CodingPlatformsSection = () => {

    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
    const apiKey = import.meta.env.VITE_API_KEY;
    const [userData, setUserData] = useState({});
    const [updatedCodeforcesId, setUpdatedCodeforcesId] = useState("");
    const [updatedCodechefId, setUpdatedCodechefId] = useState("");
    const [updatedLeetcodeId, setUpdatedLeetcodeId] = useState("");
    const [updatedGithubId, setUpdatedGithubId] = useState("");

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

    const isValidCodechefId = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/api/contests/codechef/${id}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
            );
            return response.status === 200;
        } catch (error) {
            return false;
        }
    };

    const handleUpdateCodechefId = async () => {
        if (!updatedCodechefId.trim()) {
            showToast("warning", "The Codechef ID cannot be empty.");
            return;
        }

        const isValid = await isValidCodechefId(updatedCodechefId);

        if (!isValid) {
            showToast("error", "The Codechef ID is invalid.");
            return;
        }

        try {
            const response = await axios.put(`${backendUrl}/api/users/${userData._id}`, {
                codechefId: updatedCodechefId,
            }, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
            );

            if (response.status === 200) {
                showToast("success", "Codechef ID updated successfully");
                setUserData({ ...userData, codechefId: updatedCodechefId });
            }
        } catch (error) {
            console.error("Error updating Codechef ID", error);
            showToast("error", "Error updating Codechef ID");
        }
    };

    const updateCodechefProfile = async () => {

        const isValid = await isValidCodechefId(updatedCodechefId);

        if (!isValid) {
            showToast("error", "The Codechef ID is invalid.");
            return;
        }

        try {
            const response = await axios.put(
                `${backendUrl}/api/contests/codechef/${userData._id}`,
                {
                    codechefId: updatedCodechefId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", "Codechef Profile updated successfully");
                setUserData({ ...userData, codechefId: updatedCodechefId });
            }
        } catch (error) {
            console.error("Error updating Codechef Profile", error);
            showToast("error", "Error updating Codechef Profile");
        }
    };

    const handleUpdateCodeforcesId = async () => {
        if (!updatedCodeforcesId.trim()) {
            showToast("warning", "The Codeforces ID cannot be empty.");
            return;
        }
        try {
            const response = await axios.put(
                `${backendUrl}/api/users/${userData._id}`,
                {
                    codeforcesId: updatedCodeforcesId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", "Codeforces ID updated successfully");
                setUserData({ ...userData, codeforcesId: updatedCodeforcesId });
            } else {
                console.error(
                    "Codeforces ID update failed with status:",
                    response.status
                );
                showToast("error", "Codeforces ID update failed");
            }
        } catch (error) {
            console.error("Error updating Codeforces ID:", error);
            showToast("error", "Error updating Codeforces ID");
        }
    };

    // const isValidLeetcodeId = async (id) => {

    //   try {
    //     const response = await axios.get(`https://leetcode.com/${id}/`);

    //     return response.status === 200;
    //   } catch (error) {
    //     return false;
    //   }
    // };

    const handleUpdateLeetcodeId = async () => {
        if (!updatedLeetcodeId.trim()) {
            showToast("warning", "The Leetcode ID cannot be empty.");
            return;
        }

        // const isValid = await isValidLeetcodeId(updatedLeetcodeId);

        // if (!isValid) {
        //   showToast("error", "The Leetcode ID is invalid.");
        //   return;
        // }

        try {
            const response = await axios.put(
                `${backendUrl}/api/users/${userData._id}`,
                {
                    leetcodeId: updatedLeetcodeId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", "Leetcode ID updated successfully");
                setUserData({ ...userData, leetcodeId: updatedLeetcodeId });
            }
        } catch (error) {
            console.error("Error updating Leetcode ID", error);
            showToast("error", "Error updating Leetcode ID");
        }
    };

    // const isValidGithubId = async (id) => {
    //   try {
    //     const response = await axios.get(`https://www.github.com/${id}`);

    //     return response.status === 200;
    //   } catch (error) {
    //     return false;
    //   }
    // };


    const handleUpdateGithubId = async () => {
        if (!updatedGithubId.trim()) {
            showToast("warning", "The Github ID cannot be empty.");
            return;
        }

        // const isValid = await isValidGithubId(updatedGithubId);

        // if (!isValid) {
        //   showToast("error", "The Github ID is invalid.");
        //   return;
        // }

        try {
            const response = await axios.put(
                `${backendUrl}/api/users/${userData._id}`,
                {
                    githubId: updatedGithubId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.status === 200) {
                showToast("success", "Github ID updated successfully");
                setUserData({ ...userData, githubId: updatedGithubId });
            }
        } catch (error) {
            console.error("Error updating Github ID", error);
            showToast("error", "Error updating Github ID");
        }
    };

    return (
        <div className="w-full flex flex-col  px-3 py-4">
            <h1 className="font-bold text-3xl">Coding Platforms</h1>
            <div className="flex mt-5 flex-col md:flex-row ">
                <div className="w-full md:w-1/2  flex flex-col justify-center ">
                    {userData.codechefId ? (
                        <div
                            className="md:w-[95%] w-full"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                                border: "1px solid grey",
                                padding: "10px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p>{userData.codechefId}</p>
                            <button
                                className="font-bold px-2 cursor-auto"
                                style={{
                                    backgroundColor: "#fafec1",
                                    color: "#81481a",
                                    borderRadius: "2px",
                                    fontSize: "10px",
                                }}
                            >
                                CodeChef
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col justify-center">
                            <div className="w-full md:!w-[95%] relative flex items-center">
                                <svg
                                    type="button"
                                    onClick={() => {
                                        handleUpdateCodechefId();
                                        updateCodechefProfile();
                                    }}
                                    className="absolute ml-[90%] cursor-pointer "
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="white"
                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                                    />
                                </svg>
                                <input
                                    className="w-1/2  mt-1 shadow appearance-none border border-gray-700 hover:border-gray-400 bg-neutral-900 text-white rounded leading-tight focus:outline-none focus:shadow-outline"
                                    name="text"
                                    autoComplete="off"
                                    type="text"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid grey",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    value={updatedCodechefId}
                                    placeholder="CodeChef Id"
                                    onChange={(e) => setUpdatedCodechefId(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:w-1/2 w-full mt-2 md:mt-0  flex flex-col justify-center md:items-end">
                    {userData.codeforcesId ? (
                        <div
                            className="md:w-[95%] w-full"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                                border: "1px solid grey",
                                padding: "10px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p>{userData.codeforcesId}</p>
                            <button
                                className="font-bold px-2 cursor-auto"
                                style={{
                                    backgroundColor: "#fafec1",
                                    color: "#81481a",
                                    borderRadius: "2px",
                                    fontSize: "10px",
                                }}
                            >
                                CodeForces
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col justify-center md:items-end">
                            <div className="w-full md:!w-[95%] relative flex items-center">
                                <svg
                                    type="button"
                                    onClick={() => {
                                        handleUpdateCodeforcesId();
                                    }}
                                    className="absolute ml-[90%]  cursor-pointer "
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="white"
                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                                    />
                                </svg>
                                <input
                                    className="w-1/2 mt-1 shadow appearance-none border border-gray-700 hover:border-gray-400 bg-neutral-900 text-white rounded leading-tight focus:outline-none focus:shadow-outline"
                                    name="text"
                                    autoComplete="off"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid grey",
                                        width: "100%",
                                        padding: "11px",
                                    }}
                                    type="text"
                                    value={updatedCodeforcesId}
                                    placeholder="CodeForces Id"
                                    onChange={(e) =>
                                        setUpdatedCodeforcesId(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex mt-2 flex-col md:flex-row">
                <div className="md:w-1/2 w-full flex flex-col justify-center">
                    {userData.leetcodeId ? (
                        <div
                            className="md:w-[95%] w-full"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                                border: "1px solid grey",
                                padding: "10px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p>{userData.leetcodeId}</p>
                            <button
                                className="font-bold px-2 cursor-auto"
                                style={{
                                    backgroundColor: "#fafec1",
                                    color: "#81481a",
                                    borderRadius: "2px",
                                    fontSize: "10px",
                                }}
                            >
                                LeetCode
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col justify-center ">
                            <div className="w-full md:!w-[95%] relative flex items-center ">
                                <svg
                                    type="button"
                                    onClick={() => {
                                        handleUpdateLeetcodeId();
                                    }}
                                    className="absolute ml-[90%]  cursor-pointer "
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="white"
                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                                    />
                                </svg>
                                <input
                                    className="w-1/2 mt-1 shadow appearance-none border border-gray-700 hover:border-gray-400 bg-neutral-900 text-white rounded leading-tight focus:outline-none focus:shadow-outline"
                                    name="text"
                                    type="text"
                                    autoComplete="off"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid grey",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                    value={updatedLeetcodeId}
                                    placeholder="LeetCode Id"
                                    onChange={(e) => setUpdatedLeetcodeId(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 w-full mt-2 md:mt-0  flex flex-col justify-center md:items-end">
                    {userData.githubId ? (
                        <div
                            className="md:w-[95%] w-full"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                                border: "1px solid grey",
                                padding: "10px",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p>{userData.githubId}</p>
                            <button
                                className="font-bold px-2 cursor-auto"
                                style={{
                                    backgroundColor: "#fafec1",
                                    color: "#81481a",
                                    borderRadius: "2px",
                                    fontSize: "10px",
                                }}
                            >
                                GitHub
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col justify-center md:items-end">
                            <div className="w-full md:!w-[95%] relative flex items-center ">
                                <svg
                                    type="button"
                                    onClick={() => {
                                        handleUpdateGithubId();
                                    }}
                                    className="absolute ml-[90%] cursor-pointer "
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="white"
                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                                    />
                                </svg>
                                <input
                                    className="w-1/2 mt-1 shadow appearance-none border border-gray-700 hover:border-gray-400 bg-neutral-900 text-white rounded leading-tight focus:outline-none focus:shadow-outline"
                                    name="text"
                                    type="text"
                                    autoComplete="off"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "1px solid grey",
                                        width: "100%",
                                        padding: "11px",
                                    }}
                                    value={updatedGithubId}
                                    placeholder="GitHub Id"
                                    onChange={(e) => setUpdatedGithubId(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodingPlatformsSection;
