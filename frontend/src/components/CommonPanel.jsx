import { useEffect, useState } from "react";
import API from "../utils/api";

const CommunityPanel = () => {
    const [posts, setPosts] = useState([]);
     const fetchapproveposts= async ()=>{
        try {
            const result = await API.get('/posts/approved-posts')
            console.log(result)
            setPosts(result.data);
        } catch (error) {
            console.log(err);
        }
    }
    useEffect(() => {
       fetchapproveposts()
    }, []);

    return (
        <div>
            <h2>Community Posts</h2>
            {posts?.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post">
                        <p>{post.content}</p>
                    </div>
                ))
            ) : (
                <p>No approved posts yet.</p>
            )}
        </div>
    );
};

export default CommunityPanel;
