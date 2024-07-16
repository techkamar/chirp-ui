<script>
	import Post from '../../../components/Post.svelte';
	import PostInfo from '../../../components/PostInfo.svelte';
	import {BACKEND_HOST,GET_SINGLE_POST_BY_ID,GET_POST_LIKE_BY_USER_IDS} from '../../../lib/js/constants'
	import {getCallResponseJSON,postCallWithJSONResponseJSON} from '../../../lib/js/util';
	import {onMount} from 'svelte';
	
	export let data;
	let postLoaded = false;
	let post = {};

	async function refreshPost(){
		//Fetch single post by ID
		let url = BACKEND_HOST+GET_SINGLE_POST_BY_ID(data.parameter.postID);
		let temp = await getCallResponseJSON(url);
		return temp;
	}

	async function setPostIDUserIdMap(temppost){
		let url = BACKEND_HOST+GET_POST_LIKE_BY_USER_IDS;
		let bodyJSON = {"post_ids":[temppost.id]}
		let post_id_user_ids = await postCallWithJSONResponseJSON(url,bodyJSON)
		let likeidstmp = post_id_user_ids[temppost.id];
		if(likeidstmp==undefined){
			likeidstmp = [];
		}
		temppost.like_ids = likeidstmp
		return temppost;
	}

	onMount(async ()=>{
		let temppost = await refreshPost();
		
		// Setting post only after getting all relevant information
		post = await setPostIDUserIdMap(temppost);
		postLoaded = true;
	})
</script>

<section class="main-container">
	{#if postLoaded}
		<Post created_date = {post.created_date} id= {post.id} user_id = {post.user_id} content={post.content}>
			<PostInfo likeids = {post.like_ids.toString()} loadComments= {true} postID= {post.id} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby}/>
		</Post>
	{/if}
</section>

<style>
	.main-container{
		margin: 0px auto;
		max-width: 80vw;
	}
</style>