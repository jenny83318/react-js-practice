import React from "react";
import firebase from "../utils/firebase";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom'
import 'firebase/auth';


function Signin() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState('register');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);
        if (activeItem === 'register') {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate("/posts");
                    setIsLoading(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            setErrorMsg("信箱已存在");
                            break;
                        case "auth/invalid-email":
                            setErrorMsg("信箱格式不正確");
                            break;
                        case "auth/weak-password":
                            setErrorMsg("密碼強度不足");
                            break;
                        default:

                    }
                    setIsLoading(false);
                })

        } else if (activeItem === 'signin') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigate("/posts");
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("error", error.code)
                    switch (error.code) {
                        case "auth/invalid-email":
                            setErrorMsg("信箱格式不正確");
                            break;
                        case "auth/user-not-found":
                            setErrorMsg("信箱不存在");
                            break;
                        case "auth/internal-error":
                            setErrorMsg("帳號或密碼錯誤");
                            break;
                        default:

                    }
                    setIsLoading(false);

                })
        }
    }
    return (
        <Container>
            <Menu widths="2">
                <Menu.Item
                    active={activeItem === 'register'}
                    onClick={() => {
                        setErrorMsg("");
                        setActiveItem('register');
                    }}>
                    註冊
                </Menu.Item>
                <Menu.Item
                    active={activeItem === 'signin'}
                    onClick={() => {
                        setErrorMsg("");
                        setActiveItem('signin')
                    }}>登入
                </Menu.Item>
                
            </Menu>
            <Form onSubmit={onSubmit}>
                <Form.Input
                    label="信箱"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="請輸入信箱" />
                <Form.Input
                    label="密碼"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="請輸入密碼"
                    type="password" />
                {errorMsg && <Message negative>{errorMsg}</Message>}
                <Form.Button loading={isLoading}>
                    {activeItem === 'register' && '註冊'}
                    {activeItem === 'signin' && '登入'}
                </Form.Button>
            </Form>
        </Container>
    );
}

export default Signin;