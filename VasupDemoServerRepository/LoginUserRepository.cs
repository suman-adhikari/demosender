using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using VasupDemoServerModel;

namespace VasupDemoServerRepository
{
    public class LoginUserRepository : Repo
    {
        public LoginUser CheckLogin(string username, string password)
        {
            var loginUser = new LoginUser();

            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql =
                        @"SELECT * FROM [login_user] WHERE Username=@Username AND Password = @Password";
                    connection.Open();

                    var sqlCommand = new SqlCommand(sql, connection);
                    sqlCommand.Parameters.AddWithValue("@Username", username);
                    sqlCommand.Parameters.AddWithValue("@Password", password);
                    sqlCommand.CommandType = CommandType.Text;
                    var dt = new DataTable();
                    var da = new SqlDataAdapter(sqlCommand);
                    da.Fill(dt);

                    foreach (DataRow row in dt.Rows)
                    {
                        loginUser.Id = Convert.ToInt32(row["ID"]);
                        loginUser.Username = row["Username"].ToString();
                        loginUser.UserType = Convert.ToInt32(row["UserType"]);

                        break;
                    }

                    const string updateSql = @"UPDATE [login_user] SET LastLogin=CURRENT_TIMESTAMP WHERE ID=@ID";

                    sqlCommand = new SqlCommand(updateSql, connection);

                    sqlCommand.Parameters.AddWithValue("@ID", loginUser.Id);

                    sqlCommand.ExecuteNonQuery();
                }
                return loginUser;
            }
            catch (Exception)
            {
                return loginUser;
            }
        }

        public bool Save(LoginUser loginUser)
        {
            // return false;
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"INSERT INTO [login_user]
                                        ([Username],[Password],[UserType],[DateCreated])
                                        VALUES (@Username,@Password,@UserType,CURRENT_TIMESTAMP)";

                    var sqlCommand = new SqlCommand(sql, connection);

                    sqlCommand.Parameters.AddWithValue("@Username", loginUser.Username);
                    sqlCommand.Parameters.AddWithValue("@Password", loginUser.Password);
                    sqlCommand.Parameters.AddWithValue("@UserType", loginUser.UserType);

                    connection.Open();

                    sqlCommand.ExecuteNonQuery();
                }

                return true;
            }
            catch (Exception e)
            {
                throw;
                return false;
            }
        }

        public bool Update(LoginUser loginUser, bool changePassword)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    string sql;

                    if (changePassword)
                    {
                        sql = @"UPDATE [dbo].[login_user]
                                SET [Username] = @Username,[Password] = @Password, [UserType]=@UserType WHERE ID=@ID";
                    }
                    else
                    {
                        sql = @"UPDATE [dbo].[login_user]
                                SET [Username] = @Username, [UserType]=@UserType WHERE ID=@ID";
                    }

                    var sqlCommand = new SqlCommand(sql, connection);

                    sqlCommand.Parameters.AddWithValue("@Username", loginUser.Username);
                    sqlCommand.Parameters.AddWithValue("@UserType", loginUser.UserType);

                    if (changePassword)
                        sqlCommand.Parameters.AddWithValue("@Password", loginUser.Password);


                    sqlCommand.Parameters.AddWithValue("@ID", loginUser.Id);

                    connection.Open();

                    sqlCommand.ExecuteNonQuery();
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public LoginUser GetById(int id)
        {
            try
            {
                var loginUser = new LoginUser();

                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"SELECT * FROM [login_user] WHERE ID=@ID";

                    var sqlCommand = new SqlCommand(sql, connection);
                    sqlCommand.Parameters.AddWithValue("@ID", id);
                    sqlCommand.CommandType = CommandType.Text;

                    connection.Open();

                    using (var rdr = sqlCommand.ExecuteReader())
                    {
                        if (rdr.HasRows)
                        {
                            rdr.Read();

                            loginUser.Id = (int) rdr["ID"];
                            loginUser.Username = (string) rdr["Username"];
                            loginUser.UserType = Convert.ToInt32(rdr["UserType"]);
                        }
                    }
                }

                return loginUser;
            }
            catch (Exception)
            {
                return new LoginUser();
            }
        }

        public AjaxGridResult FindAll(int offset, int rowNumber, string sortExpression, string sortOrder, int pageNumber)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    var sqlCommand =
                        new SqlCommand(String.Format(
                            @"DECLARE @PageSize INT,
                                @Page INT

                                SELECT  @Page = {0}, @PageSize = {1}                                

                                ;WITH PageNumbers AS(
                                SELECT * FROM (
                                SELECT ROW_NUMBER() OVER(ORDER BY {2} {3}) AS NUMBER,
                                    ID, Username, CASE WHEN UserType=1 THEN 'Admin' WHEN UserType=2 THEN 'Moderator' END as UserType,
                                    DateCreated FROM login_user
                                ) AS TBL
                                )
                                SELECT  *
                                FROM    PageNumbers
                                WHERE   PageNumbers.NUMBER  BETWEEN ((@Page - 1) * @PageSize + 1) AND (@Page * @PageSize)", pageNumber,
                            rowNumber, sortExpression, sortOrder));

                    var dataAdapter = new SqlDataAdapter();
                    var dataSet = new DataSet();
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.Connection = connection;
                    dataAdapter.SelectCommand = sqlCommand;

                    connection.Open();
                    dataAdapter.Fill(dataSet, "myDataSet");

                    var jSerializer = new JavaScriptSerializer();

                    var myData = dataSet.Tables[0].AsEnumerable().Select(x => new
                    {
                        ID = x.Field<int>("ID"),
                        Username = x.Field<string>("Username"),
                        UserType = x.Field<string>("UserType"),
                        DateCreated =
                            x.Field<DateTime?>("DateCreated") != null
                                ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DateCreated"))
                                : ""
                    }).ToList();

                    var jsonData = jSerializer.Serialize(myData);

                    sqlCommand = new SqlCommand("SELECT Count(*) FROM login_user", connection);
                    var rowCount = Convert.ToInt32(sqlCommand.ExecuteScalar());

                    connection.Close();

                    return new AjaxGridResult
                    {
                        Data = jsonData,
                        PageNumber = pageNumber,
                        RowCount = rowCount
                    };
                }
            }
            catch (Exception e)
            {
                throw e;
                return new AjaxGridResult();
            }
        }

        public bool Delete(int id)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"DELETE FROM [login_user] WHERE ID=@ID";

                    var sqlCommand = new SqlCommand(sql, connection);

                    sqlCommand.Parameters.AddWithValue("@ID", id);

                    connection.Open();

                    sqlCommand.ExecuteNonQuery();
                }

                return true;
            }
            catch (Exception e)
            {
                throw;
                return false;
            }
        }

        public bool CheckUser(string username, int id)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"SELECT * FROM [login_user] WHERE Username=@username AND ID!=@id";

                    var sqlCommand = new SqlCommand(sql, connection);

                    sqlCommand.Parameters.AddWithValue("@username", username);
                    sqlCommand.Parameters.AddWithValue("@id", id);

                    connection.Open();

                    sqlCommand.ExecuteNonQuery();
                    var rd = sqlCommand.ExecuteReader();
                    if (rd.HasRows)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                throw;
                return true;
            }
            return false;
        }

        public bool CheckOldPasswordMatches(int userId, string password)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    connection.Open();

                    var sql = string.Format("SELECT Count(*) FROM login_user WHERE ID={0} AND Password='{1}'",
                        userId,
                        password);

                    var sqlCommand = new SqlCommand(sql, connection);

                    var rowCount = Convert.ToInt32(sqlCommand.ExecuteScalar());
                    connection.Close();

                    return rowCount > 0;
                }
            }
            catch (Exception)
            {
                throw;
                return false;
            }
        }

        public bool ChangePassword(int userId, string newPassword)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"UPDATE login_user SET Password=@Password WHERE ID=@ID";

                    var sqlCommand = new SqlCommand(sql, connection);

                    sqlCommand.Parameters.AddWithValue("@ID", userId);
                    sqlCommand.Parameters.AddWithValue("@Password", newPassword);

                    connection.Open();

                    sqlCommand.ExecuteNonQuery();
                }

                return true;
            }
            catch (Exception e)
            {
                throw;
                return false;
            }
        }

        public IEnumerable<object> FindAllForDropDown()
        {
            try
            {
                var optionNameList = new List<object>();

                using (var connection = new SqlConnection(ConnectionString))
                {
                    var sql = @"SELECT * FROM [login_user]";

                    var sqlCommand = new SqlCommand(sql, connection);

                    connection.Open();

                    using (var rdr = sqlCommand.ExecuteReader())
                    {
                        if (rdr.HasRows)
                        {
                            while (rdr.Read())
                            {
                                optionNameList.Add(new 
                                {
                                    Value = Convert.ToString(rdr["ID"]),
                                    Text = Convert.ToString(rdr["Username"])
                                });
                            }
                            rdr.Close();
                        }
                    }
                }

                return optionNameList;
            }
            catch (Exception)
            {
                return new List<object>();
            }
        }
    }
}