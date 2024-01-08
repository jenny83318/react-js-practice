import React from "react";
import { useParams } from "react-router-dom";
import {Container, Grid, Header, Icon, Image,Segment} from "semantic-ui-react";
import Topics from "../components/Topics";
import firebase from "../utils/firebase";

function Post() {
    const { postId } = useParams();
    const [post, setPost] = React.useState({
        author: {},
    });
    React.useEffect(() => {
        firebase
            .firestore()
            .collection("posts")
            .doc(postId)
            .onSnapshot((docSnapshot) => {
                const data = docSnapshot.data();
                console.log("POST=>", data);
                setPost(data);
            })
    }, []);
    function toggoleCollected() {
        const uid = firebase.auth().currentUser.uid;
        if (isCollected) {
            firebase.firestore().collection("posts").doc(postId).update({
                collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
            });
        } else {
            firebase.firestore().collection("posts").doc(postId).update({
                collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
            });
        }

    }
    const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid);

    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Topics />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {post.author.postURL ? (
                            <Image src={post.author.postURL} />
                        ) : (
                            <Icon name="user circle" />
                        )}
                        {post.author.displayName || "使用者"}
                        <Header>
                            {post.title}
                            <Header.Subheader>
                                {post.topic} . {post.createdAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        </Header>
                        <Image src={post.imgURL}></Image>
                        <Segment basic vertical>
                            {post.content}
                        </Segment>
                        <Segment basic vertical>
                            留言 0.讚 0 .
                            <Icon name="thumbs up outline" color="grey" />.
                            <Icon name={isCollected ? 'bookmark' : 'bookmark outline'}
                                color={isCollected ? 'blue' : 'grey'}
                                link onClick={toggoleCollected} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Post;
