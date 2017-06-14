
using System;
using System.Globalization;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.UI;
using Autofac.Integration.Web;

namespace VasupDemoSender
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication :HttpApplication, IContainerProviderAccessor
    {
        public static IContainerProvider _containerProvider;

        public IContainerProvider ContainerProvider
        {
            get { return _containerProvider; }
        }
        protected void Application_Start()
        {
            _containerProvider = Bootstrapper.ConfigureDependencies();
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            string language = Request.Cookies["VasupDemoSender"] == null ? "fr" : Request.Cookies["VasupDemoSender"].Value;

            // Uses WebForms code to apply "auto" culture to current thread and deal with
            // invalid culture requests automatically. Defaults to en-US when not specified.
            using (var fakePage = new Page())
            {
                fakePage.Culture = language; // Apply local formatting to this thread
                fakePage.UICulture = language; // Apply local language to this thread
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(language);
                HttpContext.Current.Items.Add("VasupDemoSender", language);
            }
        }

       
    }
}