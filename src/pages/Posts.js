import React from "react";
import { useLocation } from 'react-router-dom'
import { Item } from "semantic-ui-react";
import { Waypoint } from "react-waypoint";
import firebase from "../utils/firebase";
import Post from "../components/Post";
function Posts() {
    const [posts, setPosts] = React.useState([]);
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get("topic");
    const lastPostSnapshotRef = React.useRef();

    React.useEffect(() => {
        if (currentTopic) {
            console.log('currentTopic', currentTopic)
            firebase
                .firestore()
                .collection("posts")
                .where('topic', '==', currentTopic)
                .orderBy("createdAt", 'desc')
                .limit(6)
                .get()
                .then((collectionSnapshot) => {
                    const data = collectionSnapshot.docs.map((docSnapshot) => {
                        const id = docSnapshot.id;
                        return { ...docSnapshot.data(), id };
                    });
                    lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                    console.log('lastPostSnapshotRef', lastPostSnapshotRef.current)
                    setPosts(data);
                });
        } else {
            firebase
                .firestore()
                .collection("posts")
                .orderBy("createdAt", 'desc')
                .limit(6)
                .get()
                .then((collectionSnapshot) => {
                    const data = collectionSnapshot.docs.map((docSnapshot) => {
                        const id = docSnapshot.id;
                        return { ...docSnapshot.data(), id };
                    });
                    lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                    console.log('lastPostSnapshotRef', lastPostSnapshotRef.current)
                    setPosts(data);
                });
        }
    }, [currentTopic]);

    /**預設16等分 */
    return (
        <>
            <Item.Group>
                {posts.map((post) => {
                    return (
                        <Post post={post} key={post.id} />
                    );
                })}
            </Item.Group>
            <Waypoint onEnter={() => {
                console.log('lastPostSnapshotRef.current', lastPostSnapshotRef.current)
                if (lastPostSnapshotRef.current) {
                    console.log('IF= > lastPostSnapshotRef.current', lastPostSnapshotRef.current)
                    if (currentTopic) {
                        console.log('currentTopic', currentTopic)
                        firebase
                            .firestore()
                            .collection("posts")
                            .where('topic', '==', currentTopic)
                            .orderBy("createdAt", 'desc')
                            .startAfter(lastPostSnapshotRef.current)
                            .limit(3)
                            .get()
                            .then((collectionSnapshot) => {
                                const data = collectionSnapshot.docs.map((docSnapshot) => {
                                    const id = docSnapshot.id;
                                    return { ...docSnapshot.data(), id };
                                });
                                lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                                setPosts([...posts, ...data]);
                            });
                    } else {
                        console.log('ELSE => lastPostSnapshotRef.current', lastPostSnapshotRef.current)
                        firebase
                            .firestore()
                            .collection("posts")
                            .orderBy("createdAt", 'desc')
                            .startAfter(lastPostSnapshotRef.current)
                            .limit(3)
                            .get()
                            .then((collectionSnapshot) => {
                                const data = collectionSnapshot.docs.map((docSnapshot) => {
                                    const id = docSnapshot.id;
                                    return { ...docSnapshot.data(), id };
                                });
                                lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                                setPosts([...posts, ...data]);
                            });
                    }
                }


            }} />
        </>
    );
}

export default Posts;
