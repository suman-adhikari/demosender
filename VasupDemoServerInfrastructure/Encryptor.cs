using System.Security.Cryptography;
using System.Text;

namespace VasupDemoServerInfrastructure
{
    public class Encryptor
    {
        public static string Md5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            md5.ComputeHash(Encoding.ASCII.GetBytes(text));
            byte[] result = md5.Hash;
            StringBuilder strBuilder = new StringBuilder();
            foreach (byte res in result)
            {
                strBuilder.Append(res.ToString("x2"));
            }
            return strBuilder.ToString();
        }
    }
}
