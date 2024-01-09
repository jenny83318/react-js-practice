import React from "react";
import { Item, Image, Icon } from "semantic-ui-react";
import firebase from "../utils/firebase";
import { Link } from 'react-router-dom';
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
        <>
            <Item.Group>
                {posts.map((post) => {
                    return (
                        <Item key={post.id} as={Link} to={`/posts/${post.id}`}>
                            <Item.Image src={post.imgURL || "https://react.semantic-ui.com/images/wireframe/image.png"} size="small" />
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
                                <Item.Extra>留言 {post.commentsCount || 0} . 讚 {post.likedBy?.length || 0}</Item.Extra>
                            </Item.Content>
                        </Item>
                    );
                })}
            </Item.Group>
        </>
    );
}

export default Posts;
