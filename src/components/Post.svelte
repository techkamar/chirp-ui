<script>
    import {onMount} from 'svelte';


    export let id;
    export let content;
    export let comment_count;
    export let share_count;
    export let like_count;
    export let user_id;
    export let created_date;
    let monthNoNameMap = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    }
    
    import nodp from '../lib/images/no-dp.webp';
    
    let dateTokensMap = created_date.substr(0,10).split("-");
    let displayDateVal = dateTokensMap[2]+" "+monthNoNameMap[dateTokensMap[1]]+" "+dateTokensMap[0];
    let displayName=""
    let displayPicture = nodp;
    let userName = "";

    
	import {getCallResponseJSON,postCallEmptyPayload} from '../lib/js/util';
    import {BACKEND_HOST, GET_ALL_POST_COMMENTS,LIKE_A_POST, GET_USER_DETAIL, GET_IMAGE} from '../lib/js/constants';
    import Post from './Post.svelte';
    import MakeComment from './MakeComment.svelte';

    let commentsExpanded = false;
    let comments = [];

    async function getPostOwnerDetails(){
        let url = BACKEND_HOST+GET_USER_DETAIL(user_id);
		let userDetails = await getCallResponseJSON(url);
		displayName = userDetails.display_name;
        userName = userDetails.username;
		if(userDetails.display_pic=="nodp"){
			displayPicture=nodp;
		}
		else{
			displayPicture = BACKEND_HOST+GET_IMAGE(userDetails.display_pic);
		}
    }
    onMount(async ()=>{
		await getPostOwnerDetails();
	})
</script>

<div class="post-main-container">
    <div class="post-main-inner-container">
        <div class="post-main-inner-left-container">
            <img class="circle" src={displayPicture} width="40px" height="40px"/>
        </div>
        <div class="post-main-inner-right-container">
            <div><b>{displayName}</b> @{userName} . {displayDateVal}</div>
            <div class="content-box">{content}</div>
            <slot/>
        </div>
    </div>
</div>

<style>
    .circle{
        border-radius: 50% 50% 50% 50%;
    }
    .post-main-container{
        border: 2px solid transparent;
        margin-top:10px;
    }
    .post-main-container:hover{
        border: 2px solid greenyellow;
    }
    .post-main-inner-container{
        margin-top: 5px;
        margin-left: 5px;
        display: flex;
        flex-direction: row;
    }
    .post-main-inner-right-container{
        margin-left: 15px;
    }
</style>