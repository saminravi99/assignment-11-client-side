import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";

const MyItems = () => {
  const [user] = useAuthState(auth);
  const [myItems, setMyItems] = useState([]);
  const navigate = useNavigate();
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
  return (
    <div className="padding-nav">
      <h1>My Items</h1>
      <div className="container">
        <div className="row">
          {myItems.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={item.image}
                  alt="img"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.bookName}</h5>
                  <p className="card-text">{item.description}</p>
                  <small>{item.email}</small>
                  <p className="card-text">
                    <small className="text-muted">
                      Available pieces: {item.quantity}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Price: $ {item.price}
                    </small>
                  </p>
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
