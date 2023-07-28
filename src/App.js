import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="grid h-screen place-items-center h-screen bg-gradient-to-r from-indigo-500">
      <div>
        <Weather />
      </div>
    </div>
  );
}

export default App;
