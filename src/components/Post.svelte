<script>
    export let id;
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
	import {getCallResponseJSON} from '../lib/js/util';
    import {BACKEND_HOST, GET_ALL_POST_COMMENTS} from '../lib/js/constants';
    import Post from './Post.svelte';

    let commentsExpanded = false;
    let comments = [];

    async function getAllComments(postID){
        if(commentsExpanded){
            commentsExpanded = false;
            return;
        }
        let url = BACKEND_HOST+GET_ALL_POST_COMMENTS(postID);
		comments = await getCallResponseJSON(url);
		commentsExpanded = true;
    }
</script>

<section class="box">
    <div class="content-box">{content}</div>
    <div class="info-box">
        <div class="info-box-item" on:click={()=> {getAllComments(id)}}>
            {comment_count} Comments
        </div>
        <span class="info-box-item">{share_count} Shares</span>
        <span class="info-box-item">{like_count} Likes</span>
    </div>
    {#if commentsExpanded}
    <div class="reply-box">
        <p> Replies</p>
        {#each comments as comment,i}
        <Post id = {comment.id} content={comment.content} comment_count={comment.commentedby} like_count={comment.likedby} share_count={comment.sharedby+comment.quotedby} />
        {/each}
    </div>
    {/if}
</section>

<style>
    .box{
        border: 1px solid black;
    }
    .info-box{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .content-box{
        padding-left:20px;
        background-color: aqua;
    }
    .info-box-item:hover{
        background-color: black;
        color: white;
        cursor: pointer;
    }
    .reply-box{
        margin-left:20px;
    }
</style>