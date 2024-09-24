const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchAccidentTypes = async (page = 1, perPage = 10) => {
  try {
    const endpoint = '/15070282/v1/uddi:00e5cb5a-ecdf-4190-a499-ba3a6b2a8db9'; // 사고유형별 API 엔드포인트
    const url = `${BASE_URL}${endpoint}?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}&returnType=JSON`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error.message);
    return null;
  }
};

export const fetchAccidentByRegion = async (page = 1, perPage = 10) => {
  try {
    const endpoint = '/15070297/v1/uddi:fbdc4540-ef0e-4852-9d2d-b151ee9ecb8e'; // 시도별 API 엔드포인트
    const url = `${BASE_URL}${endpoint}?page=${page}&perPage=${perPage}&serviceKey=${API_KEY}&returnType=JSON`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error.message);
    return null;
  }
};

