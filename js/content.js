var $ = __WMSJQ

var LIMIT = 500

var CHA_TIME = 0

function apiUpdateData (str) {
  console.log(CHA_TIME, str)
  $.getJSON('https://cha.40499.cn/api/update', 'data=' + str, function (r) {
    CHA_TIME++
    if (CHA_TIME > (LIMIT - 100)) {
      setTimeout(function () {
        window.location.href = 'https://cha.huaimi.com/wxcheck/'
      }, 3000)
    }

  })
}

function apiGetData (cb) {
  $.getJSON('https://cha.40499.cn/api/get', 'limit=' + LIMIT, function (r) {
    if (r.status == 'success') {
      cb(r.data)
    }
  })
}

function getToken (cb) {
  $.getJSON('https://cha.huaimi.com/index/tool/wxCheckData/', function (r) {
    cb(r.token)
  })
}

function check (domain, token) {
  $.post('https://cha.huaimi.com/index/tool/submitweixin/', { domain: domain, wxtoken: $('#wxtoken').val(), token: token }, function (r) {
    apiUpdateData(r)
  })
}

var __handle = function () {

  if (window.location.host != 'cha.huaimi.com') {
    return false
  }

  var $ = __WMSJQ
  var emitter = new Emitter()

  apiGetData(function (arr) {
    getToken(function (token) {
      var url = ''
      arr.forEach((v) => {
        url = $.trim(v)
        if (url) {
          check(url, token)
        }
      })
    })
  })

}

__WMSJQ(function () {
  __handle()
})
 