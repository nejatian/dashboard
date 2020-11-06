$(document).ready(function(){
    FillStation();
      //DeviceCombo
      function FillStation() {
        let dropdown1 = $("#DeviceCombo");
        let dropdown2 = $("#ticketCountCombo");
        let dropdown3 = $("#stationByExpertCombo");
        let dropdown4 = $("#station");

        dropdown1.empty();

        dropdown1.append(
          '<option selected="true" disabled>جایگاه را انتخاب کنید</option>'
        );
        dropdown1.prop("selectedIndex", 0);
        dropdown2.empty();

        dropdown2.append(
          '<option selected="true" disabled>جایگاه را انتخاب کنید</option>'
        );
        dropdown2.prop("selectedIndex", 0);
        dropdown3.empty();

        dropdown3.append(
          '<option selected="true" disabled>جایگاه را انتخاب کنید</option>'
        );
        dropdown3.prop("selectedIndex", 0);
        dropdown4.empty();

        dropdown4.append(
          '<option selected="true" disabled>جایگاه را انتخاب کنید</option>'
        );
        dropdown4.prop("selectedIndex", 0);
        const url =
          "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByRate&sortType=min";
        console.log("url", url);
        // Populate dropdown with list of provinces
        $.getJSON(url, function(data) {
          console.log(data);
          console.log(data.Report);
          $.each(data.Report, function(key, Experts) {
            console.log(Experts);
            dropdown1.append(
              $("<option></option>")
                .attr("value", Experts.id)
                .text(Experts.stationName)
            );
            dropdown1.selectpicker('refresh');


            dropdown2.append(
                $("<option></option>")
                  .attr("value", Experts.id)
                  .text(Experts.stationName)
              );
              dropdown2.selectpicker('refresh');

 dropdown3.append(
                $("<option></option>")
                  .attr("value", Experts.id)
                  .text(Experts.stationName)
              );
              dropdown3.selectpicker('refresh');

              dropdown4.append(
                $("<option></option>")
                  .attr("value", Experts.id)
                  .text(Experts.stationName)
              );
              dropdown4.selectpicker('refresh');
          });
        });
      };
      
})