$(document).ready(function(){
    FillDevice();
      //DeviceCombo
      function FillDevice() {
        let dropdown1 = $("#expert-ticket");
        let dropdown2 = $("#experttickets");
        dropdown1.empty();

        dropdown1.append(
          '<option selected="true" disabled>دستگاه را انتخاب کنید</option>'
        );
        dropdown1.prop("selectedIndex", 0);

        dropdown2.empty();

        dropdown2.append(
          '<option selected="true" disabled>دستگاه را انتخاب کنید</option>'
        );
        dropdown2.prop("selectedIndex", 0);
        
        const url =
          "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceTable";
        console.log("url", url);
        // Populate dropdown with list of provinces
        $.getJSON(url, function(data) {
          console.log(data);
          console.log(data.Report);
          $.each(data.Report, function(key, Experts) {
            console.log(Experts);
            dropdown1.append(
              $("<option></option>")
                .attr("value", Experts.deviceID)
                .text(Experts.deviceName)
            );
            dropdown1.selectpicker('refresh');


            dropdown2.append(
                $("<option></option>")
                  .attr("value", Experts.deviceID)
                  .text(Experts.deviceName)
              );
              dropdown2.selectpicker('refresh');


          });
        });
      };
      
})