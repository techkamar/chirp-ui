<script>
	import {onMount} from 'svelte';
	import Post from './Post.svelte';

	onMount(()=>{
		// Fetch all posts
	})
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