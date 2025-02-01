export async function checkAuthWithServer() {
  const serverUrl = "http://192.168.134.231:5000/auth"; // Replace with the actual endpoint

  try {
    const response = await fetch(serverUrl, {
      method: "GET", // or 'POST' depending on your server's requirements
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed, such as authentication tokens
      },
      // If you need to send a body, uncomment the following line:
      // body: JSON.stringify({ key: 'value' })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Server response:", data);
    return data; // Return the response data if needed
  } catch (error) {
    console.error("Error connecting to the server:", error);
    throw error; // Re-throw the error if you want to handle it elsewhere
  }
}
