function logout()
{
  localStorage.clear();
  sessionStorage.clear();

  fetch(`../../backend/api/auth/logout.php`)
  .then(response => response.json())
  .then(data => {
      console.log("logout?: ", data);
  })
  .catch(error => {
    console.error('Error fetching get_cart.php:', error);
  });
}