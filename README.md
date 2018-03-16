# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##messageテーブル
|column|Type|Option|
|------|----|------|
|body  |text|
|image |string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true,index(データ検索)|

##association
-belongs_to :user
-belongs_to :group


## menbersテーブル
|column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|



##groupテーブル
|column|Type|Option|
|------|----|------|
|name  |string|null: false, unique: true,index(データ検索)|

### association
-has_many :users, through: :group_users
-has_many :messages


## usersテーブル
|column|Type|Option|
|------|----|------|
|name  |string|null: false, foreign_key: true, unique :true,index(データ検索)|
|email |string|null: false|

### association
-has_many :messages
-has_many :groups, through: :group_users

## gruop_userテーブル
|column|Type|Option|
|------|----|------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

###association
-belongs_to :user
-belongs_to :group



