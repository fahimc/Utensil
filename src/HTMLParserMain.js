( function(window) {

	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", loadComplete);

		} else {
			window.attachEvent("onload", loadComplete);
		}
	}

	function loadComplete() {
		var copy ='<!DOCTYPE HTML><html><head><script type="text/javascript" src="../lib/com/parser/htmlparser.js"></script><script type="text/javascript" src="../src/HTMLParserMain.js"></script></head><body id="sahsjahsjs">sdhjshdksdsdk<p id="tag">hello world</p></body></html>';
		// HTMLtoDOM(copy, document);
		//var rx=new RegExp("<body .*?>(.*?)</body>","i");

		var htmlObject =new HTMLObject(copy,"pageContent");
		htmlObject.getElementById('tag').innerHTML="new contents";
		console.log(htmlObject.getElementById('tag').innerHTML);
		console.log(htmlObject.getContentAsString());
		// HTMLtoXML();
		// var matches = [];
// 
		// input_content.replace(/[^<p]*(id="([^"]+)">([^<]+)<\/p>)/g, function() {
			// matches.push(Array.prototype.slice.call(arguments, 1, 4))
		// });
	}

	Main();
	
}(window));
