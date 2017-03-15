$(document).ready(function() {
  $('.login_btn').on('tap', function() {
    var params = {};
    params['mobile'] = $('input[name="phone"]').val();
    params['password'] = $('input[name="password"]').val();
    if (!checkMobile($('input[name="phone"]').val())) {
      return false;
    }
    if (!params['mobile'] || !params['password']) {
      alert('请填写全部信息！')
      return false;
    }
    post('http://s.chengxinxitong.com/app1.0.0/checkUserLogin.action', params, function(resp) {
      var res = eval('(' + resp + ')')
      console.log(res['errno'])
      if (res['errno'] == 0) {
        var identify = res['identify'];
        $.cookie('identify', identify, {path: '/'});
        window.location.href = "home.html";
      } else {
        alert(res['error'])
      }
    });
  });
});

function checkMobile(sMobile){
    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(sMobile))){
      alert('请填写正确电话号码')
      return false;
    } else {
      return true;
    }
}
