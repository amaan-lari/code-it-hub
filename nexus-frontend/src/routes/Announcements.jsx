import { useEffect, useState } from "react";
import Announcement from "../components/announcement/Announcement";
import { fetchAnnouncementsData } from "../services/announcementServices";
import { fetchUserData } from "../services/userServices";
import { IoAddCircle } from "react-icons/io5";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Announcements = () => {
  const toast = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [announcementName, setAnnouncementName] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchAnnouncementsData().then((data) => {
      if (data) {
        setAnnouncements(data);
      }
    });
  }, []);

  useEffect(() => {
    fetchUserData().then((data) => {
      if (data) {
        setUserData(data);
      }
    });
  }, []);

  const handleAnnouncementUpdate = (updatedAnnouncement) => {
    setAnnouncements(announcements.map(announcement => {
      if (announcement._id === updatedAnnouncement._id) {
        return updatedAnnouncement;
      }
      return announcement;
    }));
  };

  const handleAdd = () => {
    setIsAdding(true);
  }

  const handleCancel = () => {
    setIsAdding(false);
  }

  const handleUpdate = async () => {
    if (!description.trim() && !priority.trim() && !announcementName.trim()) {
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
      const response = await axios.post(`${backendUrl}/api/announcements`, {
        description: description,
        priority: priority,
        name: announcementName
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (response.status === 200) {
        const newAnnouncement = response.data;
        setAnnouncements([...announcements, newAnnouncement]);
        setIsAdding(false);
        setDescription("");
        setPriority("");
        setAnnouncementName("");

        toast({
          title: "Success",
          description: "Announcement added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "There was an error adding the announcement.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error adding announcement:', error.response || error.message);
    }
  };

  return (
    <div className="p-2 flex flex-col space-y-5">
      {userData.role === "admin" && (
        <>
          {isAdding ? (
            <>
              <textarea
                placeholder="Announcement Name"
                onChange={(e) => setAnnouncementName(e.target.value)}
                className="flex-grow h-10 min-h-[2rem] bg-zinc-700 text-white p-2 rounded"
              />
              <textarea
                placeholder="Announcement Description"
                onChange={(e) => setDescription(e.target.value)}
                className="flex-grow h-32 min-h-[8rem] bg-zinc-700 text-white p-2 rounded"
              />
              <div>
                <div className="mb-4">
                  <select
                    className="shadow appearance-none border border-gray-700 hover:border-gray-400 rounded w-full py-2 px-3 text-white leading-tight bg-neutral-900 focus:outline-none focus:shadow-outline"
                    name="branch"
                    placeholder="Branch"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Priority
                    </option>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                  </select>
                </div>
              </div>
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
            </>
          ) : (
            <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-900/10 hover:bg-zinc-800/20 hover:cursor-pointer flex justify-between items-center">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-bold">New Announcement</h1>
                  <button
                    onClick={handleAdd}
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                  >
                    Add<IoAddCircle className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {announcements.map((announcement) => (
        <Announcement
          key={announcement._id}
          announcement={announcement}
          role={userData.role}
          onUpdate={handleAnnouncementUpdate}
        />
      ))}
    </div>
  );
};

export default Announcements;
