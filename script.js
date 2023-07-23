function onclicking(event){
    event.preventDefault();
    let myObj={
        name:event.target.uname.value,
        mail:event.target.uemail.value,
        number:event.target.unum.value,
        time:event.target.ucalltime.value
    };

    event.target.uname.value="";
    event.target.uemail.value="";
    event.target.unum.value="";
    
    axios.post("https://crudcrud.com/api/89a949c8868a407aa5fe6169b7bcb659/apointmentData",myObj)
    .then((res)=>{
        showUserOnScreen(res.data);
        console.log(res.data)})
    .catch((err)=>{
        document.body.innerHTML= document.body.innerHTML+"<h4>Something Went Wrong</h4>"
        console.log(err)});

}    
function showUserOnScreen(user)
{
    let parentNode=document.getElementById('listofitems');
    const childNode=`<li id=${user._id}>Name: ${user.name} - mail: ${user.mail} - Ph no.: ${user.number}
            <button onclick=deleteUser('${user._id}')>Delete User</button>
            <button onclick=editUserDetail('${user.mail}',"${user.name}",'${user.number}','${user._id}')>Edit User</button>
            </li>`
    parentNode.innerHTML=parentNode.innerHTML + childNode; 
}
//function to delete user
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/89a949c8868a407aa5fe6169b7bcb659/apointmentData/${userId}`)
       .then((response)=>{
            removeUserfromScreen(userId)
        }).catch((err)=>{
            document.body.innerHTML= document.body.innerHTML+"<h4>Something Went Wrong</h4>"
            console.log(err)
            })
    }

//function to remove user from Screen
function removeUserfromScreen(userId){
    let parent=document.getElementById('listofitems');
    const childNodeDeleted=document.getElementById(userId);
    parent.removeChild(childNodeDeleted)
}
//function to edit user
//editUserDetail
function editUserDetail(emailid,name,phonenumber,userId){
    console.log(name);
    console.log("saurabh");

    document.getElementById('name').value=name; 
    document.getElementById('email').value=emailid;
    document.getElementById('num').value=phonenumber;
    deleteUser(userId);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/89a949c8868a407aa5fe6169b7bcb659/apointmentData")
        .then((resp)=>{
            for(var  i=0;i<resp.data.length;i++){
                showUserOnScreen(resp.data[i]);
            }
        })
        .catch((err)=>{
            //if it error occured
            document.body.innerHTML= document.body.innerHTML+"<h4>Something Went Wrong</h4>"
            console.log(err);
        })
})
