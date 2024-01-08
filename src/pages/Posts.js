import React from "react";
import { Grid, Item, Image, Icon, Container } from "semantic-ui-react";
import Topics from "../components/Topics";
import firebase from "../utils/firebase";
import {Link} from 'react-router-dom';
function Posts() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);

  /**預設16等分 */
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}>
            <Item.Group>
              {posts.map((post) => {
                return (
                  <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                    <Item.Image src={post.imgURL || "https://react.semantic-ui.com/images/wireframe/image.png" } size="small" />
                    <Item.Content>
                      <Item.Meta>
                        {post.author.photoURL ? (
                          <Image src={post.author.photoURL} />
                        ) : (
                          <Icon name="user"></Icon>
                        )}
                        {post.topic} . {post.author.displayName || "使用者"}
                      </Item.Meta>
                      <Item.Header>{post.title}</Item.Header>
                      <Item.Description>{post.content}</Item.Description>
                      <Item.Extra>留言 0 . 讚 0</Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Posts;
