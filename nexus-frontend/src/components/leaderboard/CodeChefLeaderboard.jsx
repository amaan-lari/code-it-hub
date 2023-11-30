import { Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const CodeChefLeaderboard = () => {
  return (
    <div>
      <Tabs isFitted>
        <TabList className="flex justify-between">
          <Tab><AiFillStar /></Tab>
          <Tab><AiFillStar /><AiFillStar /></Tab>
          <Tab isDisabled><AiFillStar /><AiFillStar /><AiFillStar /></Tab>
          <Tab isDisabled><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr >
                    <Th>library Id</Th>
                    <Th>Name</Th>
                    <Th>Branch</Th>
                    <Th>codechef Id</Th>
                    <Th isNumeric>Contest Rank</Th>
                    <Th isNumeric>Roll No</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* <Tr>
                    <Td>2125csai1066</Td>
                    <Td>Harsh</Td>
                    <Td>CSE(AI)</Td>
                    <Td>hrsh_kshri</Td>
                    <Td isNumeric>1244</Td>
                    <Td isNumeric>2100291520026</Td>
                  </Tr> */}
                 
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
          <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr >
                    <Th>library Id</Th>
                    <Th>Name</Th>
                    <Th>Branch</Th>
                    <Th>codechef Id</Th>
                    <Th isNumeric>Contest Rank</Th>
                    <Th isNumeric>Roll No</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {/* <Tr>
                    <Td>2125csai1066</Td>
                    <Td>Harsh</Td>
                    <Td>CSE(AI)</Td>
                    <Td>hrsh_kshri</Td>
                    <Td isNumeric>1244</Td>
                    <Td isNumeric>2100291520026</Td>
                  </Tr> */}
                 
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CodeChefLeaderboard;
