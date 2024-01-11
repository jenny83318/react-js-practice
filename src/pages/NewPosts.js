import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Header, Image } from "semantic-ui-react";
import firebase from "../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

function NewPosts() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectSnapshot) => {
                const data = collectSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                console.log("data:", data);
                setTopics(data);
            });
    }, []);
    const options = topics.map((topic) => {
        return {
            text: topic.name,
            value: topic.name,
        };
    });

    const previewUrl = file
        ? URL.createObjectURL(file)
        : "https://react.semantic-ui.com/images/wireframe/image.png";

    function onSubmit() {
        setIsLoading(true);
        const documentRef = firebase.firestore().collection("posts").doc();
        const metadata = { contentType: file.type };
        const fileRef = firebase.storage().ref("post-images/" + documentRef.id);
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imgURL) => {
                const sendData = {
                    title,
                    content,
                    topic: topicName,
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || "",
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email,
                    },
                    imgURL,
                };
                console.log("sendData = ", sendData);
                documentRef.set(sendData).then(() => {
                    setIsLoading(false);
                    navigate("/posts");
                });
            });
        });
    }
    return (
        <Container>
            <Header>發表文章</Header>
            <Form onSubmit={onSubmit}>
                <Image src={previewUrl} size="small" floated="left" />
                <Button basic as="label" htmlFor="post-image">
                    上傳文章圖片
                </Button>
                <Form.Input
                    type="file"
                    id="post-image"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Form.Input
                    placeholder="請輸入文章標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                    placeholder="請輸入文章內容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Form.Dropdown
                    placeholder="請選擇文章主題"
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, { value }) => setTopicName(value)}
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    );
}

export default NewPosts;
