import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPost] = useState({}) 

    const fetchPosts = async () => {
        try { 
            const res = await axios.get('http://posts.com/posts');
            setPost(res.data);
            console.log("client posts get",res.data);
        } catch(error) {
            console.log("get error: ",error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const renderPosts = Object.values(posts).map(post => {
    return (
        <div className="card"
        style={{ width: '30%', marginBottom: '20px'}}
        key={post.id}>
            <div>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={post.id}/>
            </div>
        </div> 
        
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderPosts}
        </div>;
};
export default PostList;
