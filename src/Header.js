import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';

function Header() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);
    return <Menu>
        <Menu.Item as={Link} to="/posts"> Social Cool</Menu.Item>
        <Menu.Item><Search /></Menu.Item>
        <Menu.Menu position='right'>
            {user ? (
                <>
                    <Menu.Item as={Link} to="/new-post">
                        發表文章
                    </Menu.Item>
                    <Menu.Item as={Link} to="/member">
                        會員
                    </Menu.Item>
                    <Menu.Item onClick={() => firebase.auth().signOut()}>
                        登出
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item as={Link} to="/signin">
                    註冊/登入
                </Menu.Item>
            )}
        </Menu.Menu>
    </Menu>
}

export default Header;