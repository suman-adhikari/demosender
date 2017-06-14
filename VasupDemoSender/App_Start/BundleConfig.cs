using System.Web.Optimization;

namespace VasupDemoSender
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/javascript/base").Include(
                "~/includes/scripts/jquery-1.7.2.min.js",
                "~/includes/scripts/jquery-ui-1.10.3.js",
                "~/includes/scripts/bootstrap.js",
                "~/includes/scripts/ajaxGrid.js",
                "~/includes/scripts/jquery.center.js",
                "~/includes/scripts/Shared.js",
                "~/includes/scripts/jquery.cookie.js",
                "~/includes/scripts/dateTimepicker.js",
                "~/includes/scripts/XmlMobileParser.js"
                ));

            bundles.Add(new ScriptBundle("~/javascript/validation").Include(
                "~/includes/scripts/jquery.validationEngine-en.js",
                "~/includes/scripts/jquery.validationEngine.js"
                ));

            bundles.Add(new StyleBundle("~/styles/jqueryui").Include(
                "~/includes/styles/jquery-ui.css"));


            bundles.Add(new StyleBundle("~/styles/base").Include(
                "~/includes/styles/bootstrap.css",
                "~/includes/styles/style.css"
                ));

            bundles.Add(new StyleBundle("~/styles/validation").Include(
                "~/includes/styles/validationEngine.jquery.css"
                ));
        }
    }
}