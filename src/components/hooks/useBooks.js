import { useEffect, useState } from 'react';

const useBooks = () => {
   
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://warehouse-management-saminravi.herokuapp.com/books")
          .then((response) => response.json())
          .then((json) => setBooks(json));
    }
    , []);


    return [books, setBooks];
};

export default useBooks;