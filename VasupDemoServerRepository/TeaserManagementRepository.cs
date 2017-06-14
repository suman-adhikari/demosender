using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using VasupDemoServerModel;

namespace VasupDemoServerRepository
{
    public class TeaserManagementRepository : Repo
    {
        private static string _connection;        
        public TeaserManagementRepository()
        {
            _connection = Connection();
        
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
                                    ID, TeaserName, NoOfSteps,ActivationType,Encoding,Comment FROM TeaserList
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
                        TeaserName = x.Field<string>("TeaserName"),
                        NoOfSteps = x.Field<int>("NoOfSteps"),
                        ActivationType = x.Field<string>("ActivationType"),
                        Encoding = x.Field<string>("Encoding"),
                        comment = x.Field<string>("comment"),
                        //DateCreated =x.Field<DateTime?>("DateCreated") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DateCreated")): ""
                    }).ToList();

                    var jsonData = jSerializer.Serialize(myData);

                    sqlCommand = new SqlCommand("SELECT Count(*) FROM TeaserList", connection);
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

        public TeaserList GetById(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(_connection))
                {
                    con.Open();
                    const string sqlQuery = @"SELECT * FROM TeaserList where ID=@ID";
                    using (SqlCommand command = new SqlCommand(sqlQuery, con))
                    {
                        command.Parameters.AddWithValue("@ID", id);
                        SqlDataReader rdr = command.ExecuteReader();
                        while (rdr.Read())
                        {
                            TeaserList teaserList = new TeaserList()
                            {
                                ID = (int)rdr["ID"],
                                TeaserName = Convert.ToString(rdr["TeaserName"]),
                                TeaserXml = Convert.ToString(rdr["TeaserXml"]),
                                Encoding = Convert.ToString(rdr["encoding"]),
                                Comments = Convert.ToString(rdr["comment"])
                            };
                            return teaserList;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
            return null;
        }

        public bool SaveTeaser(TeaserList teaserList)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connection))
                {
                    conn.Open();

                    const string query = @"Insert into TeaserList (TeaserName,NoOfSteps,ActivationType,Encoding,Comment,TeaserXml) values (@TeaserName,@NoOfSteps,@ActivationType,@Encoding,@Comments,@TeaserXml)";

                        //ActionLogScript.AddLog(conn,"Create User",Msisdn,trans);
                        SqlCommand cmd = new SqlCommand(query, conn);
                        cmd.Parameters.AddWithValue("@TeaserName", teaserList.TeaserName);
                        cmd.Parameters.AddWithValue("@NoOfSteps", teaserList.NoOfClicks);
                        cmd.Parameters.AddWithValue("@ActivationType", "USSD");
                        cmd.Parameters.AddWithValue("@Encoding", "Latin");
                        cmd.Parameters.AddWithValue("@Comments", "");
                        cmd.Parameters.AddWithValue("@TeaserXml", teaserList.TeaserXml);
                        
                        if (cmd.ExecuteNonQuery() != -1)
                        {
                            return true;
                        }
                    }                   
            }
            catch (Exception)
            {
                return false;
            }
            return false;
        }

        public bool DeleteTeaser(int id)
        {
            var con = new SqlConnection(_connection);
            con.Open();
            var trans = con.BeginTransaction();
            try
            {
                const string query = @"delete from TeaserList where ID=@id";
                //ActionLogScript.AddLog(con, "Delete User", Msisdn,trans);
                SqlCommand cmd = new SqlCommand(query, con, trans);
                cmd.Parameters.AddWithValue("@id", id);
                if (cmd.ExecuteNonQuery() != -1)
                {
                    trans.Commit();
                    return true;
                }

            }
            catch (Exception)
            {
                trans.Rollback();
                return false;
            }
            finally
            {
                con.Close();
            }
            return false;
        }

        public List<TeaserList> GetAllTeaserName()
        {
            var teaserList = new List<TeaserList>();
           
            try
            {
                using (SqlConnection con = new SqlConnection(_connection))
                {
                    con.Open();
                    const string sqlQuery = @"SELECT ID, teasername FROM TeaserList";

                    using (SqlCommand command = new SqlCommand(sqlQuery, con))
                    {                        
                        SqlDataReader rdr = command.ExecuteReader();
                        while (rdr.Read())
                        {
                            // ReSharper disable once InconsistentNaming
                            TeaserList _teaserList = new TeaserList();
                            _teaserList.TeaserName = Convert.ToString(rdr["TeaserName"]);
                            _teaserList.ID = Convert.ToInt32(rdr["ID"]);
                            teaserList.Add(_teaserList);
                        }
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
            return teaserList;
            
        } 

    }
}
