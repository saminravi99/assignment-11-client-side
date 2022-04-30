import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useBooks = () => {
   
    const [books, setBooks] = useState([]);

    const {pathname} = useLocation();

    // console.log(pathname);


    useEffect(() => {
        fetch("https://warehouse-management-saminravi.herokuapp.com/books")
          .then((response) => response.json())
          .then((json) => setBooks(json));
    }
    , [pathname]);


    return [books, setBooks];
};

export default useBooks;