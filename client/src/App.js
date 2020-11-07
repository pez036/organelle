import logo from './party_parrot.gif';
import axios from 'axios';
import './App.css';

const usersRoute = process.env.NODE_ENV === "production"?'http://organelle.pzny.xyz/users':'http://localhost:5000/users';
//test method, delete this later
const handleTest = () => {
  axios.get(usersRoute)
          .then(res => console.log(res.data))
          .catch(err => console.log('Err'+err))
}

function App() {
  return (
    <div className="App">    
      <header className="App-header">
        <h1>Welcome to organelle!</h1>
        <button onClick={handleTest}>
          test http get
        </button>
        <p>
          Organelle helps your time management by integrating all <br/>
          the course information in one App, and remind you when <br/>
          due is immiment.
        </p>
        <a 
          className="App-link"
          href="https://drive.google.com/drive/folders/1f90RqdXNojKlN-CAytjrkiAQ4xdT5yzP?usp=sharing">
          Google Drive here </a>
        <img src={logo} alt="logo" />
      </header>
    </div>
  );
}

export default App;
