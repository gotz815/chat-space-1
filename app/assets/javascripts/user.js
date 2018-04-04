$(document).on('turbolinks:load', function(){

	var search_list = $('#chat-group-users');

	function appendUserList(user) {
		var html = `
							<div class='chat-group-user.clearfix'>
								<p class='chat-group-user__name'>${user.name}</p>
									<a class='user-search-add chat-group-user__btn chta-group-user__btn-add' data-user-id='${user.id}'' data-user-name='${user.name}''>追加</a>
							</div>`
		search_list.append(html);
	}

	function addUser(user_name, user_id) {
		var html = `
							<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
								<input name='group[user_ids][] type='hidden' value='{user_id}'>
								<p class='chat-group-user__name'>${user.name}</p>
									<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
							</div>`
		search_list.append(html);
	}

	function appendNoUser(user){
		var html = `
							<div id='chat-group-users'></div>`
		search_list.append(html);
	}

	$('#user-search-field').on('keyup', function(e) {
		e.preventDefault();
		var input = $('#user-search-field').val();
		console.log(input);

		$.ajax({
			type: 'GET',
			url: '/user',
			data: { keyword: input },
			dataType: 'json'
		})
		.done(function(users) {
			$('#user-search-result').empty();
			if(users.length !== 0){
				users.forEach(function(user){
					appendUser(user);
				});
			}
			else {
				appendNoUser('一致するユーザーはありません');
			}
		})
		.fail(function() {
			alert('ユーザーの検索に失敗しました');
		})
	});
});
