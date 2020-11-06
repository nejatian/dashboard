$(document).ready(function() {
  $("#ToPDF").on("click", function() {
    var element = document.getElementById("root");

    // Generate the PDF.
    html2pdf()
      .from(element)
      .set({
        margin: 0,
        filename: "Report.pdf",
        pagebreak: {
          mode: "avoid-all",
          after: ["#after2", "#after3"],
          befor: ["#page2el"]
        },
        html2canvas: { scale: 2 },
        jsPDF: {
          orientation: "portrait",
          unit: "in",
          format: "letter",
          compressPDF: true
        }
      })
      .save();
  });

  /*-------------------------------------------------*/
  $body = $("body");

  $(document).on({
    ajaxStart: function() {
      $body.addClass("loading");
    },
    ajaxStop: function() {
      $body.removeClass("loading");
    }
  });

  /*-------------------------------------------------*/

  $("#loadingImage")
    .bind("ajaxStart", function() {
      $(this).show();
    })
    .bind("ajaxStop", function() {
      $(this).hide();
    });

  /*-------------------------------------------------*/

  $("#catInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getCategoryRepots?type=categoryMaxMin",
      success: function(result) {
        console.log("Cattttt", result);
        const dataMax = [result.Report.max_category];
        const dataMin = [result.Report.min_category];
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);
        for (let i = 0; i < dataMax.length; i++) {
          if (dataMax[i].catID == 1) {
            console.log("1");
            dataMax[0].catID = "نرم افزاری";
          } else if (dataMax[i].catID == 2) {
            console.log("2");
            dataMax[0].catID = "سخت افزاری";
          } else if (dataMax[i].catID == 3) {
            console.log("3");
            dataMax[0].catID = "جانبی";
          }
        }
        for (let i = 0; i < dataMin.length; i++) {
          console.log("koja", dataMin[i].catID);
          if (dataMin[i].catID == 1) {
            console.log("1");
            dataMin[0].catID = "نرم افزاری";
          } else if (dataMin[i].catID == 2) {
            console.log("2");
            dataMin[0].catID = "سخت افزاری";
          } else if (dataMin[i].catID == 3) {
            console.log("3");
            dataMin[0].catID = "جانبی";
          }
        }
        $("#catCountMax").html(dataMax[0].count + "عدد");
        $("#catTypeMax").html(dataMax[0].catID);
        $("#catCountMin").html(dataMin[0].count + "عدد");
        $("#catTypeMin").html(dataMin[0].catID);
      }
    });
  });

  /*-------------------------------------------------*/

  $("#deviceInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceMaxMin",
      success: function(result) {
        console.log("Device", result);
        const dataMax = [result.Report.max_device];
        const dataMin = [result.Report.min_device];
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);

        $("#deviceCountMax").html(dataMax[0].count + "عدد");
        $("#deviceNameMax").html(dataMax[0].deviceName);
        $("#deviceCountMin").html(dataMin[0].count + "عدد");
        $("#deviceNameMin").html(dataMin[0].deviceName);
      }
    });
  });

  /*-------------------------------------------------*/

  $("#stationInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinCount",
      success: function(result) {
        console.log("Device", result);
        const dataMax = [result.Report.max_station];
        const dataMin = [result.Report.min_station];
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);

        $("#stationCountMax").html(dataMax[0].count + "عدد");
        $("#stationNameMax").html(dataMax[0].stationName);
        $("#stationCountMin").html(dataMin[0].count + "عدد");
        $("#stationNameMin").html(dataMin[0].stationName);
      }
    });
  });

  /*-------------------------------------------------*/

  $("#stationRateInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinRate",
      success: function(result) {
        console.log("Device", result);
        const dataMax = [result.Report.max_station];
        const dataMin = [result.Report.min_station];
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);

        $("#stationRateMax").html(dataMax[0].rate);
        $("#stationNamesMax").html(dataMax[0].stationName);
        $("#stationRateMin").html(dataMin[0].rate);
        $("#stationNamesMin").html(dataMin[0].stationName);
      }
    });
  });
  /*-------------------------------------------------*/
  $("#expertTicketInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertMaxMinRate",
      success: function(result) {
        console.log("Device", result);
        const dataMax = result.Report.max_list;
        const dataMin = result.Report.min_list;
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);

        $("#expertTicketCountMax").html(dataMax[0].rate);
        $("#expertNameMax").html(dataMax[0].expertName);
        $("#expertTicketCountMin").html(dataMin[0].rate);
        $("#expertNameMin").html(dataMin[0].expertName);
      }
    });
  });
  /*-------------------------------------------------*/
  $("#levelInfo").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getLevelReports?type=getMinMaxOfLevelByTicketNumber",
      success: function(result) {
        console.log("Device", result);
        const dataMax = [result.Report.max_level];
        const dataMin = [result.Report.min_level];
        console.log("datamax", dataMax);
        console.log("datamin", dataMin);

        for (let i = 0; i < dataMax.length; i++) {
          if (dataMax[i].levelID == 1) {
            dataMax[0].levelID = "اضطراري";
          } else if (dataMax[i].levelID == 2) {
            dataMax[0].levelID = "مهم";
          } else if (data[i].levelID == 3) {
            dataMax[0].levelID = "معمولی";
          }
        }
        for (let i = 0; i < dataMin.length; i++) {
          if (dataMin[i].levelID == 1) {
            dataMin[0].levelID = "اضطراري";
          } else if (dataMin[i].levelID == 2) {
            dataMin[0].levelID = "مهم";
          } else if (dataMin[i].levelID == 3) {
            dataMin[0].levelID = "معمولی";
          }
        }
        $("#levelCountmax").html(dataMax[0].count + "عدد");
        $("#levelmax").html(dataMax[0].levelID);
        $("#levelCountMin").html(dataMin[0].count + "عدد");
        $("#levelMin").html(dataMin[0].levelID);
      }
    });
  });
  // $("#levelInfo").click(function(){
  //   $.ajax({
  //     url:
  //       "https://tagino.ir/Pido/api/reports/getExportReports?type=expertMaxMinRate",
  //     success: function(result) {
  //       console.log("Device",result);
  //       const dataMax = result.Report.max_list;
  //       const dataMin =result.Report.min_list;
  //       console.log("datamax", dataMax);
  //       console.log("datamin", dataMin);

  //       $("#levelCountmax").html(dataMax[0].rate);
  //       $("#levelmax").html(dataMax[0].expertName);
  //       $("#levelCountMin").html(dataMin[0].rate);
  //       $("#levelMin").html(dataMin[0].expertName);
  //     }
  //   });
  // });
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<endOfCards>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<startOfReport-Categories>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  $("#ticketPerCategory").click(function() {
    ticketPerCategory();
  });
  /*-------------------------------------------------*/
  $("#ticketPerCategoryRef").click(function() {
    ticketPerCategory();
  });
  /*-------------------------------------------------*/
  function ticketPerCategory() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getCategoryRepots?type=categoryTable",
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].catID == 1) {
            data[i].catID = "نرم افزاری";
          } else if (data[i].catID == 2) {
            data[i].catID = "سخت افزاری";
          } else if (data[i].catID == 3) {
            data[i].catID = "جانبی";
          }
        }

        $("#ticketPerCategoryTable").bootstrapTable("destroy");
        $("#ticketPerCategoryTable").bootstrapTable({
          data: data
        });
        $("#ticketPerCategoryXls").show();
      }
    });
  }
  /*-------------------------------*/
  $("#ticketPerCategoryXls").on("click", function() {
    $("#ticketPerCategoryTable").tableExport({
      type: "excel",
      fileName: "ticketPerCategory"
    });
  });

  /*-------------------------------------------------*/

  $("#arrowUpCategory").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getCategoryRepots?type=categoryMaxMin",
      success: function(result) {
        console.log("Cattttt", result);
        // const dataMax = [result.Report.max_category];
        const datas = [result.Report];
        const data = [
          {
            Report: "بیشترین",
            catID: result.Report.max_category.catID,
            count: result.Report.max_category.count
          },
          {
            Report: "کمترین",
            catID: result.Report.min_category.catID,
            count: result.Report.min_category.count
          }
        ];
        console.log("dataaaaa", datas);

        console.log("datamax", data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].catID == 1) {
            console.log("1");
            data[i].catID = "نرم افزاری";
          } else if (data[i].catID == 2) {
            console.log("2");
            data[i].catID = "سخت افزاری";
          } else if (data[i].catID == 3) {
            console.log("3");
            data[i].catID = "جانبی";
          }
        }

        $("#MinOrMaxCategoryTable").bootstrapTable("destroy");
        $("#MinOrMaxCategoryTable").bootstrapTable({
          data: data
        });
        $("#MinOrMaxCategoryXls").show();
      }
    });
  });
  /*-------------------------------------------------*/

  $("#arrowDownCategory").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getCategoryRepots?type=categoryMaxMin",
      success: function(result) {
        console.log("Cattttt", result);
        // const dataMax = [result.Report.max_category];
        const datas = [result.Report];
        const data = [
          {
            Report: "بیشترین",
            catID: result.Report.max_category.catID,
            count: result.Report.max_category.count
          },
          {
            Report: "کمترین",
            catID: result.Report.min_category.catID,
            count: result.Report.min_category.count
          }
        ];
        console.log("dataaaaa", datas);

        console.log("datamax", data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].catID == 1) {
            console.log("1");
            data[i].catID = "نرم افزاری";
          } else if (data[i].catID == 2) {
            console.log("2");
            data[i].catID = "سخت افزاری";
          } else if (data[i].catID == 3) {
            console.log("3");
            data[i].catID = "جانبی";
          }
        }

        $("#MinOrMaxCategoryTable").bootstrapTable("destroy");
        $("#MinOrMaxCategoryTable").bootstrapTable({
          data: data
        });
        $("#MinOrMaxCategoryXls").show();
      }
    });
  });


  /******************************** */


  $("#MinOrMaxCategoryXls").on("click", function() {
    $("#MinOrMaxCategoryTable").tableExport({
      type: "excel",
      fileName: "MinOrMaxCategory"
    });
  });

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<EndOfReport-Categories>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<StartOfReport-Devices>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $("#ticketBase").click(function() {
    ticketBase();
  });
  /*-------------------------------------------------*/
  $("#ticketBaseRef").click(function() {
    ticketBase();
  });
  /*-------------------------------------------------*/
  $("#devicePerExpert").click(function() {
    devicePerExpert();
  });
  /*-------------------------------------------------*/
  $("#arrowUpDevEx").on("click", function() {
    devicePerExpert();
  });
  /*-------------------------------------------------*/
  $("#deviceByStationCount").click(function() {
    deviceByStationCount();
    $("#deviceByStationCountXls").show();
  });
  /*-------------------------------------------------*/
  $("#arrowUpByStation").on("click", function() {
    deviceByStationCount();
    $("#deviceByStationCountXls").show();
  });
  /*-------------------------------------------------*/
  $("#arrowDownByStation").on("click", function() {
    
    var id = $("#experttickets").val();
    console.log(id);
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByStationCount&deviceID=" +
          id +
          "&sortType=min",
        success: function(result) {
          console.log(result);
          const data = result.Report.deviceStationList;
          console.log("data", data);

          $("#deviceByStationCountTable").bootstrapTable("destroy");
          $("#deviceByStationCountTable").bootstrapTable({
            data: data
          });
          $("#deviceByStationCountXls").show();
        }
      });
    }
  });
  /*-------------------------------------------------*/
  $("#arrowDownDevEx").on("click", function() {
    var id = $("#expert-ticket").val();
    console.log(id);
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByExpertCount&deviceID=" +
          id +
          "&sortType=min",
        success: function(result) {
          console.log(result);
          const data = result.Report.deviceExpertList;
          console.log("data", data);

          $("#devicePerExpertTable").bootstrapTable("destroy");
          $("#devicePerExpertTable").bootstrapTable({
            data: data
          });
          $("#devicePerExpertXls").show();
        }
      });
    }
  });
  /*-------------------------------------------------*/
  function devicePerExpert() {
    //https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByExpertCount&deviceID=1&sortType=min
    var id = $("#expert-ticket").val();
    console.log(id);
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByExpertCount&deviceID=" +
          id +
          "&sortType=max",
        success: function(result) {
          console.log(result);
          const data = result.Report.deviceExpertList;
          console.log("data", data);

          $("#devicePerExpertTable").bootstrapTable("destroy");
          $("#devicePerExpertTable").bootstrapTable({
            data: data
          });
          $("#devicePerExpertXls").show();
        }
      });
    }
  }


  /*-------------------------------------------------*/

  $("#devicePerExpertXls").on("click", function() {
    $("#devicePerExpertTable").tableExport({
      type: "excel",
      fileName: "devicePerExpert"
    });
  });

  /*-------------------------------------------------*/
  function deviceByStationCount() {
    //https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByExpertCount&deviceID=1&sortType=min
    var id = $("#experttickets").val();
    console.log("ssssssss");
    console.log(id);
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceByStationCount&deviceID=" +
          id +
          "&sortType=max",
        success: function(result) {
          console.log(result);
          const data = result.Report.deviceStationList;
          console.log("data", data);

          $("#deviceByStationCountTable").bootstrapTable("destroy");
          $("#deviceByStationCountTable").bootstrapTable({
            data: data
          });
          $("#deviceByStationCountXls").show();
        }
      });
    }
  }
  /*-------------------------------------------------*/

  $("#deviceByStationCountXls").on("click", function() {
    $("#deviceByStationCountTable").tableExport({
      type: "excel",
      fileName: "deviceByStationCount"
    });
  });
  /*-------------------------------------------------*/
  function ticketBase() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceTable",
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);

        $("#ticketBaseTable").bootstrapTable("destroy");
        $("#ticketBaseTable").bootstrapTable({
          data: data
        });
        $("#ticketBaseTableXls").show();
      }
    });
  }
  /*-------------------------------------------------*/
  $("#ticketBaseTableXls").on("click", function() {
    $("#ticketBaseTable").tableExport({
      type: "excel",
      fileName: "ticketBase"
    });
  });



  /*-------------------------------------------------*/
  $("#arrowUpDevices").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceMaxMin",
      success: function(result) {
        //const dataMax = [result.Report.max_device];
        const data = [
          {
            Report: "بیشترین",
            deviceName: result.Report.max_device.deviceName,
            count: result.Report.max_device.count
          },
          {
            Report: "کمترین",
            deviceName: result.Report.min_device.deviceName,
            count: result.Report.min_device.count
          }
        ];
        $("#maxORMinDeviceTable").bootstrapTable("destroy");
        $("#maxORMinDeviceTable").bootstrapTable({
          data: data
        });
        $("#maxORMinDeviceXls").show();
      }
    });
  });


  
  /*-------------------------------------------------*/

  $("#maxORMinDeviceXls").on("click", function() {
    $("#maxORMinDeviceTable").tableExport({
      type: "excel",
      fileName: "maxORMinDevice"
    });
  });


  /*-------------------------------------------------*/
  $("#arrowDownDevices").on("click", function() {
    console.log("hiiiii");
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getDeviceRepots?type=deviceMaxMin",
      success: function(result) {
        //const dataMax = [result.Report.max_device];
        const data = [
          {
            Report: "بیشترین",
            deviceName: result.Report.max_device.deviceName,
            count: result.Report.max_device.count
          },
          {
            Report: "کمترین",
            deviceName: result.Report.min_device.deviceName,
            count: result.Report.min_device.count
          }
        ];
        $("#maxORMinDeviceTable").bootstrapTable("destroy");
        $("#maxORMinDeviceTable").bootstrapTable({
          data: data
        });
        $("#maxORMinDeviceXls").show();
      }
    });
  });

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<EndOFReport-Devices>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<StartOfStationReport>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  $("#stationByTicket").click(function() {
    stationByTicket();
  });
  /*-------------------------------------------------*/
  $("#stationByTicketRef").click(function() {
    stationByTicket();
  });
  /*-------------------------------------------------*/
  $("#hasTicket").click(function() {
    hasTicket();
  });
  /*-------------------------------------------------*/
  $("#arrowUphasTicket").on("click", function() {
    hasTicket();
  });
  /*-------------------------------------------------*/
  $("#stationByExpert").click(function() {
    stationByExpert();
  });
  /*-------------------------------------------------*/
  $("#arrowUpstationByExpert").on("click", function() {
    stationByExpert();
  });

  /*-------------------------------------------------*/
  $("#arrowDownstationByExpert").on("click", function() {
    var id = $("#stationByExpertCombo").val();
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationByExpertCount&stationID=" +
        id +
        "&sortType=min",
      success: function(result) {
        const dataMax = result.Report.stationExpertList;

        $("#stationByExpertTable").bootstrapTable("destroy");
        $("#stationByExpertTable").bootstrapTable({
          data: dataMax
        });
        $("#stationByExpertXls").show();
      }
    });
  });
  /*-------------------------------------------------*/
  $("#stationByExpertXls").on("click", function() {
    $("#stationByExpertTable").tableExport({
      type: "excel",
      fileName: "StationByExpert"
    });
  });
  /*-------------------------------------------------*/
  $("#StationByDevice").click(function() {
    StationByDevice();
  });

  /*-------------------------------------------------*/
  $("#arrowUpStationByDevice").on("click", function() {
    StationByDevice();
  });

  /*-------------------------------------------------*/

  $("#arrowDownStationByDevice").on("click", function() {
    var id = $("#DeviceCombo").val();
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationByDeviceCount&stationID=" +
          id +
          "&sortType=min",
        success: function(result) {
          const dataMax = result.Report.stationExpertList;

          $("#StationByDeviceTable").bootstrapTable("destroy");
          $("#StationByDeviceTable").bootstrapTable({
            data: dataMax
          });
          $("#StationByDeviceXls").show();
        }
      });
    }
  });

  /*-------------------------------------------------*/
  function StationByDevice() {
    var id = $("#DeviceCombo").val();
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationByDeviceCount&stationID=" +
          id +
          "&sortType=max",
        success: function(result) {
          const dataMax = result.Report.stationExpertList;

          $("#StationByDeviceTable").bootstrapTable("destroy");
          $("#StationByDeviceTable").bootstrapTable({
            data: dataMax
          });
          $("#StationByDeviceXls").show();
        }
      });
    }
  }
  /*-------------------------------------------------*/

  $("#StationByDeviceXls").on("click", function() {
    $("#StationByDeviceTable").tableExport({
      type: "excel",
      fileName: "StationByDevice"
    });
  });

  /*-------------------------------------------------*/
  $("#arrowDownByStation").on("click", function() {
    stationByExpert();
  });
  /*----------------------------------*/
  $("#arrowDownhasTicket").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByCount&sortType=min",
      success: function(result) {
        const dataMax = result.Report;

        $("#hasTicketTable").bootstrapTable("destroy");
        $("#hasTicketTable").bootstrapTable({
          data: dataMax
        });
        $("#hasTicketXls").show();
      }
    });
  });
  /*----------------------------------*/

  $("#hasTicketXls").on("click", function() {
    $("#hasTicketTable").tableExport({ type: "excel", fileName: "hasTicket" });
  });

  /*----------------------------------*/

  function stationByExpert() {
    var id = $("#stationByExpertCombo").val();
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationByExpertCount&stationID=" +
          id +
          "&sortType=max",
        success: function(result) {
          const dataMax = result.Report.stationExpertList;

          $("#stationByExpertTable").bootstrapTable("destroy");
          $("#stationByExpertTable").bootstrapTable({
            data: dataMax
          });
          $("#stationByExpertXls").show();
        }
      });
    }
  }
  /*----------------------------------*/
  function hasTicket() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByCount&sortType=max",
      success: function(result) {
        const dataMax = result.Report;

        $("#hasTicketTable").bootstrapTable("destroy");
        $("#hasTicketTable").bootstrapTable({
          data: dataMax
        });
        $("#hasTicketXls").show();
      }
    });
  }
  /*----------------------------------*/

  function stationByTicket() {
    var id = $("#station").val();
    if (id !== undefined) {
      $.ajax({
        url:
          "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationStateCount&stationID=" +
          id,
        success: function(result) {
          const dataMax = result.Report.stationStateList;

          $("#stationByTicketTable").bootstrapTable("destroy");
          $("#stationByTicketTable").bootstrapTable({
            data: dataMax
          });
          $("#stationByTicketXls").show();
        }
      });
    }
  }
  /*----------------------------------*/

  $("#stationByTicketXls").on("click", function() {
    $("#stationByTicketTable").tableExport({
      type: "excel",
      fileName: "StationByTicket"
    });
  });
  /*----------------------------------*/

  $("#arrowUpStationTicket").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinCount",
      success: function(result) {
        // const dataMax =[result.Report.max_station];
        const data = [
          {
            Report: "بیشترین",
            stationName: result.Report.max_station.stationName,
            count: result.Report.max_station.count
          },
          {
            Report: "کمترین",
            stationName: result.Report.min_station.stationName,
            count: result.Report.min_station.count
          }
        ];

        $("#MaxOrMinStationTicketTable").bootstrapTable("destroy");
        $("#MaxOrMinStationTicketTable").bootstrapTable({
          data: data
        });
        $("#MaxOrMinStationTicketXls").show();
      }
    });
  });

