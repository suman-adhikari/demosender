using System;
using System.Data.SqlClient;
using System.Web;

namespace VasupDemoServerInfrastructure
{
    public class UserLogScript
    {   
        public static void Script(string action, SqlConnection connection,SqlTransaction sqlTransaction = null, string logoutTime = "")
        {
            var logSqlCommand =
                new SqlCommand(@"Insert into LoginUserLog(USERID,USERNAME,DATETIME,USERACTION) values(@USERID,@USERNAME,@DATETIME,@USERACTION)",
                    connection, sqlTransaction);


            logSqlCommand.Parameters.AddWithValue("@USERID", HttpContext.Current.Session[SessionVariables.LoginUserId]);
            logSqlCommand.Parameters.AddWithValue("@USERACTION", action);
            logSqlCommand.Parameters.AddWithValue("@USERNAME", HttpContext.Current.Session[SessionVariables.LoginUserName]);
            logSqlCommand.Parameters.AddWithValue("@DATETIME", DateTime.Now);
           

            logSqlCommand.ExecuteNonQuery();
        }
    }
}
