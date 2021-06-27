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
    });
});