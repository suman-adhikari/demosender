using System;

namespace VasupDemoServerModel
{
   public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Status { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int UserType { get; set; }
        public string UserTypeDescription { get; set; }
        public bool IsActive { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateLastLogin { get; set; }

    }
}
