using System;
using System.Globalization;
using System.Net;
using System.Web.Mvc;
using VasupDemoServerInfrastructure;
using VasupDemoServerModel;
using VasupDemoServerRepository;

namespace VasupDemoSender.Controllers
{
    public class LoginController : Controller
    {
        private readonly UserRepository _userRepository;
        private readonly LoginUserLogRepository _loginUserLogRepository;

        public LoginController() { }
        public LoginController(UserRepository userRepository,LoginUserLogRepository loginUserLogRepository)
        {
            _userRepository = userRepository;
            _loginUserLogRepository = loginUserLogRepository;
        }

        public ActionResult Index()
        {
            if (Session[SessionVariables.SessionId] != null && (int) Session[SessionVariables.LoginUserType] == 1)
            {
                return RedirectToAction("Index", "UserManagement");
            }
            if (Session[SessionVariables.SessionId] != null && (int) Session[SessionVariables.LoginUserType] == 2)
            {
                return RedirectToAction("Index", "UserManagement"); //UserManagement
            }
            //_userRepository.GetById(1);
            return View();
        }

        [HttpPost]
        public ActionResult Index(LoginUser loginuser)
        {
            var logindata = _userRepository.Authenticate(loginuser.Username, Encryptor.Md5Hash(loginuser.Password));

            if (logindata != null)
            {
                Session[SessionVariables.LoginUserId] = logindata.Id;
                Session[SessionVariables.LoginUserName] = logindata.UserName;
                Session[SessionVariables.LoginUserType] = logindata.UserType;
                Session[SessionVariables.UserAgent] =
                    string.Format(Request.Browser.Browser + " / " + Request.Browser.Version);
                Session[SessionVariables.Ip] = Dns.GetHostByName(Environment.MachineName).AddressList[0].ToString();
                Session[SessionVariables.SessionTime] = DateTime.Now;
                Session[SessionVariables.SessionId] =
                    (((DateTime.Now.ToString(CultureInfo.InvariantCulture)).Replace("/", "")).Replace(":", "")).Replace(" ", "");

                _loginUserLogRepository.UpdateLog("Login");
                _userRepository.UpdateUser(logindata.Id);
                if (logindata.UserType == 1)
                    return RedirectToAction("Index", "UserManagement"); 
                return RedirectToAction("Index", "UserManagement");
            }
            @ViewData["Error"] = "Invalid Username or Password";
            return View();
        }

        public ActionResult Logout()
        {
            
            var sessionid = Convert.ToString(Session[SessionVariables.SessionId]);
            _loginUserLogRepository.UpdateLog("Logout");
            Session.Clear();
            Session.Abandon();

            return RedirectToAction("Index", "Login");
        }
    }
}