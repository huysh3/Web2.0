$(document).ready(function() {
  var role = $('.card').attr('role');
  post('/get_user_info_data/', {'identify' : get_identify_safe()}, function(resp) {
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    if (role == 'family') {
      $('.card .balance').text(resp['family_money'].toFixed(2));
    } else if (role == 'personal') {
      $('.card .balance').text(resp['personal_money'].toFixed(2));
    }
  });
});