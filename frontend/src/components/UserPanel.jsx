import React, { useState, useEffect } from "react";
import API from "../utils/api";

const UserPanel = () => {
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await API.get("/posts");
        setPosts(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/posts", { content });
        alert("Post has been created ");
        setContent("");
        fetchPosts();
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div>
            <h2>User Panel</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit">Submit Post</button>
            </form>
            
            {posts.map(post => <p key={post._id}>{post.content}</p>)}
        </div>
    );
};

export default UserPanel;
