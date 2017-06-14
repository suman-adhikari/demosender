using System;
using System.Web.Mvc;
using VasupDemoServerInfrastructure;
using VasupDemoServerRepository;

namespace VasupDemoSender.Controllers
{
    public class UserActionLogController : Controller
    {
        //
        // GET: /UserActionLog/
        private readonly LoginUserLogRepository _loginUserLogRepository;
        public UserActionLogController(LoginUserLogRepository loginUserLogRepository)
        {
            _loginUserLogRepository = loginUserLogRepository;
        }

        public JsonResult FindAll(int offset, int rowNumber, string sortExpression, string sortOrder, int pageNumber, int userId = 0)
        {
            if (userId == 0)
            {
                userId = Convert.ToInt32(Session[SessionVariables.LoginUserId]);
            }
            return Json(_loginUserLogRepository.FindAll(offset, rowNumber, sortExpression, sortOrder, pageNumber, userId));
        }

    }
}
