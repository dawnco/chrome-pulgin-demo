//$.ajax({
//    url: 'http://wwww.b.c/chrome_status.php',
//    type: 'get',
//    dataType: 'json',
//    data: {},
//    timeout: 3000,
//    success: function (result) {
//        $.get("version.txt", function (rst) {
//            if (result.version == rst) {
//                $('#version').text(rst + ' (最新版)');
//            } else {
//                $('#version').text(rst + ' (可升级)');
//            }
//
//        });
//        if (result.status == 'normal') {
//            $('#status').text('正常').addClass('label-success');
//        } else if (result.status == 'error') {
//            $('#status').text('维护中').addClass('label-warning');
//        }
//    },
//    error: function (result) {
//        alert('error');
//    }
//});
//
//	