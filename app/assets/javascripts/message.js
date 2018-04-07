$(document).on('turbolinks:load', function() { 
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<div class="message">
                  <div class="upper-message">
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
  $('#new_message').on('submit', function(e){
    e.preventDefault(); 
    var formData = new FormData(this);
    $.ajax({
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
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
});
 