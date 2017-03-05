$(document).ready(function() {
  post('/get_user_info_data/', {'identify' : get_identify_safe()}, function(resp) {
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    $('.banner_num').text(resp['family_planning'].toFixed(2));
    $('div[role="family_yestoday"]').text(resp['family_yestoday'].toFixed(2));
    $('font[role="family_today"]').text(resp['family_today'].toFixed(2));
    if (resp['family_today'] >= resp['family_yestoday']) {
      $('.tendency_up').addClass('active');
    } else {
      $('.tendency_down').addClass('active');
    }
    $('div[role="family_money"]').text(resp['family_money'].toFixed(2));
    $('div[role="personal_today"]').text(resp['personal_today'].toFixed(2));
    $('div[role="personal_money"]').text(resp['personal_money'].toFixed(2));
  })
});