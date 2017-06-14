using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VasupDemoServerModel
{
   public class IcbUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int UserType { get; set; }
        public int Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateLastLogin { get; set; }
    }
}
