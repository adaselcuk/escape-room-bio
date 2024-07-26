document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pollinatorForm');
    const responsesDiv = document.getElementById('responses');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = {};

        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        console.log('Form Data as JSON:', formDataObj);

        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });

        if (response.ok) {
            console.log('Form submitted successfully');
            updateResponses();
            form.reset();  
        } else {
            alert('There was an error submitting your response. Please try again.');
        }
	});

	// 	const responseText = formDataObj.response;
	// 	if (responseText.trim() !== "") {
	// 		const responseBox = document.createElement('div');
	// 		responseBox.className = 'response-box';
	// 		responseBox.textContent = responseText;
	// 		responsesDiv.appendChild(responseBox);
	// 		responsesDiv.style.display = 'grid';
	// 	}
    // });

    async function updateResponses() {
        console.log('updateResponses called');
        responsesDiv.innerHTML = '<h2>All Responses</h2>'; 

        try {
            const data = await fetch('/responses');
            console.log('Fetch /responses request made');
            const responses = await data.json();
            console.log('Fetched responses:', responses);

            responses.forEach(response => {
				const responseBox = document.createElement('div');
				responseBox.className = 'response-box';
                responseBox.textContent = response.response || response.answer || "No response";
                responsesDiv.appendChild(responseBox);
                console.log('Appended response:', responseBox.textContent);
            });

            responsesDiv.style.display = 'grid';
			responsesDiv.style.gridTemplateColumns = 'repeat(2, 1fr)';
			responsesDiv.style.gap = '10px';
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    }
});