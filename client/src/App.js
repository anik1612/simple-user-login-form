import { BrowserRouter as Router, Route, Switch } from 'react-router';
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>    
  );
}

export default App;
