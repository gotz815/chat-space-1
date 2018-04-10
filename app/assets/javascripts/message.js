$(function() { 
// メッセージ表示のHTML生成
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="message" id='${message.id}'>
                  <div class="upper-message" >
                    <div class="upper-message__name">
                    ${message.name}
                    </div>
                    <div class="upper-message__time">
                    ${message.time}
                  </div>
                </div>
                  <div class="lower-message">
                    <p class="lower-message__content"></p>
                    ${message.content}
                    ${image_url}
                  </div>`
    return html;
  }
// メッセージの非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      // console.log(data)
      $('.messages').append(html); 
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').attr("disabled",false);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    })
    .fail(function(data){
      alert('入力してください');
      $(".form__submit").attr("disabled",false);
    })
  });
  $(function(){
  setInterval(autoUpdate, 3000);
  });
  function autoUpdate() {
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message').last().data('message-id');
        $.ajax({
        url: url,
        type: 'GET',
        data: { id: message_id },
        dataType: 'json'
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message) {
          var html = buildHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast'); 
          });
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    } else {
      clearInterval(autoUpdate);
      }
  };
});
