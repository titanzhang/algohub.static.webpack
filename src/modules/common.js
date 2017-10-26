import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';
import 'bootstrap';

class Utils {
	static post(url, data) {
		return Promise.resolve($.ajax({
			url: url,
			data: data,
			cache: false,
			method: 'POST',
			xhrFields: {
	      withCredentials: true
			}
		}));
	}

	static get(url) {
		return Promise.resolve($.ajax({
			url: url,
			cache: false,
			method: 'GET',
			xhrFields: {
	      withCredentials: true
			}
		}));
	}
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

export default Utils;
