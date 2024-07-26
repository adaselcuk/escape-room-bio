document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pollinatorForm');
    const responsesDiv = document.getElementById('responses');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch('/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Form submitted successfully');
            updateResponses();
            form.reset();  
        } else {
            alert('There was an error submitting your response. Please try again.');
        }
    });

    async function updateResponses() {
        console.log('updateResponses called');
        responsesDiv.innerHTML = '<h2>All Responses</h2>'; 

        try {
            const data = await fetch('/responses');
            console.log('Fetch /responses request made');
            const responses = await data.json();
            console.log('Fetched responses:', responses);

            responses.forEach(response => {
                const p = document.createElement('p');
                p.textContent = response.response || response.answer || "No response";
                responsesDiv.appendChild(p);
                console.log('Appended response:', p.textContent);
            });

            responsesDiv.style.display = 'block';
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    }
});