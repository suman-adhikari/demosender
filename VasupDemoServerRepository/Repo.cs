using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;


namespace VasupDemoServerRepository
{
    public class Repo
    {
        public string ConnectionString;
        public string Connection()
        {
            try
            {
                ConnectionString = ConfigurationManager.ConnectionStrings["DemoVasup"].ConnectionString;
            }
            catch (Exception)
            {

                ConnectionString = "Data Source=SUMAN-PC;Initial Catalog=DemoVasup;User ID=root;Password=root";
            }

            return ConnectionString;
        }

        public DataTable GetData(string qry)
        {
            try
            {
                DataTable dt = new DataTable();
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(qry, con);
                    da.Fill(dt);
                    return dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return null;
        }


        protected int GetCurrentIdentity(string tableName)
        {
            try
            {
                const string query = "SELECT CAST(IDENT_CURRENT(@TABLENAME)+ IDENT_INCR(@TABLENAME) AS VARCHAR(100));";
                using (SqlConnection con = new SqlConnection(ConnectionString))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@TABLENAME", tableName);

                        return cmd.ExecuteScalar() == DBNull.Value ? 1 : Convert.ToInt32((string)cmd.ExecuteScalar());
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            return -1;
        }






    }
}
