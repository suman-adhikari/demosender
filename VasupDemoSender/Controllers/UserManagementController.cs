using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using VasupDemoServerInfrastructure;
using VasupDemoServerModel;
using VasupDemoServerRepository;

namespace VasupDemoSender.Controllers
{
    public class UserManagementController : BaseController
    {
        
        private readonly UserRepository _userRepository;
        private readonly LoginUserLogRepository _loginUserLogRepository;
        public UserManagementController(UserRepository userRepository, LoginUserLogRepository loginUserLogRepository)
        {
            _userRepository = userRepository;
            _loginUserLogRepository = loginUserLogRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        [AuthorizeLoginUser]
        [HttpPost]
        public JsonResult FindAll(int offset, int rowNumber, string sortExpression, string sortOrder, int pageNumber)
        {
            return Json(_userRepository.FindAll(offset, rowNumber, sortExpression, sortOrder, pageNumber));
        }   

        [AuthorizeLoginUser]
        public ActionResult UserForm(int id = 0)
        {
            var items = new List<SelectListItem>
            {
                new SelectListItem {Text = "Admin", Value = "1", Selected = true},
                new SelectListItem {Text = "Operator", Value = "2"}
            };

            var loginUserInput = new IcbUser();
            if (id > 0)
            {
                var loginUser = _userRepository.GetById(id);
                loginUserInput.Id = loginUser.Id;
                loginUserInput.Username = loginUser.UserName;
                loginUserInput.UserType = Convert.ToInt32(loginUser.UserType);
                loginUserInput.Status = loginUser.Status;

                items.Where(x => x.Value == loginUser.UserType.ToString()).ToList()[0].Selected = true;
            }

            ViewBag.usertype = items;
            return View("userForm", loginUserInput); 
        }

        
        [AuthorizeLoginUser]
        public ActionResult SaveuserForm(LoginUserInput loginUserInput)
        {
            var successMessage = "";
            var errorMessage = "";

            var loginUser = new User
            {
                Id = loginUserInput.Id,
                UserName = loginUserInput.Username,
                UserType = loginUserInput.UserType,
                Status = loginUserInput.Status                
            };

            var checkuser = _userRepository.CheckUser(loginUser.UserName, loginUser.Id);
            if (checkuser)
            {
                Session[SessionVariables.ConfirmationStatus] = "Failed";
                Session[SessionVariables.ConfirmationMessage] = "User Already Exists";

                return RedirectToAction("Index", "UserManagement");
            }


            if (loginUserInput.Password != null)
            {
                loginUser.Password = Encryptor.Md5Hash(loginUserInput.Password);
            }

            bool result = loginUserInput.Id > 0? _userRepository.UpdateUser(loginUser, loginUserInput.Id): _userRepository.CreateUser(loginUser);

            if (Convert.ToInt32(Session[SessionVariables.LoginUserId]) == loginUserInput.Id)
            {
                Session[SessionVariables.LoginUserName] = loginUserInput.Username;
            }
          
            if (result)
            {
                string action = loginUserInput.Id == 0 ? "New User \"" + loginUserInput.Username + "\' Added" : "Username  \'" + Request["hiddenname"] + "\"  Updated to '" + loginUserInput.Username+"'";
                _loginUserLogRepository.UpdateLog(action);
                successMessage = loginUserInput.Id == 0 ? "Sucessfully Saved User." : "Sucessfully Updated User.";
            }            
            else
            {
                errorMessage = loginUserInput.Id == 0 ? "Failed Saving User." : "Failed Updating User";
            }
          
            if (loginUserInput.Id == 0)
            {
                Session[SessionVariables.ConfirmationStatus] = result? "Success": "Failed";
                Session[SessionVariables.ConfirmationMessage] = result? successMessage: errorMessage;
            }
            else
            {
                Session[SessionVariables.ConfirmationStatus] = result? "Success" : "Failed";
                Session[SessionVariables.ConfirmationMessage] = result? successMessage : errorMessage;
            }
            return RedirectToAction("Index", "UserManagement");
        }

        
        [AuthorizeLoginUser]
        public ActionResult DeleteUser(int id)
        {
            var loginUser = _userRepository.GetById(id);
            var result = _userRepository.DeleteUser(loginUser.Id);

            if (result)
                _loginUserLogRepository.UpdateLog("User  \"" + loginUser.UserName + "\"  Deleted");

            return Json(new
            {
                Result = result? "Success" : "Failed",
                Message = result? "Sucessfully Deleted User" : "Error occured while Deleting"
            });
        }

        [HttpGet]
        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ChangePassword(string oldPassword, string newPassword, string returnUrl)
        {
            var userId = Convert.ToInt32(Session[SessionVariables.LoginUserId]);

            oldPassword = Encryptor.Md5Hash(oldPassword);

            var passwordMatch = _userRepository.CheckOldPasswordMatches(userId, oldPassword);

            if (passwordMatch)
            {
                newPassword = Encryptor.Md5Hash(newPassword);

                var changePasswordStatus = _userRepository.ChangePassword(userId, newPassword);

                if (changePasswordStatus)
                {
                    _loginUserLogRepository.UpdateLog("Password Changed");
                    Session[SessionVariables.ConfirmationStatus] = "Success";
                    Session[SessionVariables.ConfirmationMessage] = "Password Change Success";
                }
                else
                {
                    Session[SessionVariables.ConfirmationStatus] = "Failed";
                    Session[SessionVariables.ConfirmationMessage] = "Password Change Failure";
                }
            }
            else
            {
                Session[SessionVariables.ConfirmationStatus] = "Failed";
                Session[SessionVariables.ConfirmationMessage] = "Old Password Dosent Match";
            }

            return Redirect(returnUrl);
        }


    }
}
