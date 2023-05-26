function submitform() {
    var mail=document.getElementById("email").value;
    var pass=document.getElementById("password").value;
    let admin="admin@gmail.com";
    let adminpass="admin";
    let user="user@gmail.com";
    let userpass="user";
    let manager="manager@gmail.com";
    let managerpass="manager";
    if(mail==admin && pass==adminpass){
        window.location.href="admin.html";
    }
    else if(mail==user && pass==userpass){
        window.location.href="user.html";
    }
    else if(mail==manager && pass==managerpass){
        window.location.href="1.managerPortal.html";
    }
    else{
        alert("Invalid Email or Password");
    }
}

function register() {
    window.location.href="register.html";
}