let darkreaderint = 0;
let darkreader = setInterval(() => {
  if (darkreaderint > 50) clearInterval(darkreader)
  if ($('.darkreader').length > 0) {
    $('#anti-darkreader').fadeIn(200)
    clearInterval(darkreader)
  }
}, 200)