import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";
import useBooks from "../hooks/useBooks";
import "./MyItems.css";

const MyItems = () => {
  const [user] = useAuthState(auth);
  const [myItems, setMyItems] = useState([]);
  const navigate = useNavigate();

  const [books] = useBooks();

  useEffect(() => {
    const getUserItems = async () => {
      const email = user?.email;
      const url = `https://warehouse-management-saminravi.herokuapp.com/user?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        setMyItems(data);
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getUserItems();
  }, [user, navigate]);

  useEffect(() => {
    console.log(myItems);
  }, [myItems]);

  

  const handleMyItemDelete = (id, bookName) => {
    console.log(id);

    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const userBook = books.find((book) => book.bookName === bookName);
      const userUrl = `https://warehouse-management-saminravi.herokuapp.com/books/${userBook?._id}`;

      fetch(userUrl, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          const url = `https://warehouse-management-saminravi.herokuapp.com/users/${id}`;

          fetch(url, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              const remaining = myItems.filter((item) => item._id !== id);
              console.log(remaining);
              setMyItems(remaining);
            });
        });
    }
  };

  return (
    <div className="padding-nav">
      <h1 className="text-center text-muted mt-4">Your Added Items</h1>
      <div className="container mt-5">
        <div className="row">
          {myItems?.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card myItem-card">
                <div className="mx-auto">
                  <img className="book-img" src={item.image} alt="img" />
                </div>
                <div className="card-body">
                  <h4 className="card-title text-center mb-3">
                    {item.bookName}
                  </h4>
                  <p className="card-text">
                    {item.description.slice(0, 100)}...
                  </p>
                  <small>{item.email}</small>
                  <p className="card-text my-3">
                    <small className="text-muted">
                      Available pieces: {item.quantity}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Price: $ {item.price}</small>
                  </p>

                  <div>
                    <button
                      onClick={() =>
                        handleMyItemDelete(item._id, item.bookName)
                      }
                      className="btn btn-danger d-block mx-auto "
                    >
                      Delete This Book From Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyItems;
