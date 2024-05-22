import './App.css';
import WorldMap from './components/WorldMap';
import Navbar from './components/Navbar';
import DetailedInfo from './components/DetailedInfo';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className='container-fluid p-0 d-flex flex-column min-vh-100 bg-light'>
      <Navbar />

      {isLoading && !isAuthenticated && <div> loading....</div>}

      {isAuthenticated && !isLoading && (
        <div className='container-fluid d-flex flex-grow-1 p-0 m-0'>
          <WorldMap />
          <DetailedInfo />
        </div>
      )}

      {!isAuthenticated && !isLoading && (
        <div className='container-fluid flex-column d-flex flex-grow-1 p-0 m-0 mt-5 align-items-center  '>
          <h1 className='h2'>Insights of inside airbnb data of Paris 2024</h1>
          <p>Please login first.</p>
        </div>
      )}
      {/* 
      <div className='container-fluid d-flex flex-grow-1 p-0 m-0'>
        <WorldMap />
        <DetailedInfo />
      </div> */}
    </div>

  );
}

export default App;
