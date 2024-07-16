//export const BACKEND_HOST = "http://localhost:8080"; // if backend host is empty. That means we are running in NGINX
export const BACKEND_HOST = "";

// API end points covered here
export const GET_ALL_POSTS = "/api/v1/posts";
export const MAKE_POST = "/api/v1/post";
export function GET_SINGLE_POST_BY_ID(postID){
    return `/api/v1/post/${postID}`;
}

export function MAKE_COMMENT(parentPostID){
    return `/api/v1/post/${parentPostID}/comment`;
}

export function GET_ALL_POST_COMMENTS(postID){
    return `/api/v1/post/${postID}/comments`;
}

export function LIKE_A_POST(postID){
    return `/api/v1/post/${postID}/like`;
}

export function UNLIKE_A_POST(postID){
    return `/api/v1/post/${postID}/unlike`;
}

export function GET_USER_DETAIL(userID){
    return `/api/v1/user/${userID}`;
}

export function GET_IMAGE(imageName){
    return `/api/v1/images/${imageName}`;
}