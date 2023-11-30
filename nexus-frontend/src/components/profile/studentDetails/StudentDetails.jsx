// StudentDetails.js
import { Tag } from "@chakra-ui/react";

function StudentDetails({ label, value }) {
    return (
        <Tag
            fontWeight="bold"
            colorScheme="gray"
            sx={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid grey",
                width: "100%",
                padding: "13px",
                overflow: "auto",
            }}
        >
            {value}
        </Tag>
    );
}

export default StudentDetails;
