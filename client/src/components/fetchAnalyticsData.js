import axios from 'axios';
import { message } from 'antd';

const fetchAnalyticsData = async (token, propertyId, requestBody) => {
  try {
    const response = await axios.post(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        ...requestBody,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) return response.data;
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    return null;
  }
};

export default fetchAnalyticsData;
