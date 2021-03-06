USE [DemoVasup]
GO
/****** Object:  Table [dbo].[ICB_USER]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ICB_USER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[USER_NAME] [varchar](50) NULL,
	[PASSWORD] [varchar](50) NULL,
	[STATUS] [int] NULL,
	[USER_TYPE] [varchar](50) NULL,
	[DATE_CREATED] [datetime] NULL,
	[DATE_LASTLOGIN] [datetime] NULL,
 CONSTRAINT [PK_ICB_USER] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[IcbOperators]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IcbOperators](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_IcbOperators] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[kannelDeliveryStatus]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[kannelDeliveryStatus](
	[MSISDN] [nvarchar](max) NOT NULL,
	[status] [nvarchar](max) NOT NULL,
	[deliveryText] [nvarchar](max) NOT NULL,
	[ReadStatus] [int] NOT NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MID] [varchar](max) NOT NULL,
 CONSTRAINT [PK_kannelDeliveryStatus] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LoginUserLog]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoginUserLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[USERID] [int] NULL,
	[USERNAME] [nvarchar](50) NULL,
	[DATETIME] [datetime] NULL,
	[USERACTION] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TeaserList]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TeaserList](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TeaserName] [varchar](50) NULL,
	[NoOfSteps] [int] NULL,
	[ActivationType] [varchar](50) NULL,
	[Encoding] [varchar](50) NULL,
	[Comment] [text] NULL,
	[TeaserXml] [ntext] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[UserName] [nvarchar](12) NULL,
	[Password] [nvarchar](50) NULL,
	[UserRoleID] [int] NULL,
	[OperatorID] [int] NULL,
	[Status] [bit] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[XmlTemplates]    Script Date: 10/6/2016 3:49:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[XmlTemplates](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[XmlName] [varchar](150) NULL,
	[XmlText] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[ICB_USER] ON 

INSERT [dbo].[ICB_USER] ([ID], [USER_NAME], [PASSWORD], [STATUS], [USER_TYPE], [DATE_CREATED], [DATE_LASTLOGIN]) VALUES (1, N'admin', N'3ec2ee7a5572ce7bd54f2d8c5c25aa13', 1, N'1', CAST(0x0000A68100FB8B97 AS DateTime), CAST(0x0000A69500CB54CF AS DateTime))
INSERT [dbo].[ICB_USER] ([ID], [USER_NAME], [PASSWORD], [STATUS], [USER_TYPE], [DATE_CREATED], [DATE_LASTLOGIN]) VALUES (2031, N'opp', N'11d8c28a64490a987612f2332502467f', 1, N'2', CAST(0x0000A68901110195 AS DateTime), CAST(0x0000A69000C931E5 AS DateTime))
SET IDENTITY_INSERT [dbo].[ICB_USER] OFF
SET IDENTITY_INSERT [dbo].[LoginUserLog] ON 

INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (1, 1, N'admin', CAST(0x0000A68900F315AC AS DateTime), N'User Login Success')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (2, 1, N'admin', CAST(0x0000A68900F3E57F AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (3, 1, N'admin', CAST(0x0000A68900F3FDF9 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (4, 1, N'admin', CAST(0x0000A68900F7620C AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (5, 1, N'admin', CAST(0x0000A68900F7DF9F AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (6, 1, N'admin', CAST(0x0000A68900F87E6B AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (45, NULL, N'admin', CAST(0x0000A69000C56094 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (46, NULL, N'admin', CAST(0x0000A69000C6B498 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (9, 1, N'admin', CAST(0x0000A68900F92130 AS DateTime), N'User Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (10, 1, N'admin', CAST(0x0000A68900F99BF6 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (11, 1, N'admin', CAST(0x0000A68900F9AB2E AS DateTime), N'New User Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (12, 1, N'admin', CAST(0x0000A68900F9B27C AS DateTime), N'User Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (13, 1, N'admin', CAST(0x0000A68900F9BA4E AS DateTime), N'User Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (14, 1, N'admin', CAST(0x0000A68900FA8448 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (47, NULL, N'admin', CAST(0x0000A69000C79D8F AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (48, NULL, N'admin', CAST(0x0000A69000C7A038 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (49, NULL, N'admin', CAST(0x0000A69000C7ABEF AS DateTime), N'User  "op"  Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (50, NULL, N'admin', CAST(0x0000A69000C7B39A AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (51, NULL, N'op', CAST(0x0000A69000C7BEA9 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (52, NULL, N'op', CAST(0x0000A69000C7DF63 AS DateTime), N'New User "opp" Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (53, 2031, N'op', CAST(0x0000A69000C931CD AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (54, 2031, N'op', CAST(0x0000A69000C93DA5 AS DateTime), N'User  "oppa"  Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (55, 2031, N'opp', CAST(0x0000A69000C95DAC AS DateTime), N'User  "opp"  Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (56, 1, N'admin', CAST(0x0000A69000CC8858 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (57, 1, N'admin', CAST(0x0000A69000CCA54C AS DateTime), N'New User "ad" Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (58, 1, N'admin', CAST(0x0000A69000CCB048 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (65, 1, N'admin', CAST(0x0000A69100A34D60 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (66, 1, N'admin', CAST(0x0000A69100A4A75F AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (67, 1, N'admin', CAST(0x0000A69100A61B8D AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (68, 1, N'admin', CAST(0x0000A69100A6992D AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (69, 1, N'admin', CAST(0x0000A69100A6E56C AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (121, 1, N'admin', CAST(0x0000A69500AE55AC AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (122, 1, N'admin', CAST(0x0000A69500B30943 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (123, 1, N'admin', CAST(0x0000A69500B38D1A AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (124, 1, N'admin', CAST(0x0000A69500BB6250 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (125, 1, N'admin', CAST(0x0000A69500BEC028 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (126, 1, N'admin', CAST(0x0000A69500C0CEB9 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (127, 1, N'admin', CAST(0x0000A69500C0D6F5 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (128, 1, N'admin', CAST(0x0000A69500C0D87E AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (129, 1, N'admin', CAST(0x0000A69500C0DBB6 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (130, 1, N'admin', CAST(0x0000A69500C0DE85 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (131, 1, N'admin', CAST(0x0000A69500C0E396 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (132, 1, N'admin', CAST(0x0000A69500C0E532 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (133, 1, N'admin', CAST(0x0000A69500C126B9 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (134, 1, N'admin', CAST(0x0000A69500C12827 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (135, 1, N'admin', CAST(0x0000A69500C12EB2 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (136, 1, N'admin', CAST(0x0000A69500C12FE1 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (137, 1, N'admin', CAST(0x0000A69500C1340D AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (138, 1, N'admin', CAST(0x0000A69500C14A31 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (139, 1, N'admin', CAST(0x0000A69500C15277 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (140, 1, N'admin', CAST(0x0000A69500C1A91D AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (141, 1, N'admin', CAST(0x0000A69500C1AB7D AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (142, 1, N'admin', CAST(0x0000A69500C1AD6F AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (143, 1, N'admin', CAST(0x0000A69500C1B0E3 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (144, 1, N'admin', CAST(0x0000A69500C1B1F2 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (145, 1, N'admin', CAST(0x0000A69500C1B720 AS DateTime), N'Logout')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (146, 1, N'admin', CAST(0x0000A69500C65999 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (147, 1, N'admin', CAST(0x0000A69500CB54CB AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (59, 1, N'admin', CAST(0x0000A69000CCB1E3 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (60, 1, N'admin', CAST(0x0000A69000CD0230 AS DateTime), N'User  "ad"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (61, 1, N'admin', CAST(0x0000A69000CD0FD6 AS DateTime), N'User  "oppag"  Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (62, 1, N'admin', CAST(0x0000A69000CFEE77 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (63, 1, N'admin', CAST(0x0000A69000F72A52 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (64, 1, N'admin', CAST(0x0000A690011620EF AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (70, 1, N'admin', CAST(0x0000A69100A8DF4E AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (71, 1, N'admin', CAST(0x0000A69100A963CD AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (72, 1, N'admin', CAST(0x0000A69100AA9A29 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (73, 1, N'admin', CAST(0x0000A69100AB50EF AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (74, 1, N'admin', CAST(0x0000A69100AC3FF7 AS DateTime), N'New User "qq" Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (75, 1, N'admin', CAST(0x0000A69100AC49CB AS DateTime), N'User  "qqq"  Updated')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (76, 1, N'admin', CAST(0x0000A69100AD3912 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (77, 1, N'admin', CAST(0x0000A69100AD65B2 AS DateTime), N'Username  "qqq"  Updated from')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (78, 1, N'admin', CAST(0x0000A69100AD973C AS DateTime), N'Username  "qqq"  Updated from')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (79, 1, N'admin', CAST(0x0000A69100AE1D3A AS DateTime), N'Username  "qqq"  Updated for UserId 2035')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (80, 1, N'admin', CAST(0x0000A69100AE24DA AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (81, 1, N'admin', CAST(0x0000A69100AE3022 AS DateTime), N'Username  "qqqa"  Updated from')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (82, 1, N'admin', CAST(0x0000A69100AE64B5 AS DateTime), N'Username  "qqqab"  Updated from')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (83, 1, N'admin', CAST(0x0000A69100AF3781 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (84, 1, N'admin', CAST(0x0000A69100AF5D61 AS DateTime), N'Username  "abc"  Updated for UserId 2035')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (85, 1, N'admin', CAST(0x0000A69100B0AE36 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (86, 1, N'admin', CAST(0x0000A69100B1455E AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (87, 1, N'admin', CAST(0x0000A69100B1ECCE AS DateTime), N'Username  "abcd"  Updated for UserId 2035')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (88, 1, N'admin', CAST(0x0000A69100B2BB7E AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (89, 1, N'admin', CAST(0x0000A69100B2C379 AS DateTime), N'Username  "abcd"  Updated to abcdef')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (90, 1, N'admin', CAST(0x0000A69100B3175F AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (91, 1, N'admin', CAST(0x0000A69100B32057 AS DateTime), N'Username  ''abcdef"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (92, 1, N'admin', CAST(0x0000A69100B72B52 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (93, 1, N'admin', CAST(0x0000A69100BA9763 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (94, 1, N'admin', CAST(0x0000A69100BB789F AS DateTime), N'Username  ''abc"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (95, 1, N'admin', CAST(0x0000A69100BE72A1 AS DateTime), N'Username  ''abc"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (96, 1, N'admin', CAST(0x0000A69100C081F9 AS DateTime), N'Username  ''abc"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (97, 1, N'admin', CAST(0x0000A69100C0F333 AS DateTime), N'Username  ''abc"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (98, 1, N'admin', CAST(0x0000A69100C10D92 AS DateTime), N'Username  ''abc"  Updated to ''abc''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (99, 1, N'admin', CAST(0x0000A69100FF9127 AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (100, 1, N'admin', CAST(0x0000A691010032EE AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (101, 1, N'admin', CAST(0x0000A691010063CF AS DateTime), N'User  "abc"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (102, 1, N'admin', CAST(0x0000A691010119B9 AS DateTime), N'User  "oppag"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (103, 1, N'admin', CAST(0x0000A6910102018E AS DateTime), N'New User "qq'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (104, 1, N'admin', CAST(0x0000A69101020804 AS DateTime), N'Username  ''qq"  Updated to ''qq''')
GO
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (105, 1, N'admin', CAST(0x0000A69101020D4B AS DateTime), N'User  "qq"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (106, 1, N'admin', CAST(0x0000A6910102AAD8 AS DateTime), N'New User "tt'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (107, 1, N'admin', CAST(0x0000A6910102B133 AS DateTime), N'User  "tt"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (108, 1, N'admin', CAST(0x0000A6910102F7DC AS DateTime), N'New User "asd'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (109, 1, N'admin', CAST(0x0000A6910102FBAD AS DateTime), N'User  "asd"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (110, 1, N'admin', CAST(0x0000A6910103E83E AS DateTime), N'New User "uu'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (111, 1, N'admin', CAST(0x0000A6910103EBAC AS DateTime), N'User  "uu"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (112, 1, N'admin', CAST(0x0000A69101042331 AS DateTime), N'New User "oo'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (113, 1, N'admin', CAST(0x0000A69101042649 AS DateTime), N'User  "oo"  Deleted')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (114, 1, N'admin', CAST(0x0000A6910107D3FB AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (115, 1, N'admin', CAST(0x0000A69101085FDB AS DateTime), N'Login')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (116, 1, N'admin', CAST(0x0000A6910108930B AS DateTime), N'Username  ''opp"  Updated to ''opp''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (117, 1, N'admin', CAST(0x0000A6910109AE6A AS DateTime), N'Username  ''opp"  Updated to ''opp''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (118, 1, N'admin', CAST(0x0000A6910109D1DD AS DateTime), N'New User "pp'' Added')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (119, 1, N'admin', CAST(0x0000A6910109D8D1 AS DateTime), N'Username  ''pp"  Updated to ''pp''')
INSERT [dbo].[LoginUserLog] ([ID], [USERID], [USERNAME], [DATETIME], [USERACTION]) VALUES (120, 1, N'admin', CAST(0x0000A6910109DBAC AS DateTime), N'User  "pp"  Deleted')
SET IDENTITY_INSERT [dbo].[LoginUserLog] OFF
SET IDENTITY_INSERT [dbo].[TeaserList] ON 

INSERT [dbo].[TeaserList] ([ID], [TeaserName], [NoOfSteps], [ActivationType], [Encoding], [Comment], [TeaserXml]) VALUES (48, N'sdasdsa', 0, N'USSD', N'Latin', N'', N'<?xml version="1.0" encoding="utf-8"?>
<icbml>

  <card id="default">
    <play-tone>
      <!-- Optional alpha string -->
      <!-- <title><text>ICB Alert</text></title> -->
      <!-- 0.5 seconds of 10 (default) sound -->
      <tone type="tenth-seconds" duration="1" value="10"/>
    </play-tone>
  
  
  
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! </text>
      </string>
    </display>                 
  
  
    
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Для активации услуги нажмите ОК. Первые 30 дней услуга БЕСПЛАТНА, далее 15 рур месяц!</text>
      </string>
    </display>                 
 
             
			 
	
    <!-- Attribute smsc is optional --> 
    <send-sms smsc="+37379499011">
      <!-- Optional alpha string, type "compact" is usefull for ucs2 data to decrease size of command -->
      <title type="compact"><text>Please wait</text></title>
      <!-- Mandatory address, use ''+'' to denote international address -->
      <address>171123</address>
      <!-- Manadatory string (data) element. see displayMultiple.xml for advanced features -->
      <string><text>171123</text></string>
    </send-sms>        
  </card>
  
        

</icbml>
')
INSERT [dbo].[TeaserList] ([ID], [TeaserName], [NoOfSteps], [ActivationType], [Encoding], [Comment], [TeaserXml]) VALUES (47, N'asdasdsa', 0, N'USSD', N'Latin', N'', N'<?xml version="1.0" encoding="utf-8"?>
<icbml>

  <card id="default">
    <play-tone>
      <!-- Optional alpha string -->
      <!-- <title><text>ICB Alert</text></title> -->
      <!-- 0.5 seconds of 10 (default) sound -->
      <tone type="tenth-seconds" duration="1" value="10"/>
    </play-tone>
  
  
  
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! </text>
      </string>
    </display>                 
  
  
    
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Для активации услуги нажмите ОК. Первые 30 дней услуга БЕСПЛАТНА, далее 15 рур месяц!</text>
      </string>
    </display>                 
 
             
			 
	
    <!-- Attribute smsc is optional --> 
    <send-sms smsc="+37379499011">
      <!-- Optional alpha string, type "compact" is usefull for ucs2 data to decrease size of command -->
      <title type="compact"><text>Please wait</text></title>
      <!-- Mandatory address, use ''+'' to denote international address -->
      <address>171123</address>
      <!-- Manadatory string (data) element. see displayMultiple.xml for advanced features -->
      <string><text>171123</text></string>
    </send-sms>        
  </card>
  
        

</icbml>
')
INSERT [dbo].[TeaserList] ([ID], [TeaserName], [NoOfSteps], [ActivationType], [Encoding], [Comment], [TeaserXml]) VALUES (49, N'fsdfsdf', 0, N'USSD', N'Latin', N'', N'<?xml version="1.0" encoding="utf-8"?>
<icbml>

  <card id="default">
    <play-tone>
      <!-- Optional alpha string -->
      <!-- <title><text>ICB Alert</text></title> -->
      <!-- 0.5 seconds of 10 (default) sound -->
      <tone type="tenth-seconds" duration="1" value="10"/>
    </play-tone>
  
  
  
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! </text>
      </string>
    </display>                 
  
  
    
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Для активации услуги нажмите ОК. Первые 30 дней услуга БЕСПЛАТНА, далее 15 рур месяц!</text>
      </string>
    </display>                 
 
             
			 
	
    <!-- Attribute smsc is optional --> 
    <send-sms smsc="+37379499011">
      <!-- Optional alpha string, type "compact" is usefull for ucs2 data to decrease size of command -->
      <title type="compact"><text>Please wait</text></title>
      <!-- Mandatory address, use ''+'' to denote international address -->
      <address>171123</address>
      <!-- Manadatory string (data) element. see displayMultiple.xml for advanced features -->
      <string><text>171123</text></string>
    </send-sms>        
  </card>
  
        

</icbml>
')
INSERT [dbo].[TeaserList] ([ID], [TeaserName], [NoOfSteps], [ActivationType], [Encoding], [Comment], [TeaserXml]) VALUES (50, N'fwefwef', 0, N'USSD', N'Latin', N'', N'<?xml version="1.0" encoding="utf-8"?>
<icbml>

  <card id="default">
    <play-tone>
      <!-- Optional alpha string -->
      <!-- <title><text>ICB Alert</text></title> -->
      <!-- 0.5 seconds of 10 (default) sound -->
      <tone type="tenth-seconds" duration="1" value="10"/>
    </play-tone>
  
  
  
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! Закажите ХИТ "Read all about you" (E. Shande) и РАДУЙТЕ ДРУЗЕЙ новым гудком ожидания! </text>
      </string>
    </display>                 
  
  
    
    <display delay="no" priority="low">
      <string>
         <text encoding="Latin">Для активации услуги нажмите ОК. Первые 30 дней услуга БЕСПЛАТНА, далее 15 рур месяц!</text>
      </string>
    </display>                 
 
             
			 
	
    <!-- Attribute smsc is optional --> 
    <send-sms smsc="+37379499011">
      <!-- Optional alpha string, type "compact" is usefull for ucs2 data to decrease size of command -->
      <title type="compact"><text>Please wait</text></title>
      <!-- Mandatory address, use ''+'' to denote international address -->
      <address>171123</address>
      <!-- Manadatory string (data) element. see displayMultiple.xml for advanced features -->
      <string><text>171123</text></string>
    </send-sms>        
  </card>
  
        

</icbml>
')
SET IDENTITY_INSERT [dbo].[TeaserList] OFF
SET IDENTITY_INSERT [dbo].[XmlTemplates] ON 

INSERT [dbo].[XmlTemplates] ([ID], [XmlName], [XmlText]) VALUES (1, N'1 Click Call 7007 - ENG', N'%3C%3Fxml+version%3D%221.0%22+encoding%3D%22utf-8%22%3F%3E%0D%0A%3Cicbml%3E%0D%0A%0D%0A++%3Ccard+id%3D%22default%22%3E%0D%0A++++%3Cplay-tone%3E%0D%0A++++++%3Ctone+type%3D%22tenth-seconds%22+duration%3D%221%22+value%3D%2210%22%2F%3E%0D%0A++++%3C%2Fplay-tone%3E%0D%0A++%0D%0A++++%3Cdisplay+delay%3D%22no%22+priority%3D%22low%22%3E%0D%0A++++++%3Cstring%3E%0D%0A+++++++++%3Ctext%3ESuper+new+RBT+hits+on+our+NEW+IVR+Portal%21+Press+OK+to+access%21%21%21%21%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fdisplay%3E+++++++++++++++++%0D%0A+%0D%0A++%3Cset-up-call%3E%0D%0A++%3Ctitle%3E%3Ctext%3EPlease+wait...%3C%2Ftext%3E%3C%2Ftitle%3E%0D%0A++%3Caddress%3E7007%3C%2Faddress%3E%0D%0A++%3C%2Fset-up-call%3E%0D%0A+++++%0D%0A++%3C%2Fcard%3E%0D%0A%3C%2Ficbml%3E')
INSERT [dbo].[XmlTemplates] ([ID], [XmlName], [XmlText]) VALUES (2, N'1 Click Call 7007', N'%3C%3Fxml+version%3D%221.0%22+encoding%3D%22utf-8%22%3F%3E%0D%0A%3Cicbml%3E%0D%0A%0D%0A++%3Ccard+id%3D%22default%22%3E%0D%0A++++%3Cplay-tone%3E%0D%0A%0D%0A++++++%3Ctone+type%3D%22tenth-seconds%22+duration%3D%221%22+value%3D%2210%22%2F%3E%0D%0A++++%3C%2Fplay-tone%3E%0D%0A++%0D%0A++++%3Cdisplay+delay%3D%22no%22+priority%3D%22low%22%3E%0D%0A++++++%3Cstring%3E%0D%0A+++++++++%3Ctext%3ECool+jokes%2C+love+stories%2C+dating+on+our+new+IVR+portal%21+Press+OK+to+access+now%21%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fdisplay%3E+++++++++++++++++%0D%0A+%0D%0A++++%0D%0A++%3Cset-up-call%3E%0D%0A++%3Ctitle%3E%3Ctext%3EPlease+wait...%3C%2Ftext%3E%3C%2Ftitle%3E%0D%0A++%3Caddress%3E7007%3C%2Faddress%3E%0D%0A++%3C%2Fset-up-call%3E%0D%0A+++++%0D%0A++%3C%2Fcard%3E%0D%0A%3C%2Ficbml%3E')
INSERT [dbo].[XmlTemplates] ([ID], [XmlName], [XmlText]) VALUES (3, N'1 Click Order RBT via SMS', N'%3C%3Fxml+version%3D%221.0%22+encoding%3D%22utf-8%22%3F%3E%0D%0A%3Cicbml%3E%0D%0A%0D%0A++%3Ccard+id%3D%22default%22%3E%0D%0A++++%3Cplay-tone%3E%0D%0A++++++%3Ctone+type%3D%22tenth-seconds%22+duration%3D%221%22+value%3D%2210%22%2F%3E%0D%0A++++%3C%2Fplay-tone%3E%0D%0A++%0D%0A++++%3Cdisplay+delay%3D%22no%22+priority%3D%22low%22%3E%0D%0A++++++%3Cstring%3E%0D%0A+++++++++%3Ctext%3ESuper+hit+as+RBT%3A+Sting+-+Every+breath+you+take.+Price+1+USD.+Press+OK+to+activate.%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fdisplay%3E+++++++++++++++++%0D%0A+%0D%0A++++%3Csend-sms+smsc%3D%22%2B37379499011%22%3E%0D%0A++++++%3Ctitle+type%3D%22compact%22%3E%3Ctext%3EPlease+wait%3C%2Ftext%3E%3C%2Ftitle%3E%0D%0A++++++%3Caddress%3E171%3C%2Faddress%3E%0D%0A++++++%3Cstring%3E%3Ctext%3E705519%3C%2Ftext%3E%3C%2Fstring%3E%0D%0A++++%3C%2Fsend-sms%3E++++++++%0D%0A++%3C%2Fcard%3E%0D%0A%3C%2Ficbml%3E%0D%0A')
INSERT [dbo].[XmlTemplates] ([ID], [XmlName], [XmlText]) VALUES (4, N'1 Click Order INTERNET', N'%3C%3Fxml+version%3D%221.0%22+encoding%3D%22utf-8%22%3F%3E%0D%0A%3Cicbml%3E%0D%0A%0D%0A++%3Ccard+id%3D%22default%22%3E%0D%0A++++%3Cplay-tone%3E%0D%0A++++++%3Ctone+type%3D%22tenth-seconds%22+duration%3D%221%22+value%3D%2210%22%2F%3E%0D%0A++++%3C%2Fplay-tone%3E%0D%0A++%0D%0A++%0D%0A++++%3Cdisplay+delay%3D%22no%22+priority%3D%22low%22%3E%0D%0A++++++%3Cstring%3E%0D%0A+++++++++%3Ctext%3EBuy+1+get+1+free%21+Buy+100MB+pack+and+get+extra+100MB+free%21+Press+OK+to+order%21+Price+20+MDL%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fdisplay%3E+++++++++++++++++%0D%0A+%0D%0A++++%3Csend-sms+smsc%3D%22%2B37379499011%22%3E%0D%0A++++++%3Ctitle+type%3D%22compact%22%3E%3Ctext%3EPlease+wait%3C%2Ftext%3E%3C%2Ftitle%3E%0D%0A++++++%3Caddress%3E171%3C%2Faddress%3E%0D%0A++++++%3Cstring%3E%3Ctext%3E705519%3C%2Ftext%3E%3C%2Fstring%3E%0D%0A++++%3C%2Fsend-sms%3E++++++++%0D%0A++%3C%2Fcard%3E%0D%0A%3C%2Ficbml%3E%0D%0A')
INSERT [dbo].[XmlTemplates] ([ID], [XmlName], [XmlText]) VALUES (5, N'1 Click send USSD 444 - ENG', N'%3C%3Fxml+version%3D%221.0%22+encoding%3D%22utf-8%22%3F%3E%0D%0A%3Cicbml%3E%0D%0A%0D%0A++%3Ccard+id%3D%22default%22%3E%0D%0A++++%3Cplay-tone%3E%0D%0A++++++%3Ctone+type%3D%22tenth-seconds%22+duration%3D%221%22+value%3D%2210%22%2F%3E%0D%0A++++%3C%2Fplay-tone%3E%0D%0A+%0D%0A++++%3Cdisplay+delay%3D%22no%22+priority%3D%22low%22%3E%0D%0A++++++%3Cstring%3E%0D%0A+++++++++%3Ctext%3ENews%2C+jokes%2C+love+stories+via+SMS%21+Press+OK+to+acess+the+new+USSD+portal+and+subscribe+NOW%21%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fdisplay%3E+++++++++++++++++%0D%0A++%0D%0A++++%3Csend-ussd%3E%0D%0A++++++%3Ctitle%3E%3Ctext%3EPlease+wait%3C%2Ftext%3E%3C%2Ftitle%3E%0D%0A++++++%3Cstring%3E%0D%0A++++++++%3C%21--+Please+note+that+only+latin+alphabet+is+supported+in+the+current+version+--%3E%0D%0A+++++++++%3Ctext%3E%2A444%23%3C%2Ftext%3E%0D%0A++++++%3C%2Fstring%3E%0D%0A++++%3C%2Fsend-ussd%3E+++++++++++++++++%0D%0A++%3C%2Fcard%3E++++++%0D%0A%3C%2Ficbml%3E')
SET IDENTITY_INSERT [dbo].[XmlTemplates] OFF
ALTER TABLE [dbo].[kannelDeliveryStatus] ADD  CONSTRAINT [DF_kannelDeliveryStatus_ReadStatus]  DEFAULT ((0)) FOR [ReadStatus]
GO
ALTER TABLE [dbo].[kannelDeliveryStatus] ADD  CONSTRAINT [DF_kannelDeliveryStatus_MID]  DEFAULT ((0)) FOR [MID]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[LoginUserLog]  WITH CHECK ADD  CONSTRAINT [FK_LoginUserLog_ICB_USER] FOREIGN KEY([USERID])
REFERENCES [dbo].[ICB_USER] ([ID])
GO
ALTER TABLE [dbo].[LoginUserLog] CHECK CONSTRAINT [FK_LoginUserLog_ICB_USER]
GO
