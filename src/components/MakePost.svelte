<script>
    import {postCallWithJSONResponseText} from '../lib/js/util';
    import {BACKEND_HOST, MAKE_POST} from '../lib/js/constants';

    export let callback;
    let postContent = "";

    async function makePost(){
        let url = BACKEND_HOST+MAKE_POST;
		let body_json = {"content": postContent};
        let id = postCallWithJSONResponseText(url,body_json);
        callback();
    }
</script>
<div class="post-box-main">
    <p> Make a Post</p>
    <textarea bind:value={postContent} rows="4"/>
    <div class="split-two">
        <button class="blue-btn" on:click={()=>makePost()}>Post</button>
    </div>
    <p></p>
</div>

<style>
    .post-box-main{
        display: flex;
        flex-direction: column;
    }
    .split-two{
        display: flex;
        flex-direction: row-reverse;
        margin-top: 10px;
    }
    .blue-btn{
        background-color: blue;
        color: white;
        padding:10px;
        border:0px none;
        border-radius:10px;
        opacity: 0.5;
    }
    .blue-btn:hover{
        opacity:1.0;
        cursor: pointer;
    }
</style>