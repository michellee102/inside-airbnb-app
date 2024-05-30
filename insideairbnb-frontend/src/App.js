import './App.css';
import WorldMap from './components/WorldMap';
import Navbar from './components/Navbar';
import DetailedInfo from './components/DetailedInfo';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';


function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);



  const checkPermissions = async () => {
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);

        if (accessToken) {


          console.log("Access token:", accessToken);


          const response = await fetch('https://localhost:7049/Listings/authentication', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });


          if (response.ok) {
            console.log('Authenticated the user!:', response.status);
            const response2 = await fetch('https://localhost:7049/Listings/authorize', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });

            if (response2.ok) {
              console.log('Authorized the user!:', response2.status);
            }
          } else {

            console.error('Failed to authenticate', response.status);
          }
        } else {
          console.log('No token');
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    }
  };




  useEffect(() => {
    checkPermissions();
  }, [isAuthenticated]);

  return (
    <div className='container-fluid p-0 d-flex flex-column min-vh-100 bg-light'>
      <Navbar />

      {isLoading && !isAuthenticated && <div> loading....</div>}

      {/* TODO: Check hier of user admin is en geef dit door als prop aan DetailedInfo */}
      {isAuthenticated && !isLoading && (
        <div className='container-fluid d-flex flex-grow-1 p-0 m-0'>
          <div className='col-8'>
            <div className="container d-flex h-100 p-0 m-0">
              <WorldMap />
            </div>
          </div>
          <div className="col-4">
            <div className="container d-flex flex-column detailed-bg-color bg-gradient h-100">
              <DetailedInfo accessToken={token} />
            </div>
          </div>
        </div>

      )}

      {!isAuthenticated && !isLoading && (
        <div className='container-fluid flex-column d-flex flex-grow-1 p-0 m-0 mt-5 align-items-center  '>
          <h1 className='h2'>Insights of inside airbnb data of Paris 2024</h1>
          <p>Please login first.</p>
        </div>
      )}
    </div>

  );
}

export default App;
