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
|body  |text|null: false|
|image |string|
|group_id|integer|null: false, foreign_key: true,(データ検索)|
|user_id|integer|null: false, foreign_key: true,(データ検索)|

##association
-belongs_to :user
-belongs_to :group


## menbersテーブル
|column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### association
-belongs_to :group
-belongs_to :user
-has_many :messages

##groupテーブル
|column|Type|Option|
|------|----|------|
|name  |string|null: false, foreign_key: true, (データ検索)|
|user_id|integer|null: false, foreign_key: true|

### association
-belongs_to :user


## usersテーブル
|column|Type|Option|
|------|----|------|
|name  |string|null: false, foreign_key: true, unique :true,(データ検索)|
|email |string|null: false|

### association
-has_many :messages
-belongs_to :group
-belongs_to :menber

