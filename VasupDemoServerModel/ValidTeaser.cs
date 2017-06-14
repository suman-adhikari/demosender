using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VasupDemoServerModel
{
    public class ValidTeaser
    {
    public int ID { get; set; }

    public int TeaserID { get; set; }

    public string TeaserName { get; set; }

    public string TeaserIDCode { get; set; }

    public string ValidDateTime { get; set; }

    public string UpdateDateTime { get; set; }

    public int Status { get; set; }

    public string ValidResponse { get; set; }

    public int UserId { get; set; }

    public static string GetTable()
    {
        return "ValidTeaser";
    }
    }
}
