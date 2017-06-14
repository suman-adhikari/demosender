using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using VasupDemoServerModel;

namespace VasupDemoServerRepository
{
    public class UserRepository : Repo
    {
        private static string _connection;
        private static readonly string Msisdn = string.Empty;
        public UserRepository()
        {
            _connection = Connection();
        }

        public DataTable GetAll()
        {
           
            DataTable dt = GetData("SELECT * FROM [dbo].[ICB_USER]");
            return dt;
        }

        public User Authenticate(string userName, string password)
        {
            using (SqlConnection connection = new SqlConnection(_connection))
            {
                connection.Open();
                string sqlQuery = "Select ID,USER_TYPE,[USER_NAME] from ICB_USER where USER_NAME= @USER_NAME AND PASSWORD = @PASSWORD and STATUS = 1";
                using (SqlCommand command = new SqlCommand(sqlQuery,connection))
                {
                    command.Parameters.AddWithValue("@USER_NAME",userName);
                    command.Parameters.AddWithValue("@PASSWORD",password);
                    SqlDataReader rdr = command.ExecuteReader();
                    while (rdr.Read())
                    {
                        User user = new User()
                        {
                            Id = Convert.ToInt32(rdr["ID"]),
                            UserType = Convert.ToInt32(rdr["USER_TYPE"]),
                            UserName = Convert.ToString(rdr["USER_NAME"])
                        };
                        return user;
                    }
                }
            }
            return null;            
        }



        public bool DeleteUser(int id)
        {
            var con = new SqlConnection(_connection);
            con.Open();
            var trans = con.BeginTransaction();
            try
            {
                const string query = @"delete from ICB_USER where ID=@id";
                //ActionLogScript.AddLog(con, "Delete User", Msisdn,trans);
                SqlCommand cmd = new SqlCommand(query, con, trans);
                cmd.Parameters.AddWithValue("@id", id);
                if (cmd.ExecuteNonQuery() != -1)
                {
                    trans.Commit();
                    return true;
                }

            }
            catch (Exception ex)
            {
                
            }
            finally
            {
                con.Close();
            }
            return false;
        }


