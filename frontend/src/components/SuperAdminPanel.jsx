import React, { useState, useEffect } from "react";
import API from "../utils/api";

const SuperAdminPanel = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await API.get("/posts/pending-posts");
        console.log(res.data)
        setPosts(res.data);
    };

    const handleApproval = async (id, status) => {
        await API.put(`/posts/update-post/${id}`, { status });
        fetchPosts();
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div>
            <h2>SuperAdmin Panel</h2>
            {posts.map(post => (
                <div key={post._id}>
                    <p>{post.content}</p>
                    {post.status === "pending" && (
                        <>
                            <button onClick={() => handleApproval(post._id, "approved")}>Approve</button>
                            <button onClick={() => handleApproval(post._id, "rejected")}>Reject</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SuperAdminPanel;
