using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using VasupDemoServerModel;

namespace VasupDemoServerInfrastructure
{

    public class SiteLanguages
    {
        public static List<Language> AvailableLanguages = new List<Language>
        {
            new Language {LangFullName = "English", LangCultureName = "en-US"},
            new Language {LangFullName = "French", LangCultureName = "fr"}
        };

        public static bool IsLanguageAvailable(string lang)
        {
            return AvailableLanguages.FirstOrDefault(a => a.LangCultureName.Equals(lang)) != null;
        }

        public static string GetDefaultLanguage()
        {
            return AvailableLanguages[0].LangCultureName;
        }

        public void SetLanguage(string lang)
        {
            try
            {
                if (!IsLanguageAvailable(lang))
                    lang = GetDefaultLanguage();
                var cultureInfo = new CultureInfo(lang);
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureInfo.Name);
                HttpCookie langCookie = new HttpCookie("VasupDemoSender", lang) {Expires = DateTime.Now.AddYears(1)};
                HttpContext.Current.Response.Cookies.Add(langCookie);

            }
            catch (Exception)
            {
                // ignored
            }
        }
    }

}
