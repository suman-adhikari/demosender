using System;
using System.Collections.Generic;
using System.Web.Mvc;
using VasupDemoServerModel;
using VasupDemoServerRepository;

namespace VasupDemoSender.Controllers
{
    public class TeaserDemoSenderController : Controller
    {
        //
        // GET: /TeaserDemoSender/
        private readonly TeaserManagementRepository _teaserManagementRepository;

        public TeaserDemoSenderController(TeaserManagementRepository teaserManagementRepository)
        {
            _teaserManagementRepository = teaserManagementRepository;
        }

        public ActionResult Index()
        {
             var items = new List<SelectListItem>();
             TeaserList teaserList = new TeaserList(); 
             var teaserName = _teaserManagementRepository.GetAllTeaserName();                            
               foreach (var row in teaserName)
                {
                    SelectListItem selectListItem = new SelectListItem();
                    selectListItem.Text = row.TeaserName;
                    selectListItem.Value = row.ID.ToString();
                    if (teaserList.TeaserName == row.TeaserName) selectListItem.Selected = true;
                   items.Add(selectListItem);
                }
              
               ViewBag.TeaserName = items;

            return View();
        }
       
        public ActionResult GetTeaserById()
        {
            string teaserId = HttpContext.Request["TeaserId"];
            var teaserData = _teaserManagementRepository.GetById(Int32.Parse(teaserId));


            return Json(new
            {   status = true,
                Result = teaserData
            });
        }
     
    }
}
