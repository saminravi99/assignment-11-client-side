import axios from "axios";
import { useEffect, useState } from "react";

//https://warehouse-management-saminravi.herokuapp.com/login

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
      console.log(user);
      const email = user?.email;
      if (email) {
        const { data } = await axios.post(
          "http://localhost:5000/login",
          { email }
        );
        setToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
      }
    };
    getToken();
  }, [user]);
  return [token];
};

export default useToken;
