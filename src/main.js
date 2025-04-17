const searchBar=document.querySelector(".searchbar-container");
const profileContainer=document.querySelector(".profile-container");
const url = "https://api.github.com/users/";
const get = (param) => document.getElementById(`${param}`);
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode=false;




btnsubmit.addEventListener("click",function(){
  if(input.value !==""){
    getUserData(url+input.value);
  }
});

input.addEventListener("keydown",function(e)
  {
  if(e.key =="Enter"){
    if(input.value !==""){
      getUserData(url+input.value);
    }
  }
},false
);

input.addEventListener('click',function(){
  noresults.style.display="none";
});

btnmode.addEventListener("click",function(){
  if(darkMode ==false){
    darkModeProperties();
  }
  else {
    lightModeProperties();
  }
});

function getUserData(gitUrl){
  fetch(gitUrl).then((response)=> response.json()).then((data)=>{
    console.log(data);
    updateProfile(data);
  }).catch((error)=>{
    throw error;
  });
}

function updateProfile(data){
  if(data.message !=="notfound"){
    noresults.style.display="none";
    function checkNull(param1,param2){
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    const datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchBar.classList.toggle("active");
    profileContainer.classList.toggle("active");
  }else{
    noresults.style.display="block";
  }
}

function darkModeProperties() {
  document.body.classList.add("dark");
  modetext.innerText = "LIGHT";
  modeicon.src = "https://raw.githubusercontent.com/chiragtyagi01/git-Peek/22ed8acf2e05a585cfe928c17414d2bf9fd350f7/images/sun-icon.svg";
  darkMode = true;
}

function lightModeProperties() {
  document.body.classList.remove("dark");
  modetext.innerText = "DARK";
  modeicon.src = "https://raw.githubusercontent.com/chiragtyagi01/git-Peek/22ed8acf2e05a585cfe928c17414d2bf9fd350f7/images/moon-icon.svg";
  darkMode = false;
}

getUserData(url+"chiragtyagi01");















