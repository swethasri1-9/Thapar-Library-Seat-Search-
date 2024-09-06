document.addEventListener('DOMContentLoaded', function() {
    const rollNumberForm = document.querySelector('.roll_submit');

    rollNumberForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const rollNumberInput = document.getElementById('rollNumberInput');
        const rollNumber = rollNumberInput.value.trim();
        if (rollNumber === '') {
            alert('Please enter a roll number.');
            return;
        }

        // Create FormData object to send form data
        const formData = new FormData();
        formData.append('rollNumber', rollNumber);

        // Send POST request with form data
        fetch('checkRollNumber.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.valid) {
                // Roll number is valid, redirect to floorselection.html
                window.location.href = 'floorselection.html';
            } else {
                alert('Invalid roll number. Please enter a valid roll number.');
            }
        })
        .catch(error => {
            console.error('Error checking roll number:', error);
            alert('Error checking roll number. Please try again.');
        });
    });
});
