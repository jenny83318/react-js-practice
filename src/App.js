import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import Header from "./Header";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Topics from "./components/Topics";
import NewPosts from "./pages/NewPosts";
import MemberMenu from "./components/MemberMenu";
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/posts" element={<PostView />} >
                    <Route path="/posts/:postId" exact element={<Post />} />
                    <Route path="/posts" element={<Posts />} /></Route>
                <Route path="/signin" exact element={<Signin />}></Route>
                <Route path="/new-post" exact element={<NewPosts />}></Route>
                <Route path="/member" element={<MemberView />}>
                    <Route path="/member/posts" element="我的文章" />
                    <Route path="/member/collections" element="我的收藏" />
                    <Route path="/member/settings" element="會員資料" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
function PostView() {
    return (<Container>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Topics />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Outlet />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>)
}

function MemberView() {
    return (<Container>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <MemberMenu/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Outlet />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>)
}
export default App;
