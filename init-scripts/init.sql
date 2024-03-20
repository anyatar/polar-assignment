CREATE DATABASE IF NOT EXISTS lets_run;

USE lets_run;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    total_distance_run INT DEFAULT 0,
    publicKey TEXT NOT NULL
);

INSERT INTO lets_run.users
    (name, age, city, total_distance_run, publicKey)
VALUES
    ('Anya Suraski', 41, 'Givaataim', 400, '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAtkdLhd/D03svYv6fUMIXZ5rJf5ueS9zWN6adn2CXiyeLgrwN+fxR
WscmEcSkDU0pLmJy+tv8kucfRIPPdepz+hIuCWJOg+wkXpyrRdhGInOAOdTizlac
XFfzrkMpzEz100verkO4CiFlWHVHZIEcW1hWn26r9n4iua+gSD7Ke1lRucQzn2/l
LRv8yiKvEJRgIbbIEzQ5Sxj9KcZeeoUEdmaess/gU3LyOimEKs0vJTPYkdTcDVNL
5Muv7N2lbWRLJk938H4pHDGXOzd1yxHh5MiwrQmiMymm8XNwcvOFjfYC+uVhJSD0
YhorNm4crI8JhSnHSDVidgebJcvNbmVkJQIDAQAB
-----END RSA PUBLIC KEY-----
');

INSERT INTO lets_run.users
    (name, age, city, total_distance_run, publicKey)
VALUES
    ('John Doe', 31, 'New York', 310, '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA4b83yQmwAm8opNAkLlx/GCNSSUaRbhiQCylUvUpHNONoZVhTbMvo
DYlL0um7n8ZADLraG/d77h98OQT2DSyGXllbmkY8eAgey9hX1seifI+DCKErwEu6
Ru99dHpltjUTJsupx3dNnzyz9wFJSgBGWjEJ2UClpeSmtRfNMmzPRr9j44svEldc
ARthkEWJjonN8BzhkAnO2g/cgf+X2T2pG/UHPolKWy/b2dI6V5xBeO3c7MlnOrL2
fQyUPLiuEYfK9CubZb96v9gXS8WEYNj+C1QAKqgzov60IoXbkAhylUrqVL4Okzd0
/nuIZ2a/BsDC3XIRi+0BUSeek2JE65KZCwIDAQAB
-----END RSA PUBLIC KEY-----
');

INSERT INTO lets_run.users
    (name, age, city, total_distance_run, publicKey)
VALUES
    ('John Doe', 41, 'Oslo', 10, '-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAqq3cMetQ4Tq4OMFMrYuQRHYqp/Or/hXpZ4YC1tzYdLRc+O23YMf9
eRLub5edvfzoFN3j/AXqIR5NH5axReXQ2j0eqx21GfGG9KPqXxM8BbR9LpkDyhhJ
ZEsIXCxE5dkP9xARJ7bS5X5i4oxNlI1vgy6CRImfywo+xRMX2lUqpED9PbauXPoX
x3ydUVC4tpNaev4csTo8/AOkcomcAkU46gp3EISeRb/R7TqpfZ5OBrdNh/BOW6Yg
xxmxk5owjf29P/VXdafyQXLg6sUeXgjfm35se07cSxJpSD2btjEEHa6p4NtolSIO
GvKP7oxZqF4LjXf/fq9ErNvAf4kFmPVoYQIDAQAB
-----END RSA PUBLIC KEY-----
');