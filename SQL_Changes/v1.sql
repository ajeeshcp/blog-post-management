CREATE TABLE categories (
	id serial4 NOT NULL,
	"name" varchar(128) NOT NULL,
	CONSTRAINT categories_pkey PRIMARY KEY (id)
);

CREATE TABLE "comments" (
	id serial4 NOT NULL,
	user_id int4 NULL,
	post_id int4 NULL,
	parent_comment_id int4 NULL,
	"content" text NOT NULL,
	created_at timestamptz NULL,
	CONSTRAINT comments_pkey PRIMARY KEY (id),
	CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES "comments"(id),
	CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
	CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE posts (
	id serial4 NOT NULL,
	"name" varchar(128) NOT NULL,
	description varchar(512) NOT NULL,
	user_id int4 NOT NULL,
	created_at timestamptz NULL,
	updated_at timestamptz NULL,
	category_id int4 NULL,
	CONSTRAINT posts_pkey PRIMARY KEY (id),
	CONSTRAINT fk_posts_user_id__users_id FOREIGN KEY (user_id) REFERENCES users(id),
	CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users (
	id serial4 NOT NULL,
	user_name varchar(32) NOT NULL,
	"password" varchar(512) NOT NULL,
	created_at timestamptz NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Inserting some random entries to category

insert into categories(name)
values('category-1'), ('category-2'), ('category-3');