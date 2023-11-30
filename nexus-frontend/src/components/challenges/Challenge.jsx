import { useEffect, useState } from "react";
import axios from 'axios';
import { AiFillDelete, AiFillEdit, AiOutlineArrowRight, AiOutlineCalendar } from "react-icons/ai";
import { FaHackerrank } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { SiCodechef } from "react-icons/si";
import { useToast } from "@chakra-ui/react";

const Challenge = ({ challenge, role, onUpdate, userData }) => {
  const toast = useToast();
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
  const apiKey = import.meta.env.VITE_API_KEY;
  const [isEditing, setIsEditing] = useState(false);
  const [challengeName, setChallengeName] = useState(challenge.name);
  const [description, setDescription] = useState(challenge.description);
  const [isCodechefEnrolled, setIsCodechefEnrolled] = useState(false);
  const [isHackerRankEnrolled, setIsHackerRankEnrolled] = useState(false);
  const updatedAt = new Date(challenge.updatedAt);
  const formattedDate = `${updatedAt.toLocaleDateString()}`;

  useEffect(() => {
    const checkCodechefEnrollmentStatus = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/contests/codechef/getuser/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }
        );

        if (response.status === 200) {
          const ResponseData = response.data;
          const isEnrolled = ResponseData.data.isEnrolled;
          setIsCodechefEnrolled(isEnrolled);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) {
      checkCodechefEnrollmentStatus();
    }
  }, [userData, challenge.name]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = async () => {
    setIsEditing(false);
    setDescription(challenge.description);
  };

  const handleUpdate = async () => {

    if (!description.trim()) {
      toast({
        title: "Cannot Update",
        description: "The announcement description cannot be empty.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.put(`${backendUrl}/api/contests/${challenge._id}`, {
        name: challengeName,
        description: description
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (response.status === 200) {
        const updatedChallenge = response.data;
        setDescription(updatedChallenge.description);
        onUpdate(updatedChallenge);

        toast({
          title: "Success",
          description: "Challenge updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsEditing(false);
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/contests/${challenge._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.status === 200) {
        const deletedChallenge = response.data;
        onUpdate(deletedChallenge);

        toast({
          title: "Success",
          description: "Challenge deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleCodechefEnroll = async () => {

    if (challenge.name === 'CodeChef') {
      try {
        const response = await axios.put(
          `${backendUrl}/api/contests/codechef/enroll/${userData._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            },
          }
        );

        if (response.status === 200) {
          setIsCodechefEnrolled(true);
          toast({
            title: "Success",
            description: "Challenge enrolled successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else if (challenge.name === 'HackerRank') {
      console.log('HackerRank');
    }
  }

  return (
    <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-900/10 hover:bg-zinc-800/20 hover:cursor-pointer flex justify-between items-center space-x-5">
      <div className="w-full flex flex-col space-y-3">
        {challenge.platform === "CodeChef" ? (
          <SiCodechef className="text-6xl" />
        ) : challenge.platform === "HackerRank" ? (
          <FaHackerrank className="text-6xl" />
        ) : (
          <div>Default Logo</div>
        )}
        {isEditing ? (
          <div className="flex flex-col space-y-3">
            <textarea
            value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              className="flex-grow h-10 min-h-[2rem] bg-zinc-700 text-white p-2 rounded"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-grow h-32 min-h-[8rem] bg-zinc-700 text-white p-2 rounded"
            />
            <div className="flex justify-start space-x-3 mt-2">
              <button
                onClick={handleUpdate}
                className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">{challenge.name}</h2>
            <p>{challenge.description}</p>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 mt-2">
                <MdGroups2 className="text-3xl text-gray-400" />
                <span className="text-gray-400">{challenge.totalParticipant}</span>
                <AiOutlineCalendar className="text-3xl text-gray-400" />
                <span className="text-gray-400">{formattedDate}</span>
              </div>
              {role !== 'admin' && (
                <>
                  {challenge.platform === 'CodeChef' && (
                    <button
                      onClick={handleCodechefEnroll}
                      className="flex items-center bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                      disabled={isCodechefEnrolled}
                    >
                      {isCodechefEnrolled ? 'Enrolled' : 'Enroll'} <AiOutlineArrowRight className="ml-2" />
                    </button>
                  )}
                  {challenge.platform === 'HackerRank' && (
                    <button
                      className="flex items-center bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                      {isHackerRankEnrolled ? 'Enrolled' : 'Enroll'} <AiOutlineArrowRight className="ml-2" />
                    </button>
                  )}
                </>
              )}
              {role === 'admin' && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleEdit}
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    Edit <AiFillEdit className="ml-2" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    Delete <AiFillDelete className="ml-2" />
                  </button>
                </div>
              )}
            </div>
          </>

        )}
      </div>
    </div>
  );
};

export default Challenge;