/*----------------------------------*/

  $("#MaxOrMinStationTicketXls").on("click", function() {
    $("#MaxOrMinStationTicketTable").tableExport({
      type: "excel",
      fileName: "StationTicket"
    });
  });

  
  /*----------------------------------*/

  $("#arrowDownStationTicket").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinCount",
      success: function(result) {
        // const dataMax =[result.Report.max_station];
        const data = [
          {
            Report: "بیشترین",
            stationName: result.Report.max_station.stationName,
            count: result.Report.max_station.count
          },
          {
            Report: "کمترین",
            stationName: result.Report.min_station.stationName,
            count: result.Report.min_station.count
          }
        ];

        $("#MaxOrMinStationTicketTable").bootstrapTable("destroy");
        $("#MaxOrMinStationTicketTable").bootstrapTable({
          data: data
        });
      }
    });
  });

  /*----------------------------------*/

  $("#arrowUpStationRate").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinRate",
      success: function(result) {
        // const dataMax =[result.Report.max_station];
        const data = [
          {
            Report: "بیشترین",
            stationName: result.Report.max_station.stationName,
            rate: result.Report.max_station.rate
          },
          {
            Report: "کمترین",
            stationName: result.Report.min_station.stationName,
            rate: result.Report.min_station.rate
          }
        ];
        $("#MaxOrMinStationRateTable").bootstrapTable("destroy");
        $("#MaxOrMinStationRateTable").bootstrapTable({
          data: data
        });
        $("#MaxOrMinStationRateXls").show();
      }
    });
  });
  $("#MaxOrMinStationRateXls").on("click", function() {
    $("#MaxOrMinStationRateTable").tableExport({
      type: "excel",
      fileName: "StationRate"
    });
  });
  /*----------------------------------*/

  $("#arrowDownStationRate").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinRate",
      success: function(result) {
        // const dataMax =[result.Report.max_station];
        const data = [
          {
            Report: "بیشترین",
            stationName: result.Report.max_station.stationName,
            rate: result.Report.max_station.rate
          },
          {
            Report: "کمترین",
            stationName: result.Report.min_station.stationName,
            rate: result.Report.min_station.rate
          }
        ];
        $("#MaxOrMinStationRateTable").bootstrapTable("destroy");
        $("#MaxOrMinStationRateTable").bootstrapTable({
          data: data
        });
      }
    });
  });
  /*----------------------------------*/

  $("#arrowUpStationReport").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByRate&sortType=max",
      success: function(result) {
        const dataMax = result.Report;
        for (let i = 0; i < dataMax.length; i++) {
          if (dataMax[i].provinceCode == 1) {
            dataMax[i].provinceCode = "آذربایجان شرقی";
          } else if (dataMax[i].provinceCode == 2) {
            dataMax[i].provinceCode = "آذربایجان غربی";
          } else if (dataMax[i].provinceCode == 3) {
            dataMax[i].provinceCode = "اردبیل";
          } else if (dataMax[i].provinceCode == 4) {
            dataMax[i].provinceCode = "اصفهان";
          } else if (dataMax[i].provinceCode == 5) {
            dataMax[i].provinceCode = "البرز";
          } else if (dataMax[i].provinceCode == 6) {
            dataMax[i].provinceCode = "ایلام";
          } else if (dataMax[i].provinceCode == 7) {
            dataMax[i].provinceCode = "بوشهر";
          } else if (dataMax[i].provinceCode == 8) {
            dataMax[i].provinceCode = "تهران";
          } else if (dataMax[i].provinceCode == 9) {
            dataMax[i].provinceCode = "چارمحال و بختیاری";
          } else if (dataMax[i].provinceCode == 10) {
            dataMax[i].provinceCode = "خراسان جنوبی";
          } else if (dataMax[i].provinceCode == 11) {
            dataMax[i].provinceCode = "خراسان رضوی";
          } else if (dataMax[i].provinceCode == 12) {
            dataMax[i].provinceCode = "خراسان شمالی";
          } else if (dataMax[i].provinceCode == 13) {
            dataMax[i].provinceCode = "خوزستان";
          } else if (dataMax[i].provinceCode == 14) {
            dataMax[i].provinceCode = "زنجان";
          } else if (dataMax[i].provinceCode == 15) {
            dataMax[i].provinceCode = "سمنان";
          } else if (dataMax[i].provinceCode == 16) {
            dataMax[i].provinceCode = "سیستان و بلوچستان";
          } else if (dataMax[i].provinceCode == 17) {
            dataMax[i].provinceCode = "فارس";
          } else if (dataMax[i].provinceCode == 18) {
            dataMax[i].provinceCode = "قزوین";
          } else if (dataMax[i].provinceCode == 19) {
            dataMax[i].provinceCode = "قم";
          } else if (dataMax[i].provinceCode == 20) {
            dataMax[i].provinceCode = "کردستان";
          } else if (dataMax[i].provinceCode == 21) {
            dataMax[i].provinceCode = "کرمان";
          } else if (dataMax[i].provinceCode == 22) {
            dataMax[i].provinceCode = "کرمانشاه";
          } else if (dataMax[i].provinceCode == 23) {
            dataMax[i].provinceCode = "کهگیولیه و بویراحمد";
          } else if (dataMax[i].provinceCode == 24) {
            dataMax[i].provinceCode = "گلستان";
          } else if (dataMax[i].provinceCode == 25) {
            dataMax[i].provinceCode = "گیلان";
          } else if (dataMax[i].provinceCode == 26) {
            dataMax[i].provinceCode = "لرستان";
          } else if (dataMax[i].provinceCode == 27) {
            dataMax[i].provinceCode = "مازندران";
          } else if (dataMax[i].provinceCode == 28) {
            dataMax[i].provinceCode = "مرکزی";
          } else if (dataMax[i].provinceCode == 29) {
            dataMax[i].provinceCode = "هرمزگان";
          } else if (dataMax[i].provinceCode == 30) {
            dataMax[i].provinceCode = "همدان";
          } else if (dataMax[i].provinceCode == 31) {
            dataMax[i].provinceCode = "یزد";
          }
        }
        $("#StationReportTable").bootstrapTable("destroy");
        $("#StationReportTable").bootstrapTable({
          data: dataMax
        });
        $("#StationReportXls").show();
      }
    });
  });
  /*----------------------------------*/

  $("#StationReportXls").on("click", function() {
    $("#StationReportTable").tableExport({
      type: "excel",
      fileName: "StationReport"
    });
  });

  /*----------------------------------*/

  $("#arrowDownStationReport").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByRate&sortType=min",
      success: function(result) {
        const dataMin = result.Report;
        for (let i = 0; i < dataMin.length; i++) {
          if (dataMin[i].provinceCode == 1) {
            dataMin[i].provinceCode = "آذربایجان شرقی";
          } else if (dataMin[i].provinceCode == 2) {
            dataMin[i].provinceCode = "آذربایجان غربی";
          } else if (dataMin[i].provinceCode == 3) {
            dataMin[i].provinceCode = "اردبیل";
          } else if (dataMin[i].provinceCode == 4) {
            dataMin[i].provinceCode = "اصفهان";
          } else if (dataMin[i].provinceCode == 5) {
            dataMin[i].provinceCode = "البرز";
          } else if (dataMin[i].provinceCode == 6) {
            dataMin[i].provinceCode = "ایلام";
          } else if (dataMin[i].provinceCode == 7) {
            dataMin[i].provinceCode = "بوشهر";
          } else if (dataMin[i].provinceCode == 8) {
            dataMin[i].provinceCode = "تهران";
          } else if (dataMin[i].provinceCode == 9) {
            dataMin[i].provinceCode = "چارمحال و بختیاری";
          } else if (dataMin[i].provinceCode == 10) {
            dataMin[i].provinceCode = "خراسان جنوبی";
          } else if (dataMin[i].provinceCode == 11) {
            dataMin[i].provinceCode = "خراسان رضوی";
          } else if (dataMin[i].provinceCode == 12) {
            dataMin[i].provinceCode = "خراسان شمالی";
          } else if (dataMin[i].provinceCode == 13) {
            dataMin[i].provinceCode = "خوزستان";
          } else if (dataMin[i].provinceCode == 14) {
            dataMin[i].provinceCode = "زنجان";
          } else if (dataMin[i].provinceCode == 15) {
            dataMin[i].provinceCode = "سمنان";
          } else if (dataMin[i].provinceCode == 16) {
            dataMin[i].provinceCode = "سیستان و بلوچستان";
          } else if (dataMin[i].provinceCode == 17) {
            dataMin[i].provinceCode = "فارس";
          } else if (dataMin[i].provinceCode == 18) {
            dataMin[i].provinceCode = "قزوین";
          } else if (dataMin[i].provinceCode == 19) {
            dataMin[i].provinceCode = "قم";
          } else if (dataMin[i].provinceCode == 20) {
            dataMin[i].provinceCode = "کردستان";
          } else if (dataMin[i].provinceCode == 21) {
            dataMin[i].provinceCode = "کرمان";
          } else if (dataMin[i].provinceCode == 22) {
            dataMin[i].provinceCode = "کرمانشاه";
          } else if (dataMin[i].provinceCode == 23) {
            dataMin[i].provinceCode = "کهگیولیه و بویراحمد";
          } else if (dataMin[i].provinceCode == 24) {
            dataMin[i].provinceCode = "گلستان";
          } else if (dataMin[i].provinceCode == 25) {
            dataMin[i].provinceCode = "گیلان";
          } else if (dataMin[i].provinceCode == 26) {
            dataMin[i].provinceCode = "لرستان";
          } else if (dataMin[i].provinceCode == 27) {
            dataMin[i].provinceCode = "مازندران";
          } else if (dataMin[i].provinceCode == 28) {
            dataMin[i].provinceCode = "مرکزی";
          } else if (dataMin[i].provinceCode == 29) {
            dataMin[i].provinceCode = "هرمزگان";
          } else if (dataMin[i].provinceCode == 30) {
            dataMin[i].provinceCode = "همدان";
          } else if (dataMin[i].provinceCode == 31) {
            dataMin[i].provinceCode = "یزد";
          }
        }
        $("#StationReportTable").bootstrapTable("destroy");
        $("#StationReportTable").bootstrapTable({
          data: dataMin
        });
        $("#StationReportXls").show();
      }
    });
  });

  /*----------------------------------*/

  $("#StationReport").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationTableByRate&sortType=max",
      success: function(result) {
        const dataMax = result.Report;
        for (let i = 0; i < dataMax.length; i++) {
          if (dataMax[i].provinceCode == 1) {
            dataMax[i].provinceCode = "آذربایجان شرقی";
          } else if (dataMax[i].provinceCode == 2) {
            dataMax[i].provinceCode = "آذربایجان غربی";
          } else if (dataMax[i].provinceCode == 3) {
            dataMax[i].provinceCode = "اردبیل";
          } else if (dataMax[i].provinceCode == 4) {
            dataMax[i].provinceCode = "اصفهان";
          } else if (dataMax[i].provinceCode == 5) {
            dataMax[i].provinceCode = "البرز";
          } else if (dataMax[i].provinceCode == 6) {
            dataMax[i].provinceCode = "ایلام";
          } else if (dataMax[i].provinceCode == 7) {
            dataMax[i].provinceCode = "بوشهر";
          } else if (dataMax[i].provinceCode == 8) {
            dataMax[i].provinceCode = "تهران";
          } else if (dataMax[i].provinceCode == 9) {
            dataMax[i].provinceCode = "چارمحال و بختیاری";
          } else if (dataMax[i].provinceCode == 10) {
            dataMax[i].provinceCode = "خراسان جنوبی";
          } else if (dataMax[i].provinceCode == 11) {
            dataMax[i].provinceCode = "خراسان رضوی";
          } else if (dataMax[i].provinceCode == 12) {
            dataMax[i].provinceCode = "خراسان شمالی";
          } else if (dataMax[i].provinceCode == 13) {
            dataMax[i].provinceCode = "خوزستان";
          } else if (dataMax[i].provinceCode == 14) {
            dataMax[i].provinceCode = "زنجان";
          } else if (dataMax[i].provinceCode == 15) {
            dataMax[i].provinceCode = "سمنان";
          } else if (dataMax[i].provinceCode == 16) {
            dataMax[i].provinceCode = "سیستان و بلوچستان";
          } else if (dataMax[i].provinceCode == 17) {
            dataMax[i].provinceCode = "فارس";
          } else if (dataMax[i].provinceCode == 18) {
            dataMax[i].provinceCode = "قزوین";
          } else if (dataMax[i].provinceCode == 19) {
            dataMax[i].provinceCode = "قم";
          } else if (dataMax[i].provinceCode == 20) {
            dataMax[i].provinceCode = "کردستان";
          } else if (dataMax[i].provinceCode == 21) {
            dataMax[i].provinceCode = "کرمان";
          } else if (dataMax[i].provinceCode == 22) {
            dataMax[i].provinceCode = "کرمانشاه";
          } else if (dataMax[i].provinceCode == 23) {
            dataMax[i].provinceCode = "کهگیولیه و بویراحمد";
          } else if (dataMax[i].provinceCode == 24) {
            dataMax[i].provinceCode = "گلستان";
          } else if (dataMax[i].provinceCode == 25) {
            dataMax[i].provinceCode = "گیلان";
          } else if (dataMax[i].provinceCode == 26) {
            dataMax[i].provinceCode = "لرستان";
          } else if (dataMax[i].provinceCode == 27) {
            dataMax[i].provinceCode = "مازندران";
          } else if (dataMax[i].provinceCode == 28) {
            dataMax[i].provinceCode = "مرکزی";
          } else if (dataMax[i].provinceCode == 29) {
            dataMax[i].provinceCode = "هرمزگان";
          } else if (dataMax[i].provinceCode == 30) {
            dataMax[i].provinceCode = "همدان";
          } else if (dataMax[i].provinceCode == 31) {
            dataMax[i].provinceCode = "یزد";
          }
        }
        $("#StationReportTable").bootstrapTable("destroy");
        $("#StationReportTable").bootstrapTable({
          data: dataMax
        });
        $("#StationReportXls").show();
      }
    });
  });

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<EndOfStationReport>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FillDropDown>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  $("#category").change(function() {
    id = $("#category").val();
    console.log("id", id);
    let dropdown = $("#experts");

    dropdown.empty();

    dropdown.append(
      '<option selected="true" disabled>متخصص را انتخاب کنید</option>'
    );
    dropdown.prop("selectedIndex", 0);

    const url =
      "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category=" +
      id;
    console.log("url", url);
    // Populate dropdown with list of provinces
    $.getJSON(url, function(data) {
      console.log(data);
      console.log(data.Experts);
      $.each(data.Experts, function(key, Experts) {
        console.log(Experts.id);
        dropdown.append(
          $("<option></option>")
            .attr("value", Experts.id)
            .text(Experts.name)
        );
      });
    });
  });

  /*----------------------------------*/

  $("#categorysCombo").change(function() {
    FillExperts();
  });

  /*----------------------------------*/

  function FillExperts() {
    let dropdown = $("#expertCombo");
    console.log("dropdown", dropdown);
    id = $("#categorysCombo").val();

    $("#expertCombo").empty();

    $("#expertCombo").append(
      '<option selected="true" disabled>متخصص را انتخاب کنید</option>'
    );
    $("#expertCombo").selectpicker("refresh");
    dropdown.prop("selectedIndex", 0);

    const url =
      "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category=" +
      id;
    console.log("url", url);
    // Populate dropdown with list of provinces

    $.getJSON(url, function(data) {
      console.log("dataaaa", data);
      if (data.Status !== 6) {
        console.log(data.Experts);
        const experts = data.Experts;
        console.log("undef");
        for (let i = 0; i < experts.length; i++) {
          $("#expertCombo").append(
            `<option value="${experts[i].id}">${experts[i].name}</option>`
          );
          $("#expertCombo").selectpicker("refresh");
        }
      } else {
        $("#expertCombo").selectpicker("refresh");
      }
    });
  }
  /*----------------------------------*/

  $("#categoryCombo").change(function() {
    FillExpert();
  });

  /*----------------------------------*/
  function FillExpert() {
    let dropdown = $("#expertsCombo");
    console.log("dropdown", dropdown);
    id = $("#categoryCombo").val();
    $("#expertsCombo").empty();

    $("#expertsCombo").append(
      '<option selected="true" disabled>متخصص را انتخاب کنید</option>'
    );
    $("#expertsCombo").selectpicker("refresh");
    dropdown.prop("selectedIndex", 0);

    const url =
      "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category=" +
      id;
    console.log("url", url);
    // Populate dropdown with list of provinces
    $.getJSON(url, function(data) {
      console.log("dataaaa", data.Status);
      if (data.Status !== 6) {
        console.log(data.Experts);
        const experts = data.Experts;
        for (let i = 0; i < experts.length; i++) {
          $("#expertsCombo").append(
            `<option value="${experts[i].id}">${experts[i].name}</option>`
          );
          $("#expertsCombo").selectpicker("refresh");
        }
      } else {
        $("#expertsCombo").selectpicker("refresh");
      }
    });
  }
  $("#expertsCombo").change(function() {
    document.getElementById("filter-btn").disabled = false;
  });
  $("#expertCombo").change(function() {
    document.getElementById("filter-btn-state").disabled = false;
  });

  $("#filter-btn").click(function() {
    ticketPerDevice();
  });

  //---------------------------------------------//
  $("#arrowUpRate").on("click", function() {
    console.log("herreee");

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertListOrderByRate&order=max",
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].category == 1) {
            data[i].category = "نرم افزاری";
          } else if (data[i].category == 2) {
            data[i].category = "سخت افزاری";
          } else if (data[i].category == 3) {
            data[i].category = "جانبی";
          }
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].activation_state == 1) {
            data[i].activation_state = "فعال";
          } else {
            data[i].activation_state = "غیر فعال";
          }
        }
        $("#expertByRateTable").bootstrapTable("destroy");
        $("#expertByRateTable").bootstrapTable({
          data: data
        });
        $("#expertbyratep").hide();
        $("#expertByRateXls").show();
      }
    });
  });

  /*----------------------------------*/

  $("#arrowDownRate").on("click", function() {
    console.log("herreee");
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertListOrderByRate&order=min",
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].category == 1) {
            data[i].category = "نرم افزاری";
          } else if (data[i].category == 2) {
            data[i].category = "سخت افزاری";
          } else if (data[i].category == 3) {
            data[i].category = "جانبی";
          }
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].activation_state == 1) {
            data[i].activation_state = "فعال";
          } else {
            data[i].activation_state = "غیر فعال";
          }
        }
        $("#expertByRateTable").bootstrapTable("destroy");
        $("#expertByRateTable").bootstrapTable({
          data: data
        });
        $("#expertByRateXls").show();
      }
    });
  });


  /*--------------------------------*/
  $("#expertByRateXls").on("click", function() {
    $("#expertByRateTable").tableExport({
      type: "excel",
      fileName: "expertByRate"
    });
  });
  /*----------------------------------*/

  $("#arrowUpTicket").on("click", function() {
    console.log("herreee");

    $("#maxAndMinTickettables").on("load");

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getLevelReports?type=getMinMaxOfLevelByTicketNumber",
      success: function(result) {
        console.log(result);
       // var data = [result.Report.max_level];
       const data = [
        {
          Report: "بیشترین",
          count: result.Report.max_level.count,
          levelID: result.Report.max_level.levelID
        },
        {
          Report: "کمترین",
          count: result.Report.min_level.count,
          levelID: result.Report.min_level.levelID
        }
      ];
        console.log("datamax", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].levelID == 1) {
            data[i].levelID = "اضطراري";
          } else if (data[i].levelID == 2) {
            data[i].levelID = "مهم";
          } else if (data[i].levelID == 3) {
            data[i].levelID = "معمولی";
          }
        }
        console.log("datamax", data);
        //data = "["+ data +"]";
        console.log("data", data);

        $("#maxAndMinTickettables").bootstrapTable("destroy");
        $("#maxAndMinTickettables").bootstrapTable({
          data: data
        });
        $("#arrowUpTicketXls").show();
      }
    });
  });
  /*--------------------------------*/
  $("#arrowUpTicketXls").on("click", function() {
    $("#maxAndMinTickettables").tableExport({
      type: "excel",
      fileName: "maxAndMinTicket"
    });
  });
  /*----------------------------------*/
  $("#arrowDownTicket").on("click", function() {
    console.log("herreee");

    $("#maxAndMinTickettables").on("load");

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getLevelReports?type=getMinMaxOfLevelByTicketNumber",
      success: function(result) {
        console.log(result);
        const data = [
          {
            Report: "بیشترین",
            count: result.Report.max_level.count,
            levelID: result.Report.max_level.levelID
          },
          {
            Report: "کمترین",
            count: result.Report.min_level.count,
            levelID: result.Report.min_level.levelID
          }
        ];
        for (let i = 0; i < data.length; i++) {
          if (data[i].levelID == 1) {
            data[i].levelID = "اضطراري";
          } else if (data[i].levelID == 2) {
            data[i].levelID = "مهم";
          } else if (data[i].levelID == 3) {
            data[i].levelID = "معمولی";
          }
        }
        console.log("datamax", data);
        //data = "["+ data +"]";
        console.log("data", data);

        // $("maxAndMinTickettables").bootstrapTable({});
        // $("#maxAndMinTickettables").bootstrapTable("load", { data: realdata});
        $("#maxAndMinTickettables").bootstrapTable("destroy");
        $("#maxAndMinTickettables").bootstrapTable({
          data: data
        });
      }
    });
  });
  /*----------------------------------*/
  $("#arrowUpSation").on("click", function() {
    console.log("herreee");

    $("#maxAndMinTickettables").on("load");

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinCount",
      success: function(result) {
        console.log(result);
        var data = [result.Report.max_station];

        console.log("datamax", data);

        $("#StationMinOrMaxTable").bootstrapTable("destroy");
        $("#StationMinOrMaxTable").bootstrapTable({
          data: data
        });
      }
    });
  });
  /*----------------------------------*/
  $("#arrowUpSation").on("click", function() {
    console.log("herreee");

    $("#maxAndMinTickettables").on("load");

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=stationMaxMinCount",
      success: function(result) {
        console.log(result);
        var data = [result.Report.min_station];

        console.log("datamax", data);

        $("#StationMinOrMaxTable").bootstrapTable("destroy");
        $("#StationMinOrMaxTable").bootstrapTable({
          data: data
        });
      }
    });
  });

  /*-------------------------------------------------*/

  $("#expertByTicket").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertSortByTicketNum&order=max",
      success: function(result) {
        console.log(result);
        const data = result.Report.expert_list;
        $("#expertByTicketTable").bootstrapTable("destroy");
        $("#expertByTicketTable").bootstrapTable({
          data: data
        });
        $("#expertbyticketp").hide();
        $("#expertByTicketXls").show();
      }
    });
  });
  /*-----------------------------------------*/

  $("#expertByTicketXls").on("click", function() {
    $("#expertByTicketTable").tableExport({
      type: "excel",
      fileName: "ExpertByTicket"
    });
  });

  /*-------------------------------------------------*/

  $("#expertByTicketRef").click(function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertSortByTicketNum&order=max",
      success: function(result) {
        console.log(result);
        const data = result.Report.expert_list;
        $("#expertByTicketTable").bootstrapTable("destroy");
        $("#expertByTicketTable").bootstrapTable({
          data: data
        });
        $("#expertbyticketp").hide();
        $("#expertByTicketXls").show();
      }
    });
  });
  /*-------------------------------------------------*/

  $("#arrowUps").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertMaxMinRate",
      success: function(result) {
        console.log(result);
        //  const data = result.Report.max_list;
        console.log(result.Report.max_list);
        console.log(result.Report.min_list);
        const data = [
          {
            Report: "بیشترین",
            ...result.Report.max_list[0]
          },
          {
            Report: "کمترین",
            ...result.Report.min_list[0]
          }
        ];

        $("#maxOrminRateTable").bootstrapTable("destroy");
        $("#maxOrminRateTable").bootstrapTable({
          data: data
        });
        $("#maxorminp").hide();
        $("#maxOrminRateXls").show();
      }
    });
  });
  /*----------------------------------*/

  $("#maxOrminRateXls").on("click", function() {
    $("#maxOrminRateTable").tableExport({
      type: "excel",
      fileName: "MaxOrMinRate"
    });
  });

  /*-------------------------------------------------*/

  $("#arrowDowns").on("click", function() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertMaxMinRate",
      success: function(result) {
        console.log(result);
        //  const data = result.Report.max_list;
        console.log(result.Report.max_list);
        console.log(result.Report.min_list);
        const data = [
          {
            Report: "بیشترین",
            ...result.Report.max_list[0]
          },
          {
            Report: "کمترین",
            ...result.Report.min_list[0]
          }
        ];

        $("#maxOrminRateTable").bootstrapTable("destroy");
        $("#maxOrminRateTable").bootstrapTable({
          data: data
        });
        $("#maxorminp").hide();
        $("#maxOrminRateXls").show();
      }
    });
  });
  /*-------------------------------------------------*/

  $("#filter-btn-Expert").click(function() {
    ticketPerDevice();
  });
  /*-------------------------------------------------*/

  $("#filter-btn-state").click(function() {
    statePerExpert();
  });
  /*-------------------------------------------------*/

  $("#filter-btn-date").click(function() {
    filterbtnBetween();
  });
  /*-------------------------------------------------*/

  $("#betweendateRef").click(function() {
    filterbtnBetween();
  });
  /*-------------------------------------------------*/

  $("#filter-btn-dateByDate").click(function() {
    filterbtndateByDate();
  });
  /*-------------------------------------------------*/

  $("#dateByDateRef").click(function() {
    filterbtndateByDate();
  });
  /*-------------------------------------------------*/

  $("#ticketPerState").click(function() {
    ticketPerState();
  });
  /*-------------------------------------------------*/

  $("#ticketPerStateRef").click(function() {
    ticketPerState();
    
  });
  /*-------------------------------------------------*/

  $("#filter-btn-chart").click(function() {
    chartTicket();
  });
  /*-------------------------------------------------*/

  $("#ChartRef").click(function() {
    chartTicket();
  });

  /*-------------------------------------------------*/

  function ticketPerDevice() {
    var id = $("#expertsCombo").val();
    //var id = $("#expertID").val();
    console.log("Expertidnwwww", id);

    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertTicketNumForDevice&expertID=" +
        id,
      success: function(result) {
        console.log(result);
        const data = result.Report.device_ticket_list;
        $("#ticketPerDevice").bootstrapTable("destroy");
        $("#ticketPerDevice").bootstrapTable({
          data: data
        });
        $("#ticketPerDevicep").hide();
        $("#ticketPerDeviceXls").show();
      }
    });
  }
