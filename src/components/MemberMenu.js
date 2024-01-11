import React from "react";
import { List } from "semantic-ui-react";
import { Link, useLocation } from 'react-router-dom'

function MemberMenu() {
    const loction = useLocation();
    const menuItems = [
        { name: "我的文章", path: "/member/posts" },
        { name: "我的收藏", path: "/member/collections" },
        { name: "會員資料", path: "/member/settings" }]
    return (
        <List animated selection>
            {menuItems.map((item) => {
                return <List.Item as={Link} to={item.path} key={item.name} active={item.path ==loction.pathname}>{item.name}</List.Item>;
            })}
        </List>
    );
}

export default MemberMenu;