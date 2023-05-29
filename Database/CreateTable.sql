drop database testDB
create database testDB
use testDB
create table tblUsers
(
	UserID int identity(1, 1) PRIMARY KEY,
	Mail varchar(50) not null,
	Password varchar(50) not null,
	Achievement nvarchar(100) not null,
	Point int not null,
	Fullname nvarchar(50) not null,
	CreatedDate date not null,
	Reported tinyint not null,
	Enabled bit not null
)

create table tblVideos
(
	VideoID int identity(1, 1) PRIMARY KEY,
	Title nvarchar(100) not null,
	Video varchar(MAX) not null,
	Description nvarchar(MAX) not null,
	CreatedDate date not null,
	Enabled bit not null
)

create table tblArticles
(
	ArticleID int identity(1, 1) PRIMARY KEY,
	Title nvarchar(100) not null,
	Context nvarchar(MAX) not null,
	Photo varchar(200) not null,
	CreatedDate date not null,
	UserID int,
	status bit not null,
	ArticleView int not null,
	Enabled bit not null
)

create table TypeOfEvent
(
	TypeOfEventID int Identity(1, 1) PRIMARY KEY,
	ArticleID int,
	TypeOfEvent nvarchar(200),
	FOREIGN KEY (ArticleID) REFERENCES tblArticles(ArticleID)
)

create table tblVotes
(
	UserID int,
	ArticleID int,
	VoteLevel tinyint,
	Primary Key(UserID, ArticleID)
)

create table tblBooks
(
	BookID int Identity(1, 1) PRIMARY KEY,
	Title nvarchar(100) not null,
	Author nvarchar(50) not null,
	Category nvarchar(50) not null,
	Description nvarchar(MAX) not null,
	PageNumber int not null,
	YearOfPublication varchar(5) not null,
	CreatedDate date not null,
	Publisher nvarchar(50) not null,
	Price float not null,
	Cover varchar(200) not null,
	Enabled bit not null
)

create table tblCharacters
(
	PeriodID int,
	CharacterID int Identity(1, 1) PRIMARY KEY,
	CharacterName nvarchar(50) not null,
	Story nvarchar(MAX) not null,
	Estate nvarchar(50) not null,
	Enabled bit not null
)

create table tblHistoricalSites
(
	PeriodID int PRIMARY KEY,
	Location nvarchar(50) not null,
	Description nvarchar(MAX) not null,
	Photo varchar(200) not null,
	Enabled bit not null
)

create table tblHistoricalItems
(
	PeriodID int PRIMARY KEY,
	Type nvarchar(50) not null,
	Name nvarchar(100) not null,
	Nation nvarchar(50) not null,
	Description nvarchar(MAX) not null,
	Photo varchar(200) not null,
	Enabled bit not null
)

create table tblComments
(
	Comment nvarchar(MAX) not null,
	CreatedDate date not null,
	UserID int,
	ArticleID int,
	PRIMARY KEY (UserID, ArticleID),
	Enabled bit not null
)


create table tblNotifications
(
	NotificationID int Identity(1, 1) PRIMARY KEY,
	Message nvarchar(200) not null,
	CreatedDate date not null,
	UserID int,
	Enabled bit not null
)

create table tblMiniGames
(
	MiniGameID int Identity(1, 1) PRIMARY KEY,
	MiniGameName nvarchar(100),
	Enabled bit not null
)

create table tblPairOfQuizz
(
	PairOfQuizzID int identity(1, 1) PRIMARY KEY,
	Question nvarchar(100) not null,
	Answer nvarchar(200) not null,
	GameSlicePoint int not null,
	MiniGameID int,
	FOREIGN KEY (MiniGameID) REFERENCES tblMiniGames(MiniGameID),
	Enabled bit not null
)

create table tblUserMiniGame
(
	UserID int,
	MiniGameID int,
	UserGamePoint int not null,
	PRIMARY KEY(UserID, MiniGameID)
)

create table tblPeriods
(
	PeriodID int Identity(1, 1) PRIMARY KEY,
	PeriodName nvarchar(50) not null,
	Enabled bit not null
)

create table tblPeriodArticle
(
	PeriodID int,
	ArticleID int,
	PRIMARY KEY(PeriodID, ArticleID),
	FOREIGN KEY (ArticleID) REFERENCES tblArticles(ArticleID),
	FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID)
)

create table tblPeriodVideo
(
	PeriodID int,
	VideoID int,
	PRIMARY KEY(PeriodID, VideoID),
	FOREIGN KEY (VideoID) REFERENCES tblVideos(VideoID),
	FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID)
)

create table tblPeriodBook
(
	PeriodID int,
	BookID int,
	PRIMARY KEY(PeriodID, BookID),
	FOREIGN KEY (BookID) REFERENCES tblBooks(BookID),
	FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID)
)

Create table tblRoles
(
	UserID int,
	RoleName nvarchar(50),
	PRIMARY KEY (UserID)
)

ALTER TABLE tblRoles
ADD CONSTRAINT FK_tblUserstblRoles
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID)

ALTER TABLE tblVotes
ADD CONSTRAINT FK_tblUserstblVotes
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID)

ALTER TABLE tblVotes
ADD CONSTRAINT FK_tblArticlestblVotes
FOREIGN KEY (ArticleID) REFERENCES tblArticles(ArticleID)

ALTER TABLE tblUserMiniGame
ADD CONSTRAINT FK_tblMiniGamestblUserGame
FOREIGN KEY (MiniGameID) REFERENCES tblMiniGames(MiniGameID);

ALTER TABLE tblUserMiniGame
ADD CONSTRAINT FK_tblUserstblUserGame
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID);

ALTER TABLE tblComments
ADD CONSTRAINT FK_tblUserstblComments
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID);

ALTER TABLE tblArticles
ADD CONSTRAINT FK_tblUserstblArticles
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID);

ALTER TABLE tblComments
ADD CONSTRAINT FK_tblArticlestblComments
FOREIGN KEY (ArticleID) REFERENCES tblArticles(ArticleID);

ALTER TABLE tblHistoricalSites
ADD CONSTRAINT FK_tblPeriodstblHistoricalSites
FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID);

ALTER TABLE tblHistoricalItems
ADD CONSTRAINT FK_tblPeriodstblHistoricalItems
FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID);

ALTER TABLE tblCharacters
ADD CONSTRAINT FK_tblPeriodstblCharacters
FOREIGN KEY (PeriodID) REFERENCES tblPeriods(PeriodID);

ALTER TABLE tblNotifications
ADD CONSTRAINT FK_tblUserstblNotifications
FOREIGN KEY (UserID) REFERENCES tblUsers(UserID);