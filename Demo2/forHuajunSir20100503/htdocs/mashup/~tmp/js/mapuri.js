
var isRealTrue = function (s) {
	return s !== null && s !== undefined && s !== '' && s != {} && s != [];
};

var mapUri = (function () {
	
	
	var tmp = document.URL;
	var proxyUri = tmp.substring(0, tmp.lastIndexOf('/')) + '/xhr-proxy/proxy.php?proxy_url=';

	return function (url) {
		var userUri = encodeURIComponent (url);
		var mappedUri = proxyUri + userUri;

		return mappedUri;
	};

})();


var mmashupService = (function () {
	
	var tmp = document.cookie;
	var pos = tmp.indexOf('mmashup_uri=');
	
	var uri;
	
	if (pos === -1) {
		uri = 'http://127.0.0.1/MobileMashup/';
	}
	else {
		
		tmp = tmp.substring(pos + 'mmashup_uri='.length);
		pos = tmp.indexOf(';');
		if (pos !== -1) {
			tmp = tmp.substring(0, pos);
		}
		
		uri = decodeURIComponent(tmp);
	}
	
	return function (s) {
		return uri + s;
	};
})();

var xhtml = function (s) {
	
	if (typeof s !== 'string') {
		return s;
	}
	
	s =  s.replace(/\&/g, '&amp;').
		replace(/\"/g, '&quot;').
		replace(/\'/g, '&#39;').
		replace(/\</g, '&lt;').
		replace(/\>/g, '&gt;').
		replace(/\r\n/g, '\n').
		replace(/\r/g, '\n').
		replace(/\n/g, '<br />');

	return s;
};



var api_key = (function () {

	var apis = {};
	
	return [function (api, key, secret) {

		if (apis[api] === undefined) {
			apis[api] = [];
		}

		if (key !== undefined) {
			apis[api].push([key, secret]);
			return key;
		}
		else {
			var i = Math.floor(apis[api].length * Math.random());
			//alert(apis[api][i]);
			return apis[api][i][0];
		}

	},
	function (api) {
		if (apis[api] === undefined) {
			apis[api] = [];
		}

		var i = Math.floor(apis[api].length * Math.random());
		return {'key' : apis[api][i][0], 'secret' : apis[api][i][1]};
	}];

})();

var api_token = api_key[1];
api_key = api_key[0];

var long_date_time = function (date) {
	
	return "2010-04-26 01:07:27";
	
	var tmp;
	
	var ts = date.getUTCFullYear();
	
	tmp = date.getUTCMonth() + 1;
	if (tmp < 10)
		tmp = '0' + tmp.toString();
	
	ts += '-' + tmp;
	
	tmp = date.getUTCDate();
	if (tmp < 10)
		tmp = '0' + tmp.toString();

	ts += '-' + tmp;

	tmp = date.getUTCHours();
	if (tmp < 10)
		tmp = '0' + tmp.toString();

	ts += ' ' + tmp;

	tmp = date.getUTCMinutes();
	if (tmp < 10)
		tmp = '0' + tmp.toString();

	ts += ':' + tmp;

	tmp = date.getUTCSeconds();
	if (tmp < 10)
		tmp = '0' + tmp.toString();

	ts += ':' + tmp;
	
	return ts;
};

var taobao_sign = function (params, secret) {
	
	var s = [];
	
	$.each (params, function (k, v) {
		s.push(k);
		s.push(v);
	});
	
	s = s.join('');
	
	var hash = params.sign_method === 'hmac' ? hex_hmac_md5(s, secret) :
		hex_md5(secret + s + secret);
	//alert(s + '\r\n\r\n' + hash + '\r\n' + secret);
	
	//throw "";
	
	return hash;

};

api_key('douban', '0453c2c6e57f35250cfb4854b07d9f6f');
api_key('douban', '022dc621aeffee5b068952650cffcb11');
api_key('douban', '077c696b9f5e776816753c42de1b6638');
api_key('douban', '0a4bea3e020af6bf1ee3beba0620e43d');
api_key('douban', '0b5199262ce602eb21f4cb7286b208c1');
api_key('flickr', '9a2983e52c66f2ae6493982bdeb2f170');
api_key('taobao', '12043792', 'c8c5c66c78f1b858b0370d8226fa7c5c');
