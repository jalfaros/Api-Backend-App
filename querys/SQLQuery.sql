--------------CREATING DATABASE AND TABLES----------------------
CREATE DATABASE APIS_JAVASCRIPT
GO

USE MASTER 
DROP DATABASE APIS_JAVASCRIPT

USE APIS_JAVASCRIPT
GO


CREATE TABLE User_login(
	id           int identity(1,1) not null primary key,
	userName	 varchar(20) not null,
	pass		 varchar(60) not null,
	registerTime datetime    not null default current_timestamp
)
GO

CREATE TABLE user_details(
	id	       int         not null primary key,
	firstName  varchar(20) not null,
	secondName varchar(20) null,
	lastName   varchar(20) not null,

	FOREIGN KEY (id) REFERENCES User_login(id)
)
GO

CREATE TABLE Categorys(
	id        	  int IDENTITY(1,1) not null primary key,
	nameCategory varchar(25) not null
)


--EXEC sp_RENAME 'Categorys.nameCategoria' , 'nameCategory', 'COLUMN'
ALTER TABLE Functions ADD FunctionCode VARCHAR(500) NOT NULL
CREATE TABLE Functions(
	id 					int IDENTITY(1,1) not null primary key,
	idCreator 			int not null,
	idCategory 			int not null,
	functionName 		varchar(25) not null,
	functionDescription varchar(250) not null ,
	functionCode        varchar(500) not null

	FOREIGN KEY (idCreator) REFERENCES user_details(id),
	FOREIGN KEY (idCategory) REFERENCES Categorys(id)
)
GO

--------------CREATING STORE PROCEDURES----------------
exec sp_new_user 'pancha', '12345', 'panchito', 'hurtado laguna', 0
GO

--PROCEDURE FOR CREATE FUNCTIONS
CREATE PROCEDURE sp_new_function
	@idCreator  		 int,
	@idCategory 		 int,
	@functionName 		 varchar(25),
	@functionDescription varchar(250),
	@functionCode        varchar(500),
	@success             bit OUTPUT
	AS
	BEGIN
		DECLARE @last_id int;
		IF  EXISTS(SELECT * FROM Categorys WHERE id = @idCategory)
			BEGIN
				INSERT INTO Functions( idCreator, idCategory, functionName, functionDescription, functionCode)
				VALUES (@idCreator, @idCategory, @functionName, @functionDescription, @functionCode);
				SET @last_id = SCOPE_IDENTITY();
				SET @success = 1;

				SELECT * FROM Functions WHERE id = @last_id;
			END
		ELSE
			BEGIN
				SET @success = 0;
			END
	END
GO

--PROCEDURE FOR CREATE CATEGORY
CREATE PROCEDURE sp_create_category
	@nameCategory 	 varchar(25),
	@success         bit output
	AS
	BEGIN
		DECLARE @last_id int;
		IF NOT EXISTS(SELECT * FROM Categorys WHERE @nameCategory = nameCategory)
			BEGIN
				INSERT INTO Categorys( nameCategory )
				VALUES (@nameCategory);

				SET @last_id = SCOPE_IDENTITY(); --TAKE THE LAST ID CREATED
				SET @success = 1;

				SELECT * FROM Categorys WHERE id = @last_id;
			END
		ELSE
			BEGIN
				SET @success = 0;
			END
	END
GO

--PROCEDURE FOR CREATE USER
CREATE OR ALTER PROCEDURE sp_new_user
	@userName   varchar(20) ,
	@pass       varchar(60) ,
	@firstName  varchar(20) ,
	@lastName   varchar(20) ,
	@success    bit output
	AS 
	BEGIN
		DECLARE @last_id int

		IF NOT EXISTS(SELECT * FROM User_login WHERE userName = @userName)
			BEGIN
				INSERT INTO User_login(userName, pass)
				VALUES(@userName, @pass);
				SET @last_id = SCOPE_IDENTITY(); --TAKE THE LAST ID CREATED
				INSERT INTO user_details(id, firstName, lastName)
				VALUES(@last_id, @firstName, @lastName);

				SELECT User_login.id, User_login.userName, user_details.firstName, user_details.lastName
				FROM User_login INNER JOIN user_details ON  user_details.id = User_login.id
				WHERE user_details.id = @last_id;

				SET @success = 1;
			END
		ELSE
			BEGIN
				SET @success = 0
			END
	END
