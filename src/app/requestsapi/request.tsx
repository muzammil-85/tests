
export const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const apiURL = process.env.NEXT_PUBLIC_API_URL


export const fetchUserData = async (user_id :any, token:any) => {
    const headersList = {
      "Authorization": `Bearer ${token}`,
    };
    
    const response = await fetch(`${apiURL}/user/${user_id}`, { 
      method: "GET",
      headers: headersList
    });
    
    const data = await response.json();
    return data;
  };
  

  export const uploadActivityData = async (data: any, token: string | null, id: string | null) => {
    try {
      const response = await fetch(`${apiURL}/activity/new`, { 
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error uploading activity data:", error);
     
    }
  };

  // export const fetchActivityData = async (token: any,id:any) => {
  //   const headersList = {
  //     "Authorization": `Bearer ${token}`,
  //   };
    
  //   const response = await fetch(`${apiURL}/activity/${id}`, { 
  //     method: "GET",
  //     headers: headersList
  //   });
  
  //   if (await response){
  //     var data = await response.json();
  //   }
   
  //   return data;
  // };


  export const fetchActivityData = async (token: any, id: any) => {
    const headersList = {
        "Authorization": `Bearer ${token}`,
    };

    try {
        const response = await fetch(`${apiURL}/activity/${id}`, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response has content before parsing
        const text = await response.text();
        if (!text) {
            // throw new Error('Response is empty');
            return null;
        }

        // Attempt to parse the JSON content
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error fetching activity data:', error);
        throw error; // Rethrow the error to handle it further up the call stack if needed
    }
};


export const fetchPlantsData = async (token : string) => {
  try {
    const header = {
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${apiURL}/uploads/me`, {
      method: 'GET',
      headers: header,
    });

    if (!response.ok) {
      throw new Error(`Error fetching plants: ${response.statusText}`);
    }

    const plantData = await response.json();
    return plantData;

  } catch (error) {
    console.error("Error fetching plants:", error);
    return error;
  }
}


// fetch the clubs for the school from api endpoint
export const fetchClubData = async () => {
    try {
      const response = await fetch(`${apiURL}/clubs`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching plants: ${response.statusText}`);
      }
  
      const clubsData = await response.json();
      return clubsData;
  
    } catch (error) {
      console.error("Error fetching plants:", error);
      return error;
    }
  }

  
export const uploadPlantData = async (data: any, token: string | null) => {
    try {
      const response = await fetch(`${apiURL}/uploads/new`, { 
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error("Error uploading activity data:", error);
      throw error;
    }
  };