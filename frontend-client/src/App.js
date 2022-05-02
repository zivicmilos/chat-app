import logo from './logo.svg';
import './App.css';
import InitialLayout from "./layout/initialLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home";

function App() {
  return (
      <InitialLayout>
        <Home/>
      </InitialLayout>
  );
}

export default App;
