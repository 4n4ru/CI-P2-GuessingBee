/**
 * Sends data collected in contact form to email after the submit button is clicked
 * Code written with the help of the official EmailJS tuttorial https://www.emailjs.com/docs/tutorial/creating-contact-form/
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('guessing-bee', 'template_q5mqt83', this)
            .then(function () {

            }, function (error) {
                console.log('FAILED...', error);
            });
        toggleThankYouMessage();
    });
});

function toggleThankYouMessage(){
    document.getElementById('contact-form').style.display = 'none';
        let html = `
            <p class="text-center fs-2">Thank you for leaving a message.</p>
            <div class="image-container text-center">
                <img src="assets/images/bee-happy.png" alt="Doodle of a happy bee">
            </div>
            <div class="text-center my-2">
                <a href="index.html" class="return-btn btn btn-primary">Return to game</a>
            </div>`;
        document.getElementById('container').innerHTML = html;
}