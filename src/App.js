import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import Login from "./components/Login";

import Home from './components/Home'

const App = ()=><div>
<BrowserRouter>
  <Login />
  <Home />
  </BrowserRouter>
</div>

export default App;
