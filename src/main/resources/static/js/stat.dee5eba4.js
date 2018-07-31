;
! function () {
  var tlog = window.tlog || [];
  var body = document.getElementsByTagName('body')[0];
  var pageId = body && body.getAttribute('data-page-id') || '';
  var dataInfo = body && body.getAttribute('data-info') || '';
  // 涓嶆敮鎸佺被浼�.com.cn 杩欑鍩熷悕
  var domain = document.domain.split('.').slice(-2).join('.') + (location.port ? ':' + location.port : '');
  var __tlogPreSet = window.__tlogPreSet || {};
  var cookie = {
    get: function (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
          var ret;
          try {
            ret = decodeURIComponent(c.substring(nameEQ.length, c.length));
          } catch (e) {
            ret = unescape(c.substring(nameEQ.length, c.length));
          }
          return ret;
        }
      }
      return null;
    },
    set: function (name, value, days, path, domain, secure) {
      var expires;
      if (typeof days === 'number') {
        var date = new Date();
        date.setTime(date.getTime() + (days * 1000));
        expires = date.toGMTString();
      } else if (typeof days === 'string') {
        expires = days;
      } else {
        expires = false;
      }
      document.cookie = name + '=' + encodeURIComponent(value) +
        (expires ? (';expires=' + expires) : '') +
        (path ? (';path=' + path) : '') +
        (domain ? (';domain=' + domain) : '') +
        (secure ? ';secure' : '');
    }
  };
  var xmlHttp = function () {
    try {
      // Firefox, Opera 8.0+, Safari, Chrome
      return new XMLHttpRequest();
    } catch (e) {
      // IE 6+
      return new ActiveXObject('Msxml2.XMLHTTP');
    }
  };
  tlog = {
    post: function (src) {
      var param = src.split('?');
      var url = param[0];
      var data = param[1];
      var xhr = xmlHttp();

      xhr.timeout = this.timeout;
      xhr.withCredentials = true;
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(data);
    },
    pug: function () {
      if (!arguments || typeof arguments[0] != 'object') {
        return
      }
      var param = arguments[0],
        url = arguments[1] || window.location.href;
      url = url.split('#');
      var hash = url[1] || '';
      url = url[0];
      for (var i in param) {
        if (param.hasOwnProperty(i)) {
          var name = i,
            val = param[i];
          var reg = new RegExp('([\\?&#])((' + name + '=)([^&#]*))(&?)', 'i');
          var omatch = url.match(reg);
          // 娓呴櫎
          if (val !== 0 && !val && omatch) {
            (omatch[5] && omatch[2]) ? url = url.replace(omatch[2] + '&', '') : (omatch[1] && omatch[2]) ? url = url.replace(omatch[0], '') : ''
          }
          // 鏂板
          if ((val === 0 || val) && !omatch) {
            url.indexOf('?') > -1 ? url += '&' + name + '=' + val : url += '?' + name + '=' + val
          }
          // 鏇存柊
          if ((val === 0 || val) && omatch === 0 || omatch && val != omatch[4]) {
            url = url.replace(omatch[2], omatch[3] + val);
          }
        }
      }
      if (hash) {
        url += '#' + hash;
      }
      if (!arguments[1] && window.location.href != url) {
        window.location.href = url;
      } else {
        return url;
      }
    },
    gup: function (name, url) {
      var reg = new RegExp('[?&#]' + name + '=([^&#]+)', 'i'),
        ret = reg.exec(url);
      return ret ? decodeURIComponent(ret[1]) : '';
    },
    stacks: Object.prototype.toString.call(tlog) === '[object Array]' ? tlog : [],
    start: +new Date(),
    cache: {
      url: encodeURIComponent(window.location.href),
      refer: encodeURIComponent(window.document.referrer),
      resolution: window.screen ? window.screen.width + 'X' + window.screen.height : '0X0'
    },
    src: '//statistic.' + domain + '/statisticPlatform/tLog?page_id=' + pageId + '&data_info=' + dataInfo,
    timer: '',
    timeout: 2000,
    interval: 60000,
    maxLength: 2000,
    activeAction: {
      pc: {
        click: 'A000000001',
        scroll: 'A000000002',
        mousemove: 'A000000003'
      },
      h5: {
        click: 'A000000001',
        touchmove: 'A000000004'
      }
    },
    mscid: {},
    domain: domain,
    path: '/',
    defaultcode: '00000000',
    loadQueue: {},
    getEquipment: function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check ? 'h5' : 'pc';
    },
    getTime: function () {
      return +new Date();
    },
    load: function (source) {
      var t = this.getTime();
      var src = this.pug({
        t: t
      }, source);
      var notSupport = navigator.appName === 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')) < 10;
      this.lastActive = t;

      if (src.length < this.maxLength || notSupport) {
        var queue = this.loadQueue;

        queue[t] = new Image;
        // tlog 瓒呮椂澶勭悊
        queue[t].timer = setTimeout(function () {
          if (!queue[t].complete) queue[t].src = '';
          delete queue[t];
        }, this.timeout);

        queue[t].src = src;
      } else {
        this.post(src);
      }

    },
    uid: function () {
      return (+new Date() + Math.random()).toFixed(2);
    },
    toToday: function () {
      var date = new Date();
      date.setHours(0, 0, 0, 0);
      return 24 * 60 * 60 * 1000 - (this.getTime() - date.getTime());
    },
    getTlog: function () {
      return cookie.get('__tlog') || '';
    },
    update: function () {
      var __tlog = this.getTlog(),
        url = window.location.href;
      if (!__tlog) {
        this.defaultSet('update');
        return;
      } else {
        var tmp = __tlog.split('|'),
          n_imscid = this.gup('imscid', url),
          n_mscid = this.gup('mscid', url),
          sessionId = tmp[0],
          if_mscid = tmp[1],
          il_mscid = tmp[2],
          ef_mscid = tmp[3],
          el_mscid = tmp[4];
        if (n_imscid && (il_mscid !== n_imscid)) {
          il_mscid = n_imscid;
        }
        if (n_mscid && (ef_mscid !== n_mscid)) {
          el_mscid = n_mscid;
        }
        cookie.set('__tlog', [sessionId, if_mscid, il_mscid, ef_mscid, el_mscid].join('|'), this.timer, this.path, this.domain);
        this.mscid = {
          sessionId: sessionId,
          if_mscid: if_mscid,
          il_mscid: il_mscid,
          ef_mscid: ef_mscid,
          el_mscid: el_mscid
        };
      };
    },
    defaultSet: function (update) {
      var sessionId = this.uid(),
        url = window.location.href,
        defaultcode = this.defaultcode,
        if_mscid = update ? this.gup('imscid', url) || defaultcode : defaultcode,
        il_mscid = if_mscid,
        ef_mscid = update ? this.gup('mscid', url) || defaultcode : defaultcode,
        el_mscid = ef_mscid;
      cookie.set('__tlog', [sessionId, if_mscid, il_mscid, ef_mscid, el_mscid].join('|'), this.timer, this.path, this.domain);
      this.mscid = {
        sessionId: sessionId,
        if_mscid: if_mscid,
        il_mscid: il_mscid,
        ef_mscid: ef_mscid,
        el_mscid: el_mscid
      }
    },
    push: function () {
      if (!arguments.length) {
        return;
      };
      if (!this.getTlog()) {
        this.defaultSet('update');
      }
      if (this.isnew) {
        this.src = this.pug({
          'isnew': 1
        }, this.src);
        delete this.isnew;
      } else {
        this.src = this.pug({
          'isnew': ''
        }, this.src);
      };
      var user_id = cookie.get('user_id') || 0,
        user_kind = cookie.get('user_kind') || 9,
        __session_seq = cookie.get('__session_seq') || 0,
        __uv_seq = cookie.get('__uv_seq') || 0;
      var param = arguments[0].split(':'),
        arr = (param[1] || '').split('&'),
        type = param[0],
        value = arr[0],
        adds = arr.slice(1),
        src = this.pug(this.cache, this.src),
        obj = {},
        add_obj = {};
      src = this.pug(this.mscid, src);

      for (var i in adds) {
        var add = adds[i].split('=');
        if (adds.hasOwnProperty(i) && add.length === 2) add_obj[add[0]] = add[1];
      }
      src = this.pug(add_obj, src);
      switch (type) {
        case 'p':
          __session_seq = __session_seq - 0 + 1;
          __uv_seq = __uv_seq - 0 + 1;
          cookie.set('__session_seq', __session_seq, this.timer, this.path, this.domain);
          cookie.set('__uv_seq', __uv_seq, Math.round(this.toToday() / 1000), this.path, this.domain);
          obj.type = 'p';
          // push p 绫诲瀷鏀寔
          if (value) obj.page_id = value;
          break;
        case 'c': // 鐐瑰嚮
          obj = {
            c_id: value,
            type: 'c'
          };
          break;
        case 's': // 寮瑰眰
          obj = {
            s_id: value,
            type: 's'
          };
          break;
        case 'a': // 娲昏穬
          obj = {
            __active_type: value,
            type: 'a'
          };
          break;
        default: // 閫€鍑�
          obj = {
            v_stay_time: this.getTime() - this.start,
            type: 'v'
          };
          break;
      }
      src = this.pug(obj, src);
      src = this.pug({
        user_id: user_id,
        user_kind: user_kind,
        session_seq: __session_seq,
        uv_seq: __uv_seq
      }, src);

      // 闄勫姞__tlogCustomInfo
      try {
        var custom_info = window.__tlogCustomInfo || {};
        var data_info = JSON.parse(decodeURIComponent(this.gup('data_info', src)) || '{}');
        for (var j in custom_info) {
          if (custom_info.hasOwnProperty(j)) data_info[j] = custom_info[j];
        }
        src = this.pug({
          data_info: JSON.stringify(data_info) === '{}' ? '' : encodeURIComponent(JSON.stringify(data_info))
        }, src);
      } catch (e) {
        console.log('tlog: Please check the format of data-info on <body>');
      }

      this.load(src);
    },
    init: function () {
      var __uuid = cookie.get('__uuid');
      var __nnn_bad_na_ = cookie.get('__nnn_bad_na_');
      if (__nnn_bad_na_) {
        this.src = this.pug({
          __nnn_bad_na_: __nnn_bad_na_
        }, this.src);
      }
      this.src = this.pug(__tlogPreSet, this.src);
      if (!__uuid) {
        __uuid = this.uid();
        cookie.set('__uuid', __uuid, 60 * 60 * 24 * 365 * 20, this.path, this.domain);
        this.isnew = 1;
      };
      this.cache.uuid = __uuid;
      this.update();

      var otherOnbeforeunloadFn = window.onbeforeunload;
      window.onbeforeunload = function () {
        tlog.push('v');
        if (typeof otherOnbeforeunloadFn === 'function') otherOnbeforeunloadFn();
      }
      var arr = this.stacks;
      this.push('p');
      for (var i = 0, l = arr.length; i < l; i++) {
        this.push(arr[i]);
      };

      // 璁板綍鐢ㄦ埛娲昏穬琛屼负
      this.lastActive = this.getTime();
      var equipment = this.getEquipment(); // 鑾峰彇璁惧绫诲瀷
      var actions = this.activeAction[equipment];

      for (var k in actions) {
        if (actions.hasOwnProperty(k) && document.addEventListener) {
          document.addEventListener(k, record(actions[k]), false);
        }
      }

      function record(behavior) {
        return function () {
          if (tlog.getTime() - tlog.lastActive > tlog.interval) tlog.push('a:' + behavior)
        }
      }
    }
  };
  tlog.init();
  window.tlog = tlog;
}();

