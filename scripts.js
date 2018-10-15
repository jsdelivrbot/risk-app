$(function(){
    $('#id-button').on('click',function(){
        var tId = $('#id-input').val();
        var typeID = document.getElementById("id-type");
        var typeVal = typeID.options[typeID.selectedIndex].value;
        var typeText = typeID.options[typeID.selectedIndex].text;
        console.log("Selected Item  " +  typeText + ", Value " + typeVal);

        $.ajax({
            url: 'http://localhost:8080/v1/riskfaadminserv/riskactivitylog/read/' + tId,
            contentType: 'application/json',
            method: 'GET',
            crossDomain: true,
            crossOrigin: true,
            headers: {'Access-Control-Allow-Origin': '*'},
            success: function(response){
                var tbodyEl = $('tbody');
                console.log(response);
                tbodyEl.html('');

                response.riskAdminActivityLogs.forEach(function(riskAdminActivityLog){
                    var date = new Date(riskAdminActivityLog.date);
                    var formattedDate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
                    var hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
                    var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
                    var seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
                    var formattedTime = hours + ":" + minutes + ":" + seconds;

                    formattedDate = formattedDate + " " + formattedTime;

                    var responseString = riskAdminActivityLog.payload.response.data;
                    var requestString =  riskAdminActivityLog.payload.request.data;
                    var additionalString = riskAdminActivityLog.payload.additionalData.data;

                    if(riskAdminActivityLog.payload.response.dataType == "XML"){
                        responseString = '<textarea style="width: 100%; height: 100%; border: none">' + responseString + '</textarea>';
                    }
                    if(riskAdminActivityLog.payload.request.dataType == "XML"){
                        requestString = '<textarea style="width: 100%; height: 100%; border: none">' + requestString + '</textarea>';
                    }
                    if(riskAdminActivityLog.payload.additionalData.dataType == "XML"){
                        additionalString = '<textarea style="width: 100%; height: 100%; border: none">' + additionalString + '</textarea>';
                    }

                    tbodyEl.append('<tr id="log"><td class="compName">' + riskAdminActivityLog.componentName + '</td><td class="eventName">' + riskAdminActivityLog.eventName + '</td><td class="date">' + formattedDate + '</td><td class="status">' + riskAdminActivityLog.eventStatus +'</td></tr><tr id="payload"><td colspan="4"><p>Response: ' + responseString + '<br><br>Request: ' +requestString + '<br><br>Additional Data: ' + additionalString + '</p></td></tr>');
                    $("td[colspan=4]").find("p").hide();
                });
            }
        });
    });
})

$(function() {
    $("td[colspan=4]").find("p").hide();
    $("table").click(function(event) {
        event.stopPropagation();
        var $target = $(event.target);
        if ( $target.closest("td").attr("colspan") > 1 ) {
            //$target.slideUp();
        } else {
            $target.closest("tr").next().find("p").slideToggle();
        }                    
    });
});
