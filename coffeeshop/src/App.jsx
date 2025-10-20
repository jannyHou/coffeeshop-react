import { ProductList,Header, Footer } from './components';
import { Routes, Route} from "react-router-dom";
import { NotFound, Login, Signup, UseToken, Purchase } from './pages';
import './App.css';

function App() {
  const { token, setToken } = UseToken();

  return (
   <div>
    <Header token={token} setToken={setToken}/>
      <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/purchase" element={<Purchase token={token}/>} />
          <Route path="*" element={<NotFound/>} />
      </Routes>
    <Footer/>
   </div>
  );
}

export default App;
