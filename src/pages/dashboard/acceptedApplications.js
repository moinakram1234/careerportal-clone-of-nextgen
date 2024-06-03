import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxDropdownMenu } from "react-icons/rx";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import {
  Box,
  Input,
  ChakraProvider,
  extendTheme,

  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import BaseLayout from "@/admincomponents/BaseLayout";
import {
  Request_To_Reject_application,
  deleteData_application,
  fetchData_application,
} from "@/server_requests/client_requests";
import Link from "next/link";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";
import ReactModal from "react-modal"; // Import the react-modal library
import headers from "@/Data/Applicationheader";
import {

  DeleteIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import { BiFilter } from "react-icons/bi";
import AppFilters from "@/admincomponents/admindashbord/app_filters";
import { FcCancel, FcOk } from "react-icons/fc";


const ViewallApplications = () => {
  const [applications, setApplications] = useState(null);
  const [App_Data,SetApp_Data]=useState(null)
  const [isValidToken, setIsValidToken] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalContentType, setModalContentType] = useState("");
  const [expandedEmailId, setExpandedEmailId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  const redirectToHome = () => router.push("/");
  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token is not present, redirect to home
      redirectToHome();
      return;
    }

    const tokenparse = parseJwt(token);

    if (!tokenparse || tokenparse.isadmin === undefined) {
      // Token parsing failed or isadmin property is not present, redirect to home
      redirectToHome();
      return;
    }

    if (tokenparse.isadmin === false) {
      // User is not an admin, redirect to home
      redirectToHome();
      return;
    }
    if (isTokenExpired(token)) {
      // Token is expired, remove it and redirect to home
      localStorage.removeItem("token");
      console.log(token);
      setIsValidToken(false);
      redirectToHome();
    } else {
      // Token is valid, update state
      setIsValidToken(true);
    }
  };
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };
  useEffect(() => { if (typeof document !== 'undefined') {
    checkTokenExpiration();
    const loadData = async () => {
      try {
        const data = await fetchData_application();
        if (data) {
          setIsLoading(false);
        }
        const filteredJobApplications = data.filter(
          (jobApplication) => jobApplication.status !== "deleted" && jobApplication.ApprovalStatus === "accepted"
        );
        SetApp_Data(filteredJobApplications)
        setApplications(filteredJobApplications);

      } catch (error) {
        // Handle the error appropriately
        console.error("Error loading data:", error);
      }
    };

    loadData();}
  }, []);
  const deleteApplication = async (applicationId, path) => {
    await deleteData_application(applicationId, path);
    // After deletion, refresh the list of applications
    const updatedApplications = applications.filter(
      (app) => app._id !== applicationId
    );
    setApplications(updatedApplications);
  };

  const AcceptApplication = async (applicationId,email) => {
    const data = {
      ApprovalStatus: "accepted",
    };
  };
  const RejectApplication = async (applicationId,email) => {

    await Request_To_Reject_application(applicationId, email);
    toast.success("Application rejected successfully");
    // After deletion, refresh the list of applications
    const updatedApplications = applications.filter(
      (app) => app._id !== applicationId
    );
 
    SetApp_Data(updatedApplications)
  };

  const openModal = (content, contentType) => {
    setModalContent(content);
    setModalContentType(contentType);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent("");
    setModalContentType("");
  };
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "white",
        },
      },
    },
  });
  return (
    <div className="pt-5" >
      {isValidToken === true ? (
       <div>
      
          <div>
           <BaseLayout>
    
       <ChakraProvider theme={theme} >
         <Box p={8} >
           <div className="w-full sm:w-1/2 md:w-2/4 lg:w-2/5 xl:w-1/3">
             <Input
               placeholder="Search position..."
               mb={4}
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
             />
           </div>
           <div className="pt-5 pb-10 flex gap-2">
            <BiFilter size={30}/>
            <AppFilters
        applications={applications}
        SetApp_Data={SetApp_Data}
        isLoading={setIsLoading}
      />
</div>
{isLoading ? (
        <div className="w-full h-[80vh]  flex justify-center items-center">
        <div className="filterloading "></div>
       </div>
        ) : (
          <div className="overflow-auto w-[60%] ">
          <TableContainer >
             <Table  >
               <Thead className="bg-[#FFC83D]  border" style={{ borderRadius: "20px" }} >
                 <Tr>
                   {headers.map((header, index) => (
                     <Th className="text-xm" key={index}>
                       {header}
                     </Th>
                   ))}
                 </Tr>
               </Thead>
               <Tbody>
                 {(searchInput
                   ? App_Data != null
                     ? App_Data.filter(
                         (app) =>
                           app.jobpostApp[0]?.jobTitle &&
                           app.jobpostApp[0]?.jobTitle
                             .toLowerCase()
                             .includes(searchInput.toLowerCase())
                       )
                     : []
                   : App_Data != null
                   ? App_Data
                   : []
                 ).map((data, id) => (
                      <Tr key={id} className="border">
                           <Td >
                          <Menu>
                            <IconButton
                              as={MenuButton}
                              aria-label="Options"
                              icon={<RxDropdownMenu size={25} />}
                       
                              variant="unstyled"
                              _focus={{ outline: "none" }}

                            />
                            <MenuList>
                              <MenuItem>
                                <Link href={`${data.cv}`} passHref>
                                  <Icon as={DownloadIcon} w={5} h={5} mr={2} />
                                  Download
                                </Link>
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  deleteApplication(data._id, data.cv)
                                }
                              >
                                <Icon
                                  color="red"
                                  as={DeleteIcon}
                                  w={5}
                                  h={5}
                                  mr={2}
                                />
                                Delete
                              </MenuItem>
                              {/* <MenuItem
                                onClick={() =>
                                  AcceptApplication(data._id,data.email)
                                }
                              >
                                <Icon
                                  color="red"
                                  as={FcOk}
                                  w={5}
                                  h={5}
                                  mr={2}
                                />
                               Accept Application
                              </MenuItem> */}
                           
                              {/* <MenuItem
                                onClick={() =>
                                  RejectApplication_With_Message(data._id,data.email)
                                }
                              >
                                <Icon
                                  color="red"
                                  as={FcCancel}
                                  w={5}
                                  h={5}
                                  mr={2}
                                />
                               Reject Application With Message 
                              </MenuItem> */}
                            </MenuList>
                          </Menu>
                        </Td>
                        <Td >{data.fullName}</Td>
                        <Td >
                          {data.email.length > 10 ? (
                            <>
                              {expandedEmailId === data._id ? (
                                data.email
                              ) : (
                                <>
                                  {`${data.email.substring(0, 10)}...`}
                                  <button
                                    onClick={() =>
                                      openModal(data.email, "email")
                                    }
                                    className="text-amber-400 ml-2 "
                                  >
                                    View Full
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            data.email
                          )}
                        </Td>
                        <Td >{data.phone}</Td>
                        <Td >
                          {data.jobpostApp[0] ? (
                            <div>{data.jobpostApp[0].jobTitle}</div>
                          ) : (
                            "Post deleted....."
                          )}
                        </Td>
                        <Td >{data.address}</Td>
                        <Td >{data.selectedDepartment}</Td>

                        <Td>
                          <div className="flex items-center">
                            {data.qualification.length > 2 ? (
                              <>
                                {expandedEmailId === data._id ? (
                                  data.qualification
                                ) : (
                                  <>
                                    {`${data.qualification.substring(0, 2)}...`}
                                    <button
                                      onClick={() =>
                                        openModal(
                                          data.qualification,
                                          "qualification"
                                        )
                                      }
                                      className="text-amber-400 ml-2 "
                                    >
                                      View Full
                                    </button>
                                  </>
                                )}
                              </>
                            ) : (
                              data.qualification
                            )}
                          </div>
                        </Td>
                      <Td>
                        {data.experience}
                      </Td>
                      <Td>
                        {data.experiencerange[0]} to {data.experiencerange[1]}
                      </Td>
                      <Td>
                        {data.countryorregion}
                      </Td>
                      <Td>
                        {data.city}
                      </Td>
                      <Td>
                        {data.stateorprovince}
                      </Td>
                      <Td>
                        {data.zipcode}
                      </Td>
                      <Td>
                        {formatCreatedAt(data.createdAt)}
                      </Td>
                      </Tr>
                 ))}
                 </Tbody>
               </Table>
             </TableContainer> 

          </div>    )}
           </Box>
         </ChakraProvider>
      
       </BaseLayout>
          </div>
       
       </div>
      ) : (
        <p>session expired</p>
      )}
      <ReactModal
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
          content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "30%",
            width: "30%",
            textAlign: "center",
            marginLeft: "30%",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Full Content Modal"
        ariaHideApp={false}
      >
        <div>
          <p>
            {modalContentType === "email" ? "Email: " : "Qualification: "}
            {modalContent}
          </p>
        </div>
        <button className="bg-amber-400 py-3 px-10 rounded" onClick={closeModal}>
          Close
        </button>
      </ReactModal>
      <ToastContainer />
    </div>
  );
};
export default ViewallApplications;
