import React, { useContext, useEffect, useState } from "react";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import UserDetails from "../../../components/user/UserDetails";
import { BASE_URL } from "../../../components/common/utilities/initials";
import axios from "axios";
import UserContext from "../../../contexts/UserContext.js";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    if (!user) {
      axios
        .get(`${BASE_URL}/users`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch((e) => console.log(e.message));
    }
  }, []);

  return (
      <UserDetails />
  );
};

export default UserProfile;
