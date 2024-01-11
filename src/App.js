import { BrowserRouter, Outlet, Route, Routes, Navigate } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import React  from "react";
import firebase from "./utils/firebase";
import Header from "./Header";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Topics from "./components/Topics";
import NewPosts from "./pages/NewPosts";
import MemberMenu from "./components/MemberMenu";
import MyPosts from "./pages/MyPosts";
import MyCollections from "./pages/MyCollections";
import MySettings from "./pages/MySettings";

function App() {
    const [user, serUser] = React.useState(undefined);
    React.useEffect(()=>{
        firebase.auth().onAuthStateChanged((currentUser)=>{
            serUser(currentUser);
            console.log("current User", currentUser)
        })
    },[])
    return (
        <BrowserRouter>
            <Header user={user}/>
            <Routes>
                <Route path="/posts" element={<PostView />} >
                    <Route path="/posts/:postId" exact element={user !== null ? <Post /> : <Navigate to="/posts" />} />
                    <Route path="/posts" element={<Posts />} /></Route>
                <Route path="/signin" exact element={ user !== null? <Navigate to="/posts" /> : <Signin />}></Route>
                <Route path="/new-post" exact element={user !== null? <NewPosts /> : <Navigate to="/posts" />}></Route>
                <Route path="/member" element={<MemberView user={user} />}>
                    <Route path="/member/posts" element={<MyPosts />} />
                    <Route path="/member/collections" element={<MyCollections user={user}  />} />
                    <Route path="/member/settings" element={<MySettings user={user}  />} />
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

function MemberView({user}) {
    return ( user? <Container>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}>
                    <MemberMenu />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Outlet />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
        </Grid>
    </Container> :(<Navigate to="/posts"/>))
}
export default App;
