import './App.css';
import {Button} from '@mui/material';

function App() {
  return (
    <div className="App">
      <h1>wecedMerced!</h1>

      <div className="form">
        <label>Events: </label>
        <input type="text" name="Event" />
        <label>Summary: </label>
        <input type="text" name="Summary" />

        <Button className="Button">
          Submit
        </Button>
        
      </div>
      
    </div>
  );
}

export default App;
