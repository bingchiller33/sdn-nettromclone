import React from "react";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import UserDetails from "../../../components/user/UserDetails";
import { BASE_URL } from "../../../components/common/utilities/initials";

const UserProfile = () => {
  return (
    <DefaultTemplate>
      <UserDetails />
    </DefaultTemplate>
  );
};

export default UserProfile;
