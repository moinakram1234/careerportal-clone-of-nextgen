// api.js
const apiUrl = process.env.NEXT_PUBLIC_URL;
// Assuming formData.cv is a File object, you can convert it to a string or set it to null
export const deleteData_application = async (id,path) => {
  try { console.log(path)
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}?id=${id}&path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
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
const createJobapplication = async (formData) => {
  try {
    // Convert File to Base64 string
    const cvBase64 = formData.cv ? await convertFileToBase64(formData.cv) : null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        cv: cvBase64, // Set cv to the Base64 string or null
      }),
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
// Helper function to convert File to Base64 string
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
//fetch applications
// api.js (or any other suitable file name)
export const fetchData_application = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

// api.js (or any other suitable file name)
export const deleteJobPost = async (id) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}?id=${id}`, {
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

// components/api.js

const updateJobPost = async ({
  id,
  jobtitle,
  jobtype,
  joblocation,
  description,
}) => {
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        jobtitle,
        jobtype,
        joblocation,
        description,
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

export { createJobPost, fetchJobPosts, updateJobPost, createJobapplication };
