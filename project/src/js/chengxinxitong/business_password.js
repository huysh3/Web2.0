$(document).ready(function() {
  listen_find();
  $('.verify_btn').on('tap', function() {
    if ($(this).hasClass('disable')) {
      return false;
    }
    if (!checkMobile($('input[name="phone"]').val())) {
      return false;
    }    
    $(this).addClass('disable');
    wait_for_reactive($(this), 60);
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['type'] = 1;
    post('http://s.chengxinxitong.com/app1.0.0/sendVerifyCode.action', params, function(resp) {
      var resp = eval('(' + resp + ')')
      if (resp['errno'] != 0 && 'error' in resp) {
        alert(resp['error']);
        reactive($(this));
      }
    });
  });
});

var listen_find = function() {
  $('.regist_btn').on('tap', function() {
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['password'] = $('input[name="password"]').val();
    if (params['password'] != $('input[name="confirm"]').val()) {
      alert('密码与确认密码不一致');
      return false;
    }
    if (!checkMobile($('input[name="phone"]').val())) {
      return false;
    }
    params['code'] = $('input[name="verify_code"]').val();
    post('http://s.chengxinxitong.com/app1.0.0/resetUserPayword.action', params, function(resp) {
      var resp = eval('(' + resp + ')')
      if ('error' in resp) {
        alert(resp['error']);
      }
      if (resp['errno'] == 0) {
        window.location.href = "login.html";
      }
    });
  });
}

function checkMobile(sMobile){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
      alert('请填写正确电话号码')
      return false;
    } else {
      return true;
    }
}
