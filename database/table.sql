create table users
(
    id              bigint unsigned auto_increment
        primary key,
    username        varchar(255) not null,
    hashed_password varchar(255) not null,
    created_at      datetime     not null
);

create table quizzes
(
    id              bigint unsigned auto_increment
        primary key,
    user_id         bigint unsigned not null,
    title           varchar(255)    not null,
    description     text            not null,
    total_questions int unsigned    not null,
    constraint quizzes_users_id_fk
        foreign key (user_id) references users (id)
);

create table questions
(
    id      bigint unsigned auto_increment
        primary key,
    quiz_id bigint unsigned not null,
    text    text            not null,
    constraint questions_quizzes_id_fk
        foreign key (quiz_id) references quizzes (id)
);

create table options
(
    id          bigint unsigned auto_increment
        primary key,
    quiz_id     bigint unsigned not null,
    question_id bigint unsigned not null,
    text        varchar(255)    not null,
    correct     tinyint(1)      not null,
    constraint options_questions_id_fk
        foreign key (question_id) references questions (id),
    constraint options_quizzes_id_fk
        foreign key (quiz_id) references quizzes (id)
);

create table tags
(
    id      bigint unsigned auto_increment
        primary key,
    quiz_id bigint unsigned not null,
    text    varchar(255)    not null,
    constraint tags_quizzes_id_fk
        foreign key (quiz_id) references quizzes (id)
);

