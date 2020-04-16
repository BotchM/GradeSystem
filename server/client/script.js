window.onload = () => {
    // change to get element by id first
    csv.onsubmit = async (e) => {
        e.preventDefault();
    
        let response = await fetch('/upload', {
          method: 'POST',
          body: new FormData(csv)
        });
    
        try {
            const result = await response.json();
            localStorage.setItem('data', JSON.stringify(result));

            location.href = '/dashboard.html';
        } catch (error) {
            alert("You have uploaded an invalid csv try again. Either the format or the total is not = 100")
        }
    }; 
}
