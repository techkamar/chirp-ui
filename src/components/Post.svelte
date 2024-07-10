<script>
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
</script>

<section class="box">
    <div class="content-box">{content}</div>
    <div class="info-box">
        <span class="info-box-item">{comment_count} Comments</span>
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