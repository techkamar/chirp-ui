export const BACKEND_HOST = "http://localhost:8080"; // if backend host is empty. That means we are running in NGINX

// API end points covered here
export const GET_ALL_POSTS = "/api/v1/posts";

export function GET_ALL_POST_COMMENTS(postID){
    return `/api/v1/post/${postID}/comments`;
}