import { Link, Router } from '@mui/icons-material';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import Doctors from './Components/Doctors/Doctors';
import MiniDrawer from './Components/Layout';
import Layout from './Components/Layout';
import Medicine from './Components/Medicine/Medicine';

function App() {
  return (
    <div>
      <Medicine />
      <MiniDrawer />
      <Doctors />
      <Layout>
        <Switch>
          <Route exact path={"/medicine"} component={Medicine} />
          <Route exact path={"/mini_drawer"} component={MiniDrawer} />
        </Switch>
      </Layout>

    </div>
  );
}

export default App;
