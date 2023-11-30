import StudentDetails from "./StudentDetails";
import { fetchUserData } from '../../../services/userServices';
import { useEffect, useState } from "react";


function StudentDetailsSection() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchUserData().then((data) => {
            if (data) {
                setUserData(data);
            }
        });
    }, []);

    return (
        <div className="w-full px-3 py-4 flex flex-col justify-between space-y-3 mx-1">
            <h1 className="font-bold mb-4 text-3xl">Student Details</h1>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
                <StudentDetails label="Username" value={userData.username} />
                <StudentDetails label="Email" value={userData.email} />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
                <StudentDetails label="Library ID" value={userData.libId} />
                <StudentDetails label="Branch" value={userData.branch} />
            </div>
        </div>
    );
}

export default StudentDetailsSection;
