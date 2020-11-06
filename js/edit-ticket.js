$(document).ready(function () {
    let myTicket;
    let ExpertID=0;
    let State=0;
    let cat;
    let newcat;
    let searchUrl = document.location.search;

    searchUrl = searchUrl.replace('?', '');

    let param=JSON.parse('{"' + decodeURI(searchUrl.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
     $.ajax({
         url: "https://tagino.ir/Pido/api/ticket/getTicket?type=filter"+ "&x=" + Math.floor(Math.random() * 1000000),
         type: 'GET',
         contentType: "application/json; charset=utf-8",
         success: function (result) {

             if(result.Status=="0"){

                 for (let i=0;i<result.Tickets.length;i++){
                     if(result.Tickets[i].id==param.id){

                         myTicket=result.Tickets[i];
                         cat=myTicket.ticket_category_id;
                         ExpertID=myTicket.ticket_expert_id;
                         State=myTicket.ticket_current_state_id;

                         $("#change-state-select").val(State);
                         $('#change-state-select').selectpicker('refresh');

                         $.ajax({
                             url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category="+myTicket.ticket_category_id+ "&x=" + Math.floor(Math.random() * 1000000),
                             type: 'GET',
                             contentType: "application/json; charset=utf-8",
                             success: function (result) {

                                 if (result.Status == "0") {
                                     $('#expert-ref').html('');
                                     $('#expert-ref').selectpicker('refresh');
                                     $('#expert-ref').html('<option class="" value="0">متخصص را انتخاب کنید</option>');
                                     $('#expert-ref').selectpicker('refresh');
                                     for (let i = 0; i < result.Experts.length; i++) {
                                         let expert = $(`<option class="" value="${result.Experts[i].id}">${result.Experts[i].name}</option>`);
                                         $('#expert-ref').append(expert);
                                         $('#expert-ref').selectpicker('refresh');

                                     }
                                 }else if(result.Status==6){
                                     $('#expert-ref').html('');
                                     $('#expert-ref').selectpicker('refresh');
                                     let expert = $(`<option class="" value="0">متخصص را انتخاب کنید</option>`);
                                     $('#expert-ref').append(expert);
                                     $('#expert-ref').selectpicker('refresh');
                                 }



                             },
                             complete: function (e, xhr, settings) {
                                 if (e.status === 200) {

                                 } else {
                                     $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                 }
                 }



         },
         complete: function (e, xhr, settings) {
             if (e.status === 200) {

             } else {
                 $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                                         <h5>خطایی رخ داده است</h5>
                                    </div>`);
                 console.log('Error')
             }

         },
         error: function (e) {
             console.log(e)
         }
     });
    let deadline = $("#deadline").val();

   let dead= $("#deadline").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            persianDigit: false,
            onSelect: function () {

            },
            autoClose: true
        }
    );
    setTimeout(function () {
        $('#deadline').val(deadline);
    },100);
    let now = new persianDate();
    dead.setDate(now);




    $('.my-select').selectpicker();
    $('#add-task').click(function () {
        let data = {
            taskTicketID: param.id,
            ticketTaskTitle: $("#add-task-name").val(),
            ticketTaskExplain: $("#add-task-description").val()
        };
        if (data.ticketTaskExplain == "" || data.ticketTaskTitle == "") {
            $('.add-task-error').text('لطفا عنوان تسک و توضیحات را وارد کنید')
        } else {
            setTimeout(function () {
                jQuery.ajax({
                    url: "https://tagino.ir/Pido/api/ticketTask/addTicketTask",
                    type: 'POST',
                    data: data,

                    success: function (result) {
                        $("#add-task-name").val('');
                        $("#add-task-description").val('');

                        if (result.Message.toString() === "okey") {
                            $('#task-alert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> تسک مورد نظر اضافه شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);

                            $('#task-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                            $.ajax({
                                url: "https://tagino.ir/Pido/api/ticketTask/getTicketTask?type=ticketID&ticketID=" + param.id + "&x=" + Math.floor(Math.random() * 1000000),
                                type: 'GET',
                                contentType: "application/json; charset=utf-8",
                                success: function (result) {

                                    if (result.Status == "0") {
                                        $('#task-list').html('');
                                        for (let i = 0; i < result.Tickets.length; i++) {
                                            let task = $(`
                                                <div class="task p-3 edit-wrapper mt-3">
                                            <p class="h6"> <i class="fas fa-tasks m-1 ml-2"></i>${result.Tickets[i].ticket_task_title}</p>
                                            <p class="font-weight-light">توضیحات : ${result.Tickets[i].ticket_task_explian}</p>
                                            <div class="w-100">
                                                <button class="btn   float-left font-13 btn-danger delete-task"   data-id="${result.Tickets[i].id}"  data-toggle="modal" data-target="#modal"> <i class="fas fa-trash  "></i></button>
                                                <!--آیدی تسک به button  در فیلد data-id داده شود -->
                                            </div>
                                        </div>`)
                                            $('#task-list').append(task)
                                        }
                                    }

                                },
                                complete: function (e, xhr, settings) {
                                    if (e.status === 200) {

                                    } else {
                                        $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                            $('#task-alert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>خطا!</strong> افزودن تسک با مشکل مواجه شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                        }

                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {
                            console.log('success')
                        } else {
                            $('#add-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                        }
                    },
                    error: function (e) {
                        console.log(e)
                    }
                });
            }, 200);
            $('.add-task-error').text('')

        }
        /* $("#add-alert").html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>')*/

    });


    $('#task-list').on('click', '.delete-task', function () {
        $('#modal-delete').attr('data-id', $(this).attr("data-id"));
    });
    $('#category').change(function () {
        $.ajax({
            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + $("#category").val()+ "&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                if (result.Status == "0") {
                    $('#device').html('');
                    $('#device').selectpicker('refresh');
                    $('#device').html('<option class="" value="0">دستگاه را انتخاب کنید</option>');
                    $('#device').selectpicker('refresh');
                    for (let i = 0; i < result.Devices.length; i++) {
                        let device = $(`<option class="" value="${result.Devices[i].id}">${result.Devices[i].device_name}</option>`);
                        $('#device').append(device);
                        $('#device').selectpicker('refresh');

                    }
                }else if(result.Status==6){
                    $('#device').html('');
                    $('#device').selectpicker('refresh');
                    let device = $(`<option class="" value="0">دستگاه را انتخاب کنید</option>`);
                    $('#device').append(device);
                    $('#device').selectpicker('refresh');
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {

                } else {
                    $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                                        <h5>خطایی رخ داده است</h5>
                                   </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });
  /*      $.ajax({
            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category=" + $("#category").val()+ "&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                if (result.Status == "0") {
                    $('#expert').html('');
                    $('#expert').selectpicker('refresh');
                    $('#expert').html('<option class="" value="0">متخصص را انتخاب کنید</option>');
                    $('#expert').selectpicker('refresh');
                    for (let i = 0; i < result.Experts.length; i++) {
                        let expert = $(`<option class="" value="${result.Experts[i].id}">${result.Experts[i].name}</option>`);
                        $('#expert').append(expert);
                        $('#expert').selectpicker('refresh');

                    }
                }else if(result.Status==6){
                    $('#expert').html('');
                    $('#expert').selectpicker('refresh');
                    let expert = $(`<option class="" value="0">متخصص را انتخاب کنید</option>`);
                    $('#expert').append(expert);
                    $('#expert').selectpicker('refresh');
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {

                } else {
                    $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                                        <h5>خطایی رخ داده است</h5>
                                   </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });*/
        $('#device').val(0);
        $('#expert').val(0);
        $('.selectpicker').selectpicker('refresh');
    });
    $('#modal-delete').click(function () {

        let deleteData = {
            taskID: $("#modal-delete").attr('data-id'),

        };


        $('#task-alert').append(' <span id="task-loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/ticketTask/deleteTicketTask",
            type: 'POST',
            data: deleteData,

            success: function (result) {


                if (result.Message.toString() === "okey") {

                    $("#task-loader").remove();
                    $('#task-alert').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                  تسک  مورد نظر حذف شد
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);

                    $('#task-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/ticketTask/getTicketTask?type=ticketID&ticketID=" + param.id + "&x=" + Math.floor(Math.random() * 1000000),
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {

                            if (result.Status == "0") {
                                $('#task-list').html('');
                                for (let i = 0; i < result.Tickets.length; i++) {
                                    let task = $(`
                                                <div class="task p-3 edit-wrapper mt-3">
                                            <p class="h6"> <i class="fas fa-tasks m-1 ml-2"></i>${result.Tickets[i].ticket_task_title}</p>
                                            <p class="font-weight-light">توضیحات : ${result.Tickets[i].ticket_task_explian}</p>
                                            <div class="w-100">
                                                <button class="btn delete-task  float-left font-13 btn-danger"   data-id="${result.Tickets[i].id}"  data-toggle="modal" data-target="#modal"> <i class="fas fa-trash  "></i></button>
                                                <!--آیدی تسک به button  در فیلد data-id داده شود -->
                                            </div>
                                        </div>`)
                                    $('#task-list').append(task)
                                }
                            }

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {

                            } else {
                                $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                    $('#task-alert').append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                  تسک  مورد نظر حذف نشد 
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#alert-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی در حذف تیکت مورد نظر رخ داده است
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
    $("#edit-info").click(function () {
        if ( $("#ticket-title").val() != "" && $("#device").val() != 0 && $("#category").val() != 0 && $("#station").val() != 0  && $("#ticket-title").val() != "" && $("#ticket-ex").val() != ""){
            let data={
                ticketID:param.id,
                ticketTitle:$("#ticket-title").val(),
                ticketExplain:$("#ticket-ex").val(),
                ticketOperatorExplain:$("#operator-ex").val(),
                ticketSolution:$("#Solution").val(),
                ticketStationID:$("#station").val(),
                ticketLevelID:$("#level").val(),
                ticketDeviceID:$("#device").val(),
                ticketCategoryID:$("#category").val(),
                ticketDeadLine:createDate($("#deadline").val()),
                ticketExpertID:$("#expert").val()

        ,
            };
            var ofile=$("#image-upload")[0].files[0];
            if(ofile==undefined){
                ofile='';
                var form = new FormData();
                form.append("ticketID", param.id);
                form.append("ticketTitle", $("#ticket-title").val());
                form.append("ticketExplain", $("#ticket-ex").val());
                form.append("ticketOperatorExplain", $("#operator-ex").val());
                form.append("ticketSolution", $("#Solution").val());
                form.append("ticketStationID", $("#station").val());
                form.append("ticketCategoryID", $("#category").val());
                form.append("ticketLevelID", $("#level").val());
                form.append("ticketDeviceID", $("#device").val());
             /*   form.append("ticketExpertID", $("#expert").val());*/
                form.append("ticketDeadLine", createDate($("#deadline").val()));
                form.append("file", ofile);
                newcat=$("#category").val();




                $('.edit-info-error').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');

                setTimeout(function () {
                    jQuery.ajax({
                        url: "https://tagino.ir/Pido/api/ticket/updateTicketData",
                        type: 'POST',
                        data: form,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            $('.edit-info-error').html('');
                            if (result.Message.toString() === "okey") {
                                if(newcat!=cat){
                                    $('#ref-modal').modal('show');
                                    cat=newcat;
                                    $("#current-expert").val('ارجاع نشده');
                                    let ref_data = {
                                        ticketID: param.id,
                                        expertID:"0",

                                    };
                                    $.ajax({
                                        url: "https://tagino.ir/Pido/api/ticket/updateAssignedExpert",
                                        type: 'POST',
                                        data:ref_data ,

                                        success: function (result) {


                                            if (result.Message.toString() === "okey") {
                                                ExpertID=data.expertID;


                                            } else {

                                                $('#ticket-alerts').add(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                              خطا
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                                            }

                                        },
                                        complete: function (e, xhr, settings) {
                                            if (e.status === 200) {
                                                console.log('success')
                                            } else {
                                                $('#expert-ref-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی درارجاع تیکت  مورد نظر رخ داده است
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
                                }




                                $('#ticket-alerts').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> تیکت مورد نظر ویرایش شد .
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                                $.ajax({
                                    url: "https://tagino.ir/Pido/api/ticket/getTicket?type=filter"+ "&x=" + Math.floor(Math.random() * 1000000),
                                    type: 'GET',
                                    contentType: "application/json; charset=utf-8",
                                    success: function (result) {
                                        if(result.Status=="0"){
                                            for (let i=0;i<result.Tickets.length;i++){
                                                if(result.Tickets[i].id==param.id){

                                                    myTicket=result.Tickets[i];
                                                    ExpertID=myTicket.ticket_expert_id;
                                                    State=myTicket.ticket_current_state_id;
                                                    $("#change-state-select").val(State);
                                                    $('#change-state-select').selectpicker('refresh');

                                                    $.ajax({
                                                        url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category="+myTicket.ticket_category_id+ "&x=" + Math.floor(Math.random() * 1000000),
                                                        type: 'GET',
                                                        contentType: "application/json; charset=utf-8",
                                                        success: function (result) {

                                                            if (result.Status == "0") {
                                                                $('#expert-ref').html('');
                                                                $('#expert-ref').selectpicker('refresh');
                                                                $('#expert-ref').html('<option class="" value="0">متخصص را انتخاب کنید</option>');
                                                                $('#expert-ref').selectpicker('refresh');
                                                                for (let i = 0; i < result.Experts.length; i++) {
                                                                    let expert = $(`<option class="" value="${result.Experts[i].id}">${result.Experts[i].name}</option>`);
                                                                    $('#expert-ref').append(expert);
                                                                    $('#expert-ref').selectpicker('refresh');

                                                                }
                                                            }else if(result.Status==6){
                                                                $('#expert-ref').html('');
                                                                $('#expert-ref').selectpicker('refresh');
                                                                let expert = $(`<option class="" value="0">متخصص را انتخاب کنید</option>`);
                                                                $('#expert-ref').append(expert);
                                                                $('#expert-ref').selectpicker('refresh');
                                                            }



                                                        },
                                                        complete: function (e, xhr, settings) {
                                                            if (e.status === 200) {

                                                            } else {
                                                                $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                                            }
                                        }



                                    },
                                    complete: function (e, xhr, settings) {
                                        if (e.status === 200) {

                                        } else {
                                            $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                                $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>خطا!</strong> ویرایش تیکت با مشکل مواجه شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                            }

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#add-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }, 200);

            }else {
                if(ofile.size>600000){
                    $(".edit-info-error").html("<li>حداکثر سایز عکس 600 کیلوبایت می باشد. </li>");
                }else {
                    var form = new FormData();
                    form.append("ticketID", param.id);

                    form.append("ticketTitle", $("#ticket-title").val());
                    form.append("ticketExplain", $("#ticket-ex").val());
                    form.append("ticketOperatorExplain", $("#operator-ex").val());
                    form.append("ticketSolution", $("#Solution").val());
                    form.append("ticketStationID", $("#station").val());
                    form.append("ticketCategoryID", $("#category").val());
                    form.append("ticketLevelID", $("#level").val());
                    form.append("ticketDeviceID", $("#device").val());
                    form.append("ticketDeadLine", createDate($("#deadline").val()));
                    form.append("file", ofile);


                    newcat=$("#category").val();$


                    $('.edit-info-error').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');

                    setTimeout(function () {
                        jQuery.ajax({
                            url: "https://tagino.ir/Pido/api/ticket/updateTicketData",
                            type: 'POST',
                            data: form,
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                $('.edit-info-error').html('');

                                if (result.Message.toString() === "okey") {
                                    $("#current-expert").val('ارجاع نشده');
                                    if(newcat!=cat){
                                        $('#ref-modal').modal('show');
                                        cat=newcat;
                                        $("#current-expert").val('ارجاع نشده');
                                        let data = {
                                            ticketID: param.id,
                                            expertID:"0",

                                        };
                                        $.ajax({
                                            url: "https://tagino.ir/Pido/api/ticket/updateAssignedExpert",
                                            type: 'POST',
                                            data: data,

                                            success: function (result) {


                                                if (result.Message.toString() === "okey") {
                                                    ExpertID=data.expertID;


                                                } else {

                                                    $('#ticket-alerts').add(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                              خطا
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                                                }

                                            },
                                            complete: function (e, xhr, settings) {
                                                if (e.status === 200) {
                                                    console.log('success')
                                                } else {
                                                    $('#expert-ref-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی درارجاع تیکت  مورد نظر رخ داده است
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
                                    }




                                    $('#ticket-alerts').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> تیکت مورد نظر ویرایش شد .
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                                        
                              </div>`);
                                    $.ajax({
                                        url: "https://tagino.ir/Pido/api/ticket/getTicket?type=filter"+ "&x=" + Math.floor(Math.random() * 1000000),
                                        type: 'GET',
                                        contentType: "application/json; charset=utf-8",
                                        success: function (result) {
                                            if(result.Status=="0"){
                                                for (let i=0;i<result.Tickets.length;i++){
                                                    if(result.Tickets[i].id==param.id){

                                                        myTicket=result.Tickets[i];
                                                        ExpertID=myTicket.ticket_expert_id;
                                                        State=myTicket.ticket_current_state_id;
                                                        $("#change-state-select").val(State);
                                                        $('#change-state-select').selectpicker('refresh');


                                                        $.ajax({
                                                            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category="+myTicket.ticket_category_id+ "&x=" + Math.floor(Math.random() * 1000000),
                                                            type: 'GET',
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function (result) {

                                                                if (result.Status == "0") {
                                                                    $('#expert-ref').html('');
                                                                    $('#expert-ref').selectpicker('refresh');
                                                                    $('#expert-ref').html('<option class="" value="0">متخصص را انتخاب کنید</option>');
                                                                    $('#expert-ref').selectpicker('refresh');
                                                                    for (let i = 0; i < result.Experts.length; i++) {
                                                                        let expert = $(`<option class="" value="${result.Experts[i].id}">${result.Experts[i].name}</option>`);
                                                                        $('#expert-ref').append(expert);
                                                                        $('#expert-ref').selectpicker('refresh');

                                                                    }
                                                                }else if(result.Status==6){
                                                                    $('#expert-ref').html('');
                                                                    $('#expert-ref').selectpicker('refresh');
                                                                    let expert = $(`<option class="" value="0">متخصص را انتخاب کنید</option>`);
                                                                    $('#expert-ref').append(expert);
                                                                    $('#expert-ref').selectpicker('refresh');
                                                                }



                                                            },
                                                            complete: function (e, xhr, settings) {
                                                                if (e.status === 200) {

                                                                } else {
                                                                    $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                                                }
                                            }



                                        },
                                        complete: function (e, xhr, settings) {
                                            if (e.status === 200) {

                                            } else {
                                                $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                                    $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>خطا!</strong> ویرایش تیکت با مشکل مواجه شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                                }

                            },
                            complete: function (e, xhr, settings) {
                                if (e.status === 200) {
                                    console.log('success')
                                } else {
                                    $('#ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                                }
                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }, 200);

                }
            }


        }else {
            $(".edit-info-error").html("<li>تمامی فیلد های جز فیلد عکس ،مهلت پایان،متخصص،توضیح اپراتور و راه حل اجباریست. لطفا تکمیل کنید.</li>")
        }


    });

    $("#change-state").click(function () {

        let data = {
            ticketID: param.id,
            expertID: ExpertID,
            state: $("#change-state-select").val(),
            operatorExplain: $("#change-state-operator-ex").val()
        };
        console.log('--------');
        console.log(data);
        console.log('--------')
        $('#change-state-alert').append(' <span id="task-loader" style="width:35px; height: 35px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/ticket/updateTicketState",
            type: 'POST',
            data: data,

            success: function (result) {


                if (result.Message.toString() === "okey") {
                    console.log(result);
                    $("#task-loader").remove();
                    $('#change-state-alert').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                  وضعیت تیکت مورد نظر تغییر پیدا کرد
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);

                    /*$('#task-alert').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');*/
                    /*     $.ajax({
                             url: "https://tagino.ir/Pido/api/ticket/getTicket?type=all&" + "&x=" + Math.floor(Math.random() * 1000000),
                             type: 'GET',
                             contentType: "application/json; charset=utf-8",
                             success: function (result) {
                                 $('#isFilter').html(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                     <p class="m-0 text-center d-block w-100 float-right">${$(".status-active").parent().find("h5").text()}</p>
                                 </div>`);
                                 tickets = result;
                                 pagex=0;
                                 pagination(result,pagex);
                                 res=result;

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
     */

                } else {
                    $('#change-state-alert').append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                  تغییر وضعیت ناموفق بود.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#change-state-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی در تغییر وضعیت تیکت  مورد نظر رخ داده است
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
    $("#ref-btn").click(function () {

        let data = {
            ticketID: param.id,
            expertID:$("#expert-ref").val(),

        };

        $('#expert-ref-alert').append(' <span id="task-loader" style="width:35px; height: 35px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/ticket/updateAssignedExpert",
            type: 'POST',
            data: data,

            success: function (result) {


                if (result.Message.toString() === "okey") {
                    ExpertID=data.expertID;

                    $("#current-expert").val($( "#expert-ref option:selected" ).text());
                    $("#task-loader").remove();
                    $('#expert-ref-alert').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                  ارجاع  تیکت موفیت آمیز بود
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);

                    /*$('#task-alert').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');*/
                    /*     $.ajax({
                             url: "https://tagino.ir/Pido/api/ticket/getTicket?type=all&" + "&x=" + Math.floor(Math.random() * 1000000),
                             type: 'GET',
                             contentType: "application/json; charset=utf-8",
                             success: function (result) {
                                 $('#isFilter').html(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                     <p class="m-0 text-center d-block w-100 float-right">${$(".status-active").parent().find("h5").text()}</p>
                                 </div>`);
                                 tickets = result;
                                 pagex=0;
                                 pagination(result,pagex);
                                 res=result;

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
     */

                } else {
                    $('#expert-ref-alert').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                  ارجاع تیکت ناموفق بود.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#expert-ref-alert').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                                 خطایی درارجاع تیکت  مورد نظر رخ داده است
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
    function createDate(date) {
        let num = "";
        let flag=false;
        let pesrian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        for (let i = 0; i < date.length; i++) {
            if (date.charAt(i) == "/") {
                num = num + "-"
            } else {
                for (let j = 0; j < pesrian.length; j++) {

                    if (date.charAt(i) == pesrian[j]) {
                        num = num + j;
                        flag=true;
                    }

                }
            }

        }
        if(!flag){
            let newDate="";
            for(let i=0;i<date.length;i++){
                if(date.charAt(i)=='/'){
                    newDate=newDate+"-";
                }else {
                    newDate=newDate+  date.charAt(i);
                }
            }


            return newDate;
        }else {
            return num.replace("-", "-");
        }



    }
    $('#image-upload').change(function () {
        if ($('#image-upload').val() != undefined) {
            let x = $('#image-upload').val();
            $("#img-wp").html(`<div class="alert alert-rad bg-light  alert-dismissible fade show float-right w-auto  " role="alert">
                <img src="assets/admin.jpg" id="img-item" alt="">
                <button type="button" class="close remove-img text-dak" data-filter="level" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"  class="text-dark"  >&times;</span>
            </button>
            </div>`);

            readURL(this);


        } else {
            $("#img-wp").html('')
        }


    });
    $('#img-wp').on('click' ,'.remove-img',function () {
        $("#image-upload").val('')
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img-item').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }



});