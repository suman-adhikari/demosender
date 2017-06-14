using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using VasupDemoServerModel;

namespace VasupDemoServerRepository
{
    public class XmlTemplatesRepository : Repo
    {
        private static string _connection;
        private static readonly string Msisdn = string.Empty;
        public XmlTemplatesRepository()
        {
            _connection = Connection();
        }

        public string GetAll()
        {
           
            //DataSet dt = GetData("SELECT * FROM [dbo].[XmlTemplates]");

            using (SqlConnection connection = new SqlConnection(_connection))
            {
              
                string sqlQuery = "SELECT * FROM XmlTemplates";
                using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                {
                    var dataAdapter = new SqlDataAdapter();
                    var dataSet = new DataSet();
                    command.CommandType = CommandType.Text;
                    command.Connection = connection;
                    dataAdapter.SelectCommand = command;

                    connection.Open();
                    dataAdapter.Fill(dataSet, "myDataSet");

                    var jSerializer = new JavaScriptSerializer();

                    var myData = dataSet.Tables[0].AsEnumerable().Select(x => new
                    {
                        ID = x.Field<int>("ID"),
                        XmlName = x.Field<string>("XmlName"),
                        XmlText = x.Field<string>("XmlText"),
                        //DateCreated =x.Field<DateTime?>("DateCreated") != null ? String.Format("{0:yyyy/M/d HH:mm:ss}", x.Field<DateTime>("DateCreated")): ""
                    }).ToList();

                    var jsonData = jSerializer.Serialize(myData);

                    return jsonData;
                    /* return new AjaxGridResult
                    {
                        Data = jsonData,
                        PageNumber = 1,
                        RowCount = 1
                    };*/
                }
            }
            return null;   
        }
    }
}
