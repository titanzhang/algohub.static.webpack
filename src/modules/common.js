import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';
import 'bootstrap';

class Utils {
	static post(url, data) {
		return Promise.resolve($.post(url, data));
	}

	static get(url) {
		return Promise.resolve($.get(url));
	}
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

export default Utils;