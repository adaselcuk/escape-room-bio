document.addEventListener('DOMContentLoaded', () => {
	fetch('/responses')
	  .then(response => response.json())
	  .then(data => {
		const responsesDiv = document.getElementById('responses');
		data.forEach(response => {
		  const p = document.createElement('p');
		  p.textContent = response.response;
		  responsesDiv.appendChild(p);
		});
	  });
  });
  