<script>
	import Post from '../components/Post.svelte';
</script>

<section>
	<div class="center-main">
		<Post content="Hi" comment_count=1 like_count=1 share_count=100 />
	</div>
</section>

<style>
	.center-main{
		margin:0px auto;
		width: 900px;
		height: 100vh;
		background-color: ivory;
	}
</style>