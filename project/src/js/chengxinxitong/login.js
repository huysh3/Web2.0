$(document).ready(function() {
  $('.login_btn').on('tap', function() {
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['password'] = $('input[name="password"]').val();
    post('http://s.chengxinxitong.com/app1.0.0/checkUserLogin.action', params, function(resp) {
      var res = eval('(' + resp + ')')
      console.log(res['errno'])
      if (res['errno'] == 0) {
        var identify = res['identify'];
        $.cookie('identify', identify, {path: '/'});
        window.location.href = "home.html";
      }
    });
  });
});
