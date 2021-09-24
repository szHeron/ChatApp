import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn/Index';
import SignUp from './pages/SignUp/Index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Chat}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;