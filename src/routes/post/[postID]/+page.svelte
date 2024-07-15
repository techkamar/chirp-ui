<script>
	import Post from '../../../components/Post.svelte';
	import PostInfo from '../../../components/PostInfo.svelte';
	import {BACKEND_HOST,GET_SINGLE_POST_BY_ID} from '../../../lib/js/constants'
	import {getCallResponseJSON} from '../../../lib/js/util';
	import {onMount} from 'svelte';
	
	export let data;
	let postLoaded = false;
	let post = {};

	async function refreshPost(){
		//Fetch single post by ID
		let url = BACKEND_HOST+GET_SINGLE_POST_BY_ID(data.parameter.postID);
		post = await getCallResponseJSON(url);
	}

	onMount(async ()=>{
		await refreshPost();
		postLoaded = true;
	})
</script>

<section class="main-container">
	{#if postLoaded}
		<Post created_date = {post.created_date} id= {post.id} user_id = {post.user_id} content={post.content}>
			<PostInfo loadComments= {true} postID= {post.id} comment_count={post.commentedby} like_count={post.likedby} share_count={post.sharedby+post.quotedby}/>
		</Post>
	{/if}
</section>

<style>
	.main-container{
		margin: 0px auto;
		max-width: 80vw;
	}
</style>