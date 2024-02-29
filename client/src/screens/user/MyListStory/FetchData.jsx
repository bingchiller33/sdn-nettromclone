import userLogedIn from "../../../components/user/userLogedIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategorySuccess } from "../../../components/common/data/dataCategory/dataSlice";
import { fetchFollowSuccess } from "../../../components/common/data/dataFollow/dataSlice";
import { fetchStoriesSuccess } from "../../../components/common/data/dataStory/dataSlice";
import { fetchRateSuccess } from "../../../components/common/data/dataRate/dataSlice";
import axios from "axios";
import { BASE_URL } from "../../../components/common/utilities/initials";

const FetChData = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}story/get_list_stories/65d711fe44acd31351cfc507`)
  //     .then((res) => dispatch(fetchStoriesSuccess(res.data)))
  //     .catch(() => {
  //       throw new Error("Network response was not ok");
  //     });
  // }, [dispatch]);
  //   useEffect(() => {
  //     fetch("http://localhost:9999/Categories")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const action = fetchCategorySuccess(data);
  //         dispatch(action);
  //       })
  //       .catch(() => {
  //         throw new Error("Network response was not ok");
  //       });
  //   }, [dispatch]);
  //   useEffect(() => {
  //     fetch("http://localhost:9999/followStory")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const action = fetchFollowSuccess(data);
  //         dispatch(action);
  //       })
  //       .catch(() => {
  //         throw new Error("Network response was not ok");
  //       });
  //   }, [dispatch]);
  //   useEffect(() => {
  //     fetch("http://localhost:9999/rateStory")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const action = fetchRateSuccess(data);
  //         dispatch(action);
  //       })
  //       .catch(() => {
  //         throw new Error("Network response was not ok");
  //       });
  //   }, [dispatch]);
};

export default FetChData;
