import React, {useState} from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const Post = (props) => {
    const {post} = props;
    const [comment, setComment] = useState([])
    return (
    <div>
        <h1>{post.title}</h1>
        <h1>{post.id}</h1>
        <CommentList comment={comment || []}/>
        <CommentCreate setComment={setComment}/>
    </div>);
};

export default Post;