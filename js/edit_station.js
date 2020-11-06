$(document).ready(function () {
    let searchUrl=document.location.search;
    console.log(searchUrl);
    searchUrl=searchUrl.replace('?','');
    console.log(searchUrl);
    var param=JSON.parse('{"' + decodeURI(searchUrl.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');


    /*let stationAddress = $("input[name=stationAddress]").val();*/

    $('#edit-station').click(function () {
        var errors = [];

        let name = $("input[name=name]").val();
        let username = $("input[name=username]").val();
        let password = $("input[name=password]").val();
        let password2 = $("input[name=password2]").val();
        let mobileNo = $("input[name=mobileNo]").val();
        let provinceCode = $('#select').val();
        let activationState = $('#activation-select').val();
        let stationCode = $("input[name=stationCode]").val();
        let areaNumber = $("input[name=areaNumber]").val();
        let lat = $("input[name=lat]").val();
        let long = $("input[name=long]").val();
        let stationAddress = $("textarea[name=stationAddress]").val();
        let stationName = $("input[name=stationName]").val();
        let stationPhone = $("input[name=stationPhone]").val();

        let myData = {
            "userName": username,
            "password": password,
            "name": name,
            "mobileNo": mobileNo,
            "provinceCode": provinceCode,
            "stationCode": stationCode,
            "areaNumber": areaNumber,
            "lat": lat,
            "long": long,
            "stationAddress": stationAddress,
            "activationState": activationState,
            "stationName": stationName,
            "stationID" :param.id,
            "stationPhone": stationPhone,
        };

        //فعلا اطلاعات کاربر 48 هست

        $.ajax({
            url: "http://tagino.ir/Pido/api/station/getStation?type=filter&dx=" + Math.random() * 1000000,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                for (let i = 0; i < result.Stations.length; i++) {

                    console.log('-----------------');
                    console.log(username +"  "+myData.stationID);
                    console.log(result.Stations[i].username +"  "+result.Stations[i].id.toString());
                    console.log(username===result.Stations[i].username && myData.stationID!=result.Stations[i].id.toString());
                    if(username===result.Stations[i].userName && myData.stationID!=result.Stations[i].id.toString()){
                        errors.push("فیلد نام کاربری قبلا ثبت شده است");
                        console.log(errors);

                    }

                }
                if (myData.areaNumber.length === 0) {
                    errors.push(' فیلد کد منطقه الزامیست');
                }
                if (myData.stationPhone.length === 0) {
                    errors.push(' فیلد شماره جایگاه  الزامیست');
                }
                if (myData.stationName.length === 0) {
                    errors.push(' فیلد نام جایگاه  الزامیست');
                }
                if (myData.userName.length === 0) {
                    errors.push(' فیلد نام کاربری جایگاه  الزامیست');
                }


                if (myData.name.length === 0) {
                    errors.push('فیلد نام الزامیست');
                }
                if (myData.stationAddress.length === 0) {
                    errors.push('فیلد آدرس جایگاه الزامیست');
                }
                if (myData.provinceCode.length === 0) {
                    errors.push('فیلد استان الزامیست');
                }
                if (myData.stationCode.length === 0) {
                    errors.push('فیلد کد جایگاه الزامیست');
                }
                if (myData.lat.length === 0) {
                    errors.push('فیلد عرض جغرافیایی  الزامیست');
                } else {
                    if (Math.floor(myData.lat) < myData.lat) {
                        errors.push('فیلد عرض جغرافیایی  باید عدد صحیح باشد');
                    }
                }
                if (myData.long.length === 0) {
                    errors.push('فیلد طول جغرافیایی  الزامیست')
                } else {

                    if (Math.floor(myData.long) < myData.long) {
                        errors.push('فیلد طول جغرافیایی  باید عدد صحیح باشد');
                    }
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
                        url: "https://Tagino.ir/Pido/api/station/editStation",
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