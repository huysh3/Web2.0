$(document).ready(function() {
  var role = $('.card').attr('role');
  post('http://s.chengxinxitong.com/app1.0.0/getUserInfoData.action', {'identify' : get_identify_safe()}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    if (role == 'family') {
      $('.card .balance').text(resp['family_money']);
    } else if (role == 'personal') {
      $('.card .balance').text(resp['personal_money']);
    }
  });
});
