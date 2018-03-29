$(function() {
	$('#new_message').on('submit', function(e) {
		e.preventdefault();
		console.log(this)
		var formData = new formData(this);
	})
})