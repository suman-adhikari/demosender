using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VasupDemoServerModel
{
    public class LoginUserInput
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool ChangePassword { get; set; }
        public int UserType { get; set; }

        public int Status { get; set; }
    }
}
