namespace VasupDemoServerModel
{
    public class TeaserList
    {

    public int ID { get; set; }
    public int TeaserIdCode { get; set; }
    public string TeaserName { get; set; }
    public string DateCreated { get; set; }
    public int NoOfClicks { get; set; }

    public string TeaserXml { get; set; }
    public string TeaserXmlRo { get; set; }
    public int ActivationType { get; set; }
    public string DateTimeStart { get; set; }
    public int LanguageId { get; set; }
    public int TargetGroupId { get; set; }
    public int BroadCastScheduleId { get; set; }
    public string DlrMask { get; set; }
    public string ForceSend { get; set; }
    public int IsParsed { get; set; }
    public int IsArchive { get; set; }
    public int IsCompleted { get; set; }
    public int IsDeleted { get; set; }
    public int IsUploaded { get; set; }
    public string Status { get; set; }
    public string BroadcastingStatus { get; set; }
    public string Udh { get; set; }
    public string Text { get; set; }
    public int SubscriberGroupId { get; set; }
    public string MaxSubscriptions { get; set; }
    public string SmsToSend { get; set; }
    public string SentSms { get; set; }
    public string Encoding { get; set; }
    public string Comments { get; set; }
    public int UserId { get; set; }

    public static string GetTable()
    {
        return "TeaserList";
    }
    }
}
