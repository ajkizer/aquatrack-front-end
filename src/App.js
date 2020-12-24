import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Routing from "./routing/Routing";

import store from "./redux/store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;
