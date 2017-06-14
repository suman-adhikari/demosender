using System.Reflection;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.Web;
using VasupDemoServerRepository;

namespace VasupDemoSender
{
    public class Bootstrapper
    {
        private static IContainerProvider _containerProvider;

        public static IContainerProvider ConfigureDependencies()
        {
            return SetAutofacContainer();
        }

        private static IContainerProvider SetAutofacContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(Assembly.Load("VasupDemoSender"));

            builder.RegisterType<UserRepository>().As<UserRepository>().InstancePerLifetimeScope();
            builder.RegisterType<XmlTemplatesRepository>().As<XmlTemplatesRepository>().InstancePerLifetimeScope();
            builder.RegisterType<TeaserManagementRepository>().As<TeaserManagementRepository>().InstancePerLifetimeScope();
            builder.RegisterType<LoginUserLogRepository>().As<LoginUserLogRepository>().InstancePerLifetimeScope();
         
            
            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            _containerProvider = new ContainerProvider(container);

            return _containerProvider;
        }
    }
}