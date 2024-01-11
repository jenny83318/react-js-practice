import { Menu, Search } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import algolia from './utils/algolia';


function Header({ user }) {
    const navigate = useNavigate();
    const [inputVal, setInputVal] = React.useState("");
    const[results, setResults] = React.useState([]);

    function onSearchChange(e, { value }) {
        setInputVal(value);

        algolia.search(value).then((result) => {
            const searchResult = result.hits.map(hit=>{
                return {
                    title: hit.title,
                    description: hit.content,
                    id: hit.objectID
                }
            });
            setResults(searchResult)
        });
    }

    function onResultSelect(e, { result }){
        navigate(`/posts/${result.id}`)
    }
    return <Menu>
        <Menu.Item as={Link} to="/posts"> Social Cool</Menu.Item>
        <Menu.Item><Search
            value={inputVal}
            onSearchChange={onSearchChange}
            results={results}
            noResultsMessage="找不到相關文章"
            onResultSelect={onResultSelect}
        /></Menu.Item>
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