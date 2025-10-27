export const API_BASE_URL = 'http://192.168.159.1:3000';

export const API_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/api/foods`,
  CREATE: `${API_BASE_URL}/api/foods`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/foods/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/foods/${id}`,
};

export const testConnection = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    console.log(' Kết nối API thành công:', data.message);
    return true;
  } catch (error) {
    console.error(' Không thể kết nối đến API:', error);
    return false;
  }
};