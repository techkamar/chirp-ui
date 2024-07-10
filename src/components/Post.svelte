<script>
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
</script>

<section>
    <div>{content}</div>
    <div>
        <span>{comment_count} Comments</span>
        <span>{share_count} Shares</span>
        <span>{like_count} Likes</span>
    </div>
</section>