var Stat;
if (!this.Stat) {
  Stat = (function () {
    function generateUUID(length) {
      var id = new Date().getTime().toString();
      for (var i = 0; i < length; i++) id += Math.floor(Math.random() * 10);
      return id;
    }
    var load_time = Date.parse(new Date()),
      stay_time = 0;
    uuid = generateUUID(10);
    var expireDateTime, documentAlias = document,
      navigatorAlias = navigator,
      screenAlias = screen,
      windowAlias = window,
      hostnameAlias = windowAlias.location.hostname,
      hasLoaded = false,
      registeredOnLoadHandlers = [];

    function isDefined(property) {
      return typeof property !== "undefined";
    }

    function addEventListener(element, eventType, eventHandler, useCapture) {
      if (element.addEventListener) {
        element.addEventListener(eventType, eventHandler, useCapture);
        return true;
      } else {
        if (element.attachEvent) {
          return element.attachEvent("on" + eventType, eventHandler);
        }
      }
      element["on" + eventType] = eventHandler;
    }

    function beforeUnloadHandler() {
      var _hack = true;
      try {
        if (!!(window.attachEvent && !window.opera)) {
          var _active = window.document.activeElement;
          if ((_active.href || "").indexOf("javascript:") === 0) {
            _hack = false;
          }
        }
      } catch (err) { }
      if (_hack && isDefined(expireDateTime)) {
        try {
          stay_time = Date.parse(new Date()) - load_time;
          var stat = Stat.getTracker("//statistic.liepin.com/statVisit.do", 1);
          stat.trackPageView();
        } catch (err) { }
        //do { } while (Date.parse(new Date()) < expireDateTime);
      }
    }

    function loadHandler() {
      if (!hasLoaded) {
        hasLoaded = true;
        for (var i = 0; i < registeredOnLoadHandlers.length; i++) {
          registeredOnLoadHandlers[i]();
        }
      }
      return true;
    }

    function addReadyListener() {
      if (documentAlias.addEventListener) {
        addEventListener(documentAlias, "DOMContentLoaded", function () {
          documentAlias.removeEventListener("DOMContentLoaded", arguments.callee, false);
          loadHandler();
        });
      } else {
        if (documentAlias.attachEvent) {
          documentAlias.attachEvent("onreadystatechange", function () {
            if (documentAlias.readyState === "complete") {
              documentAlias.detachEvent("onreadystatechange", arguments.callee);
              loadHandler();
            }
          });
          if (documentAlias.documentElement.doScroll && windowAlias == windowAlias.top) {
            (function () {
              if (hasLoaded) {
                return;
              }
              try {
                documentAlias.documentElement.doScroll("left");
              } catch (error) {
                setTimeout(arguments.callee, 0);
                return;
              }
              loadHandler();
            }());
          }
        }
      }
      addEventListener(windowAlias, "load", loadHandler, false);
    }

    function Tracker(trackerUrl, siteId) {
      var userId, userKind, configTrackerUrl = trackerUrl || "",
        configTrackerSiteId = siteId || "",
        configCustomUrl, configTrackerPause = 200,
        configCustomData, browserHasCookies = "0",
        pageReferrer, escapeWrapper = windowAlias.encodeURIComponent || escape,
        unescapeWrapper = windowAlias.decodeURIComponent || unescape,
        stringify = function (value) {
          var escapable = new RegExp("[\\\"\x00-\x1f\x7f-\x9f\xad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]", "g"),
            meta = {
              "\b": "\\b",
              "\t": "\\t",
              "\n": "\\n",
              "\f": "\\f",
              "\r": "\\r",
              "\"": "\\\"",
              "\\": "\\\\"
            };

          function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? "\"" + string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\"" : "\"" + string + "\"";
          }

          function f(n) {
            return n < 10 ? "0" + n : n;
          }

          function str(key, holder) {
            var i, k, v, partial, value = holder[key];
            if (value === null) {
              return "null";
            }
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
              value = value.toJSON(key);
            }
            switch (typeof value) {
              case "string":
                return quote(value);
              case "number":
                return isFinite(value) ? String(value) : "null";
              case "boolean":
              case "null":
                return String(value);
              case "object":
                partial = [];
                if (value instanceof Array) {
                  for (i = 0; i < value.length; i++) {
                    partial[i] = str(i, value) || "null";
                  }
                  v = partial.length === 0 ? "[]" : "[" + partial.join(",") + "]";
                  return v;
                }
                if (value instanceof Date) {
                  return quote(value.getUTCFullYear() + "-" + f(value.getUTCMonth() + 1) + "-" + f(value.getUTCDate()) + "T" + f(value.getUTCHours()) + ":" + f(value.getUTCMinutes()) + ":" + f(value.getUTCSeconds()) + "Z");
                }
                for (k in value) {
                  v = str(k, value);
                  if (v) {
                    partial[partial.length] = quote(k) + ":" + v;
                  }
                }
                v = partial.length === 0 ? "{}" : "{" + partial.join(",") + "}";
                return v;
            }
          }
          return str("", {
            "": value
          });
        };

      function setCookie(cookieName, value, daysToExpire, path, domain, secure) {
        var expiryDate;
        if (daysToExpire) {
          expiryDate = new Date();
          expiryDate.setTime(expiryDate.getTime() + daysToExpire * 86400000);
        }
        documentAlias.cookie = cookieName + "=" + escapeWrapper(value) + (daysToExpire ? ";expires=" + expiryDate.toGMTString() : "") + ";path=" + (path ? path : "/") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
      }

      function getCookie(cookieName) {
        var cookiePattern = new RegExp("(^|;)[ ]*" + cookieName + "=([^;]*)"),
          cookieMatch = cookiePattern.exec(documentAlias.cookie);
        return cookieMatch ? unescapeWrapper(cookieMatch[2]) : 0;
      }

      function getImage(url, delay) {
        var now = new Date(),
          tick = "lt_stats_" + Math.floor(2147483648 * Math.random()).toString(36),
          image = new Image;
        expireDateTime = now.getTime() + delay;
        window[tick] = image;
        image.onload = image.onerror = image.onabort = function () {
          image.onload = image.onerror = image.onabort = null;
          image = window[tick] = null;
        };
        image.src = url;
      }

      function getReferrer() {
        var referrer = "";
        try {
          referrer = top.document.referrer;
        } catch (e) {
          if (parent) {
            try {
              referrer = parent.document.referrer;
            } catch (e2) {
              referrer = "";
            }
          }
        }
        if (referrer === "") {
          referrer = documentAlias.referrer;
        }
        return referrer;
      }

      function hasCookies() {
        var testCookieName = "_testCookie";
        if (!isDefined(navigatorAlias.cookieEnabled)) {
          setCookie(testCookieName, "1");
          return getCookie(testCookieName) == "1" ? "1" : "0";
        }
        return navigatorAlias.cookieEnabled ? "1" : "0";
      }

      function getRequest() {
        var i, now, request;
        now = new Date();
        request = "site=" + configTrackerSiteId + "&userId=" + userId + "&userKind=" + userKind + "&url=" + escapeWrapper(isDefined(configCustomUrl) ? configCustomUrl : documentAlias.location.href) + "&resolution=" + screenAlias.width + "x" + screenAlias.height + "&h=" + now.getHours() + "&m=" + now.getMinutes() + "&s=" + now.getSeconds() + "&cookie=" + browserHasCookies + "&ref=" + escapeWrapper(pageReferrer) + "&puuid=" + uuid + "&stay_time=" + stay_time + "&rand=" + Math.random();
        request = configTrackerUrl + "?" + request;
        return request;
      }

      function logPageView() {
        var request = getRequest();
        if (isDefined(configCustomData)) {
          request += "&data=" + escapeWrapper(stringify(configCustomData));
        }
        getImage(request, configTrackerPause);
        return false;
      }
      pageReferrer = getReferrer();
      userId = getCookie('user_id');
      userKind = getCookie("user_kind");
      browserHasCookies = hasCookies();
      return {
        trackPageView: function () {
          logPageView();
        }
      };
    }
    addEventListener(windowAlias, "beforeunload", beforeUnloadHandler, false);
    addReadyListener();
    return {
      getTracker: function (StatUrl, siteId) {
        return new Tracker(StatUrl, siteId);
      }
    };
  }());
}

;
(function () {
  try {
    var stat = Stat.getTracker("//statistic.liepin.com/statVisit.do", 1);
    stat.trackPageView();
  } catch (err) { }
})();