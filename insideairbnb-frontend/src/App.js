import './App.css';
import WorldMap from './components/WorldMap';
import Navbar from './components/Navbar';
import DetailedInfo from './components/DetailedInfo';

function App() {
  return (
    <div className='container-fluid p-0 d-flex flex-column min-vh-100 '>
      <Navbar />
      <div className='container-fluid d-flex flex-grow-1  p-0 m-0'>
        <WorldMap />
        <DetailedInfo />
      </div>

      {/* <div className='flex-grow-1 bg-primary d-flex justify-content-center align-items-center'>
        heya heya heya heyaaaaaaaa
      </div> */}
    </div>
  );
}

export default App;
