using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using VasupDemoServerInfrastructure;
using VasupDemoServerModel;

namespace VasupDemoServerRepository
{
    public class LoginUserLogRepository : Repo
    {
        private static string _connection;    
        public LoginUserLogRepository()
        {
            _connection = Connection();
        }
        public AjaxGridResult FindAll(int offset, int rowNumber, string sortExpression, string sortOrder, int pageNumber, int userId)
        {
            try
            {
                if (sortExpression == "ID") sortExpression = "U.ID";

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
                                    U.ID, U.UserName, U.DateTime,U.UserAction FROM LoginUserLog as U
                                    LEFT JOIN [ICB_USER] as L on U.USERID = L.ID
                                    WHERE U.USERID={4}
                                ) AS TBL
                                )
                                SELECT  *
                                FROM    PageNumbers
                                WHERE   PageNumbers.NUMBER  BETWEEN ((@Page - 1) * @PageSize + 1) AND (@Page * @PageSize)", pageNumber,
                            rowNumber, sortExpression, sortOrder,Convert.ToString(userId)));

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
                        UserName = x.Field<string>("UserName"),
                        DateTime = x.Field<DateTime?>("DateTime") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DateTime")) : "",
                        UserAction = x.Field<string>("UserAction")
                       
                        //DateCreated =x.Field<DateTime?>("DateCreated") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DateCreated")): ""
                    }).ToList();

                    var jsonData = jSerializer.Serialize(myData);                 
                    sqlCommand = new SqlCommand("SELECT Count(*) FROM LoginUserLog WHERE UserId=" + Convert.ToString(userId), connection);
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


        public bool UpdateLog(string action)
        {
            try
            {
                using (var con = new SqlConnection(ConnectionString))
                {
                    con.Open();
                    UserLogScript.Script(action, con);
                    con.Close();
                }
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }


        public bool UpdateLog1(int userid,string userName, string action)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    conn.Open();
                    string query =
                        "Insert into LoginUserLog(USERID,USERNAME,DATETIME,USERACTION) values(@USERID,@USERNAME,@DATETIME,@USERACTION)";
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@USERID", userid);
                        cmd.Parameters.AddWithValue("@USERNAME", userName);
                        cmd.Parameters.AddWithValue("@DATETIME", DateTime.Now);
                        cmd.Parameters.AddWithValue("@USERACTION", action);

                        if (cmd.ExecuteNonQuery() != -1)
                        {
                            conn.Close();
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }
            
            return true;
        }

     
    }
}