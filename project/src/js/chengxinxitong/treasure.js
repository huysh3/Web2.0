$(document).ready(function() {
  post('http://s.chengxinxitong.com/app1.0.0/getUserInfoData.action', {'identify' : get_identify_safe()}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    $('.banner_num').text(resp['family_planning']);
    $('div[role="personal_yestoday_income"]').text(resp['personal_yestoday']);
    $('font[role="personal_today"]').text(resp['personal_today']);
    $('div[role="family_money"]').text(resp['family_money']);
    $('div[role="today_income"]').text(resp['today_income']);
    $('div[role="personal_today_income"]').text(resp['personal_today']);
    $('#today_income').text(resp['personal_today']);
    $('div[role="personal_money"]').text(resp['personal_money']);

    if ( parseInt($('#yesterday_income').html()) < parseInt($('#today_income').html())  ) {
      $('.tendency_up').addClass('active');
    } else if(parseInt($('#yesterday_income').html()) == parseInt($('#today_income').html())) {
    } else {
      $('.tendency_down').addClass('active');
    }
  })
});
