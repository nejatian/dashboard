$(document).ready(function () {
    let searchUrl=document.location.search;
    console.log(searchUrl);
    searchUrl=searchUrl.replace('?','');
    console.log(searchUrl);
    var param=JSON.parse('{"' + decodeURI(searchUrl.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');


    /*let stationAddress = $("input[name=stationAddress]").val();*/

    $('#edit-expert').click(function () {
        var errors = [];

        let name = $("#expertName").val();
        let username = $("#expertUserName").val();
        let password = $("#expertPassword").val();
        let password2 = $("#expertPassword2").val();
        let category = $("#expertCategory").val();
        let state = $("#expertState").val();
        let mobileNo = $("#expertMobileNo").val();
        let rate = $("#expertRate").val();


        let myData = {
            "id":param.id,
            "userName": username,
            "password": password,
            "name": name,
            "mobileNo": mobileNo,
            "rate": rate,
            "activation_state": state,
            "category": category,
        };
        console.log(myData);
        //فعلا اطلاعات کاربر 48 هست

        $.ajax({
            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&dx=" + Math.random() * 1000000,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                for (let i = 0; i < result.Experts.length; i++) {

                    console.log('-----------------');
                    console.log(username +"  "+myData.userName);
                    console.log(result.Experts[i].user_name +"  "+result.Experts[i].id.toString());
                    console.log(username===result.Experts[i].username && myData.id!=result.Experts[i].id.toString());
                    if(username===result.Experts[i].user_name && myData.id!=result.Experts[i].id.toString()){
                        errors.push("فیلد نام کاربری قبلا ثبت شده است");
                        console.log(errors);

                    }

                }
                if (myData.mobileNo.length === 0) {
                    errors.push(' فیلد شماره تماس  الزامیست');
                }
                if (myData.userName.length === 0) {
                    errors.push(' فیلد نام کاربری  الزامیست');
                }
                if (myData.name.length === 0) {
                    errors.push(' فیلد نام متخصص  الزامیست');
                }
                if (myData.rate.length === 0) {
                    errors.push(' فیلد امتیاز    الزامیست');
                }
                if (myData.activation_state.length === 0) {
                    errors.push(' فیلد وضعیت الزامیست  الزامیست');
                }


                if (myData.password.length === 0) {
                    errors.push('فیلد رمز عبور  الزامیست')
                } else {
                    if (myData.password !== password2) {
                        errors.push('تکرار رمز عبور صحیح نیست')
                    }
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
        }).done(function () {

            $('.error').html('');

            if (errors.length > 0) {
                console.log(errors);
                for (let i = 0; i < errors.length; i++) {
                    $(".error").append($('<li class="d-block">').text(errors[i]));
                }

            }else {
                $("#add-alert").html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>')
                setTimeout(function () {
                    $.ajax({
                        url: "https://Tagino.ir/Pido/api/Experts/UpdateExpert",
                        type: 'POST',
                        data: myData,
                        success: function (result) {
                            console.log(result);
                            if (result.Message.toString() === "okey") {
                                $('#add-alert').html(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> عملیات موفقیت آمیز بوده است.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                            } else {

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
                },200)

            }
        });

    });


});