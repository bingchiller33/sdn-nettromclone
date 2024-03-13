import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./styles/formRate.css";
import Homepage from "./screens/Homepage";
import ViewDetail from "./screens/ViewDetail";
import Login from "./screens/Login";
import Register from "./screens/Register";
import SearchStory from "./screens/SearchStory";
import AddStory from "./components/author/AddEditStory/AddStory";
import MyListStory from "./screens/user/MyListStory/MyListStory";
import BoxChat from "./screens/user/boxChat/BoxChat";
import MyListChapter from "./screens/user/Chapter/MyListChapter";
import AddEditContent from "./screens/user/content/AddEditContent";
import ChapterContent from "./screens/chapterContent/ChapterContent";
import UserProfile from "./screens/user/profile/UserProfile";
import EditStory from "./components/author/AddEditStory/EditStory";
import UserContext from "./contexts/UserContext";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import axios from "axios";
import { BASE_URL } from "./components/common/utilities/initials";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
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
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div className={`${theme} App`}>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/get_story/:sid" element={<ViewDetail />} />
                  <Route
                    path="/get_story/:sid/chapter/:cid"
                    element={<ChapterContent />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<SearchStory />} />
                  <Route path="/author/addstory" element={<AddStory />} />
                  <Route
                    path="/author/editstory/:sid"
                    element={<EditStory />}
                  />
                  <Route path="/author/mystory" element={<MyListStory />} />
                  <Route
                    path="/author/mystory/:sid/boxchat"
                    element={<BoxChat />}
                  />
                  <Route
                    path="/author/mystory/listchapter/:sid"
                    element={<MyListChapter />}
                  />
                  <Route
                    path="/author/mystory/listchapter/:sid/content/:cid"
                    element={<AddEditContent />}
                  />
                  <Route path="/profile" element={<UserProfile />}></Route>
                  <Route
                    path="*"
                    element={<Navigate to={"/nettruyen.net"} />}
                  />
                </Routes>
              </BrowserRouter>
            </div>
          )}
        </ThemeContext.Consumer>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
