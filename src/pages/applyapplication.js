import React, { useState } from "react";
import infobg from "public/images/personalinfosvg.svg";
import {
  BaseLayout,
  Loader,
  createJobapplication,
  ChakraProvider,
  Radio,
  RadioGroup,
  Select,
  Stack,
  theme,
  useRouter,
  toast,
  ToastContainer,
  Image,
  BottomSection,
  Range,
} from '@/components/export_libraries/exportlibrary'
import { extendTheme } from "@chakra-ui/react";

const ApplicationForm = ({ onClose, postid }) => {
  const [istoggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pdffile, setPdffile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const [experiencerange, setexperiencerange] = useState([0, 10]); // Initial range values
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "",
    selectedDepartment: "",
    address: "",
    experience: "",
    cv: "",
    experiencerange: [0, 10], // Initialize with default values
    postid: "",
    countryorregion: "",
    city: "",
    stateorprovince: "",
    zipcode: "",
    majorSubject: "",
    universityName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRangeChange = (values) => {
    setexperiencerange(values);
    setFormData((prevData) => ({ ...prevData, experiencerange: values }));
  };

  const isValidPakistanPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(\+92|0092|0)[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdffile(file);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    formData.experiencerange = experiencerange;
    formData.postid = router.query.postid;
    try {
      if (
        !isValidPakistanPhoneNumber(formData.phone) &&
        formData.phone !== ""
      ) {
        setFileError("Invalid phone number format.");
        return;
      } else {
        setFileError("");
      }

      const response = await createJobapplication(formData, pdffile);
      alert(formData.postid);
      toast(response.message);
      // setFormData({
      //   fullName: "",
      //   phone: "",
      //   email: "",
      //   qualification: "",
      //   selectedDepartment: "",
      //   cv: "",
      //   address: "",
      //   postid: postid,
      //   countryorregion: "",
      //   city: "",
      //   stateorprovince: "",
      //   zipcode: "",
      //   majorSubject: "",
      //   universityName: "",
      // });
      // setPdffile(null);
      // setexperiencerange([0, 10]);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const yr_experience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const Departmantdata = ["IT", "HR", "Marketing", "Sales", "Finance"];
  const majorsubjectdata = [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Business Administration",
    "Marketing",
    "Finance",
    "Accounting",
    "Human Resource",
    "Other",
  ];
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
    <ChakraProvider theme={theme}>
      <BaseLayout>
        {isLoading && <Loader />}

        {!isLoading && istoggle && (
          <div class="mt-20 p-6 bg-white flex items-center justify-center">
            <div class="container max-w-screen-lg mx-auto">
              <div>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-4 mb-6">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div class="text-gray-600 ">
                      {" "}
                      <p class="font-medium ml-5 mt-5 text-white absolute text-lg">
                        Personal Details
                      </p>
                      <p className="absolute m-5 mt-14 text-white">
                        Please fill out all the fields.
                      </p>
                      <Image
                        src={infobg}
                        alt="bgCardPatern"
                        className="rounded h-full w-full"
                      ></Image>
                    </div>

                    <div class="lg:col-span-2">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                          <label for="full_name">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            id="full_name"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.fullName}
                            placeholder="Full Name"
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-5">
                          <label for="email">Email Address</label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.email}
                            placeholder="email@domain.com"
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-5">
                          <label for="Phone">Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.phone}
                            placeholder="Phone Number"
                            onChange={handleChange}
                          />
                        </div>
                        <div class="md:col-span-3">
                          <label for="universityname">university Name</label>
                          <input
                            type="text"
                            name="universityName"
                            id="universityName"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.universityName}
                            placeholder="universityName"
                            onChange={handleChange}
                          />
                        </div>
                        <div class="md:col-span-2">
                          <label for="qualification">Qualification</label>
                          <input
                            type="text"
                            name="qualification"
                            id="qualification"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.qualification}
                            placeholder="qualification"
                            onChange={handleChange}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <label for="major subject">Major Subject</label>
                          <Select
                            placeholder="Select Major Subject"
                            className="w-full"
                            name="majorSubject"
                            onChange={handleChange}
                            value={formData.majorSubject}
                          >
                            {majorsubjectdata.map((option) => (
                              <option value={option} key={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div class="md:col-span-5">
                          {formData.majorSubject === "Other" && (
                            <input
                              type="text"
                              name="majorSubject"
                              id="majorSubject"
                              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              value={formData.majorSubject}
                              placeholder="majorSubject"
                              onChange={handleChange}
                            />
                          )}
                        </div>
                        <div class="md:col-span-3">
                          <label for="address">Address / Street</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.address}
                            placeholder="address/street "
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-2">
                          <label for="city">City</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            value={formData.city}
                            placeholder=""
                            onChange={handleChange}
                          />
                        </div>

                        <div class="md:col-span-2">
                          <label for="country">Country / region</label>
                          <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              name="countryorregion"
                              id="countryorregion"
                              placeholder="Country or Region"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                              value={formData.countryorregion}
                              onChange={handleChange}
                            />
                            <button
                              tabindex="-1"
                              class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                            >
                              <svg
                                class="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              tabindex="-1"
                              for="show_more"
                              class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                            >
                              <svg
                                class="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="md:col-span-2">
                          <label for="state">State / province</label>
                          <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                            <input
                              name="stateorprovince"
                              id="stateorprovince"
                              placeholder="Country or Region"
                              className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                              value={formData.stateorprovince}
                              onChange={handleChange}
                            />
                            <button
                              tabindex="-1"
                              class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                            >
                              <svg
                                class="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                            <button
                              tabindex="-1"
                              for="show_more"
                              class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                            >
                              <svg
                                class="w-4 h-4 mx-2 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div class="md:col-span-1">
                          <label for="zipcode">Zipcode</label>
                          <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="md:col-span-5">
                          <label for="experience_years">
                            Please select the Department.
                          </label>
                          <Select
                            placeholder="Select Department"
                            className="w-full"
                            name="selectedDepartment"
                            onChange={handleChange}
                            value={formData.selectedDepartment}
                          >
                            {Departmantdata.map((option) => (
                              <option value={option} key={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div class="md:col-span-5 mt-2 mb-2">
                          <RadioGroup
                            onChange={(value) => {
                              setSelectedOption(value);
                              handleChange({
                                target: { name: "experience", value },
                              });
                            }}
                            value={formData.experience}
                          >
                            <Stack direction="row">
                              <Radio value="fresh">Fresh</Radio>
                              <Radio value="experienced">Experienced</Radio>
                            </Stack>
                          </RadioGroup>
                        </div>

                        {selectedOption === "experienced" && (
                          <div class="md:col-span-5">
                            <div>
                              <label
                                htmlFor="Experience range"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Experience range (in years):
                              </label>
                              <Range
                                step={1}
                                min={0}
                                max={10}
                                values={experiencerange}
                                onChange={setexperiencerange}
                                renderTrack={({ props, children }) => (
                                  <div
                                    {...props}
                                    style={{
                                      ...props.style,
                                      height: "6px",
                                      width: "20%",
                                      marginTop: "30px",
                                      backgroundColor: "#ccc",
                                    }}
                                  >
                                    {children}
                                  </div>
                                )}
                                renderThumb={({ props, index, isDragged }) => {
                                  return (
                                    <div
                                      {...props}
                                      style={{
                                        ...props.style,
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "#FFC83D",
                                      }}
                                    >
                                      <span
                                        style={{
                                          position: "absolute",
                                          top: "-20px",
                                        }}
                                      >
                                        {experiencerange[index]}
                                      </span>
                                    </div>
                                  );
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="md:col-span-5">
                          <label htmlFor="resume">Please upload resume:</label>
                          <input
                            type="file"
                            name="cv"
                            id="resume"
                            onChange={handleFileChange}
                            className="border mt-1 p-5 rounded w-full bg-gray-50"
                            placeholder="file"
                          />
                          {fileName && <p>Selected file: {fileName}</p>}
                        </div>

                        <div class="md:col-span-5">
                          <div class="inline-flex items-end">
                            <button
                              onClick={handleSubmit}
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
        <BottomSection />
      </BaseLayout>
    </ChakraProvider>
  );
};

export default ApplicationForm;
