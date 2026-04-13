export const createRequest = async (data: any) => {
  // Pointing to the unified POST route
  const res = await fetch("/api/ip-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  // If the backend threw an error (like the 5 IP limit), throw it to the UI
  if (!res.ok) {
    throw new Error(responseData.error || "Failed to create request");
  }

  return responseData;
};

export const getRequests = async () => {
  // Pointing to the unified GET route
  const res = await fetch("/api/ip-request");
  
  if (!res.ok) {
      throw new Error("Failed to fetch requests");
  }
  
  return res.json();
};


export const approveRequest = async (id: string, role: string) => {
  const res = await fetch("/api/ip-request/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, role })
  });

  if (!res.ok) {
    throw new Error("Approval failed");
  }

  return res.json();
};