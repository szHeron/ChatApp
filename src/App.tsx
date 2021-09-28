import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn/Index';
import SignUp from './pages/SignUp/Index';
import RecoverPassword from './pages/RecoverPassword/index';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Chat}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/recover" component={RecoverPassword}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;