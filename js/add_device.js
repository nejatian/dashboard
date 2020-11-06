$(document).ready(function () {


    $('#add-device').click(function () {
        var errors=[];
        let name = $("input[name=name]").val();
        let username = $("input[name=username]").val();
        let category = $('#category').val();
        let active = $('#activation-select').val();


        let myData = {
            "name": name,
            "category": category,
            "activation_state": active,

        };




/*
        $.ajax({
            url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&username=&xzxv=" + Math.random() * 1000233000,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result);
                for (let i = 0; i < result.Stations.length; i++) {
                    // alert('username error');

                    if(username===result.Stations[i].username){


                        errors.push("فیلد نام کاربری قبلا ثبت شده است");
                        console.log(errors);

                    }

                }
                if (myData.username.length === 0) {
                    errors.push(' فیلد نام کاربری الزامیست')
                }
                if (myData.name.length === 0) {
                    errors.push('فیلد نام الزامیست')
                }
                if (myData.password.length === 0) {
                    errors.push('فیلد رمز عبور  الزامیست')
                } else {
                    if (myData.password !== password2) {
                        errors.push('تکرار رمز عبور صحیح نیست')
                    }
                }


            },
            error: function (e) {
                console.log(e)
            }
        }).done(function () {


        });*/
        if (myData.name.length === 0) {
            errors.push(' فیلد نام ادوات الزامیست الزامیست')
        }
        $('.error').html('');

        if (errors.length > 0) {
            console.log(errors);
            for (let i = 0; i < errors.length; i++) {
                $(".error").append($('<li class="d-block">').text(errors[i]));
            }

        }else {
            $("#add-alert").html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>')
            $.ajax({
                url: "https://tagino.ir/Pido/api/Devices/AddDevice",
                type: 'POST',
                data: myData,

                success: function (result) {
                    console.log(result);
                    if (result.Message.toString() === "okey") {
                            setTimeout(function () {
                                $('#add-alert').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>موفقیت آمیز!</strong> عملیات  موفقیت آمیز بوده است.
                                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                </button>
                              </div>`);
                            },200)
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
        }








    });


});