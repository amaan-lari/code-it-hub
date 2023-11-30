import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCalendar, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";

const Announcement = ({ announcement, role, onUpdate }) => {
    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";
    const apiKey = import.meta.env.VITE_API_KEY;
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(announcement.description);
    const updatedAt = new Date(announcement.updatedAt);
    const formattedDate = `${updatedAt.toLocaleDateString()}`;

    const priorityIcon =
        announcement.priority === "high"
            ? <FcHighPriority className="text-3xl" />
            : announcement.priority === "medium"
                ? <FcMediumPriority className="text-3xl" />
                : <FcLowPriority className="text-3xl" />;

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setDescription(announcement.description);
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
            const response = await axios.put(`${backendUrl}/api/announcements/${announcement._id}`, {
                description: description
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (response.status === 200) {
                const updatedAnnouncement = response.data;
                onUpdate(updatedAnnouncement);
                setIsEditing(false);

                toast({
                    title: "Success",
                    description: "Announcement updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "There was an error updating the announcement.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error('Error updating announcement:', error.response || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/api/announcements/${announcement._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (response.status === 200) {
                const deletedAnnouncement = response.data;
                onUpdate(deletedAnnouncement);
                
                toast({
                    title: "Success",
                    description: "Announcement deleted successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "There was an error deleting the announcement.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error('Error deleting announcement:', error.response || error.message);
        }
    }


    return (
        <div className="border border-zinc-700 rounded-xl p-5 bg-zinc-900/10 hover:bg-zinc-800/20 hover:cursor-pointer flex justify-between items-center">
            <div className="flex flex-col space-y-3 w-full">
                {priorityIcon}
                <h2 className="text-lg font-semibold">{announcement.name}</h2>
                {isEditing ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <p>{announcement.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <AiOutlineCalendar className="text-3xl text-gray-400" />
                                <span className="text-gray-400">{formattedDate}</span>
                            </div>
                            {role === 'admin' && (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                                    >
                                        Edit <AiFillEdit className="ml-2" />
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
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

export default Announcement;
