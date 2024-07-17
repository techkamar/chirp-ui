<script>
	import {onMount} from 'svelte';
	import {BACKEND_HOST,GET_ALL_POSTS,GET_USER_DETAIL, GET_IMAGE,GET_POST_LIKE_BY_USER_IDS} from '../lib/js/constants'
	import {getCallResponseJSON, postCallWithJSONResponseJSON, validateLogin} from '../lib/js/util';
	import nodp from '../lib/images/no-dp.webp';
	import Post from './Post.svelte';
	import PostInfo from './PostInfo.svelte';
	import MakePost from './MakePost.svelte';
	let posts = [];
	let userId = "";
	let displayName = "";
	let displayPicture = "";

	function updateUserId(){
		localStorage.setItem("USER_ID",userId);
		setDisplayName();
	}
	async function setDisplayName(){
		let url = BACKEND_HOST+GET_USER_DETAIL(userId);
		let userDetails = await getCallResponseJSON(url);
		displayName = userDetails.display_name;
		if(userDetails.display_pic=="nodp"){
			displayPicture=nodp;
		}
		else{
			displayPicture = BACKEND_HOST+GET_IMAGE(userDetails.display_pic);
		}
	}
	async function setPostIDUserIdMap(tmpposts,post_ids){
		let url = BACKEND_HOST+GET_POST_LIKE_BY_USER_IDS;
		let bodyJSON = {"post_ids":post_ids}
		let post_id_user_ids = await postCallWithJSONResponseJSON(url,bodyJSON)
		tmpposts = tmpposts.map(post=>{ 
					let ids = post_id_user_ids[post.id];
					if(ids==undefined)
					{
						post.like_ids = [];
					}
					else{
						post.like_ids = ids;
					}
					return post
		})
		return tmpposts;
	}
	async function refreshPosts(){
		//Fetch all Posts
		let url = BACKEND_HOST+GET_ALL_POSTS;
		let tmpposts = await getCallResponseJSON(url);
		let post_ids = tmpposts.map(post=>post.id);
		
		// Setting post only after getting all relevant information
		posts = await setPostIDUserIdMap(tmpposts,post_ids);
	}
	onMount(async ()=>{
		await validateLogin();
		await refreshPosts();
		userId = localStorage.getItem("USER_ID");
		setDisplayName();
	})
</script>

<section class="main-container">
	<div class="left-pane">
		<img src={displayPicture} width="50px" height="50px"/>
		<input type="text" bind:value={userId} placeholder="Enter User ID..."/>
		<button on:click={()=>{updateUserId()}}> Set </button>
	</div>
	<div class="center-main">
		<p> Welcome back <b>{displayName}</b>.</p>
		<MakePost callback={refreshPosts}/>
		{#each posts as post, i}
			<Post created_date = {post.created_date} id= {post.id} user_id = {post.user_id} content={post.content}>
				<PostInfo likeids = {post.like_ids.toString()} loadComments= {false} postID= {post.id} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby}/>
			</Post>
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
	.left-pane{
		display: flex;
		flex-direction: column;
	}
</style>