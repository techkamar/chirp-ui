<script>
	import {onMount} from 'svelte';
	import {BACKEND_HOST,GET_ALL_POSTS} from '../lib/js/constants'
	import {getCallResponseJSON} from '../lib/js/util';
	import Post from './Post.svelte';
	import MakePost from './MakePost.svelte';
	let posts = [];

	onMount(async ()=>{
		//Fetch all Posts
		let url = BACKEND_HOST+GET_ALL_POSTS;
		posts = await getCallResponseJSON(url);
		console.log(posts);
	})
</script>

<section>
	<div class="center-main">
		<MakePost/>
		{#each posts as post, i}
			<Post id = {post.id} content={post.content} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby} />
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