( function(window) {
	window.GATracking = {
		accountID : "UA-29957756-2",
		domain : "",
		pageName : "",
		type : "_trackEvent",
		category : "",
		action : "",
		init : function() {
			if(window.addEventListener) {
				window.addEventListener('load', this.Tracking_onWindowLoad);
			} else {
				window.attachEvent('onload', this.Tracking_onWindowLoad);
			}

		},
		Tracking_onWindowLoad : function(event) {
			if(window.removeEventListener) {
				window.removeEventListener('load', this.Tracking_onWindowLoad);
			} else {
				window.detachEvent('onload', Tracking.Tracking_onWindowLoad);
			}
			if(!window.tracking_ID)return;
			window._gaq = window._gaq || [];
			_gaq.push(['_setAccount', window.tracking_ID]);
			_gaq.push(['_trackPageview']); (function() {
				var ga = document.createElement('script');
				ga.onreadystatechange = function() {
					if(this.readyState == 'complete')
						if(Tracking)
							Tracking.onload();
				}
				if(Tracking)
					ga.onload = Tracking.onload();
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
			})();
		},
		onload : function() {
			if(window.tracking_pageName && window.tracking_domain && window.tracking_action )
			{
				Tracking.domain = window.tracking_domain;
				Tracking.pageName = window.tracking_pageName;
				Tracking.action = window.tracking_action;
				Tracking.trackEvent();
			}
		},
		trackEvent : function(eventName) {
			if(!_gaq)
				return;
			var str = this.domain + "/" + this.pageName + "/" + (eventName?eventName:"");
			_gaq.push([this.type, this.category, str]);
			str = null;
		}
	}
	GATracking.init();
}(window));
