import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFeedbackSuccess } from "../../../components/common/data/dataBoxChat/dataSlice";
import { fetchUserSuccess } from "../../../components/common/data/dataUser/dataSlice";
import { setStory } from "../../../app/slices/storiesSlice";
import { fetchData } from "../../../components/common/utilities/fetchData";
import { BASE_URL_STORY } from "../../../components/common/utilities/initials";


const FetchData = (listFeedback, sid, value) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`http://localhost:9999/feedback?storyId=${sid}`)
            .then(res => res.json())
            .then(data => dispatch(fetchFeedbackSuccess(data)));
    }, [value, sid, dispatch]);
    // useEffect(() => {
    //     fetch(`http://localhost:9999/Stories/${sid}`)
    //         .then(res => res.json())
    //         .then(data => dispatch(setStory(data)));
    // }, [value, sid, dispatch]);
    useEffect(() => {
        fetchData(BASE_URL_STORY + `/${sid}`, setStory, dispatch);
    }, [dispatch, sid])
    // useEffect(() => {
    //     fetch("http://localhost:9999/Users")
    //         .then(res => res.json())
    //         .then(data => dispatch(fetchUserSuccess(data.filter(d => {
    //             const id = new Set(listFeedback.map(fb => fb.userId));
    //             const newList = [...id];
    //             return newList.includes(d.id)
    //         }))));
    // }, [listFeedback, dispatch]);
}

export default FetchData;