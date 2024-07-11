<script>
	import {onMount} from 'svelte';
	import {BACKEND_HOST} from '../lib/js/constants'
	import {getCallResponseJSON} from '../lib/js/util';
	import Post from './Post.svelte';
	let posts = [];

	onMount(async ()=>{
		//Fetch all Posts
		let url = BACKEND_HOST+"/api/v1/posts";
		posts = await getCallResponseJSON(url);
		console.log(posts);
	})
</script>

<section>
	<div class="center-main">
		{#each posts as post, i}
			<Post content={post.content} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby} />
		{/each}
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