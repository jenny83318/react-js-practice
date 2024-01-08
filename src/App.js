import Header from "./Header";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPosts from "./pages/NewPosts";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Posts />}></Route>
        <Route path="/signin" exact element={<Signin />}></Route>
        <Route path="/new-post" exact element={<NewPosts />}></Route>
        <Route path="/posts/:postId" exact element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
