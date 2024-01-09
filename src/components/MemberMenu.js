import React from "react";
import { List } from "semantic-ui-react";

function MemberMenu() {
    const menuItems = [{ name: "我的文章" }, { name: "我的收藏" }, { name: "會員資料" }]
    return (
        <List animated selection>
            {menuItems.map((item) => {
                return <List.Item key={item.name}>{item.name}</List.Item>;
            })}
        </List>
    );
}

export default MemberMenu;