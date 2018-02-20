// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the container div to set aria-hidden attr
var container = document.getElementById("container");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById("name").focus();
    container.setAttribute("aria-hidden", "true");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    container.setAttribute("aria-hidden", "false");
    document.getElementById("myBtn").focus();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        container.setAttribute("aria-hidden", "false");
        document.getElementById("myBtn").focus();
    }
}


//Function to send email via javascript on submit form
document.getElementById('contact-me').submit(function(e) {

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    if (!name.value || !email.value || !message.value) {

        

    } else {

        e.preventDefault()
        this.get(0).reset();
    }

});