        public User GetById(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connection))
                {
                    con.Open();
                    const string sqlQuery = @"SELECT 
                                                 ID,
                                                 [USER_NAME]                                             
                                                ,[USER_TYPE]
                                                ,[STATUS]
                                                FROM ICB_USER where ID=@ID";
                    using (SqlCommand command=new SqlCommand(sqlQuery,con))
                    {
                        command.Parameters.AddWithValue("@ID", id);
                        SqlDataReader rdr = command.ExecuteReader();
                        while (rdr.Read())
                        {
                            User user = new User()
                            {
                                Id = (int)rdr["ID"],
                                UserName = Convert.ToString(rdr["USER_NAME"]),                       
                                UserType = Convert.ToInt32(rdr["USER_TYPE"]),
                                Status = Convert.ToInt32(rdr["STATUS"])
                            };
                            return user;
                        }
                    }                    
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public void UpdateUser(int id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    conn.Open();
                    string query = @"Update ICB_USER Set DATE_LASTLOGIN = @DateLastLogin where ID=@Id";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@DateLastLogin", DateTime.Now);
                        cmd.Parameters.AddWithValue("@Id", id);
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
               
        }

        public bool CheckUser(string username, int id)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    const string sql = @"SELECT * FROM [ICB_USER] WHERE User_name=@username AND ID!=@id";

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

        public bool CreateUser(User user)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    conn.Open();
                    string query = @"Select ID from ICB_USER where [USER_NAME]= @USER_NAME";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@USER_NAME", user.UserName);
                        while (cmd.ExecuteReader().Read())
                        {
                            conn.Close();
                            return true;
                        }
                    }
                    conn.Close();
                    conn.Open();
                    var trans = conn.BeginTransaction();
                    try
                    {
                       /* query = @"Insert into ICB_USER ([USER_NAME],PASSWORD,IS_ACTIVE,FIRST_NAME,LAST_NAME,USER_TYPE,DATE_CREATED) 
                            values (@USER_NAME,@PASSWORD,@IS_ACTIVE,@FIRST_NAME,@LAST_NAME,@USER_TYPE,@DATE_CREATED)";*/

                        query = @"Insert into ICB_USER ([USER_NAME],PASSWORD,STATUS,USER_TYPE,DATE_CREATED,DATE_LASTLOGIN) 
                            values (@USER_NAME,@PASSWORD,@STATUS,@USER_TYPE,@DATE_CREATED,@DATE_LASTLOGIN)";



                        //ActionLogScript.AddLog(conn,"Create User",Msisdn,trans);
                        SqlCommand cmd = new SqlCommand(query, conn, trans);
                        cmd.Parameters.AddWithValue("@USER_NAME", user.UserName);
                        cmd.Parameters.AddWithValue("@PASSWORD", user.Password);
                        cmd.Parameters.AddWithValue("@STATUS", "1");
                       // cmd.Parameters.AddWithValue("@FIRST_NAME", user.FirstName);
                       // cmd.Parameters.AddWithValue("@LAST_NAME", user.LastName);
                        cmd.Parameters.AddWithValue("@USER_TYPE", user.UserType);
                        cmd.Parameters.AddWithValue("@DATE_CREATED", DateTime.Now);
                        cmd.Parameters.AddWithValue("@DATE_LASTLOGIN", DateTime.Now);
                        if (cmd.ExecuteNonQuery() != -1)
                        {
                            trans.Commit();
                            return true;
                        }

                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        return false;

                    }
                    finally
                    {
                        conn.Close();
                    }
                }
            }
            catch (Exception exception)
            {

                MessageBox.Show(exception.Message);
            }
            return false;
        }

        public bool UpdateUser(User user, int id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    conn.Open();
                    string query;
                    if (user.Password == "")
                    {
                        query = @"Select ID from ICB_USER where [USER_NAME]= @USER_NAME AND ID <>@ID ";
                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@USER_NAME", user.UserName);
                            cmd.Parameters.AddWithValue("@ID", id);
                            while (cmd.ExecuteReader().Read())
                            {
                                conn.Close();
                                return true;
                            }
                        }
                    }
                    conn.Close();
                    conn.Open();
                    var trans = conn.BeginTransaction();
                    try
                    {
                        query = user.Password != null ? @"UPDATE ICB_USER set USER_NAME=@USER_NAME, PASSWORD=@PASSWORD, STATUS=@IS_ACTIVE, USER_TYPE=@USER_TYPE WHERE ID=@ID" : @"UPDATE ICB_USER set USER_NAME=@USER_NAME, STATUS=@IS_ACTIVE, USER_TYPE=@USER_TYPE WHERE ID=@ID";


                         //ActionLogScript.AddLog(conn, "Edit User", Msisdn, trans);
                        SqlCommand cmd = new SqlCommand(query, conn, trans);
                        cmd.Parameters.AddWithValue("@ID", user.Id);
                        cmd.Parameters.AddWithValue("@USER_NAME", user.UserName);
                        if (user.Password != null) cmd.Parameters.AddWithValue("@PASSWORD", user.Password);
                        cmd.Parameters.AddWithValue("@IS_ACTIVE", user.Status);
                        //cmd.Parameters.AddWithValue("@FIRST_NAME", user.FirstName);
                        //cmd.Parameters.AddWithValue("@LAST_NAME", user.LastName);
                        cmd.Parameters.AddWithValue("@USER_TYPE", user.UserType);
                       // cmd.Parameters.AddWithValue("@LASTUPDATE_DATE", DateTime.Now);

                        if (cmd.ExecuteNonQuery() != -1)
                        {
                            trans.Commit();
                            return true;
                        }

                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        return false;
                    }
                    finally
                    {
                        conn.Close();
                    }
                }
            }
            catch (Exception exception)
            {

                MessageBox.Show(exception.Message);
            }
            return false;
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
                                    ID, User_name, CASE WHEN User_Type=1 THEN 'Admin' WHEN User_Type=2 THEN 'Moderator' END as UserType,
                                    DATE_CREATED,DATE_LASTLOGIN FROM ICB_USER
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
                        User_name = x.Field<string>("User_name"),
                        User_Type = x.Field<string>("UserType"),
                        Date_Created = x.Field<DateTime?>("Date_Created") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DATE_CREATED")) : "",
                        Date_Lastlogin = x.Field<DateTime?>("Date_Lastlogin") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DATE_LASTLOGIN")) : ""
                    }).ToList();

                    var jsonData = jSerializer.Serialize(myData);

                    sqlCommand = new SqlCommand("SELECT Count(*) FROM ICB_USER", connection);
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
            catch (Exception)
            {              
                return new AjaxGridResult();
            }
        }

        public bool CheckOldPasswordMatches(int userId, string password)
        {
            try
            {
                using (var connection = new SqlConnection(ConnectionString))
                {
                    connection.Open();

                    var sql = string.Format("SELECT Count(*) FROM ICB_USER WHERE ID={0} AND Password='{1}'",
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
                    const string sql = @"UPDATE ICB_USER SET Password=@Password WHERE ID=@ID";

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
    }
}
