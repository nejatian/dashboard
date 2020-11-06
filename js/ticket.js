$(document).ready(function () {

    let tickets;
    let ticketIndex;
    let pag = 6;
    let pagex = 0;
    let res;
    let ticket;
    String.prototype.toEnglishDigits = function () {
        var num_dic = {
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '-': '-'
        };

        return parseInt(this.replace(/[۰-۹]/g, function (w) {
            return num_dic[w]
        }));
    };
    let experts;

    $.ajax({
        url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter" + "&x=" + Math.floor(Math.random() * 1000000),
        type: 'GET',

        success: function (result) {
            experts = result;
            if (experts.Experts != null) {
                for (let i = 0; i < experts.Experts.length; i++) {
                    $('#expert-ticket').append(`  <option value="${experts.Experts[i].id}" >${experts.Experts[i].name}</option>`)
                    $('#expert-ticket').selectpicker('refresh');
                }
            }


        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {

            } else {
                $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                            <h5>خطایی رخ داده است</h5>
                       </div>`);
                console.log('Error')
            }

        },
        error: function (e) {
            console.log(e)
        }
    });
    let devices;
    $.ajax({
        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&" + "&x=" + Math.floor(Math.random() * 1000000),
        type: 'GET',

        success: function (result) {
            devices = result;
            if (devices.Status == 0) {
                if(devices.Devices!=null){
                    for (let i = 0; i < devices.Devices.length; i++) {
                        $('#device-ticket').append(`  <option value="${devices.Devices[i].id}" >${devices.Devices[i].device_name}</option>`)
                        $('#device-ticket').selectpicker('refresh');
                    }
                }

            }
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {

            } else {
                $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                console.log('Error')
            }

        },
        error: function (e) {
            console.log(e)
        }
    });
    let stations;
    $.ajax({
        url: "https://tagino.ir/Pido/api/station/getStation?type=filter&" + "&x=" + Math.floor(Math.random() * 1000000),
        type: 'GET',

        success: function (result) {
            stations = result;
            if (stations.Status == 0) {
                for (let i = 0; i < stations.Stations.length; i++) {
                    $('#station_ticket').append(`  <option value="${stations.Stations[i].id}" >${stations.Stations[i].name}</option>`)
                    $('#station_ticket').selectpicker('refresh');
                }
            }
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {

            } else {
                $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                console.log('Error')
            }

        },
        error: function (e) {
            console.log(e)
        }
    });
    $.ajax({
        url: "https://tagino.ir/Pido/api/ticket/getTicket?type=all" + "&x=" + Math.floor(Math.random() * 1000000),
        type: 'GET',
        cache: false,
        success: function (result) {
            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">${$(".status-active").parent().find("h5").text()}</p>
                            </div>`);
            tickets = result;
            pagination(result, pagex);
            res = result;
            pageNav(result);
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {

            } else {
                $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                console.log('Error')
            }

        },
        error: function (e) {
            console.log(e)
        }
    });

    $('.ticket-status-card').click(function () {
        filter();
    });
    $('.btn-step').click(function () {

        filter();
    });
    $('.filter-select').change(function (e) {

        filter();
    });

    $('#category_ticket').change(function () {
        let category=$("#category_ticket").val();
        let deviceUrl="https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=";
            if(category==0){
                category="";
                deviceUrl="https://tagino.ir/Pido/api/Devices/GetByType?type=All"
            }
            $.ajax({
            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category="+category+"&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',

            success: function (result) {
               let  experts = result;

                $('#expert-ticket').html(`  <option value="-1" >همه موارد</option>`);
                $('#expert-ticket').selectpicker('refresh');
                if (experts.Experts != null) {

                    for (let i = 0; i < experts.Experts.length; i++) {

                        $('#expert-ticket').append(`  <option value="${experts.Experts[i].id}" >${experts.Experts[i].name}</option>`);
                        $('#expert-ticket').selectpicker('refresh');

                    }
                }


            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {

                } else {
                    $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                            <h5>خطایی رخ داده است</h5>
                       </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });

        $.ajax({
            url: deviceUrl+category + "&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',

            success: function (result) {
                let devices = result;

                if (devices.Status == 0) {
                    $('#device-ticket').html(`  <option value="0" >همه موارد</option>`);
                    $('#device-ticket').selectpicker('refresh');
                    if(devices.Devices!=null){

                        for (let i = 0; i < devices.Devices.length; i++) {
                            $('#device-ticket').append(`  <option value="${devices.Devices[i].id}" >${devices.Devices[i].device_name}</option>`)
                            $('#device-ticket').selectpicker('refresh');
                        }
                    }

                }else if(devices.Status==6){
                    $('#device-ticket').html(`  <option value="0" >همه موارد</option>`);
                    $('#device-ticket').selectpicker('refresh');
                }
            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {

                } else {
                    $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });
    });

    $("#start-create").pDatepicker(
        {

            format: 'YYYY/MM/DD',
            persianDigit: false,
            onSelect: function () {
                if($('#end-create').val().length>0){
                    filter();
                }

            },
            autoClose: true
        }
    );

    $("#start-create").val('');

    $("#end-create").pDatepicker(
        {
            format: 'YYYY/MM/DD',

            locale: 'en',
            onSelect: function () {
                if($('#start-create').val().length>0){
                    filter();
                }

            },

            autoClose: true
        },
    );

    $("#end-create").val('');


    $("#startDate").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            persianDigit: false,
            onSelect: function () {
                if($('#endDate').val().length>0){
                    filter();
                }



            },
            autoClose: true
        }
    );
    $("#startDate").val('');
    $("#endDate").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            onSelect: function () {
                if($('#startDate').val().length>0){
                    filter();
                }

            },
            autoClose: true
        }
    );
    $("#endDate").val('');

    $("#startDates").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            persianDigit: false,
            onSelect: function () {
                if($('#endDates').val().length>0){
                    filter();
                }



            },
            autoClose: true
        }
    );
    $("#startDates").val('');
    $("#endDates").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            onSelect: function () {
                if($('#startDates').val().length>0){
                    filter();
                }

            },
            autoClose: true
        }
    );
    $("#endDates").val('');




    $('.ticket-status-card').click(function () {
        $('.status-active').removeClass('status-active');
        $(this).find('.status-divider').addClass('status-active')

    });

    $('.btn-step').click(function () {
        $('.active-step').removeClass('active-step');
        $(this).addClass('active-step')
    });


    function add() {

    }

    function edit() {

    }


    $('#ticket-list').on('click', '.deleteBtn', function () {

        $('#modal-delete').attr('data-id', $(this).attr("data-id"));
    });

    $('#img-wrapper').on('click', '#modal-img', function () {
        $('#image-modal').find('.modal-body').html(`    <img class="w-100" src="https://tagino.ir/Pido/Image/ticketImage/${ticket.ticket_image_url}" alt="">`)
    });
    $('#ticket-list').on('click', '.btn-show-info', function () {
        for (let i = 0; i < tickets.Tickets.length; i++) {
            if (tickets.Tickets[i].id == $(this).attr('data-id')) {
                ticket = tickets.Tickets[i];

            }

        }
        $('#task-wrapper').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/ticketTask/getTicketTask?type=ticketID&ticketID=" + ticket.id + "&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',

            success: function (result) {

                if (result.Status == "0") {
                    $('#task-wrapper').html('');
                    if((result).Tickets.length==0){
                        $('#task-wrapper').html(`<p>هیچ تسکی وجود ندارد</p>`);
                    }
                    for (let i = 0; i < result.Tickets.length; i++) {
                        let task = $(`

                                              <div class="task-item    h-auto" >
                                        <p class="task-title d-block h-auto "><i class="fa fa-tasks ml-2"></i>${result.Tickets[i].ticket_task_title}</p>
                                        <p class="task-description d-block  h-auto">توضیحات : ${result.Tickets[i].ticket_task_explian}</p>
                                    </div>
                                    `);
                        $('#task-wrapper').append(task)
                    }
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {

                } else {
                    $('#task-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                                        <h5>خطایی رخ داده است</h5>
                                   </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });

        $("#info").find('.ticket-description').text(ticket.ticket_explain);
        if (ticket.ticket_solution != "") {
            $('#info').find('.solution').text(ticket.ticket_solution);
        } else {
            $('#info').find('.solution').text("هیچ راه حلی ثبت نشده است")
        }

        if (ticket.ticket_operator_explain != null) {
            $('#info').find('.operator-ex').text(ticket.ticket_operator_explain);
        } else {
            $('#info').find('.operator-ex').text("هیچ توضیحی ثبت نشده است")
        }

        if (ticket.ticket_device_name != null) {

            $("#device-name").text("دستگاه : " + ticket.ticket_device_name);
        } else {
            $("#device-name").text(" دستگاه : ثبت نشده");
        }


        if (ticket.ticket_station_name != null) {
            $("#station_name").text("جایگاه : " + ticket.ticket_station_name);
        } else {
            $("#station_name").text(" جایگاه : ثبت نشده");
        }
        if (ticket.ticket_deadline_jalali != null) {
            $("#deadline").text("مهلت پایان : " + ticket.ticket_deadline_jalali.toString());
        } else {
            $("#deadline").text(" مهلت پایان : ثبت نشده");
        }

        if (ticket.ticket_image_url != null) {
            $('#img-wrapper').html(` <h6>تصویر ضمیمه :</h6>
             <img  src="https://tagino.ir/Pido/Image/ticketImage/${ticket.ticket_image_url}" id="modal-img" class="ticket-img" alt="" data-toggle="modal" data-target="#image-modal" data-dismiss="modal" >
            `)
        } else {

            $('#img-wrapper').html(` <h6>تصویر ضمیمه :</h6><p>تصویری ضمیمه نشده</p>`)
        }

        if (ticket.ticket_category_id != null) {
            let cat = "";
            if (ticket.ticket_category_id == 1) {
                cat = "نرم افزاری";
            } else if (ticket.ticket_category_id == 2) {
                cat = "سخت افزاری";
            } else {
                cat = "جانبی"
            }
            $("#category_name").text("رسته دستگاه : " + cat);
        } else {
            $("#category_name").text("رسته دستگاه : ثبت نشده");
        }


    });
    $('#modal-delete').click(function () {
        let deleteData = {
            type: 'id',
            ticketID: $(this).attr('data-id')
        };


        $.ajax({
            url: "https://tagino.ir/Pido/api/ticket/deleteTicket",
            type: 'POST',
            data: deleteData,

            success: function (result) {


                if (result.Message.toString() === "okey") {
                    $('#alert-wrapper').append(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                                  تیکت  مورد نظر حذف شد
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                    $('#ticket-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/ticket/getTicket?type=all&" + "&x=" + Math.floor(Math.random() * 1000000),
                        type: 'GET',

                        success: function (result) {
                            $('#isFilter').html(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">${$(".status-active").parent().find("h5").text()}</p>
                            </div>`);
                            tickets = result;
                            pagex = 0;
                            pagination(result, pagex);
                            res = result;

                            pageNav(result);
                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {

                            } else {
                                $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                                console.log('Error')
                            }

                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });


                } else {

                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#alert-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی در حذف متخصص مورد نظر رخ داده است
                                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                }
            },
            error: function (e) {
                console.log(e)
            }
        });

    });

    function pagination(result, x) {

        $('#ticket-list').html(' ');
        if (result.Tickets.length == 0) {
            $('#ticket-list').html('<h4 class="m-3">هیچ نتیجه ای پیدا نشد</h4>');
        } else {

        }
        pagex = x;

        let len = (Number(x) + Number(1)) * pag;

        if (len >= result.Tickets.length) {
            len = result.Tickets.length;
        }


        for (let i = (pagex * 6); i < len; i++) {


            let level = "";
            let levelclass = "";
            if (result.Tickets[i].ticket_level_id == 1) {
                level = "اضطراری";
                levelclass = "status-nes-bg"
            } else if (result.Tickets[i].ticket_level_id == 2) {
                level = "مهم";
                levelclass = "status-important-bg"
            } else {
                level = "معمولی";
                levelclass = "status-regular-bg"
            }
            var card = $(`<div class="col-md-6 col-sm-12 col-12 col-lg-4 col-xl-4 mb-4">
                        <div class="card position-relative p-3">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <span class="card-status d-flex align-items-center float-right">
                                <span class="status-icon float-right ${levelclass} ml-2"></span>
                                <span class="d-block float-right">${level}</span>

                            </span>
                                <span class="card-date float-left">
                                    <span class="d-flex align-items-center  ">
                                        <span class="d-block float-right date ml-2">تاریخ ایجاد:</span>
                                        <span class="d-block float-right date">${result.Tickets[i].ticket_create_date_jalali}</span>
                                    
                                    </span>
                                    
                                 </span>
                            </div>
                            <h6 class="mt-3">${result.Tickets[i].ticket_title}</h6>
                            <p class="m-0 font-13">${"کد ثبت:"+result.Tickets[i].id}</p>
                           
                            <p class="font-13 w-100 " style="height:50px;; overflow-y:hidden;">توضیحات:${result.Tickets[i].ticket_explain}</p>
                            <div class="d-flex mt-1 w-100 align-items-center justify-content-between">
                                <span class="card-status d-flex align-items-start float-right">
                                <span class="fas fa-suitcase float-right  ml-2"></span>
                                <span class="d-block float-right font-13 height-35px">متخصص:${result.Tickets[i].ticket_expert_name}</span>

                            </span>
                                <span class=" float-left">
                            <span class="card-status d-flex align-items-start float-left">
                                <span class="fas  float-right fa-layer-group ml-2"></span>
                                <span class="d-block float-right font-13 height-35px">مرحله تیکت:${result.Tickets[i].ticket_current_state}</span>
                            </span>
                                 </span>
                            </div>
                            <div class="row mt-2">
                            
                                <div class="col-lg-6"><button class="w-100 btn text-light status-nes-bg mt-2 deleteBtn" data-id="${result.Tickets[i].id}" name="delete" data-toggle="modal" data-target="#modal">حذف</button></div>
                              <div class="col-lg-6"><a href="ticket_edit.html?id=${result.Tickets[i].id}" class="w-100 btn text-light status-last-bg  mt-2" >ویرایش</a></div>
                              <div class="col-lg-12"><a href="#"  class="w-100 btn status-important-bg mt-2 text-light">مشاهده روند</a></div>
                              <div class="col-lg-12"><button class="w-100 btn btn-show-info  mt-2" data-id="${result.Tickets[i].id}" data-toggle="modal" data-target="#info">اطلاعات بیشتر</button></div>
                            </div>

                        </div>
                    </div>`);
            $('#ticket-list').append(card);
        }


    }

    $('#page-ul').on('click', '.page-item', function (event) {

        event.preventDefault();
        $('#page-ul .active').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('data-pg') > 0) {
            $('.prev-page').removeClass('disabled');
        } else {
            $('.prev-page').add('disabled');
        }
        if ($(this).attr('data-pg') > res.Tickets.length / pag) {
            $('.next-page').addClass('disabled')
        } else {
            $('.next-page').removeClass('disabled')
        }

        pagex = $(this).attr('data-pg');

        pagination(res, $(this).attr('data-pg'));

    });

    function pageNav(result) {
        $('#page-ul').html('');
        for (i = 0; i < Math.ceil((result.Tickets.length / pag)); i++) {
            if (i == 0) {
                $('#page-ul').append($('<li class="page-item active " data-pg="' + (i) + '" ><a class="page-link m-0" >' + (i + 1) + '</a></li>'));
            } else {
                $('#page-ul').append($('<li class="page-item " data-pg="' + (i) + '"><a  class="page-link m-0">' + (i + 1) + '</a></li>'));
            }

        }
    }


    function filter() {
        setTimeout(function () {
            $('#isFilter').html('');


            if ($("#startDate").val().length > 0 && $("#endDate").val().length > 0) {
                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    ">${"مهلت پایان از" + $("#startDate").val() + " تا " + $("#endDate").val()}</p>
                                                  <button type="button" class="close remove-filter" data-filter="deadline" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }

            $("#ticket-id").val('');
            if ($("#end-create").val().length > 0 && $("#start-create").val().length > 0) {
                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    ">${"تاریخ ایجاد از:" + $("#start-create").val() + " تا " + $("#end-create").val()}</p>
                                                  <button type="button" class="close remove-filter" data-filter="create" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }


            if ($(".active-step").length > 0) {
                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    ">${$(".active-step ").find('.spn').text()}</p>
                             <button type="button" class="close remove-filter" data-filter="state" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }

            if ($("#station_ticket").val() > 0) {
                let station = $("#station_ticket option:selected").text();
                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    "> جایگاه :  ${station}</p>
                                           <button type="button" class="close remove-filter" data-filter="station" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }

            if ($("#category_ticket").val() > 0) {
                let category = $("#category_ticket option:selected").text();

                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    ">رسته :  ${category}</p>
                                           <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }


            if ($("#device-ticket").val() > 0) {
                let device = $("#device-ticket option:selected").text();

                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    "> دستگاه :   ${device}</p>
                                           <button type="button" class="close remove-filter" data-filter="device" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }

            if ($("#expert-ticket").val() > -1) {
                let expert = $("#expert-ticket option:selected").text();

                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    "> متخصص :  ${expert}</p>
                                           <button type="button" class="close remove-filter" data-filter="expert" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
            }

            let filters = {
                deviceID: $("#device-ticket").val(),
                stationID: $("#station_ticket").val(),
                expertID: $("#expert-ticket").val(),
                categoryID: $("#category_ticket").val(),
                currentStateID: "",
                levelID: $('.status-active').attr('data-level-id'),
                dateStart: createDate($('#start-create').val()),
                dateEnd: createDate($('#end-create').val()),
                startDeadLineDate: createDate($('#startDate').val()),
                endDeadLineDate: createDate($('#endDate').val()),
            };
            if (filters.dateStart == "" || filters.dateEnd == "") {
                delete filters.dateStart;
                delete filters.dateEnd;
            } else {

            }
            if (filters.startDeadLineDate == "" || filters.endDeadLineDate == "") {
                delete filters.startDeadLineDate;
                delete filters.endDeadLineDate;
            }

            if ($('.btn-step').find('.active-step')) {
                filters.currentStateID = $('.active-step').attr('data-state-id')
            }
            if ($('.card-status').find('.status-active')) {
                filters.levelID = $('.status-active').attr('data-level-id')
            }
            if ($('.status-active').attr('data-level-id') == 0) {
                filters.levelID = ""
            }

            if (filters.deviceID == 0) {
                filters.deviceID = ""
            }
            if (filters.expertID == -1) {
                filters.expertID = ""
            }
            if (filters.stationID == 0) {
                filters.stationID = ""
            }
            if (filters.categoryID == 0) {
                filters.categoryID = ""
            }


            if($("#device-ticket").val()==0  && $("#station_ticket").val()==0&& $("#expert-ticket").val()==-1 && $("#category_ticket").val()==0 && $('.status-active').attr('data-level-id') ==0 && ( createDate($('#startDate').val()) == "" || createDate($('#endDate').val())=="") && ( createDate($('#start-create').val()) == "" || createDate($('#end-create').val())=="0") && $('.active-step').attr('data-state-id')==undefined) {

                    if ($(".status-active").parent().find("h5").length > 0) {
                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">500 تیکت آخر</p>
                            </div>`);
                }
                let urlParameters = Object.entries(filters).map(e => e.join('=')).join('&');


                $.ajax({
                    url: "https://tagino.ir/Pido/api/ticket/getTicket?type=all",
                    type: 'GET',


                    success: function (result) {
                        tickets = result;
                        $('#ticket-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                        setTimeout(function () {
                            pagination(result, 0);
                            res = result;
                            pageNav(result);
                        }, 200)

                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {

                        } else {
                            $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                            console.log('Error')
                        }

                    },
                    error: function (e) {
                        console.log(e)
                    }
                });
            }else {
                if ($('.status-active').attr('data-level-id') == 0) {
                    if ($(".status-active").parent().find("h5").length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">لیست تیکت ها</p>
                            </div>`);
                    }
                } else {
                    if ($(".status-active").parent().find("h5").length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">${$(".status-active").parent().find("h5").text()}</p>
                                             <button type="button" class="close remove-filter" data-filter="level" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                    }
                }
                let urlParameters = Object.entries(filters).map(e => e.join('=')).join('&');
                $.ajax({
                    url: "https://tagino.ir/Pido/api/ticket/getTicket?type=filter&" + urlParameters + "&x=" + Math.floor(Math.random() * 1000000),
                    type: 'GET',

                    success: function (result) {
                        tickets = result;
                        $('#ticket-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                        setTimeout(function () {
                            pagination(result, 0);
                            res = result;
                            pageNav(result);
                        }, 200)

                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {

                        } else {
                            $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                            console.log('Error')
                        }

                    },
                    error: function (e) {
                        console.log(e)
                    }
                });
            }





        }, 100);

    }


    $("#isFilter").on("click", ".remove-filter", function () {

        switch ($(this).attr('data-filter')) {
            case 'level' : {

                $('.status-active').removeClass('status-active');
                $('.status-divider[data-level-id="0"]').addClass('status-active');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }
            case 'category' : {

                $.ajax({
                    url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter" + "&x=" + Math.floor(Math.random() * 1000000),
                    type: 'GET',

                    success: function (result) {
                        experts = result;

                        if (experts.Experts != null) {
                            $('#expert-ticket').html(`  <option value="-1" >همه موارد</option>`)
                            $('#expert-ticket').selectpicker('refresh');
                            for (let i = 0; i < experts.Experts.length; i++) {
                                $('#expert-ticket').append(`  <option value="${experts.Experts[i].id}" >${experts.Experts[i].name}</option>`);
                                $('#expert-ticket').selectpicker('refresh');
                            }
                        }


                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {

                        } else {
                            $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                            <h5>خطایی رخ داده است</h5>
                       </div>`);
                            console.log('Error')
                        }

                    },
                    error: function (e) {
                        console.log(e)
                    }
                });
                $.ajax({
                    url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&" + "&x=" + Math.floor(Math.random() * 1000000),
                    type: 'GET',

                    success: function (result) {
                        devices = result;

                        if (devices.Status == 0) {
                            $('#device-ticket').html(`  <option value="0" >همه موارد</option>`)
                            $('#device-ticket').selectpicker('refresh');
                            if(devices.Devices!=null){
                                for (let i = 0; i < devices.Devices.length; i++) {
                                    $('#device-ticket').append(`  <option value="${devices.Devices[i].id}" >${devices.Devices[i].device_name}</option>`)
                                    $('#device-ticket').selectpicker('refresh');
                                }
                            }

                        }
                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {

                        } else {
                            $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                            console.log('Error')
                        }

                    },
                    error: function (e) {
                        console.log(e)
                    }
                });
                $("#category_ticket").val('0');
                $('#category_ticket').selectpicker('refresh');
                setTimeout(function () {

                    filter();

                }, 100);
                break;
            }
            case 'state': {

                $('.active-step').removeClass('active-step');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }
            case 'station': {

                $("#station_ticket").val('0');
                $('#station_ticket').selectpicker('refresh');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }
            case 'expert': {

                $("#expert-ticket").val('-1');
                $('#expert-ticket').selectpicker('refresh');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }
            case 'device': {

                $("#device-ticket").val('0');
                $('#device-ticket').selectpicker('refresh');

                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }
            case 'deadline': {

                $("#startDate").val('');
                $("#endDate").val('');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }


            case 'create': {

                $("#start-create").val('');
                $("#end-create").val('');
                setTimeout(function () {
                    filter();

                }, 100);
                break;
            }


        }
    });


    function createDate(date) {
        let num = "";
        let pesrian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        for (let i = 0; i < date.length; i++) {
            if (date.charAt(i) == "/") {
                num = num + "-"
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

    $("#search-id").click(function () {

        $('#isFilter').html(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0 text-center d-block w-100 float-right">لیست تیکت ها</p>
                            </div>`);
        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0    ">${"کد ثبت:" + $("#ticket-id").val() }</p>
                                                  <button type="button" class="close remove-filter" data-filter="deadline" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);

        $('.status-active').removeClass('status-active');
        $('.status-divider[data-level-id="0"]').addClass('status-active');
            let id =$("#ticket-id").val();
        $.ajax({
                url: "https://tagino.ir/Pido/api/ticket/getTicket?type=ByID&id="+id,
                type: 'GET',
                success: function (result) {
                    tickets = result;
                    $('#ticket-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                    setTimeout(function () {
                        pagination(result, 0);
                        res = result;
                        pageNav(result);
                    }, 200)

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {

                    } else {
                        $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                        console.log('Error')
                    }

                },
                error: function (e) {
                    console.log(e)
                }
            });


        if(  $("#category_ticket").val()!='0'){
            $.ajax({
                url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter" + "&x=" + Math.floor(Math.random() * 1000000),
                type: 'GET',

                success: function (result) {
                    experts = result;

                    if (experts.Experts != null) {
                        $('#expert-ticket').html(`  <option value="-1" >همه موارد</option>`)
                        $('#expert-ticket').selectpicker('refresh');
                        for (let i = 0; i < experts.Experts.length; i++) {
                            $('#expert-ticket').append(`  <option value="${experts.Experts[i].id}" >${experts.Experts[i].name}</option>`)
                            $('#expert-ticket').selectpicker('refresh');
                        }
                    }


                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {

                    } else {
                        $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                            <h5>خطایی رخ داده است</h5>
                       </div>`);
                        console.log('Error')
                    }

                },
                error: function (e) {
                    console.log(e)
                }
            });
            $.ajax({
                url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&" + "&x=" + Math.floor(Math.random() * 1000000),
                type: 'GET',

                success: function (result) {
                    devices = result;

                    if (devices.Status == 0) {
                        $('#device-ticket').html(`  <option value="0" >همه موارد</option>`)
                        $('#device-ticket').selectpicker('refresh');
                        if(devices.Devices!=null){
                            for (let i = 0; i < devices.Devices.length; i++) {
                                $('#device-ticket').append(`  <option value="${devices.Devices[i].id}" >${devices.Devices[i].device_name}</option>`)
                                $('#device-ticket').selectpicker('refresh');
                            }
                        }

                    }
                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {

                    } else {
                        $('#ticket-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                           <h5>خطایی رخ داده است</h5>
                      </div>`);
                        console.log('Error')
                    }

                },
                error: function (e) {
                    console.log(e)
                }
            });
            $("#category_ticket").val('0');
            $('#category_ticket').selectpicker('refresh');
        }

        $('.active-step').removeClass('active-step');
        $("#station_ticket").val('0');
        $('#station_ticket').selectpicker('refresh');
        $("#expert-ticket").val('-1');
        $('#expert-ticket').selectpicker('refresh');
        $("#device-ticket").val('0');
        $('#device-ticket').selectpicker('refresh');
        $("#startDate").val('');
        $("#endDate").val('');
        $("#start-create").val('');
        $("#end-create").val('');
    })
});
