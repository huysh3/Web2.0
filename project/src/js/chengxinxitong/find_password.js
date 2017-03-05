$(document).ready(function() {
  listen_find();
  get_verify_code($('.verify_btn'));
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
    params['code'] = $('input[name="verify_code"]').val();
    post('/find_password/', params, function(resp) {
      if ('error' in resp) {
        alert(resp['error']);
      }
      if (resp['errno'] == 0) {
        window.location.href = "/login/";
      }
    });
  });
}