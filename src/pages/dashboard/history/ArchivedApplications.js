import React, { useState, useEffect } from "react";
import Modal from "react-modal";
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
  Button,
  Input,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import BaseLayout from "@/admincomponents/BaseLayout";
import {
  deleteData_application,
  fetchData_application,
} from "@/server_requests/client_requests";
import Link from "next/link";
import { BiDownload} from "react-icons/bi";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/components/tokenUtils";
import parseJwt from "@/components/parsetoken";
import ReactModal from "react-modal"; // Import the react-modal library
import headers from "@/Data/Applicationheader";

const ViewallApplications = () => {
  const [applications, setApplications] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalContentType, setModalContentType] = useState("");
  const [expandedEmailId, setExpandedEmailId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const redirectToHome = () => router.push('/');
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

  useEffect(() => {
    checkTokenExpiration();
    const loadData = async () => {
      try {
        const data = await fetchData_application();
        const filteredJobApplications = data.filter(jobApplication => jobApplication.status === "deleted");
        setApplications(filteredJobApplications);
      } catch (error) {
        // Handle the error appropriately
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);
  const deleteApplication = async (applicationId, path) => {
    await deleteData_application(applicationId, path);
    // After deletion, refresh the list of applications
    const updatedApplications = applications.filter(
      (app) => app._id !== applicationId
    );
    setApplications(updatedApplications);
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
    <div>
     {isValidToken === true ? (
        <BaseLayout>
          <ChakraProvider theme={theme}>
            <Box p={8}>
              <div className="w-full sm:w-1/2 md:w-2/4 lg:w-2/5 xl:w-1/3">
                <Input
                  placeholder="Search position..."
                  mb={4}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <TableContainer style={{ width: "95%" }}>
                <Table variant="simple">
                  <Thead
                    className="bg-[#FFC83D]  border"
                    style={{ borderRadius: "20px" }}
                  >
                    <Tr>
                      {headers.map((header, index) => (
                        <Th key={index}>{header}</Th>
                      ))}
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(searchInput
                      ? applications != null
                        ? applications.filter((app) =>
  app.jobpostApp[0]?.jobTitle &&
  app.jobpostApp[0]?.jobTitle.toLowerCase().includes(searchInput.toLowerCase())

                          )
                        : []
                      : applications != null
                      ? applications
                      : []
                    ).map((data, id) => (
                      <Tr key={id} className="border">
                           <Td>{data.fullName}</Td>
                        <Td>
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
                                    className="text-blue-500 ml-2 underline"
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
                        <Td>{data.phone}</Td>
                        <Td>{data.address}</Td>
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
                                      className="text-blue-500 ml-2 underline"
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
                          {data.jobpostApp[0] ? (
                            <div>{data.jobpostApp[0].jobTitle}</div>
                          ) : (
                            "Post deleted....."
                          )}
                        </Td>
                        <Td>
                          <Link href={`${data.cv}`} passHref>
                            <BiDownload />
                          </Link>
                        </Td>
                        <Td>
                          <div className="flex gap-4">
                            <Button
                              onClick={() =>
                                deleteApplication(data._id, data.cv)
                              }
                              colorScheme="red"
                              size="sm"
                            >
                              Delete
                            </Button>
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ChakraProvider>
        </BaseLayout>
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
        <button className="bg-blue-400 py-3 px-10 rounded" onClick={closeModal}>
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default ViewallApplications;


// // Compare this snippet from src/admincomponents/ViewallApplications.js:
// {isValidToken == true ? (
//   <BaseLayout>
//     <div className="min-h-screen bg-slate-100">
//       <div className="flex justify-between px-4 pt-4">
//         <h2 className="text-2xl font-bold">Applications</h2>
//         <input
//           type="text"
//           placeholder="Search by Position"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           className="px-2 py-1 border border-gray-300 rounded"
//         />
//       </div>
//       <div className="pt-4">
//         <div className="m-auto w-full overflow-y-auto rounded-lg border bg-white p-4">
//           <div className="pl-6 bg-[#005997] text-white my-3 grid font-bold font-sans underline border cursor-pointer grid-cols-5 items-center justify-center gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 md:justify-between lg:grid-cols-7">
//             <span className="text-left">Name</span>
//             <span className="text-left">Email</span>
//             <span className="text-left">Phone</span>
//             <span className="text-left">Address</span>
//             <span className="text-left">qualification</span>
//             <span className="text-left ml-2">Position</span>
//             <span className="text-left">CV</span>
//           </div>
//           <ul>
//             {(searchInput
//               ? (applications != null
//                   ? applications.filter(
//                       (app) =>
//                         app.jobpostApp[0]?.jobtitle
//                           .toLowerCase()
//                           .includes(searchInput.toLowerCase())
//                     )
//                   : [])
//               : (applications != null ? applications : [])
//             ).map((data, id) => (
//               <div key={id}>
//                 <li
//                   className="my-3  grid cursor-pointer grid-cols-5 items-center justify-between gap-2 rounded-lg bg-slate-50 p-2 hover:bg-slate-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7"
//                 >
//                   <div className="flex items-center">
//                     <p className="pl-4">{data.fullName}</p>
//                   </div>

//                   <div className="flex items-center">
//                     <p className="pl-4">
//                       {data.email.length > 10 ? (
//                         <>
//                           {expandedEmailId === data._id ? (
//                             data.email
//                           ) : (
//                             <>
//                               {`${data.email.substring(0, 10)}...`}
//                               <button
//                                 onClick={() =>
//                                   openModal(data.email, "email")
//                                 }
//                                 className="text-blue-500 ml-2 underline"
//                               >
//                                 View Full
//                               </button>
//                             </>
//                           )}
//                         </>
//                       ) : (
//                         data.email
//                       )}
//                     </p>
//                   </div>
//                   <div className="flex items-center">
//                     <p className="pl-4">{data.phone}</p>
//                   </div>
//                   <div className="flex items-center">
//                     <p className="pl-4">{data.address}</p>
//                   </div>
//                   <div className="flex items-center">
//                     {data.qualification.length > 2 ? (
//                       <>
//                         {expandedEmailId === data._id ? (
//                           data.qualification
//                         ) : (
//                           <>
//                             {`${data.qualification.substring(0, 2)}...`}
//                             <button
//                               onClick={() =>
//                                 openModal(
//                                   data.qualification,
//                                   "qualification"
//                                 )
//                               }
//                               className="text-blue-500 ml-2 underline"
//                             >
//                               View Full
//                             </button>
//                           </>
//                         )}
//                       </>
//                     ) : (
//                       data.qualification
//                     )}
//                   </div>
//                   <div className="flex items-center">
//                     <p className="pl-4">
//                       {data.jobpostApp[0] ? (
//                         <div>{data.jobpostApp[0].jobtitle}</div>
//                       ) : (
//                         "Post deleted....."
//                       )}
//                     </p>
//                   </div>
//                   <div className="flex items-center">
//                     <p className="pl-4">
//                       <Link href={`${data.cv}`} passHref>
//                         <BiDownload />
//                       </Link>
//                     </p>
//                     <button
//                       onClick={() => deleteApplication(data._id, data.cv)}
//                       className="text-red-500 ml-20 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                   <p className="hidden truncate text-right text-slate-700 sm:flex sm:text-left"></p>
//                   <div className="hidden items-center justify-between sm:flex"></div>
//                 </li>
//               </div>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </BaseLayout>
// ) : (
//   <p>session expired</p>
// )}
// <ReactModal
//   style={{
//     overlay: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "100%",
//       height: "100%",
//     },
//     content: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "30%",
//       width: "30%",
//       textAlign: "center",
//       marginLeft: '30%'
//     },
//   }}
//   isOpen={modalIsOpen}
//   onRequestClose={closeModal}
//   contentLabel="Full Content Modal"
//   ariaHideApp={false}
// >
//   <div>
//     <p>
//       {modalContentType === "email" ? "Email: " : "Qualification: "}
//       {modalContent}
//     </p>
//   </div>
//   <button className="bg-blue-400 py-3 px-10 rounded" onClick={closeModal}>
//     Close
//   </button>
// </ReactModal>