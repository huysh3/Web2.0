var post = function(url, data, callback) {
  $.ajax({
    url : url,
    data : data,
    type : 'POST',
    success : callback,
    error: function() {
      alert('网络连接异常，请检查网络设置');
    }
  });
}

function checkMobile(sMobile){
    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(sMobile))){
      return false;
    } else {
      return true;
    }
}

var get_verify_code = function(btn) {
  btn.on('tap', function() {
    if ($(this).hasClass('disable')) {
      return false;
    }
    if (!checkMobile($('input[name="phone"]').val())) {
      alert('请填写正确电话号码')
      return false;
    }
    $(this).addClass('disable');
    wait_for_reactive($(this), 60);
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['type'] = 0;
    post('http://s.chengxinxitong.com/app1.0.0/sendVerifyCode.action', params, function(resp) {
      var resp = eval('(' + resp + ')')
      if (resp['errno'] != 0 && 'error' in resp) {
        alert(resp['error']);
        reactive($(this));
      }
    });
  });
}

var wait_for_reactive = function(btn, remain_second) {
  remain_second -= 1;
  if (remain_second == 0) {
    reactive(btn);
  } else {
    btn.text(remain_second + 's');
    setTimeout(function() {
      wait_for_reactive(btn, remain_second);
    }, 1000);
  }
};

var reactive = function(btn) {
  btn.text('发送验证码');
  btn.removeClass('disable');
}

var get_identify_safe = function() {
  if ($.cookie('identify') == undefined) {
    window.location.href = "login.html"
  } else {
    return $.cookie('identify');
  }
}
