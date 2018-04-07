if @new_messages.present?
	json.array! @new_messages do |message|
		json.content  message.content
		json.name     message.user.name
		json.time     message.created_at
		json.image_url message.image_url
		json.id       message.id
	end
end

