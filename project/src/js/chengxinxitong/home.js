$(document).ready(function() {
  init_banner();
  init_msg();
  init_digit();
});

var init_banner = function() {
  var slider = $('#carousel');
  var item_container = slider.children('.carousel-inner');
  var indicator_list = slider.children('.carousel-indicators');
  post('http://s.chengxinxitong.com/app1.0.0/getBannerListData.action', {'identify' : get_identify_safe()}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] == 0) {
      for (var idx = 0; idx < resp['banner'].length; idx++) {
        var item = resp['banner'][idx];
        item_container.append('<a target="_top" href="' + ('url' in item ? item['url'] : '#') + '" class="item' + (idx == 0 ? ' active' : '') + '"><img src="' + item['image'] + '" alt="' + item['name'] + '" /></a>')
        indicator_list.append('<li data-target="#' + slider.attr('id') + '" data-slide-to="' + idx + '" ' + (idx == 0 ? 'class="active"' : '')+ '></li>');
      }
      slider.carousel({interval:false});
      init_slide_action(slider);
    } else {
      alert(resp['error'])
    }
  });
}

var init_slide_action = function(slider) {
  $(slider.find('.item')).on('swipeleft', function() {
    slider.carousel('next');
  });
  $(slider.find('.item')).on('swiperight', function() {
    slider.carousel('prev');
  });
}

var init_msg = function() {
  post('http://s.chengxinxitong.com/app1.0.0/getMessageNoReadCount.action', {'identify' : get_identify_safe()}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    if (resp['count'] > 0) {
      $('.have_msg_point').show();
    }
  });
}

var init_digit = function() {
  post('http://s.chengxinxitong.com/app1.0.0/getUserInfoData.action', {'identify' : get_identify_safe()}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    window.localStorage.logo = resp['logo']
    // 获取家庭账户
    $('.app_container[role="family_account"] .app_hint').text(resp['family_money']);
    $('.app_container[role="user_account"] .app_hint').text(resp['personal_money']);
    $('.app_container[role="treasure"] .app_hint').text(resp['personal_today']);
    $('.app_container[role="clock_in"] .app_hint').text(resp['sign_money']);
  })
}
