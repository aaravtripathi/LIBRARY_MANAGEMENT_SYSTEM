-- =========================================================================================
-- LMS ADVANCED SOFTWARE ENGINEERING INTERNSHIP REPORT - MASTER DDL SCHEMA SCRIPT
-- System: Enterprise Library Management System (LMS)
-- Database Engine: Microsoft SQL Server / Azure SQL Private Cloud Instance
-- Author: Aarav Tripathi (IN26012764)
-- =========================================================================================

CREATE DATABASE [LMS_ProductionDB];
GO

USE [LMS_ProductionDB];
GO

-- 1. PUBLICATIONS CONSOLIDATED TPH INHERITANCE TABLE
CREATE TABLE [dbo].[Publications] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [Title] NVARCHAR(150) NOT NULL,
    [Publisher] NVARCHAR(100) NOT NULL DEFAULT ('Library Press'),
    [PublishedDate] DATE NOT NULL CONSTRAINT [CK_Publication_PublishedDate] CHECK ([PublishedDate] <= GETDATE()),
    [Type] INT NOT NULL, -- TPH Enumerated Discriminator (0: Book, 1: Newspaper, 2: Magazine)
    [IsAvailable] BIT NOT NULL DEFAULT (1),
    [ShelfLocation] NVARCHAR(20) NULL,
    
    -- Book Specific Columns
    [Author] NVARCHAR(100) NULL,
    [ISBN] NVARCHAR(20) NULL,
    [Edition] INT NULL,
    
    -- Newspaper Specific Columns
    [CityOfCirculation] NVARCHAR(50) NULL,
    [IsMorningEdition] BIT NULL,
    
    -- Magazine Specific Columns
    [Periodicity] NVARCHAR(50) NULL,
    [IssueNumber] INT NULL,
    
    CONSTRAINT [PK_Publications] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

-- Create Non-Clustered Composite Index on (Title, Author) to accelerate real-time fuzzy string matches
CREATE NONCLUSTERED INDEX [IX_Books_Title_Author]
    ON [dbo].[Publications]([Title] ASC, [Author] ASC)
    WHERE ([Type] = 0);
GO

-- 2. STUDENT BENEFICIARY DIRECTORY TABLE
CREATE TABLE [dbo].[Students] (
    [RegistrationNumber] NVARCHAR(50) NOT NULL,
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(150) NOT NULL,
    [Course] NVARCHAR(100) NOT NULL DEFAULT ('B.Tech Computer Science'),
    [PhoneNumber] NVARCHAR(25) NULL,
    [IsEligibleToBorrow] BIT NOT NULL DEFAULT (1),
    CONSTRAINT [PK_Students] PRIMARY KEY CLUSTERED ([RegistrationNumber] ASC),
    CONSTRAINT [UQ_Students_Email] UNIQUE ([Email])
);
GO

-- 3. TRANSACTION BORROW LEDGER AND HISTORY TABLE
CREATE TABLE [dbo].[BorrowRecords] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [PublicationId] INT NOT NULL,
    [StudentRegistrationNumber] NVARCHAR(50) NOT NULL,
    [BorrowDate] DATETIME2(7) NOT NULL DEFAULT (SYSUTCDATETIME()),
    [DueDate] DATETIME2(7) NOT NULL,
    [ReturnDate] DATETIME2(7) NULL,
    [IssuedByLibrarian] NVARCHAR(100) NOT NULL DEFAULT ('System Operator'),
    [LateFeePenalty] DECIMAL(10,2) NOT NULL DEFAULT (0.00),
    CONSTRAINT [PK_BorrowRecords] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BorrowRecords_Publications] FOREIGN KEY ([PublicationId]) REFERENCES [dbo].[Publications]([Id]) ON DELETE RESTRICT,
    CONSTRAINT [FK_BorrowRecords_Students] FOREIGN KEY ([StudentRegistrationNumber]) REFERENCES [dbo].[Students]([RegistrationNumber])
);
GO

-- 4. INSERT INITIAL ENTERPRISE SEEDING RECORD SETS
INSERT INTO [dbo].[Publications] ([Title], [Author], [ISBN], [Publisher], [PublishedDate], [Type], [IsAvailable], [ShelfLocation])
VALUES 
('Clean Architecture: A Craftsman Guide to Software Structure', 'Robert C. Martin', '978-0134494166', 'Prentice Hall', '2017-09-20', 0, 1, 'CS-A10'),
('Designing Data-Intensive Applications', 'Martin Kleppmann', '978-1449373320', 'O Reilly Media', '2017-03-16', 0, 0, 'DB-C04'),
('C# 12 and .NET 8 - Modern Cross-Platform Development Fundamentals', 'Mark J. Price', '978-1837633256', 'Packt Publishing', '2023-11-14', 0, 1, 'NET-B02'),
('Cloud Native DevOps with Kubernetes', 'John Arundel & Justin Domingus', '978-1492040955', 'O Reilly Media', '2019-03-29', 0, 1, 'CLD-E01'),
('The Pragmatic Programmer: Your Journey to Mastery', 'David Thomas & Andrew Hunt', '978-0135957059', 'Addison-Wesley Professional', '2019-09-13', 0, 1, 'CS-A12');
GO

INSERT INTO [dbo].[Students] ([RegistrationNumber], [FullName], [Email], [Course], [PhoneNumber])
VALUES
('IN26012764', 'Aarav Tripathi', 'aarav.tripathi@github.com', 'Advanced Software Engineering And Development Internship [11A]', '+91-9876543210');
GO

PRINT 'Enterprise Library Management System Database & Schema successfully initialized!';
GO
