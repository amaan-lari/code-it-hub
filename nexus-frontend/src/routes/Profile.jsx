import { Box, Flex } from "@chakra-ui/react";
import StudentDetailsSection from "../components/profile/studentDetails/StudentDetailsSection"
import CodingPlatformsSection from "../components/profile/codingPlatforms/CodingPlatformsSection";
import UserBio from "../components/profile/userBio/UserBio";

function Profile() {

  return (
    <div>
      <Flex className="md:flex-row flex-col mb-10" color="white">
        <Box
          flex="1"
        >
          <UserBio />
        </Box>
        <Box
          flex="2"
          className="flex space-y-3 flex-col justify-center items-start"
        >
          <StudentDetailsSection />
          <CodingPlatformsSection />
        </Box>
      </Flex>
    </div>
  );
}

export default Profile;
