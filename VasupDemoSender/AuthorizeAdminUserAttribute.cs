using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using VasupDemoServerInfrastructure;

namespace VasupDemoSender
{
    public class AuthorizeAdminUserAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var userType = Convert.ToInt32(httpContext.Session[SessionVariables.LoginUserType]);

            return (userType == 1);
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary(
                    new
                    {
                        controller = "Login",
                        action = "Index"
                    })
                );
        }
    }
}