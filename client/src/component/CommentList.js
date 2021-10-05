import React, { useState, useEffect } from "react";


const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    console.log(comment)
    let content = '';
    switch (comment.status) {
      case 'approved':
          content = comment.content;
          break;
      case 'rejected':
          content = 'rejected content';
          break; 
      case 'pending':
          content = 'pending content';
          break; 
      default:
        break;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;