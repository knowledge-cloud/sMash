function (svc) {
    
	
    this.initialize = function () {
		/*$.getScript('http://www.douban.com/js/api.js?v=2', delayed(function () {
			$.getScript('http://www.douban.com/js/api-parser.js?v=1', delayed(function () {
				svc.notifyInitializationCompleted();
			}));
		}));*/
		svc.notifyInitializationCompleted();

    };
    
    this.beginUpdateInputs = function(newInputs) {

		newInputs.music_searches && $.each (svc.inputs.music_searches,
			function (key, srcRecord) {
				
				var text;
				
				if (typeof srcRecord.artist === 'string' && srcRecord.artist !== '') {
					text = srcRecord.artist + ' ';
				}
				else {
					text = '';
				}
				
				if (typeof srcRecord.album === 'string' && srcRecord.album !== '') {
					text += srcRecord.album;
				}
				else if (text === '') {
					return;
				}
				
				parse(key, srcRecord, text);
			});
		
        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, srcRecord, text) {


		var dataURI = mapUri('http://gw.api.taobao.com/router/rest');

		var params = {};
		var apiToken = api_token('taobao');
		
		params.app_key = apiToken.key;
		params.cid = '3415';
		params.fields = 'product_id,name,pic_patch,cid,props,price,modified,tsc';
		params.format = 'json';
		params.method = 'taobao.products.search';
		params.q = text;
		params.sign_method = 'md5';
		params.timestamp = long_date_time(new Date(new Date().valueOf() + 28800000));
		params.v = '2.0'

		params.sign = taobao_sign(params, apiToken.secret).toUpperCase();


		$.post(dataURI, params, delayed(function (data, status) {
			
			var link;
			
			if (data.products_search_response === undefined) {
				link = 'Taobao: Service Unavailable. <br />';
			}
			else if (data.products_search_response.total_results <= 0) {
				link = 'Taobao: Item not found. <br />';
			}
			else {
				var o = data.products_search_response.products.product[0];
				link = '<a href="x-taobao-search-page?name=' + encodeURIComponent(o.name) + '">RMB' + o.price + ' on Taobao</a><br />';
			}
			
			
			var record = $.extend(true, {}, srcRecord);
				
			$.extend(record, {
				"description" : link + srcRecord.description
			});
			
			svc.output = [record];
			svc.notifyOutputReady();
			svc.output = [];

		}), 'json');

    }


    this.beginOutput = function() {

    };
}
