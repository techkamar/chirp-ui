<script>
    export let id;
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
	import {getCallResponseJSON} from '../lib/js/util';
    import {BACKEND_HOST, GET_ALL_POST_COMMENTS} from '../lib/js/constants';

    let commentsExpanded = false;
    let comments = [];

    async function getAllComments(postID){
        let url = BACKEND_HOST+GET_ALL_POST_COMMENTS(postID);
		let replies = await getCallResponseJSON(url);
		console.log(replies);
    }
</script>

<section class="box">
    <div class="content-box">{content}</div>
    <div class="info-box">
        <div class="info-box-item" on:click={()=> {getAllComments(id)}}>{comment_count} Comments</div>
        <span class="info-box-item">{share_count} Shares</span>
        <span class="info-box-item">{like_count} Likes</span>
    </div>
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
    }
</style>