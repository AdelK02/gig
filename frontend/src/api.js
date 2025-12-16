const API_URL = "http://localhost:5000/api/jobs";

// GET all jobs
export async function getJobs() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Provide more specific error messages
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error("Cannot connect to server. Please make sure the backend server is running on http://localhost:5000");
    }
    throw error;
  }
}

// POST a new job
export async function postJob(jobData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(errorData.error || `Failed to post job: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting job:", error);
    // Provide more specific error messages
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error("Cannot connect to server. Please make sure the backend server is running on http://localhost:5000");
    }
    throw error;
  }
}
