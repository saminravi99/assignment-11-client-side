import './App.css';
import React, { createContext } from 'react';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Inventory from '../Inventory/Inventory';
import MyItems from '../MyItems/MyItems';
import AddItems from '../AddItems/AddItems';
import Blogs from '../Blogs/Blogs';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import NotFound from '../NotFound/NotFound';
import useBooks from '../../components/hooks/useBooks';
import RequireAuth from '../RequireAuth/RequireAuth';

export const AllContext = createContext();


function App() {
  
const [books] = useBooks();

console.log(books);

  return (
    <AllContext.Provider value={{books}}>
      <div>
        <div>
          <Header></Header>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/inventory" element={
            <RequireAuth>
              <Inventory />
            </RequireAuth>
          }></Route>
          <Route path="/my-items" element={
            <RequireAuth>
              <MyItems />
            </RequireAuth>
          }></Route>
          <Route path="/add-items" element={
            <RequireAuth>
              <AddItems />
            </RequireAuth>
          }></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </AllContext.Provider>
  );
}

export default App;
