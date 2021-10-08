import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn/Index';
import SignUp from './pages/SignUp/Index';
import RecoverPassword from './pages/RecoverPassword/index';
import ChangeProfile from './pages/ChangeProfile/index';
import useAuth from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!user?.id?<Redirect to="/signup"/> : <Chat/>}
        </Route>
        <Route path="/signin">
          {!user?.id?<SignIn/>:<Redirect to="/"/>}
        </Route>
        <Route path="/signup">
          {!user?.id?<SignUp/>:<Redirect to="/"/>}
        </Route>
        <Route path="/recover">
          <RecoverPassword/>
        </Route>
        <Route path="/changeprofile">
          <ChangeProfile/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;