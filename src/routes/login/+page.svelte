<script>
    import {postCallWithJSONResponseJSON} from '../../lib/js/util';
    import {BACKEND_HOST, LOGIN} from '../../lib/js/constants';

    let userName = "";
    let password = "";
    let errorMessage = "";

    async function doLogin(){
        const loginURL = BACKEND_HOST+LOGIN;
        let payloadJson = {
            "username": userName,
            "password": password
        }
        let resultJson = await postCallWithJSONResponseJSON(loginURL,payloadJson)
        if(resultJson["success"]==false){
            errorMessage = resultJson["error"];
        }
        else{
            window.location.href="/";
        }
        
    }
</script>

<body>
    <div class="main">
          <h1>Chirp Micro Blogger</h1>
          <h3>Enter your login credentials</h3>
          <div>
                <label for="first">
                      Username:
                </label>
                <input type="text" 
                       id="first" 
                       name="first" 
                       bind:value={userName}
                       placeholder="Enter your Username" required>

                <label for="password">
                      Password:
                </label>
                <input type="password"
                       id="password" 
                       name="password"
                       bind:value={password}
                       placeholder="Enter your Password" required>

                <div class="wrap">
                      <button type="submit"
                              on:click={()=>{doLogin()}}>
                            Submit
                      </button>
                </div>
                <span class="errormsg">{errorMessage}</span>
            </div>
    </div>
</body>

<style>
    body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    line-height: 1.5;
    min-height: 100vh;
    background: #f3f3f3;
    flex-direction: column;
    margin: 0;
}

.main {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    transition: transform 0.2s;
    width: 500px;
    text-align: center;
}

h1 {
    color: #4CAF50;
}

label {
    display: block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: left;
    color: #555;
    font-weight: bold;
}


input {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: none;
    color: white;
    cursor: pointer;
    background-color: #4CAF50;
    width: 100%;
    font-size: 16px;
}

.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

.errormsg{
    color: red;
}
</style>