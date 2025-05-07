function logout()
{
    fetch(`../../backend/api/auth/logout.php`)
    .then(response => response.json())
    .then(data => {
        console.log("logout?: ", data);
    })
    .catch(error => {
      console.error('Error fetching get_cart.php:', error);
    });
}