/*
* province_eastAzerbaijan=1
    province_westAzerbaijan = 2
    province_ardebil = 3
    province_esfahan = 4
    province_alborz = 5
    province_eilam = 6
    province_boushehr = 7
    province_tehran = 8
    province_chaharMahal = 9
    province_soutKhorasan = 10
    province_razaviKhorasan = 11
    province_northKhorasan = 12
    province_khuzestan = 13
    province_zanjan = 14
    province_semnan = 15
    province_sistanAndBalouchestan = 16
    province_fars = 17
    province_qazvin = 18
    province_qom = 19
    province_kordestan = 20
    province_kerman = 21
    province_kermanshah = 22
    province_kohkilooyeh = 23
    province_golestan = 24
    province_gilan = 25
    province_lorestan = 26
    province_mazandaran = 27
    province_markazi = 28
    province_hormozgan = 29
    province_hamedan = 31
    province_yazd = 32*/

$(document).ready(function () {
    let pag = 6;
    let pagex = 0;
    let provinces = [
        'آذرباجان شرقی',
        'آذربایجان غربی',
        'اردبیل',
        'اصفهان',
        'البرز',
        'ایلام',
        'بوشهر',
        'تهران',
        'چهارمحال و بختیاری',
        'خراسان جنوبی',
        'خراسان رضوی',
        'خراسان شمالی',
        'خوزستان',
        'زنجان',
        'سمنان',
        'سیستان و بلوچستان',
        'فارس',
        'قزوین',
        'قم',
        'کردستان',
        'کرمان',
        'کرمانشاه',
        'استان کهگیلویه و بویراحمد',
        'گلستان',
        'گیلان',
        'لرستان',
        'مازندران',
        'مرکزی',
        'هرمزگان',
        'همدان',
        'یزد',
        '',
    ];
    let res;
    $.ajax({
        url: "http://tagino.ir/Pido/api/station/getStation?type=filter&x=" + Math.floor(Math.random() * 1000000),
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            res = result;
            pagination(result, pagex);
            res = result;
            pageNav(result);
            $('#loader').hide();


        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                console.log('success')
            } else {
                $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
            }
        },
        error: function (e) {
            console.log(e)
        }
    });

    $('#station-list').on('click', '.deleteBtn', function () {
        $('#modal-delete').attr('data-id', $(this).attr("data-id"));

    });
    $('#station-list').on('click', '.confirmationBtn', function () {
        $('#modal-change').attr('data-id', $(this).attr("data-id"));
        $('#modal-change').attr('data-status', $(this).attr('data-status'));

    });

    $('#modal-change').on('click', function () {
        let activeStatusData = {
            type: "byID",
            "stationID": $(this).attr('data-id'),
            "state": ""
        };
        var stat;
        if ($(this).attr('data-status') == "0") {
            activeStatusData.state = "1";
            stat = "فعال";
        } else {
            activeStatusData.state = "0";
            stat = "غیر فعال";
        }

        $.ajax({
            url: "https://tagino.ir/Pido/api/station/changeStateStation",
            type: 'POST',
            data: activeStatusData,

            success: function (result) {
                console.log(result);
                if (result.Message.toString() === "okey") {
                    if (activeStatusData.state != "1"){
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').attr('data-status','0');
                        $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                            جایگاه مورد نظر غیرفعال شد
                          
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`);
               /*         $('.confirmationBtn').find('ul').find(`[data-id='${activeStatusData.stationID}']`).removeClass('status-ative').addClass('status-deactive')*/
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').parent().parent().find('.station-status').text('غیرفعال');
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').parent().parent().find('.status-ative').removeClass('status-ative').addClass('status-deative');
                    }else {
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').attr('data-status','1');
                        $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                             جایگاه مورد فعال شد
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                            </button>
                    </div>`);
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').parent().parent().find('.station-status').text('فعال');
                        $('.confirmationBtn[data-id='+activeStatusData.stationID+']').parent().parent().find('.status-deative').removeClass('status-deative').addClass('status-ative');
                    }

                   /*        $.ajax({
                        url: "https://tagino.ir/Pido/api/station/getStation?type=all&x=" + Math.random() * 1000042000,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            res = result;
                            pagination(result, pagex);
                            res = result;
                            pageNav(result);

                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });*/


                } else {

                }

            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#alert-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                   خطایی در تغییر وضعیت جایگاه مورد نظر رخ داده است
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


    $('#modal-delete').click(function () {


        let deleteData = {
            type: "byID",
            "stationID": $(this).attr("data-id"),
        };
        console.log(deleteData);

        $.ajax({
            url: "https://tagino.ir/Pido/api/station/removeStation",
            type: 'POST',
            data: deleteData,

            success: function (result) {

                if (result.Message.toString() === "okey") {
                    $('#alert-wrapper').append(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    جایگاه مورد نظر حذف شد
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`);

                    $.ajax({
                        url: "https://tagino.ir/Pido/api/station/getStation?type=all&x=" + Math.random() * 1000042000,
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            res = result;
                            pagination(result, pagex);
                            res = result;
                            pageNav(result);

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
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
                   خطایی در حدف  متخصص مورد نظر رخ داده است
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

    /*filter------------------------*/
    $('#cancel-filter').click(function () {
        $('#personNumber').val('');
        $('#stationNumber').val('');
        $('#stationCode').val('');
        $('#personName').val('');
        $('#province').val('0');
        $('#isFilter').html('<span>همه</span>');
        $.ajax({
            url: "http://tagino.ir/Pido/api/station/getStation?type=filter&x=" + Math.floor(Math.random() * 1000000),
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                /*  Math.ceil((result.Stations.length/pag)*/
                res = result;

                pagination(result, pagex);
                res = result;
                pageNav(result);
            },
            complete: function (e, xhr, settings) {
                if (e.status === 200) {
                    console.log('success')
                } else {
                    $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                }
            },
            error: function (e) {
                console.log(e)
            }
        });

    });
    $('#filter-btn').click(function () {

        var filter = {
            'name': $('#personName').val(),
            'mobileNo': $('#personNumber').val(),
            'provinceCode': $('#province').val(),
            'stationCode': $('#stationCode').val(),
            'areaNumber': $('#stationNumber').val(),
        };
        if (filter.provinceCode == 0) {
            filter.provinceCode = "";
        }

        let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');

        if (filter.mobileNo.length > 0 || filter.name.length > 0 || filter.stationCode.length > 0 || filter.areaNumber.length > 0 || filter.provinceCode.length > 0) {

            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $('#operator-list').html('');
                    if (result.Stations.length == 0) {
                        $('#operator-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);
                    $("#isFilter").html(' ');
                    if (filter.mobileNo.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                     <p class="m-0">ش جایگاه دار : ${filter.mobileNo}</p>
                      <button type="button" class="close remove-filter"  data-filter="mobileNo" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                    }
                    if (filter.name.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">نام : ${filter.name}</p>
                      <button type="button" class="close remove-filter" data-filter="name" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                    }
                    if (filter.areaNumber.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">شماره  جایگاه : ${filter.areaNumber}</p>
                      <button type="button" class="close remove-filter" data-filter="stationNumber" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                    }
                    if (filter.stationCode.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">کد  جایگاه : ${filter.stationCode}</p>
                      <button type="button" class="close remove-filter" data-filter="stationCode" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                    }
                    if (filter.provinceCode.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">استان   : ${filter.provinceCode}</p>
                      <button type="button" class="close remove-filter" data-filter="provinceCode" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                    }

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });

            /*    $('#isFilter').html(`<div class="alert alert-rad alert-dismissible fade show" role="alert">
                          فیلتر شده
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" id="remove-filter">&times;</span>
                          </button>
                        </div>`);*/
        }


    });
    $("#isFilter").on("click", ".remove-filter", function () {

        var filter = {
            'name': $('#personName').val(),
            'mobileNo': $('#personNumber').val(),
            'provinceCode': $('#province').val(),
            'stationCode': $('#stationCode').val(),
            'areaNumber': $('#stationNumber').val(),
        };
        if ($(this).attr('data-filter') === "name") {

            $('#personName').val('');
            if ($('#personNumber').val().length == 0 && $('#personName').val().length == 0 && $('#stationNumber').val().length == 0 && $('#stationCode').val().length == 0 && $('#province').val() == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            var filter = {
                'name': $('#personName').val(),
                'mobileNo': $('#personNumber').val(),
                'provinceCode': $('#province').val(),
                'stationCode': $('#stationCode').val(),
                'areaNumber': $('#stationNumber').val(),
            };
            if (filter.provinceCode == 0) {
                filter.provinceCode = '';
            }

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log('--------');
            console.log(urlParameters);
            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#station-list').html('');
                    if (result.Stations.length === 0) {
                        $('#station-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });
        } else if ($(this).attr('data-filter') === "stationCode") {
            /*---*/
            $('#stationCode').val('');

            if ($('#personNumber').val().length == 0 && $('#personName').val().length == 0 && $('#stationNumber').val().length == 0 && $('#stationCode').val().length == 0 && $('#province').val() == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            var filter = {
                'name': $('#personName').val(),
                'mobileNo': $('#personNumber').val(),
                'provinceCode': $('#province').val(),
                'stationCode': $('#stationCode').val(),
                'areaNumber': $('#stationNumber').val(),
            };
            if (filter.provinceCode == 0) {
                filter.provinceCode = '';
            }

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#station-list').html('');
                    if (result.Stations.length === 0) {
                        $('#operator-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });
        } else if ($(this).attr('data-filter') === "mobileNo") {

            $('#personNumber').val('');
            if ($('#personNumber').val().length == 0 && $('#personName').val().length == 0 && $('#stationNumber').val().length == 0 && $('#stationCode').val().length == 0 && $('#province').val() == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            var filter = {
                'name': $('#personName').val(),
                'mobileNo': $('#personNumber').val(),
                'provinceCode': $('#province').val(),
                'stationCode': $('#stationCode').val(),
                'areaNumber': $('#stationNumber').val(),
            };
            if (filter.provinceCode == 0) {
                filter.provinceCode = '';
            }

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#station-list').html('');
                    if (result.Stations.length === 0) {
                        $('#operator-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });


        } else if ($(this).attr('data-filter') === "provinceCode") {

            $('#province').val('0');
            if ($('#personNumber').val().length == 0 && $('#personName').val().length == 0 && $('#stationNumber').val().length == 0 && $('#stationCode').val().length == 0 && $('#province').val() == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            var filter = {
                'name': $('#personName').val(),
                'mobileNo': $('#personNumber').val(),
                'provinceCode': $('#province').val(),
                'stationCode': $('#stationCode').val(),
                'areaNumber': $('#stationNumber').val(),
            };
            if (filter.provinceCode == 0) {
                filter.provinceCode = '';
            }

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#station-list').html('');
                    if (result.Stations.length === 0) {
                        $('#operator-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });


        } else {

            $('#stationNumber').val('');
            if ($('#personNumber').val().length == 0 && $('#personName').val().length == 0 && $('#stationNumber').val().length == 0 && $('#stationCode').val().length == 0 && $('#province').val() == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            var filter = {
                'name': $('#personName').val(),
                'mobileNo': $('#personNumber').val(),
                'provinceCode': $('#province').val(),
                'stationCode': $('#stationCode').val(),
                'areaNumber': $('#stationNumber').val(),
            };
            if (filter.provinceCode == 0) {
                filter.provinceCode = '';
            }

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "http://tagino.ir/Pido/api/station/getStation?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#station-list').html('');
                    if (result.Stations.length === 0) {
                        $('#operator-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                    }
                    pagination(result, pagex);
                    res = result;
                    pageNav(result);

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#station-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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


    function pagination(result, x) {

        $('#station-list').html(' ');
        if (result.Stations.length == 0) {
            $('#station-list').html('<h4 class="m-3">هیچ نتیجه ای پیدا نشد</h4>');

        }
        pagex = x;
        var len = (pagex + 1) * pag;
        if (len >= result.Stations.length) {
            len = result.Stations.length;
        }

        for (let i = (pagex * 6); i < len; i++) {

            let activeSt;
            let actClass;
            if (result.Stations[i].activationState == 1) {
                activeSt = 'فعال';
                actClass = "status-ative";
            } else {
                activeSt = 'غیر فعال';
                actClass = "status-deative";
            }
            console.log();

            var card = $(` <div class="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4 mb-4">
              <div class="card ra-card-station">
                <ul class="list-group list-group-flush state-ul" >
                     <li class="list-group-item"><i class="fas fa-user"></i> نام کاربری : <span class="station-name">${result.Stations[i].userName}</span></li>
                  <li class="list-group-item"><i class="fas fa-user"></i> نام جایگاه دار : <span class="station-name">${result.Stations[i].name}</span></li>
                  <li class="list-group-item"><i class="fas fa-barcode"></i> کد جایگاه : <span class="station-code">${result.Stations[i].stationCode}</span></li>
                  <li class="list-group-item"><i class="fas fa-map-marker-alt"></i> استان: <span class="station-state"></span>${provinces[(result.Stations[i].provinceCode)-1]}</li>
                  <li class="list-group-item"><i class="fas fa-mobile-alt"></i> شماره جایگاه دار : <span class="station-mobile">${result.Stations[i].mobileNo}</span></li>
                  <li class="list-group-item"><i class="fas fa-globe"></i> کد منطقه  : <span class="station-phone">${result.Stations[i].areaNumber}</span></li>
                  <li class="list-group-item"><i class="fas fa-phone"></i> شماره  جایگاه : <span class="station-phone">${result.Stations[i].stationPhone}</span></li>
                  <li class="list-group-item"><i class="fas fa-address-card"></i> آدرس  جایگاه : <span class="station-phone">${result.Stations[i].stationAddress}</span></li>
                  <li class="list-group-item"><span class="${actClass}"></span> وضعیت : <span class="station-status"> ${activeSt} </span></li>
                  

                </ul>
                <div class="ac-wrapper ">
                <button class="btn btn-warning confirmationBtn" data-status="${result.Stations[i].activationState}" data-toggle="modal" data-target="#changeStatus" data-id="${result.Stations[i].id}" style="width:120px; margin:0 20px;;">تغییر وضعیت</button></div>
                 
                <div class="divider"></div>
                <div class="card-body">
               
                  <a href="station-edit.html?id=${result.Stations[i].id}" class="btn btn-primary">ویرایش</a>
           
                  <button type="button" class="btn btn-danger deleteBtn" data-toggle="modal" data-id="${result.Stations[i].id}" data-target="#modal">
                    حذف جایگاه
                  </button>
               
                </div>
              </div>
            </div>`);
            $('#station-list').append(card);
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
        if ($(this).attr('data-pg') > res.Stations.length / pag) {
            $('.next-page').addClass('disabled')
        } else {
            $('.next-page').removeClass('disabled')
        }

        pagex = $(this).attr('data-pg');

        pagination(res, $(this).attr('data-pg'));

    });

    function pageNav(result) {
        $('#page-ul').html('');
        for (i = 0; i < Math.ceil((result.Stations.length / pag)); i++) {
            if (i == 0) {
                $('#page-ul').append($('<li class="page-item active " data-pg="' + (i) + '" ><a class="page-link m-0" >' + (i + 1) + '</a></li>'));
            } else {
                $('#page-ul').append($('<li class="page-item " data-pg="' + (i) + '"><a  class="page-link m-0">' + (i + 1) + '</a></li>'));
            }

        }
    }


});