/*-------------------------------------------------*/

$("#ticketPerDeviceXls").on("click", function() {
  $("#ticketPerDevice").tableExport({
    type: "excel",
    fileName: "TicketPerDevice"
  });
});

  /*-------------------------------------------------*/

  function statePerExpert() {
    //var id = $("#experts").val();
    var id = $("#expertid").val();
    console.log("Expertidsssss", id);
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getExportReports?type=expertTicketNumWithState&expertID=" +
        id,
      success: function(result) {
        console.log(result);
        var data = result.Report.state_ticket_list;
        for (let i = 0; i < data.length; i++) {
          if (data[i].state_id == 1) {
            data[i].state_id = "تخصیص نیافته";
          } else if (data[i].state_id == 2) {
            data[i].state_id = "تخصیص یافته";
          } else if (data[i].state_id == 3) {
            data[i].state_id = "شروع به کار";
          } else if (data[i].state_id == 4) {
            data[i].state_id = "اتمام کار";
          } else {
            data[i].state_id = "بسته شده";
          }
        }
        $("#statePerTicket").bootstrapTable("destroy");
        $("#statePerTicket").bootstrapTable({
          data: data
        });
        $("#statep").hide();
        $("#statePerTicketXls").show();
      }
    });
  }
  /*-------------------------*/
  $("#statePerTicketXls").on("click", function() {
    $("#statePerTicket").tableExport({
      type: "excel",
      fileName: "statePerTicket"
    });
  });
  /*-------------------------------------------------*/

  function chartTicket() {
    var year = $("#years").val();
    console.log("years", year);
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getTicketReports?type=getYearlyReport&jalaliYearNumber=" +
        year,
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);
        const months = [];
        const tickets = [];
        if ((data.Report = "farvardin")) {
          months.push("فروردین");
          console.log("fffff", data.farvardin);
          tickets.push(data.farvardin);
        }
        if ((data.Report = "ordibehesht")) {
          months.push("اردیبهشت");
          tickets.push(data.ordibehesht);
        }
        if ((data.Report = "khordad")) {
          months.push("خرداد");
          tickets.push(data.khordad);
        }
        if ((data.Report = "tir")) {
          months.push("تیر");
          tickets.push(data.tir);
        }
        if ((data.Report = "mordad")) {
          months.push("مرداد");
          tickets.push(data.mordad);
        }
        if ((data.Report = "shahrivar")) {
          months.push("شهریور");
          tickets.push(data.shahrivar);
        }
        if ((data.Report = "mehr")) {
          months.push("مهر");
          tickets.push(data.mehr);
        }
        if ((data.Report = "aban")) {
          months.push("آبان");
          tickets.push(data.aban);
        }
        if ((data.Report = "azar")) {
          months.push("آذر");
          tickets.push(data.azar);
        }
        if ((data.Report = "dey")) {
          months.push("دی");
          tickets.push(data.dey);
        }
        if ((data.Report = "bahman")) {
          months.push("بهمن");
          tickets.push(data.bahman);
        }
        if ((data.Report = "esfand")) {
          months.push("اسفند");
          tickets.push(data.esfand);
        }

        console.log(months);
        console.log(tickets);
        var config = {
          type: "line",
          data: {
            labels: months,
            datasets: [
              {
                label: " تعداد تیکت بر اساس ماه",
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: tickets,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "گزارش سالیانه"
            },
            tooltips: {
              mode: "index",
              intersect: false
            },
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "ماه"
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "تعداد"
                  }
                }
              ]
            }
          }
        };

        var ctx = document.getElementById("canvas2").getContext("2d");
        if (window.myLine != undefined) window.myLine.destroy();
        window.myLine = new Chart(ctx, config);
      }
    });
  }

  /*-------------------------------------------------*/

  function filterbtnBetween() {
    var startDate = createDate($("#startDate").val());
    var endDate = createDate($("#endDate").val());
    console.log("startdate", startDate);
    console.log("enddate", endDate);
    let url =
      "https://tagino.ir/Pido/api/reports/getTicketReports?type=getNumberOfTicketBetweenDate&startDate=" +
      startDate +
      "&endDate=" +
      endDate;
    console.log("url", url);
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getTicketReports?type=getNumberOfTicketBetweenDate&startDate=" +
        startDate +
        "&endDate=" +
        endDate,

      success: function(result) {
        console.log(result);
        if (result.Report !== null) {
          const data = result.Report.ticket_number;

          $("#ticketNumCnt").html(data);
        } else {
          $("#ticketNumCnt").html("0");
        }
        $("#divNum").show();
      }
    });
  }

  /*-------------------------------------------------*/

  $("#ticketCnt").click(function() {
    ticketCnt();
  });

  /*-------------------------------------------------*/

  $("#ticketCntRef").click(function() {
    ticketCnt();
  });

  /*-------------------------------------------------*/

  function ticketCnt() {
    var id = $("#ticketCountCombo").val();
    console.log(id);
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getStationRepots?type=getStationTicketCount&stationID=" +
        id,
      success: function(result) {
        if (result.Report !== null) {
          const data = result.Report;
          console.log("datanumber", data);
          $("#ticketCntSpan").html(data.count);
        } else {
          $("#ticketCntSpan").html("0");
        }
        $("#divcnt").show();
      }
    });
  }

  /*-------------------------------------------------*/

  function filterbtndateByDate() {
    var startDate = createDate($("#startDates").val());
    var endDate = createDate($("#endDates").val());
    console.log(startDate);
    console.log(endDate);
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getTicketReports?type=getNumberOfTicketDayByDay&startDate=" +
        startDate +
        "&endDate=" +
        endDate,
      success: function(result) {
        console.log(result);
        const data = result.Report;
        data.reverse();
        console.log(data);
        $("#dateByDatetable").bootstrapTable("destroy");
        $("#dateByDatetable").bootstrapTable({
          data: data
        });
        $("#dateByDateXls").show();
      }
    });
  }

  /*-------------------------------------*/
  $("#dateByDateXls").on("click", function() {
    $("#dateByDatetable").tableExport({
      type: "excel",
      fileName: "DateByDate"
    });
  });
  /*-------------------------------------------------*/

  function ticketPerState() {
    $.ajax({
      url:
        "https://tagino.ir/Pido/api/reports/getLevelReports?type=getNumberOfTicketForLevel",
      success: function(result) {
        console.log(result);
        const data = result.Report;
        console.log("data", data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].levelID == 1) {
            data[i].levelID = "اضطراري";
          } else if (data[i].levelID == 2) {
            data[i].levelID = "مهم";
          } else if (data[i].levelID == 3) {
            data[i].levelID = "معمولی";
          }
        }
        $("#ticketPerStatetable").bootstrapTable("destroy");
        $("#ticketPerStatetable").bootstrapTable({
          data: data
        });
        $("#ticketPerStateXls").show();
      }
    });
  }
/*-------------------------------------*/
$("#ticketPerStateXls").on("click", function() {
  $("#ticketPerStatetable").tableExport({
    type: "excel",
    fileName: "ticketPerState"
  });
});
  /*-------------------------------------------------*/
  function createDate(date) {
    let num = "";
    let pesrian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    for (let i = 0; i < date.length; i++) {
      if (date.charAt(i) == "/") {
        num = num + "-";
      } else {
        for (let j = 0; j < pesrian.length; j++) {
          if (date.charAt(i) == pesrian[j]) {
            num = num + j;
          }
        }
      }
    }

    return num.replace("-0", "-");
  }
});
