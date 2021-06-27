/**
 * Sends data collected in contact form to email after the submit button is clicked calls the toggleThankYouMessage function
 * Code written with the help of the official EmailJS tuttorial https://www.emailjs.com/docs/tutorial/creating-contact-form/
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // prevents default submit event
        emailjs.init("user_nPOPkmIg53EiBIpRGSmhi");
        emailjs.sendForm('guessing-bee', 'template_q5mqt83', this)
            .then(function () {
                // success sending email
            }, function (error) {
                // error message
                console.log('FAILED...', error);
            });
        toggleThankYouMessage();
    });
});

/**
 * Removes the contact forme and displays a thank you message on the contact page after form submision
 */
function toggleThankYouMessage() {
    let html = `
            <p class="text-center fs-2">Thank you for leaving a message.</p>
            <div class="image-container text-center col-5 col-sm-4 col-lg-3">
                <img src="assets/images/bee-happy.png" alt="Doodle of a happy bee">
            </div>
            <div class="text-center my-2">
                <a href="index.html" class="return-btn btn btn-primary">Return to game</a>
            </div>`;
    document.getElementById('container').innerHTML = html;
}