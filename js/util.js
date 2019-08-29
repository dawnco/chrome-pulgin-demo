/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var TimeUtil = {
    
    __id : 1, //id自增
    __data : {}, //全局变量数据

    __count : function (specify, fn, title){
        document.title = "倒计时 " + (this.__data[specify].time--) + "s : " + title;
         if(this.__data[specify].time < 0){
             fn()
             //取消计时
             clearInterval(this.__data[specify].id);
         }
    },
    /**
     * 倒计时跳转
     * @param {type} time    倒计时时间  单位 秒
     * @param {type} specify 计时器名字
     * @param {type} url     倒计时结束后跳转的url
     * @param {type} title   倒计时结束后要做什么的描述
     * @returns {undefined}
     */
    __jump : function(time, specify, url, title){
        this.__action(time, specify, function(){
             window.location.href = url;
        }, title);
    },
    
    __action : function (time, specify, fn, title){
        
        var self = this;

        self.__data[specify] = {time: time, id : 0};
        self.__data[specify].id = setInterval(function(){
            self.__count(specify, function(){
               fn();
            }, title);
        }, 1000);
    },
    
    /**
     * 倒计时执行fn
     * @param {type} time
     * @param {type} fn
     * @param {type} title
     * @returns {undefined}
     */
    action : function(time, fn, title){
        var id = this.__id ++;
        this.__action(time, id, fn, title);
    },
    /**
     * 倒计时跳转
     * @param {type} time
     * @param {type} url
     * @param {type} title
     * @returns {undefined}
     */
    jump : function(time, url, title){
        var id = this.__id++;
        this.__jump(time, id, url, title);
    }
    
}


Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "i+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function WMSLOG(msg) {
    console.log(new Date().format('yyyy-MM-dd hh:ii:ss') + " " + msg);
}


var emitter = new Emitter();


/**
 * 去掉html标签
 * @param {type} str
 * @returns {unresolved}
 */
function strip_tags(str){
    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}

/**
 * 去掉首位空格
 * @param {type} str
 * @returns {unresolved}
 */
function trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

/**
 * 
 * @param {type} url
 * @param {type} left 是否左匹配
 * @returns {Boolean}
 */
function current_url_match(url, left){
    
    var isleft = left || false;
    var current_url = window.location.href;
    
    if(isleft){
        
        if(current_url.indexOf(url) === 0){
            return true;
        }else{
            return false
        }
        
    }
    
    
    if(current_url.indexOf(url) > 0){
        return true;
    }else{
        return false;
    }
}