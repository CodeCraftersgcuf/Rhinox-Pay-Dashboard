import { customApiCall } from '../api/customApiCall';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: string;
  kycStatus: "verified" | "unverified" | "rejected";
}

// Option 1: Load from JSON file (for development/mock data)
export const getUsersFromJSON = async (): Promise<User[]> => {
  try {
    // Fetch from public folder - files in public are served at root
    const response = await fetch('/data/usersData.json');
    if (!response.ok) {
      throw new Error('Failed to load users data');
    }
    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error('Error loading users from JSON:', error);
    // Fallback to hardcoded data if JSON file not found
    return getFallbackUsers();
  }
};

// Fallback data if JSON file is not available
const getFallbackUsers = (): User[] => [
  {
    id: "1",
    name: "Qamardeen Malik",
    email: "qamardeenoladimeji@gmail.com",
    phone: "07033484845",
    walletBalance: "N25,000",
    kycStatus: "verified"
  },
  {
    id: "2",
    name: "Tunde Ajayi",
    email: "tunde.ajayi@sample.com",
    phone: "08123456789",
    walletBalance: "N30,000",
    kycStatus: "verified"
  },
  {
    id: "3",
    name: "Qamardeen Malik",
    email: "qamardeenoladimeji@gmail.com",
    phone: "07033484845",
    walletBalance: "N25,000",
    kycStatus: "unverified"
  },
  {
    id: "4",
    name: "Chinonso Okeke",
    email: "chinonso.okeke@mail.com",
    phone: "09098765432",
    walletBalance: "N20,000",
    kycStatus: "unverified"
  },
  {
    id: "5",
    name: "Amina Yusuf",
    email: "amina.yusuf@example.com",
    phone: "08012345678",
    walletBalance: "N15,000",
    kycStatus: "verified"
  },
  {
    id: "6",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "09123456789",
    walletBalance: "N10,000",
    kycStatus: "rejected"
  }
];

// Option 2: Load from API endpoint
export const getUsersFromAPI = async (): Promise<User[]> => {
  try {
    const response = await customApiCall({
      method: 'GET',
      endpoint: '/users', // Adjust endpoint as needed
    });
    return response.data || response;
  } catch (error) {
    console.error('Error fetching users from API:', error);
    // Fallback to JSON data if API fails
    return getUsersFromJSON();
  }
};

// Main function to get users (you can switch between JSON and API)
export const getUsers = async (useAPI: boolean = false): Promise<User[]> => {
  if (useAPI) {
    return getUsersFromAPI();
  }
  return getUsersFromJSON();
};

export default {
  getUsers,
  getUsersFromJSON,
  getUsersFromAPI,
};

