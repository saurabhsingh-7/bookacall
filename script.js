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
