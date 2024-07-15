<script>
    import {postCallWithJSONResponseText} from '../lib/js/util';
    import {BACKEND_HOST, MAKE_COMMENT} from '../lib/js/constants';

    export let callback = () => {} ;
    export let parentPostID;
    let postContent = "";

    async function makeReply(){
        let url = BACKEND_HOST+MAKE_COMMENT(parentPostID);
		let body_json = {"content": postContent};
        let id = postCallWithJSONResponseText(url,body_json);
        postContent="";
        callback();
    }
</script>
<div class="post-box-main">
    <p> Give Reply to This Post</p>
    <textarea bind:value={postContent} rows="4"/>
    <div class="split-two">
        <div></div>
        <button on:click={()=>makeReply()}>Reply</button>
    </div>
    <p></p>
</div>

<style>
    .post-box-main{
        display: flex;
        flex-direction: column;
    }
    .split-two{
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 10px;
    }
</style>