GO

---------PROCEDURE FOR LOGIN
create procedure [dbo].[sp_login]
	@userName varchar(20),
	@success as bit output
	AS
	BEGIN
		if exists(select * from User_login where @userName = userName)
			begin
				select pass from User_login where @userName = userName;
				set @success = 1;
			end
		else
			set @success = 0
	END
go

EXEC sp_see_user 'jalfaros'
GO

CREATE PROCEDURE sp_see_user
	@userName varchar(20)
	AS
	BEGIN
		DECLARE @id int;
		SET @id = ( SELECT id FROM User_login WHERE userName = @userName );
		SELECT User_login.id, User_login.userName, user_details.firstName, user_details.lastName
				FROM User_login INNER JOIN user_details ON  user_details.id = User_login.id
				WHERE user_details.id = @id;

	END
GO

--PROCEDURE FOR VALIDATE EXIST USER
CREATE PROCEDURE sp_validate_user
	@idUser 	     int,
	@success         bit output
	AS
	BEGIN
		IF EXISTS(SELECT * FROM  User_login WHERE id = @idUser)
			BEGIN
				SET @success = 1;
			END
		ELSE
			BEGIN
				SET @success = 0;
			END
	END
GO

--PROCEDURE TO GET ALL CATEGORYS
CREATE OR ALTER PROCEDURE sq_get_all_categorys
	@success bit OUTPUT
	AS
	BEGIN
	IF NOT EXISTS( SELECT * FROM Categorys)
		BEGIN
			SET @success = 0;
		END
	ELSE
		BEGIN
			SET @success = 1;
			SELECT * FROM Categorys
		END
	END
GO

CREATE PROCEDURE sp_import_function 
	@id     INT
	AS
	BEGIN
		SELECT FunctionCode From Functions WHERE id = @id; 
	END
GO


EXEC sp_import_function 27

SELECT * FROM Functions


-- DECLARE @SearchWord VARCHAR(30)  
-- SET @SearchWord = 'Tes'  
-- SET @SearchWord = '%'+@SearchWord+'%'
-- SELECT @SearchWord
-- SELECT *
-- FROM Categorys   
-- WHERE nameCategory like '%'+@SearchWord+'%';  
-- GO

sp_search_function 'vale', 0
GO


--PROCEDURE FOR SEARCH FUNCTION
CREATE PROCEDURE sp_search_function 
	@search varchar(30),
	@success bit OUTPUT
	AS
	BEGIN
		SET @search = '%'+@search+'%'
		IF EXISTS (SELECT * FROM Categorys JOIN Functions ON Functions.idCategory = Categorys.id
				JOIN User_login ON Functions.idCreator = User_login.id
				WHERE (
					nameCategory like @search OR
					userName     like @search OR
					functionName like @search ))
			BEGIN
				SELECT nameCategory, User_login.id as idCreator, User_login.userName, Functions.id as idFunction, Functions.functionName, Functions.functionDescription, Functions.FunctionCode 
				FROM Categorys JOIN Functions ON Functions.idCategory = Categorys.id
				JOIN User_login ON Functions.idCreator = User_login.id
				WHERE (
					nameCategory like @search OR
					userName     like @search OR
					functionName like @search
				)
				
				SET @success = 1;
			END
		ELSE
			BEGIN
				SET @success = 0;
			END	
	END
GO


DELETE FROM Functions;
DELETE FROM Categorys;
DELETE FROM user_details;
DELETE FROM user_login;

select * from User_login
--select * from user_details
select * from Functions
--select * from Categorys