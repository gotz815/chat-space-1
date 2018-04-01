$(function(){
  function buildHTML(message){
    var image_url=(message.image_url !=null)? `<image class="lower-message_image" src="${message.imgae_url}">`:"";
    var html = `<div class="upper-message">
                  <div class="upper-message__name">${message.name}></div>
                  <div class="upper-message__time">${message.time}></div>
                  <p class="lower-message__content">${message.content}</p>
                  ${image_url}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.messages').append(html); 
      $('.form__message').val('');
      $('.form__submit').attr("disabled",false);
      $(".message").animate({scrollTop: $(".message")[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('error');
      $(".form__submit").attr("disabled",false);
    })
  })
})