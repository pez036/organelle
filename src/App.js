import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">    
      <header className="App-header">
        <h1>Welcome to organelle!</h1>
        <a 
          className="App-link"
          href="https://drive.google.com/drive/folders/1f90RqdXNojKlN-CAytjrkiAQ4xdT5yzP?usp=sharing">
          Google Drive here </a>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
