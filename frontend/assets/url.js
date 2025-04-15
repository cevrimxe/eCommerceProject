// Function to update the URL with checked checkbox values
function updateURLState() {
    const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    const checkedValues = [];
    
    // Loop through all checkboxes to collect checked values
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value);
        }
    });

    // Create a new URLSearchParams object
    const params = new URLSearchParams();
    checkedValues.forEach(value => {
        params.append('selected', value); // 'selected' is the parameter key
    });

    // Update the URL without reloading the page
    window.history.pushState({}, '', '?' + params.toString());
}

// Event listener for checkbox changes
document.querySelector('.sidebar').addEventListener('change', function() {
    updateURLState();
});

/* // Function to read state from the URL and check corresponding checkboxes
function readStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const selectedValues = params.getAll('selected'); // Get all values of 'selected'

    // Loop through checkboxes and check those that match the URL parameters
    const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (selectedValues.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    // Display the selected options from the URL
    let displayText = 'Selected Options: ' + (selectedValues.length > 0 ? selectedValues.join(', ') : 'None');
    document.getElementById('stateDisplay').innerHTML = displayText;
}

// Call the function to read state from URL when the page loads
window.onload = readStateFromURL; */