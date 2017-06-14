using System;
using System.Web;
using System.Web.Mvc;
using VasupDemoServerInfrastructure;

namespace VasupDemoSender.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Base/

        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string lang = null;
            HttpCookie langCookie = Request.Cookies["VasupDemoSender"];
            if (langCookie != null)
            {
                lang = langCookie.Value;
            }
            else
            {
                var userLanguage = Request.UserLanguages;
                var userLang = userLanguage != null ? userLanguage[0] : "";
                if (userLang != "")
                {
                    lang = userLang;
                }
                else
                {
                    lang = SiteLanguages.GetDefaultLanguage();
                }
            }

            new SiteLanguages().SetLanguage(lang);

            return base.BeginExecuteCore(callback, state);
        }

    }
}
