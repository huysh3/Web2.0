$(document).ready(function() {
  init_data();
  choose_type_action();
  choose_month_action();
});

var CURRENT_PAGE = 1;
var TOTAL_PAGE = 1;
var YEAR = (new Date()).getFullYear();
var MONTH = (new Date()).getMonth() + 1;

var init_data = function() {
  destroy_scrollers();
  $('.list').html('');
  get_data_from_server(YEAR, MONTH, CURRENT_PAGE, function() {
    init_scrollers(more_data);
  });
}

var choose_month_action = function() {
  $('.header_right_btn').on('tap', function() {
    var year_month_str = prompt('请以yyyy mm的形式输入待查询月份：');
    var year_month_arr = year_month_str.split(' ');
    var year = parseInt(year_month_arr[0]);
    var month = parseInt(year_month_arr[1]);
    if (month < 1 || month > 12 || year < 0) {
      alert('请输入正确的时间');
      return false;
    }
    if (year == YEAR && month == MONTH) {
      return false;
    }
    CURRENT_PAGE = 1;
    TOTAL_PAGE = 1;
    YEAR = year;
    MONTH = month;
    init_data();
    return false;
  });
}

var choose_type_action = function() {
  $('.nav_option').on('tap', function() {
    if ($(this).hasClass('active')) {
      return false;
    }
    $('.nav_option.active').removeClass('active');
    $(this).addClass('active');
    CURRENT_PAGE = 1;
    TOTAL_PAGE = 1;
    init_data();
  });
}

var more_data = function(callback) {
  var next_page = CURRENT_PAGE + 1;
  if (next_page > TOTAL_PAGE) {
    alert('没有更多数据');
    return false;
  } else {
    get_data_from_server(YEAR, MONTH, next_page, callback);
  }
}

var ITEM_STR = '' +
'<div class="item">' +
  '<div class="item_line item_name_line">' +
    '<div class="left_item textEllipsis">系统分配</div>' +
    '<div class="right_item textEllipsis">2017-02-11</div>' +
  '</div>' +
  '<div class="item_line item_balance_line">' +
    '<div class="left_item textEllipsis">余额：856.25</div>' +
    '<div class="right_item textEllipsis">+200</div>' +
  '</div>' +
'</div>';
var get_data_from_server = function(year, month, page, callback) {
  var role = $('.list_box').attr('role');
  var itype = parseInt($('.nav_option.active').attr('value'));
  var url = (role == 'family' ? 'http://s.chengxinxitong.com/app1.0.0/getFamilyAccountListData.action' : 'http://s.chengxinxitong.com/app1.0.0/getPersonalAccountListData.action');
  post(url, {'identify' : get_identify_safe(), 'year' : year, 'month' : month, 'type' : itype, 'page' : page}, function(resp) {
    var resp = eval('(' + resp + ')')
    if (resp['errno'] != 0 && 'error' in resp) {
      alert(resp['error']);
      return false;
    }
    TOTAL_PAGE = resp['page'];
    for (var idx in resp['list']) {
      var item = resp['list'][idx];
      var new_item = $(ITEM_STR);
      new_item.children('.item_name_line').children('.left_item').text(item['name']);
      new_item.children('.item_name_line').children('.right_item').text(item['time']);
      new_item.children('.item_balance_line').children('.left_item').text(item['balance']);
      new_item.children('.item_balance_line').children('.right_item').text((item['money'] > 0 ? '+' : '') + item['money']);
      $('.list').append(new_item);
    }
    if (callback) callback();
  })
}
