
<script>
    import {getCallResponseJSON,postCallEmptyPayload} from '../lib/js/util';
    import {BACKEND_HOST, GET_ALL_POST_COMMENTS,LIKE_A_POST, UNLIKE_A_POST} from '../lib/js/constants';
    import {onMount} from 'svelte';
    import Post from './Post.svelte';
    import MakeComment from './MakeComment.svelte';
    import PostInfo from './PostInfo.svelte';
    import EmptyLove from './PostInfoComp/EmptyLove.svelte';
    import FilledLove from './PostInfoComp/FilledLove.svelte';

    export let postID;
    export let comment_count;
    export let share_count;
    export let like_count;
    export let isLiked = false;
    export let loadComments = false;
    export let commentsExpanded = false;
    export let comments = [];

    async function gotoPostView(){
        if(!loadComments){
            window.location.href = `/post/${postID}`;
        }
    }

    async function unlikePost(){
        // Already Liked. Then Unlike
        let unlikeURL = BACKEND_HOST+UNLIKE_A_POST(postID);
        await postCallEmptyPayload(unlikeURL);
        like_count-=1;
        isLiked = false;
    }
    async function likePost()
    {
        let url = BACKEND_HOST+LIKE_A_POST(postID);
		let likeResp = await postCallEmptyPayload(url);
        if(likeResp.status==200){
            isLiked= true;
            like_count+=1;
        }
        else if(likeResp.status==405){
            await unlikePost();
        }
    }

    async function getAllComments(){
        let url = BACKEND_HOST+GET_ALL_POST_COMMENTS(postID);
		comments = await getCallResponseJSON(url);
		commentsExpanded = true;
    }

    onMount(async()=>{
        if(loadComments){
            getAllComments();
        }
    });
</script>
<div class="info-box">
    <div class="info-box-item" on:click={()=>{gotoPostView()}} aria-details="nothing">
        <svg viewBox="0 0 24 24" class="icon-svg" width="20px" height="20px"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
        {comment_count}
    </div>
    <span class="info-box-item">
        <svg viewBox="0 0 24 24" class="icon-svg" width="20px" height="20px"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
        {share_count}</span>
    <span class="info-box-item" on:click={()=>{likePost()}}>
        {#if isLiked}
            <FilledLove/>
        {:else}
	        <EmptyLove/>
        {/if}
        {like_count}
    </span>            
</div>
<div class="comment-box">
    {#if commentsExpanded}
        {#each comments as comment,i}
            <Post id = {comment.id} 
                user_id = {comment.user_id} 
                created_date = {comment.created_date} 
                content={comment.content} 
                comment_count={comment.commentedby} 
                like_count={comment.likedby} 
                share_count={comment.sharedby+comment.quotedby}>

                <PostInfo loadComments= {false} 
                    postID= {comment.id} 
                    comment_count={comment.commentedby} 
                    like_count={comment.likedby} 
                    share_count={comment.sharedby+comment.quotedby}/>

            </Post>
        {/each}
        <MakeComment callback={getAllComments}  parentPostID={postID}/>
    {/if}
</div>

<style>
    .info-box{
        width: 200px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .icon-svg:hover{
        fill: crimson;
    }
    .info-box-item:hover{
        color: crimson;
        cursor: pointer;
    }
    .comment-box{
        margin-left:20px;
    }
</style>