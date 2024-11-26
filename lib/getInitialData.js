// lib/getInitialData.js

export default async function getInitialData() {
  try {
    // const [
    //   // userResponse, 
    //   // reportsResponse,
    //   itinerariesResponse, 
    //   // purchasesResponse
    // ] = await Promise.all([
    //   // fetch('/api/mongodb?collection=user'),
    //   // fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/itineraries`),
    //   fetch('/api/user/itineraries'),
    //   // fetch('/api/user/report-purchases-count'),
    // ]);

    // if (
    //   // !userResponse.ok || 
    //   !itinerariesResponse.ok
    //   // !purchasesResponse.ok
    // ) {
    //   throw new Error('Failed to fetch user data');
    // }

    // const user = await userResponse.json();
    // const itineraries = await itinerariesResponse.json();
    // const reportPurchases = await purchasesResponse.json();
    // const canAnalyze = itineraries.length < reportPurchases;

    // console.log('getInitialData itineraries',itineraries);

    return {
      // user,
      // itineraries,
      // reportPurchases,
      // canAnalyze,
    }
  } catch (error) {
    console.error('Error get initial data:', error);
    return false; // Default to false if there's an error
  }
}