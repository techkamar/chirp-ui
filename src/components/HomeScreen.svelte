<script>
	import {onMount} from 'svelte';
	import {BACKEND_HOST,GET_ALL_POSTS,GET_USER_DETAIL} from '../lib/js/constants'
	import {getCallResponseJSON} from '../lib/js/util';
	import Post from './Post.svelte';
	import MakePost from './MakePost.svelte';
	let posts = [];
	let userId = "";
	let displayName = "";

	function updateUserId(){
		localStorage.setItem("USER_ID",userId);
		setDisplayName();
	}
	async function setDisplayName(){
		let url = BACKEND_HOST+GET_USER_DETAIL(userId);
		let userDetails = await getCallResponseJSON(url);
		displayName = userDetails.display_name;
	}
	async function refreshPosts(){
		//Fetch all Posts
		let url = BACKEND_HOST+GET_ALL_POSTS;
		posts = await getCallResponseJSON(url);
	}
	onMount(async ()=>{
		await refreshPosts();
	})
</script>

<section class="main-container">
	<div class="left-pane">
		<p> User ID </p>
		<input type="text" bind:value={userId}/>
		<button on:click={()=>{updateUserId()}}> Set </button>
	</div>
	<div class="center-main">
		<p> Welcome {displayName}.</p>
		<MakePost callback={refreshPosts}/>
		{#each posts as post, i}
			<Post id = {post.id} content={post.content} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby} />
		{/each}
	</div>
	<div class="right-pane">

	</div>
</section>

<style>
	.main-container{
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 5fr 1fr;
	}
</style>