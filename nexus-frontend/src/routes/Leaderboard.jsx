import { SiCodechef } from "react-icons/si";
import { GrResume } from "react-icons/gr";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchChallengesData } from "../services/challengeServices";
import { Button } from "@chakra-ui/react";
import { fetchUserData } from "../services/userServices";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


const Leaderboard = () => {
    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
    const apiKey = import.meta.env.VITE_API_KEY;
    const [challengesData, setChallengesData] = useState([]);
    const [userData, setUserData] = useState({});
    const [isGeneratingResult, setIsGeneratingResult] = useState(false);

    useEffect(() => {
        fetchUserData().then((data) => {
            if (data) {
                setUserData(data);
            }
        });
    }, []);


    useEffect(() => {
        fetchChallengesData().then((data) => {
            if (data) {
                setChallengesData(data);
            }
        });
    }, []);

    const handleGenerateStarterResult = async () => {
        setIsGeneratingResult(true);
        const contestName = challengesData[0].name;

        try {
            const res = await axios.get(`${backendUrl}/api/contests/codechef/generate/allwinners/${contestName}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            if (res.status === 200) {
                console.log(res);
                console.log("Result Generated");
                toast({
                    title: "Result Generated",
                    description: "Result generated successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.error("Failed to generate result. Unexpected status:", res.status);
                toast({
                    title: "Error",
                    description: "Failed to generate result",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Error generating result",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsGeneratingResult(false);
        }
    };


    return (
        <div className="flex flex-col justify-around space-y-5">
            {challengesData.map((challenge, index) => (
                <div key={index} className="flex items-center justify-between border border-zinc-700 rounded-xl p-5 bg-zinc-900/10">
                    <div className="flex items-center">
                        <SiCodechef className="text-7xl text-codechef" />
                        <h2 className="text-lg font-semibold text-gray-400 ml-2">{challenge.name}</h2>
                    </div>
                    <div className="flex space-x-3">
                        {challenge.platform.toLowerCase().split(' ')[0] === "codechef" && (
                            <>
                                {userData.role === "admin" && (
                                    <Button
                                        isLoading={isGeneratingResult}
                                        loadingText='Generating Result'
                                        colorScheme='gray'
                                        spinnerPlacement='start'
                                        onClick={handleGenerateStarterResult}
                                    >
                                        Generate Result
                                        <GrResume className="ml-2" />
                                    </Button>
                                )}
                                <Link
                                    to={`/leaderboard/${challenge.name.toLowerCase().split(' ')[0]}`}
                                    className="flex justify-end items-center bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    View Results
                                    <AiOutlineArrowRight className="ml-2" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Leaderboard
