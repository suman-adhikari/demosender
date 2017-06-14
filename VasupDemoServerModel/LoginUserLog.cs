using System;

namespace VasupDemoServerModel
{
    public class LoginUserLog
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime DateTime { get; set; }
        public string UserAction { get; set; }
    }
}
