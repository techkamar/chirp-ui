<script>
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
</script>

<section class="box">
    <div class="content-box">{content}</div>
    <div class="info-box">
        <span>{comment_count} Comments</span>
        <span>{share_count} Shares</span>
        <span>{like_count} Likes</span>
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
</style>