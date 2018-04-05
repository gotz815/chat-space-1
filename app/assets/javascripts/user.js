$(function(){

	var list = $('#user-search-result');
// ユーザーリスト作成HTML
		function appendUser(user) {
			var html = `
								<div class='chat-group-user clearfix'>
									<p class='chat-group-user__name'>${user.name}</p>
									<a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id='${user.id}'' data-user-name='${user.name}'>追加</a>
								</div>`
			list.append(html);
		}
// ユーザー名が存在しない
		function appendNoUser(){
			var html = `
								<div class='chat-group-user clearfix'>
									<p class='chat-group-user__name'>一致するユーザーはいません</p>
								</div>`
			list.append(html);
		}
// 追加ユーザーリスト作成
		function addUser(name,id) {
			var html = `
								<div class='chat-group-user clearfix id='chat-group-user#${id}'>
									<input name='group[user_ids][]' type='hidden' value='${id}'>
									<p class='chat-group-user__name'>${name}</p>
										<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
								</div>`
			$('#chat-group-users').append(html)
		}
// ユーザー検索
			$('#user-search-field').on('keyup', function(){
				var input = $('#user-search-field').val();
				console.log(input);
				if(input !==""){
					$.ajax({
						type: 'GET',
						url: '/users',
						data: { keyword: input },
						dataType: 'json'
					})
// ユーザーの検索に成功
				.done(function(users) {
					$('#user-search-result').empty();
					if(users.length !== 0){
						users.forEach(function(user){
						appendUser(user);
						});
					}
					else {
						appendNoUser();
					}
				})
// ユーザーの検索に失敗
				.fail(function() {
					alert('ユーザーの検索に失敗しました');
				})
			}
		});

// 追加ボタンクリック時の処理
		$('#user-search-result').on('click','.user-search-add',function(){
			var user_id = $(this).data('user-id')
			var user_name = $(this).data('user-name')
			addUser(user_name, user_id);
		});
// 削除ボタンクリック時の処理
		$('#user-search-result').on('click', '.user-search-remove',function(){
			$(this).parent().remove();
		});
});
