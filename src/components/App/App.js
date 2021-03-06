import "./App.css";
import React, { createContext } from "react";
import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import Inventory from "../Inventory/Inventory";
import MyItems from "../MyItems/MyItems";
import AddItems from "../AddItems/AddItems";
import Blogs from "../Blogs/Blogs";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import NotFound from "../NotFound/NotFound";
import useBooks from "../../components/hooks/useBooks";
import RequireAuth from "../RequireAuth/RequireAuth";
import { Toaster } from "react-hot-toast";
import Update from "../Update/Update";
import AboutUs from "../AboutUs/AboutUs";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import useToken from "../hooks/useToken";
import ManageInventory from "../ManageInventory/ManageInventory";

export const AllContext = createContext();

function App() {
  //React Firebase Hook
  const [authUser] = useAuthState(auth);

  //Custom Hook For creating JWT Token For Social Login, Email Password Login And SignUp
  const [token] = useToken(authUser);
  console.log(token);

  // Custom Hook For Fetching All Books From The Server API
  const [books] = useBooks();

  return (
    <AllContext.Provider value={{ books }}>
      <div>
        <div>
          <Header></Header>
        </div>
        <Toaster></Toaster>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/inventory"
            element={
              <RequireAuth>
                <Inventory />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/my-items"
            element={
              <RequireAuth>
                <MyItems />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/add-items"
            element={
              <RequireAuth>
                <AddItems />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/inventory/:id"
            element={
              <RequireAuth>
                <Update></Update>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="manage-inventory"
            element={
              <RequireAuth>
                <ManageInventory></ManageInventory>
              </RequireAuth>
            }
          ></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </AllContext.Provider>
  );
}

export default App;
