//Plugin made By Ritesh Man Chitrakar

(function ($) {


    var $object;
    var $editor;
    var $options;
    var $textAreaDiv;
    var $textArea;
    var $mobileDisplayDiv;
    //Main Mobile Content
    var $mobileDisplayPageNumber;
    var $mobileDisplay0;
    var $mobileDisplay1;
    var $mobileDisplay2;
    var $mobileDisplay3;
    var $NavigationDiv;
    var $leftArrow;
    var $rightArrow;
    var $midSection;
    var $FileUploadButton;
    var $generateXmlButton;
    var $i=1;
    //Xml
    var XmlStrings=[];

    var self={
        CallBackFunction: function () {
            self.CreateEditor();
            self.CreateMobile();
            self.CreateInnerDisplay();
            self.PlaceArrow();
        },
        CreateEditor:function(){
            $textAreaDiv=$("#"+$options.textArea.divId);
            $textAreaDiv.css({
                border: '2px solid #CCCCCC',
                background: '#F3F3F3',
                padding: '10px',
                margin: $options.textArea.margin,
                height: '375px'
            });
            $textArea=$("<textarea id='XmlCode' name='XmlCode'></textarea>");
            $textArea.css({
                border:'border: 2px solid #CCCCCC',
                background:'#F3F3F3',
                padding:10,
                margin:'0 auto',
                height:$options.textArea.height
            });
            $textAreaDiv.append($textArea);
            $editor = CodeMirror.fromTextArea(document.getElementById("XmlCode"), {
                mode: {name: "xml", alignCDATA: true},
                lineNumbers: true,
                lineWrapping:true
            });
        },
        CreateMobile:function(){
            $mobileDisplayDiv=$("#"+$options.mobile.main.divId);
            $mobileDisplayDiv.css({
                height:$options.mobile.main.height
            });
            $mobileImage=$("<img src="+$options.mobile.mobile.backgroundUrl+" id='MobileImage' alt='Mobile Display'/>");
            $mobileDisplayDiv.append( $mobileImage );
            $mobileImage.css({
                margin: "auto",
                width:$options.mobile.mobile.width,
                height:$options.mobile.mobile.height

            });
        },
        CreateInnerDisplay:function(){
            $mobileDisplayPageNumber=$("<div id='MobileContentPageNumber' class='MobileContentPageNumber' />");
            $mobileDisplayDiv.append( $mobileDisplayPageNumber );
            $mobileDisplayDiv.find('.MobileContentPageNumber').css({
                position: 'absolute',
                border: $options.mobile.MobileInnerPageNumber.border,
                overflow: 'hidden',
                width: $options.mobile.MobileInnerPageNumber.width,
                height: $options.mobile.MobileInnerPageNumber.height,
                top: $options.mobile.MobileInnerPageNumber.top,
                left: $options.mobile.MobileInnerPageNumber.left,
                textAlign:'center',
                fontWeight:'bolder',
                display:$options.mobile.MobileInnerPageNumber.display
            });
            $mobileDisplay0=$("<div id='MobileContent0' class='MobileContent'></div>").append($('<p></p>'));
            $mobileDisplay1=$("<div id='MobileContent1' class='MobileContent'></div>").append($('<p></p>'));
            $mobileDisplay2=$("<div id='MobileContent2' class='MobileContent'></div>").append($('<p></p>'));
            $mobileDisplay3=$("<div id='MobileContent3' class='MobileContent'></div>").append($('<p></p>'));
            $mobileDisplayDiv.append( $mobileDisplay0 );
            $mobileDisplayDiv.append( $mobileDisplay1 );
            $mobileDisplayDiv.append( $mobileDisplay2 );
            $mobileDisplayDiv.append( $mobileDisplay3 );
            $mobileDisplayDiv.find('.MobileContent').css({
                position: 'absolute',
                border: $options.mobile.MobileInnerDisplay.border,
                overflow: 'auto',
                width: $options.mobile.MobileInnerDisplay.width,
                height: $options.mobile.MobileInnerDisplay.height,
                top: $options.mobile.MobileInnerDisplay.top,
                left: $options.mobile.MobileInnerDisplay.left,
                fontWeight:'bolder',
                textAlign:$options.mobile.MobileInnerDisplay.textAlign,
                verticalAlign:$options.mobile.MobileInnerDisplay.verticalAlign
            });
        },
        PlaceArrow:function(){
            $NavigationDiv=$("<div class='col-xs-12' id='nav'></div>");
            $leftArrow=$("<div class='col-xs-2 arrow'><img class='pull-left' src="+$options.mobile.leftArrow.backgroundUrl+" name='leftArrow' alt='LeftArrow' height='35px'/></div>");
            $midSection=$("<div class='col-xs-8 parent'></div>");
            $rightArrow=$("<div class='col-xs-2 arrow'><img class='pull-right' src="+$options.mobile.rightArrow.backgroundUrl+" name='rightArrow' alt='RightArrow' height='35px'/></div>");
            $NavigationDiv.append($leftArrow);
            $NavigationDiv.append($midSection);
            $NavigationDiv.append($rightArrow);
            $mobileDisplayDiv.append($NavigationDiv);
            //console.log($options.baseUrl+'includes/images/TeaserManagement/leftHover.png');
            $(".arrow")
                .mouseover(function() {
                    if($(this).find("img").attr("name")=="leftArrow")
                        $(this).find("img").attr("src",$options.baseUrl+'includes/images/TeaserManagement/leftHover.png');
                    else if($(this).find("img").attr("name")=="rightArrow")
                        $(this).find("img").attr("src",$options.baseUrl+'includes/images/TeaserManagement/rightHover.png');
                })
                .mouseout(function() {
                    if($(this).find("img").attr("name")=="leftArrow")
                        $(this).find("img").attr("src",$options.baseUrl+'includes/images/TeaserManagement/left.png');
                    else if($(this).find("img").attr("name")=="rightArrow")
                        $(this).find("img").attr("src",$options.baseUrl+'includes/images/TeaserManagement/right.png');
                })
                .css("cursor","pointer");
        }

    };

    $.fn.XmlMobileParser = function (options) {
            $object = $(this);
            $options=options;
            $editor=options.editor;
            self.CallBackFunction();


            $textAreaDiv.find('textarea').on('change keyup keydown paste', function () {
              
            var inputText=$editor.getValue();
            var xml=null;
            try {
                xml = $.parseXML( inputText) ;
                if($(xml).find('send-sms').text().length!=0) {$('#ActivationType').attr("value","Sms");}
                else if($(xml).find('send-ussd').text().length!=0) {$('#ActivationType').attr("value","Ussd");}
                else if($(xml).find('set-up-call').text().length!=0) {$('#ActivationType').attr("value","Call");}
                $('#SaveFlag').attr("value","1");
                $midSection.empty();

                XmlStrings=[];
                $(xml).find('display').each(function(i,v){
                    XmlStrings.push($(v).find('text').text());
                });

                if(XmlStrings.length<=0) {
                    $mobileDisplayPageNumber.text("");
                    $rightArrow.css({display:'none'});
                    $leftArrow.css({display:'none'});
                    $midSection.css({display:'none'});
                    $mobileDisplay1.css({display:'inline'});
                    $mobileDisplay2.css({display:'none'});
                    //$('#SaveFlag').attr("value","-1");
                }
                else
                if(XmlStrings.length>0){

                    if (options.numberOfClicksID != null)
                        $('#' + options.numberOfClicksID).val(XmlStrings.length);

                    if($mobileDisplayPageNumber.text().split('/')[0].length==0){
                        $mobileDisplayPageNumber.text(1+"/"+XmlStrings.length);
                    }
                    else{
                        if($mobileDisplayPageNumber.text().split('/')[0]<=XmlStrings.length)
                            $mobileDisplayPageNumber.text($mobileDisplayPageNumber.text().split('/')[0]+"/"+XmlStrings.length);
                        else
                            $mobileDisplayPageNumber.text(1+"/"+XmlStrings.length);
                    }
                    if(XmlStrings.length>1){
                        $rightArrow.css({display:'inline'});
                        $leftArrow.css({display:'inline'});
                        $midSection.css({display:'inline'});
                    }
                    else{
                        $rightArrow.css({display:'none'});
                        $leftArrow.css({display:'none'});
                        $midSection.css({display:'none'});
                    }
                    $.each( XmlStrings, function( k, v ) {
                        $mobileDisplayDiv.find(".MobileContent").eq(k).find("p").text(v);
                        $midSection.append("<div class='circleBase type3 child child"+k+"'></div>");
                    });

                    var $activeBubble=$mobileDisplayPageNumber.text().split('/')[0]-1;

                    for($i=0;$i<4;$i++){
                        if($i==$activeBubble) {
                            $mobileDisplayDiv.find(".MobileContent").eq($i).show();
                            $midSection.find("div").eq($i).css({
                                background:'#3493c0',
                                opacity:'1.0'
                            });
                            $mobileDisplayDiv.find(".MobileContent").eq($i).find("p").css({
                                top:($mobileDisplayDiv.find(".MobileContent").eq($i).height()/2)-($mobileDisplayDiv.find(".MobileContent").eq($i).find("p").height()/2)
                            });
                        }
                        else{
                            $mobileDisplayDiv.find(".MobileContent").eq($i).hide();
                            $midSection.find("div").eq($i).css({
                                background:'transparent',
                                opacity:'0.4'
                            });
                        }
                    }
                }
            }
            catch(e) {
                $('#SaveFlag').attr("value","-1")
            }
        });

            $rightArrow.on('click', function () {               
            var $CurrentPage=parseInt($mobileDisplayPageNumber.text().split('/')[0]);
            var $TotalPages=parseInt($mobileDisplayPageNumber.text().split('/')[1]);
            if($CurrentPage>=$TotalPages)
                return;
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-1).hide();
            $midSection.find("div").eq($CurrentPage-1).css({
                background:'transparent',
                opacity:'0.4'
            });
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage).show()
            $midSection.find("div").eq($CurrentPage).css({
                background:'#3493c0',
                opacity:'1.0'
            });
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage).find("p").css({
                top:($mobileDisplayDiv.find(".MobileContent").eq($CurrentPage).height()/2)-($mobileDisplayDiv.find(".MobileContent").eq($CurrentPage).find("p").height()/2),
                width:"100%",
                'text-align':"center"
            });
            $mobileDisplayPageNumber.text(($CurrentPage+1)+"/"+$TotalPages);
        });

        $leftArrow.on('click', function() {
            var $CurrentPage=parseInt($mobileDisplayPageNumber.text().split('/')[0]);
            var $TotalPages=parseInt($mobileDisplayPageNumber.text().split('/')[1]);
            if($CurrentPage<=1)
                return;
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-1).hide();
            $midSection.find("div").eq($CurrentPage-1).css({
                background:'transparent',
                opacity:'0.4'
            });
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-2).show()
            $midSection.find("div").eq($CurrentPage-2).css({
                background:'#3493c0',
                opacity:'1.0'
            });
            $mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-2).find("p").css({
                top:($mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-2).height()/2)-($mobileDisplayDiv.find(".MobileContent").eq($CurrentPage-2).find("p").height()/2),
                width:"100%",
                'text-align':"center"
            });
            $mobileDisplayPageNumber.text(($CurrentPage-1)+"/"+$TotalPages);
        });

        return $editor;
        };
})(jQuery);