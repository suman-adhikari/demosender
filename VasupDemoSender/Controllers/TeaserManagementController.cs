using System;
using System.Collections.Generic;
using System.Web.Mvc;
using VasupDemoServerInfrastructure;
using VasupDemoServerModel;
using VasupDemoServerRepository;

namespace VasupDemoSender.Controllers
{
    public class TeaserManagementController : Controller
    {
        //
        // GET: /TeaserManagement/

        private readonly XmlTemplatesRepository _xmlTemplatesRepository;
        private readonly TeaserManagementRepository _teaserManagementRepository;

        public TeaserManagementController(XmlTemplatesRepository xmlTemplatesRepository, TeaserManagementRepository teaserManagementRepository)
        {
            _xmlTemplatesRepository = xmlTemplatesRepository;
            _teaserManagementRepository = teaserManagementRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Form()
        {
            return View();

        }

        public ActionResult Show()
        {

           var items = new List<SelectListItem>();
           
           TeaserList teaserList = new TeaserList();           
           string  id = HttpContext.Request["ID"];
          
            if (id!="") {
            teaserList = _teaserManagementRepository.GetById(Convert.ToInt32(id));
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
            }
            return View("Show", teaserList);
        }

        [AuthorizeAdminUser]
        public ActionResult FindAll(int offset, int rowNumber, string sortExpression, string sortOrder, int pageNumber)
        {
            return Json(_teaserManagementRepository.FindAll(offset, rowNumber, sortExpression, sortOrder, pageNumber));
        }

        public ActionResult XmlTemplateForm()
        {
            return View();
        }

        public string GetXmlTemplate()
        {
            return  _xmlTemplatesRepository.GetAll();
            
        }

        public JsonResult DeleteXmlTemplate()
        {
            throw new NotImplementedException();
        }

        [AuthorizeAdminUser]
        [AuthorizeLoginUser]
        public ActionResult DeleteTeaser(int id)
        {
            var loginUser = _teaserManagementRepository.GetById(id);
            var result = _teaserManagementRepository.DeleteTeaser(loginUser.ID);

            return Json(new
            {
                Result = result? "Success" : "Failed",
                Message = result? "Teaser Successfully Deleted" : "Error occured while Deleting"
            });
        }

        public void HttpPostResponse()
        {
          /* ValidTeaser valizdTeaser = new ValidTeaser();
           TeaserList teaserList = new TeaserList();

            var teaserName = HttpContext.Request["TeaserName"];       
            teaserList.TeaserName = teaserName;       
            teaserList.IsDeleted = 0;
            teaserList.DateCreated = "2016-19-19";
            teaserList.IsCompleted = 0;
            teaserList.IsArchive = 0;
            teaserList.IsParsed = 0;
            teaserList.IsUploaded = 0;
            teaserList.Status = "CREATED";*/
/*

        $id = $this->teaserManagementRepository->Save($teaserList);


        $XML = ($_POST['XML']);

        $params = array(

            "teaserXML" => $XML
        );

        $url = UrlList::AddTeaser($teaserList);
        //$url = 'http://10.8.1.83:8070/teaser?action=addCampaign&login=unifun&password=br0adc@steR&campaignName=' . $teaserList->ID . "_" . urlencode($teaserList->TeaserName);


        if (isset($_POST["TeaserId"]) && $_POST["TeaserId"] != null) {

            $teaserListTemp = $this->teaserManagementRepository->GetById($_POST["TeaserId"]);


            $url = 'http://10.8.1.83:8070/teaser?action=editCampaign&login=unifun&password=br0adc@steR&campaignName=' . $teaserListTemp->TeaserIdCode;
        }


        $response = $this->CurlRequest($url, $params);


        //uncomment below 2 lines

        /*$result = "Status: 200, Error: , action: addTask, Msg: OK";

        $response = $this->ConvertResponseToArray(array($result));#1#

        if (isset($response[0]) && $response[0]['Status'] == 200 && isset($response[0]['Msg']) && trim($response[0]['Msg']) == "OK") {


            $validTeaser->TeaserID = $teaserList->ID;

            $validTeaser->TeaserIDCode = $teaserList->ID . "_" . urlencode($teaserList->TeaserName);

            $validTeaser->TeaserName = $teaserList->TeaserName;

            $validTeaser->Status = "VALID";

            $validTeaser->ValidResponse = json_encode($response);

            $validTeaser->UserID = $_SESSION[VasupDemoServerInfrastructure.SessionVariables::$UserID];

            $this->teaserManagementRepository->SaveValidTeaser($validTeaser);

            echo json_encode(array("Response" => $response, "TeaserID" => $teaserList->ID));

        } else {

            $this->teaserManagementRepository->RemoveTeaser($teaserList->ID);

            echo json_encode(array("Response" => $response, "TeaserID" => -1));

        }
 */
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult SaveTeaser(TeaserList teaserList)
        {
             var result = _teaserManagementRepository.SaveTeaser(teaserList);          
             Session[SessionVariables.ConfirmationStatus] = result? "Success" : "Failed";
             Session[SessionVariables.ConfirmationMessage] = result? "Teaser Successfully Created" : "Errro Creating Teaser";
             return RedirectToAction("Index", "TeaserManagement");
        }

        public ActionResult XmlGeneratorForm()
        {
            return View();
        }
    }
}
