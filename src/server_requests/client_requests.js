// api.js
const apiUrl = process.env.NEXT_PUBLIC_URL;

const createJobapplication = async (jobData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error creating job post: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating job post:', error);
    throw new Error('Internal Server Error');
  }
}
const createJobPost = async (jobData) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
  
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error creating job post: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating job post:', error);
      throw new Error('Internal Server Error');
    }
  };
  // api.js (or any suitable name)
const fetchJobPosts = async () => {
    try {
      console.log(apiUrl)
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


 const updateJobPost = async ({ id, jobtitle, jobtype, joblocation, description }) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Error updating job post:', error);
    throw error;
  }
};

  
  
  export { createJobPost, fetchJobPosts,updateJobPost,createJobapplication };
  