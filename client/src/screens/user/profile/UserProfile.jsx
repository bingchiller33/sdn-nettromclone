import React, { useEffect, useState } from "react";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import UserDetails from "../../../components/user/UserDetails";
import { BASE_URL } from "../../../components/common/utilities/initials";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState();
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`, config)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <DefaultTemplate>
      <UserDetails user={user} />
    </DefaultTemplate>
  );
};

export default UserProfile;
