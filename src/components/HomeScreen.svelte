<script>
	import {onMount} from 'svelte';
	import {BACKEND_HOST,GET_ALL_POSTS,GET_LOGGED_IN_USER_DETAILS, LOGOUT,  GET_IMAGE,GET_POST_LIKE_BY_USER_IDS} from '../lib/js/constants'
	import {getCallResponseJSON, postCallWithJSONResponseJSON, validateLogin} from '../lib/js/util';
	import nodp from '../lib/images/no-dp.webp';
	import Post from './Post.svelte';
	import PostInfo from './PostInfo.svelte';
	import MakePost from './MakePost.svelte';
	let posts = [];
	let userId = "";
	let displayName = "";
	let displayPicture = "";

	async function setDisplayName(){
		let url = BACKEND_HOST+GET_LOGGED_IN_USER_DETAILS;
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
	async function logout(){
		let url = BACKEND_HOST+LOGOUT;
		await getCallResponseJSON(url);
		window.location.href="/";
	}
	onMount(async ()=>{
		await validateLogin();
		await refreshPosts();
		setDisplayName();
	})
</script>

<section class="main-container">
	<div class="left-pane">
		<img src={displayPicture} width="150px" height="150px"/>
		<button on:click={()=>{}} class="settings-btn"> Change Display Picture</button>
		<button on:click={()=> {logout()}} class="settings-btn black-btn"> Sign Out </button>
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
	.settings-btn{
		padding: 15px;
		border-radius: 3px;
		margin-top: 5px;
		border: none;
		color: white;
		cursor: pointer;
		background-color: #FA8072;
		width: 100%;
		font-size: 13px;
		opacity: 0.5;
	}
	.black-btn{
		background-color: black;
	}
	.settings-btn:hover{
		opacity: 1;
	}
</style>