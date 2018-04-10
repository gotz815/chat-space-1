json.content @message.content
json.name @message.user.name
json.time @message.format_posted_time(message.created_at)
json.image_url @message.image_url
json.id @message.id
