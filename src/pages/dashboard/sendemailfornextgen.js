import BaseLayout from "@/admincomponents/BaseLayout";
import React, { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from 'next/dynamic' instead of using require
import "react-quill/dist/quill.snow.css";
import { sendmail_to_applicant, sendmail_to_nextgen_applicant } from "@/server_requests/client_requests";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Use dynamic import with ssr: false

const MessageForm = () => {

    const router = useRouter();
     const {applicationId,email: email } = router.query;
     const messageBody = "We are pleased to inform you that your application has been received and is currently under review. We will contact you with further details.";

  const [message, setMessage] = useState({
    _id: applicationId,
    subject: "Application Status",
    to: email,
    content:`
  <h3 style="font-weight: bold; font-size: 16px;">Dear Applicant,</h3>
<h3 style="margin-bottom: 20px; margin-top: 20px; font-size: 14px;">${messageBody}</h3>
<br></br>
<h3 style=" font-size: 14px; ">Thank you for choosing NextGen Leader Program.</h3>
<h3 style=" font-style: italic; font-size: ">Best Regards,</h3>
    `,
  });

  const handleChange = (value) => {
    setMessage({
      ...message,
      content: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
  
      // Send a POST request to the server
    const response =  await sendmail_to_nextgen_applicant(message);
        // Log the server response to the console
    
     
    
        toast.success("Email sent successfully");
        // Display the server response using Toastify
   
      // Reset the form after successful submission
      setMessage({
        _id: applicationId,
        subject: "",
        to: "",
        content: ""
      });
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };


  return (
    <BaseLayout>
      <div className="flex justify-center  h-screen">
        <div className="w-[70%] p-10 border ">
<div className="flex justify-between ">
  <h2 className="text-2xl font-bold text-[#ffcc00]">Compose Message</h2>
  <button onClick={handleSubmit}  className=" bg-[#ffcc00] text-white rounded-lg p-1 w-40" type="submit">
    Submit
  </button>
</div>
<form>
 <div className="pt-10 pb-5">
  <input
    type="text"
    id="to"
    name="to"
    value={message.to}
    onChange={(e) => setMessage({ ...message, to: e.target.value })}
    required
    placeholder="To"
    className="border rounded w-full text-gray-500 p-1"
    style={{ padding: '10px' }}
  />
</div>
<div className="pb-5">
  <input
    type="text"
    id="subject"
    name="subject"
    value={message.subject}
    onChange={(e) => setMessage({ ...message, subject: e.target.value })}
    required
    placeholder="Subject"
    className="border rounded w-full text-gray-500 p-1"
    style={{ padding: '10px' }}
  />
</div>
          <div className=" pb-5">
  
</div>
            <div className=" pb-10">
              <label htmlFor="content">Content:</label>
              <ReactQuill
                id="content"
                value={message.content}
                onChange={handleChange}
                required
                style={{ height: "400px", borderRadius: "5px", padding: "10px",  fontSize: "16px", fontFamily: "inherit"}}
              />
            </div>
           
          </form>
        </div>
      </div>
      <ToastContainer/>
    </BaseLayout>
  );
};

export default MessageForm;
