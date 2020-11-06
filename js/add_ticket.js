$(document).ready(function () {
    let tasks = [];
   let dead= $("#deadline").pDatepicker(
        {
            format: 'YYYY/MM/DD',
            persianDigit: false,
            onSelect: function () {

            },
            autoClose: true
        }
    );
    $("#deadline").val('');
    let now = new persianDate();
    dead.setDate(now);
    $('.my-select').selectpicker();
    $('#category').change(function () {
        $.ajax({
            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + $("#category").val() + "&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
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
                } else if (result.Status == 6) {
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
                    $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&category=" + $("#category").val() + "&x=" + Math.floor(Math.random() * 1000000),
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
                } else if (result.Status == 6) {
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
                    $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                                        <h5>خطایی رخ داده است</h5>
                                   </div>`);
                    console.log('Error')
                }

            },
            error: function (e) {
                console.log(e)
            }
        });
        $('#device').val(0);
        $('#expert').val(0);
        $('.selectpicker').selectpicker('refresh');
    });
    $('#task-list').on('click', '.delete-task', function () {
        $('#modal-delete').attr('data-id', $(this).attr("data-id"));
    });
    $('#modal-delete').click(function () {
        let index = $("#modal-delete").attr('data-id');

        delete tasks[index];
        let temp = [];
        for (let i = 0; i < tasks.length; i++) {
            if (i != index) {
                temp.push(tasks[i]);
            }
        }
        tasks = [];
        tasks = temp;
        console.log(tasks);
        $('#task-alert').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                  تسک  مورد نظر حذف شد
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>`);
        $("#task-list").html('');

        for (let i = 0; i < tasks.length; i++) {
            let task = $(` <div class="task p-3 edit-wrapper mt-3">
                                                        <p class="h6"><i class="fas fa-tasks m-1 ml-2"></i>${tasks[i].title}</p>
                                                        <p class="font-weight-light">${tasks[i].explain}</p>
                                                        <div class="w-100">
                                                            <button class="btn height-35px delete-task float-left font-13 btn-danger"
                                                                    data-id="${i}" data-toggle="modal" data-target="#modal"><i
                                                                    class="fas fa-trash  "></i></button>
                                                            <div class="delete-loader"></div>
                                                            <!--آیدی تسک به button  در فیلد data-id داده شود -->
                                                        </div>
                                                    </div>`);
            $("#task-list").append(task);
        }
    });
    $('#add-task').click(function () {

        if ($("#add-task-name").val() == "" || $("#add-task-description").val() == "") {
            $('.add-task-error').text('لطفا عنوان تسک و توضیحات را وارد کنید')
        } else {
            tasks.push({
                "title": $("#add-task-name").val(),
                "explain": $("#add-task-description").val(),
            });
            $("#add-task-name").val('');
            $("#add-task-description").val('')

            $("#task-list").html('');
            for (let i = 0; i < tasks.length; i++) {
                let task = $(` <div class="task p-3 edit-wrapper mt-3">
                                                        <p class="h6"><i class="fas fa-tasks m-1 ml-2"></i>${tasks[i].title}</p>
                                                        <p class="font-weight-light">${tasks[i].explain}</p>
                                                        <div class="w-100">
                                                            <button class="btn height-35px delete-task float-left font-13 btn-danger"
                                                                    data-id="${i}" data-toggle="modal" data-target="#modal"><i
                                                                    class="fas fa-trash  "></i></button>
                                                            <div class="delete-loader"></div>
                                                            <!--آیدی تسک به button  در فیلد data-id داده شود -->
                                                        </div>
                                                    </div>`);
                $("#task-list").append(task);
            }

        }


    });
    $("#add-ticket").click(function () {


        if ($("#ticket-title").val() != "" && $("#device").val() != 0 && $("#category").val() != 0 && $("#station").val() != 0 && $("#level").val() != 0 && $("#ticket-ex").val() != "") {
            var ofile = $("#image-upload")[0].files[0];
            console.log(ofile);
            var form = new FormData();
            let stringTask=JSON.stringify(tasks);

                   if (ofile == undefined) {
                ofile = "";
                form.append("ticketTitle", $("#ticket-title").val());
                form.append("ticketExplain", $("#ticket-ex").val());
                form.append("ticketOperatorExplain", $("#operator-ex").val());
                form.append("ticketSolution", $("#Solution").val());
                form.append("ticketStationID", $("#station").val());
                form.append("ticketCategoryID", $("#category").val());
                form.append("ticketLevelID", $("#level").val());
                form.append("ticketDeviceID", $("#device").val());
                form.append("ticketExpertID", $("#expert").val());
                form.append("ticketDeadLine", createDate($("#deadline").val()));
                form.append("ticketTasks", stringTask);
                form.append("file", ofile);

                console.log(form);

                $('.add-ticket-error').html(' <span id="loader" style="width:30px; height: 30px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');

                setTimeout(function () {
                    jQuery.ajax({
                        url: "https://tagino.ir/Pido//api/ticket/addTicket",
                        type: 'POST',
                        data: form,
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            $('.add-ticket-error').html('');
                            console.log(result);
                            if (result.Message.toString() === "okey") {
                                clear();
                                $('#add-ticket-alerts').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> تیکت مورد نظر اضافه  شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);

                            } else {
                                $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>خطا!</strong>  افزودن تیکت با ناموفق بود
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
                                $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }, 200);
            } else {
                if (ofile.size > 600000) {
                    $(".add-ticket-error").html("<li>حداکثر سایز عکس 600 کیلوبایت می باشد. </li>");
                } else {
                    form.append("ticketTitle", $("#ticket-title").val());
                    form.append("ticketExplain", $("#ticket-ex").val());
                    form.append("ticketOperatorExplain", $("#operator-ex").val());
                    form.append("ticketSolution", $("#Solution").val());
                    form.append("ticketStationID", $("#station").val());
                    form.append("ticketCategoryID", $("#category").val());
                    form.append("ticketLevelID", $("#level").val());
                    form.append("ticketDeviceID", $("#device").val());
                    if($("#expert").val()!=0){
                        form.append("ticketExpertID", $("#expert").val());
                    }
                    form.append("ticketDeadLine", createDate($("#deadline").val()));
                    form.append("ticketTasks", stringTask);
                    form.append("file", ofile);


                    $('.add-ticket-error').html(' <span id="loader" style="width:30px; height: 30px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');
                    setTimeout(function () {
                        jQuery.ajax({
                            url: "https://tagino.ir/Pido//api/ticket/addTicket",
                            type: 'POST',
                            data: form,
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                $('.add-ticket-error').html('');
                                console.log(result);
                                if (result.Message.toString() === "okey") {
                                    clear();
                                    $('#add-ticket-alerts').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> تیکت مورد نظر اضافه  شد.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);

                                } else {
                                    $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>خطا!</strong>  افزودن تیکت با ناموفق بود
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
                                    $('#add-ticket-alerts').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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

        } else {
            $(".add-ticket-error").html("<li>تمامی فیلد های جز فیلد عکس ،مهلت پایان،متخصص،توضیح اپراتور و راه حل اجباریست. لطفا تکمیل کنید.</li>")
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
                    i
                    if (date.charAt(i) == pesrian[j]) {
                        num = num + j;
                    }

                }
            }


        }

        return num.replace("-", "-");


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
    $('#img-wp').on('click', '.remove-img', function () {
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

    function clear() {
        $("#ticket-title").val('');
        $("#ticket-ex").val('');
        $("#operator-ex").val('');
        $("#Solution").val('');
        $("#station").val('0');
        $("#category").val('0');
        $('#category').selectpicker('refresh');
        $("#level").val('1');
        $('#level').selectpicker('refresh');
        $("#device").val('0');
        $('#device').selectpicker('refresh');
        $("#expert").val('0');
        $('#expert').selectpicker('refresh');
        $("#deadline").val('');
        tasks = [];
        $("#image-upload").val('');
        $("#img-wp").html('');
        $('#device').html('');
        $('#device').selectpicker('refresh');
        $('#device').html('<option class="" value="0">دستگاه را انتخاب کنید</option>');
        $('#device').selectpicker('refresh');
        $('#expert').html('');
        $('#expert').selectpicker('refresh');
        $('#expert').html('<option class="" value="0">متخصص را انتخاب کنید</option>');
        $('#expert').selectpicker('refresh');
        $('#device').val(0);
        $('#expert').val(0);
        $("#add-task-name").val('');
        $("#add-task-description").val('');
        $("#task-list").html('');
        $('.selectpicker').selectpicker('refresh');
    }

});