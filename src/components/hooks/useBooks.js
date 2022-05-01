import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import auth from "../firebase.init";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [authUser] = useAuthState(auth);

  const { pathname } = useLocation();

  // console.log(pathname);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://warehouse-management-saminravi.herokuapp.com/books", {
      headers: {
        "Content-Type": "application/json",
        email: `${authUser?.email}`,
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setBooks(json);
        setIsLoading(false);
      });
  }, [pathname, authUser]);

  return [books, setBooks, isLoading];
};

export default useBooks;
