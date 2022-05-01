import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import auth from '../firebase.init';

const useBooks = () => {
   
    const [books, setBooks] = useState([]);

    const [authUser] = useAuthState(auth);

    const {pathname} = useLocation();

    // console.log(pathname);


    useEffect(() => {
        fetch("https://warehouse-management-saminravi.herokuapp.com/books", 
        { 
            headers: {
                "Content-Type": "application/json",
                "email": `${authUser?.email}`,
                "authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
          .then((response) => response.json())
          .then((json) => setBooks(json));
    }
    , [pathname, authUser]);


    return [books, setBooks];
};

export default useBooks;