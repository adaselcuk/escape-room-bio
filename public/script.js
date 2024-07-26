document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('pollinatorForm');
	form.addEventListener('submit', async (event) => {
	  event.preventDefault();
  
	  const formData = new FormData(form);
	  const responseText = formData.get('response');
  
	  const response = await fetch('/submit', {
		method: 'POST',
		body: formData
	  });
  
	  if (response.ok) {
		const responsesDiv = document.getElementById('responses');
		responsesDiv.innerHTML = '<h2>All Responses</h2>'; 
  
		const data = await fetch('/responses');
		const responses = await data.json();
  
		const p = document.createElement('p');
		p.textContent = responseText;
		responsesDiv.appendChild(p);
  
		responses.forEach(response => {
		  const p = document.createElement('p');
		  p.textContent = response.response;
		  responsesDiv.appendChild(p);
		});
  
		responsesDiv.style.display = 'block';
		form.style.display = 'none'; 
	  } else {
		alert('There was an error submitting your response. Please try again.');
	  }
	});
  });
  