<script>
    let postContent = "";

    function makePost(){
        alert(postContent);
    }
</script>
<div class="post-box-main">
    <p> Make a Post</p>
    <textarea bind:value={postContent} rows="4"/>
    <div class="split-two">
        <div></div>
        <button on:click={()=>makePost()}>Post</button>
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