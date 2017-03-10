$(document).ready(function() {
  listen_regist();
  get_verify_code($('.verify_btn'));
});

var listen_regist = function() {
  $('.regist_btn').on('tap', function() {
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['password'] = $('input[name="password"]').val();
    if (params['password'] != $('input[name="confirm"]').val()) {
      alert('密码与确认密码不一致');
      return false;
    }
    params['code'] = $('input[name="verify_code"]').val();
    post('http://s.chengxinxitong.com/app1.0.0/regUserInfo.action', params, function(resp) {
      var resp = eval('(' + resp + ')')
      if (resp['errno'] == 0) {
        alert('注册成功！')
        window.location.href = "login.html";
      } else {
        alert(resp['error']);
      }
    });
  });
}
