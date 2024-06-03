// api.js
const apiUrl = process.env.NEXT_PUBLIC_URL;
const apiAppUrl= process.env.NEXT_PUBLIC_APP_URL;
// Assuming formData.cv is a File object, you can convert it to a string or set it to null
export const deleteData_application = async (_id, path) => {
  try {
    console.log(path);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}?_id=${_id}&path=${encodeURIComponent(
        path
      )}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return true; // Indicate successful deletion
    } else {
      console.error("Error deleting job post:", response.statusText);
      return false; // Indicate deletion failure
    }
  } catch (error) {
    console.error("Error deleting job post:", error);
    return false; // Indicate deletion failure
  }
};
const createJobapplication = async (formData, pdfFile) => {
  try {
    const bodyFormData = new FormData();

    // Append form data to FormData
    for (const key in formData) {
      bodyFormData.append(key, formData[key]);
    }

    // Append PDF file to FormData
    bodyFormData.append('pdfFile', pdfFile, 'application.pdf');
    console.log(formData);

    const response = await fetch(`${apiAppUrl}`, {
      method: "POST",
      body: bodyFormData,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error creating application post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating application post:", error);
    throw new Error("Internal Server Error");
  }
};

// Helper function to convert File to Base64 string
// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(',')[1]);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// };
//fetch applications
// api.js (or any other suitable file name)
export const fetchData_application = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}`); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

// api.js (or any other suitable file name)
export const deleteJobPost = async (_id) => {
  try {
 console.log(_id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}?_id=${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true; // Indicate successful deletion
    } else {
      console.error("Error deleting job post:", response.statusText);
      return false; // Indicate deletion failure
    }
  } catch (error) {
    console.error("Error deleting job post:", error);
    return false; // Indicate deletion failure
  }
};


export const sendmail_to_applicant = async (message) => {
 try {
  alert(message._id);
  // Fetch the list of candidates for the job post from the server
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP}/application/sendmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  });
  // Rest of the code...

if (response.ok) {
      return "sent email successfully";
    }
  
    else {
      // If there's an error in sending notifications, log the error and return false
      console.error("Error sending notifications:", response.statusText);
      return false;
    }
  } catch (error) {
    // If there's an error in the fetch operation itself, log the error and return false
    console.error("Error sending notifications:", error);
    return false;
  }
};

export const notify_to_users = async (_id) => {
  try {
    // Fetch the list of candidates for the job post from the server
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/notify?_id=${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // You can include any necessary body data here if required
    });
if (response.ok) {
      return "Notifications sent successfully";
    }
  
    else {
      // If there's an error in sending notifications, log the error and return false
      console.error("Error sending notifications:", response.statusText);
      return false;
    }
  } catch (error) {
    // If there's an error in the fetch operation itself, log the error and return false
    console.error("Error sending notifications:", error);
    return false;
  }
};


const createJobPost = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error creating job post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating job post:", error);
    throw new Error("Internal Server Error");
  }
};
// api.js (or any suitable name)
const fetchJobPosts = async () => {
  try {
    console.log(apiUrl);
    const response = await fetch(`${apiUrl}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching job posts:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching job posts:", error);
    return [];
  }
};
//archive post and application delete
export const deleteArchiveJobPost = async (_id) => {
  try {
    const response = await fetch(`/api/Archived?_id=${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true; // Indicate successful deletion
    } else {
      console.error("Error deleting job post:", response.statusText);
      return false; // Indicate deletion failure
    }
  } catch (error) {
    console.error("Error deleting job post:", error);
    return false; // Indicate deletion failure
  }
};

// components/api.js
export const fetchJobPostDetails = async (postid) => {
  try {
    const response = await fetch(`${apiUrl}?_id=${postid}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching job post details:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching job post details:", error);
    return null;
  }
};


const updateJobPost = async ({
  _id,
  jobtitle,
  jobtype,
  joblocation,
  description,
  department,
  submissionDeadline,
  experienceLevel,
  values,
}) => {
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        jobtitle,
        jobtype,
        joblocation,
        description,
        department,
        submissionDeadline,
        experienceLevel,
        values,
      }),
    });

    if (response.ok) {
      const updatedJobPost = await response.json();
      return updatedJobPost;
    } else {
      throw new Error(`Error updating job post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating job post:", error);
    throw error;
  }
};

//enable feature
// client_requests.js

export const updateEnableStatus = async (_id, enablestatus) => {

  
  try {
    
    const response = await fetch(`${apiUrl}?_id=${_id}`, {
      method: 'PATCH', // or 'PUT' depending on your server's API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enable: enablestatus,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If you need to process the response, you can do so here
    // const data = await response.json();

    // You can return the data if needed
    // return data;
  } catch (error) {
    console.error('Error updating enable status:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

// reject application without any message
export const Request_To_Reject_application = async (_id, email) => {
  try {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP}/reject?_id=${_id}&email=${email}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (response.ok) {
      return "Application rejected successfully";
    } else {
      console.error("Error rejecting application:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error rejecting application:", error);
    return false;
  }
}
//retore application and job posts


export const updateRestore = async (_id) => {
  try {
    const response = await fetch(`/api/Archived?_id=${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};



export { createJobPost, fetchJobPosts, updateJobPost, createJobapplication };
