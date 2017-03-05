$(document).ready(function() {
  $('.login_btn').on('tap', function() {
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['password'] = $('input[name="password"]').val();
    post('/login/', params, function(resp) {
      if ('error' in resp) {
        alert(resp['error']);
      }
      if (resp['errno'] == 0) {
        var identify = resp['identify'];
        $.cookie('identify', identify, {path: '/'});
        window.location.href = "/home/";
      }
    });
  });
});