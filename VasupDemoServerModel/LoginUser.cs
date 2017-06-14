using System;

namespace VasupDemoServerModel
{
    public class LoginUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int UserType { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}