function updateTab (tabId, info, tab) {

  var $ = __WMSJQ

  if (info.status == 'loading') {

    chrome.tabs.getSelected(null, function (tab) {
      cur_tab = tab
      chrome.pageAction.show(tabId)
      $.ajax({
        url: 'http://plugin.nodes.zouming.cc/node_chrome.php',
        type: 'get',
        dataType: 'json',
        data: { url: cur_tab.url },
        timeout: 4500,
        success: function (result) {
          if (result.className == 'accept') {
            var kztitle = '快照日期: ' + result.kz
            chrome.pageAction.setIcon({ tabId: tabId, path: 'ok.png' })
            chrome.pageAction.setTitle({ tabId: tabId, title: kztitle })
          } else if (result.className == 'warn') {
            chrome.pageAction.setIcon({ tabId: tabId, path: 'no.png' })
            chrome.pageAction.setTitle({ tabId: tabId, title: '当前页面没有被收录' })
          } else if (result.className == 'error') {
            chrome.pageAction.setIcon({ tabId: tabId, path: 'attention.png' })
            chrome.pageAction.setTitle({ tabId: tabId, title: '貌似查询的人有点多' })
          } else if (result.className == 'maxlimit') {
            chrome.pageAction.setIcon({ tabId: tabId, path: 'atn2.png' })
            chrome.pageAction.setTitle({ tabId: tabId, title: 'ip已达到今日最大查询量' })
          }
        },
        error: function (result) {
          chrome.pageAction.show(tabId)
          chrome.pageAction.setIcon({ tabId: tabId, path: 'atn2.png' })
          chrome.pageAction.setTitle({ tabId: tabId, title: '额...发生错误了' })
        }
      })
    })
  }

}

var cur_tab
chrome.tabs.onUpdated.addListener(updateTab)
chrome.tabs.getSelected(null, function (tab) {
  cur_tab = tab
})
	