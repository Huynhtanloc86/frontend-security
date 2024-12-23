import { useEffect, useState } from 'react';
import { Row } from 'antd';
import Statistics from './Statistics';
import fetchAnalyticsData from './fetchAnalyticsData';
import { useGoogleLogin } from '@react-oauth/google';

export default () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const pagePath = '/lp/spx-tuyen-dung/';
  const propertyId = '328755938';
  const requestBody = {
    dimensions: [{ name: 'date' }, { name: 'pagePathPlusQueryString' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'screenPageViews' },
      { name: 'sessions' },
    ],
    dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePathPlusQueryString',
        stringFilter: { matchType: 'EXACT', value: pagePath },
      },
    },
    orderBys: [
      { dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } },
      { metric: { metricName: 'activeUsers' } },
    ],
    keepEmptyRows: true,
    metricAggregations: ['TOTAL'],
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetchAnalyticsData(token, propertyId, requestBody).then((data) => {
        setAnalyticsData(data);
        setIsLoading(false);
      });
    }
  }, [token]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      setToken(accessToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      {!token && <button onClick={googleLogin}>Check Analytics</button>}
      <Statistics isLoading={isLoading} />
    </>
  );
};
