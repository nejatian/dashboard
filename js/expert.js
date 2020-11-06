$(document).ready(function () {

    let pag = 6;
    let pagex = 0;
    var res;
    $('#loader').show();
    $.ajax({
        url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&xxx" + Math.floor(Math.random() * 1000000),
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            res = result;
            $('#loader').hide();
            pagination(result, pagex);
            res = result;
            pageNav(result);
            $('#spinner').hide();
        },
        complete: function (e, xhr, settings) {
            if (e.status === 200) {
                console.log('success')
            } else {
                $('#expert-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
            }
        },
        error: function (e) {
            console.log(e);
            $('#spinner').hide();
        }
    });

    $('#expert-list').on('click', '.deleteBtn', function () {
        $('#modal-delete').attr('data-id', $(this).attr("data-id"));

    });


    $('#modal-delete').click(function () {
        $('#modal').removeClass('show');
        $('.modal-backdrop').remove();

        let deleteData = {
            id: $(this).attr("data-id"),
        };


        $.ajax({
            url: "https://tagino.ir/Pido/api/Experts/DeleteExpert",
            type: 'POST',
            data: deleteData,

            success: function (result) {
                $('#isFilter').html('همه');

                if (result.Message.toString() === "okey") {
                    $('#alert-wrapper').append(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    متخصص مورد نظر حذف شد
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`);
                    $('#expert-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');

                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&" + Math.floor(Math.random() * 1000042000),
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#loader').hide();
                            pagination(result, pagex);
                            res = result;
                            pageNav(result);

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#expert-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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


    $('#cancel-filter').click(function () {
        $('#expertName').val('');
        $('#expertMobileNumber').val('');
        $('#expertUserName').val('');
        $('#expertCategory').val('0');
        $('#expertState').val('1');
        $('#isFilter').html('<span>همه</span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&&x" + Math.floor(Math.random() * 1000000),
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
                    $('#expert-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                }
            },
            error: function (e) {
                console.log(e)
            }
        });

    });
    /*filter------------------------*/
    $('#filter-btn').click(function () {

        var filter = {
            'category': $('#expertCategory').val(),
            'rate': $('#expertRate').val(),
            'state': $('#expertState').val(),


        };
        let filterUsername = $('#expertUsername').val();
        let filterName = $('#expertName').val();
        let mobileNumber = $('#expertMobileNumber').val();
        if (filter.category == 0) {
            filter.category = ""
        }
        if (filter.state == 2) {
            filter.state = ""
        }


        let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');

        if (filter.rate.length > 0 || filter.state.length != 2 || filterUsername.length > 0 || filterName.length > 0 || mobileNumber.length > 0 || filter.category != 0) {

            $.ajax({
                url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#expert-list').html('');
                    if (result.Status == 6) {
                        if (filter.rate.length > 0 || filter.state.length > 0 || filter.category.length > 0) {
                            $('#isFilter').html('')
                        }
                        if (filter.rate.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">امتیاز : ${filter.rate}</p>
                              <button type="button" class="close remove-filter" data-filter="rate" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.category.length > 0) {
                            let cat = "";
                            if (filter.category == 1) {
                                cat = "نرم افزار"
                            } else if (filter.category == 2) {
                                cat = "سخت افزار"
                            } else {
                                cat = "فعالیت میدانی"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">رسته متخصص : ${cat}</p>
                              <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.state.length > 0) {
                            let st = "";
                            if (filter.state == 1) {
                                st = "فعال"
                            } else if (filter.state == 0) {
                                st = "غیر فعال"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">وضعیت  : ${st}</p>
                              <button type="button" class="close remove-filter" data-filter="state" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterName.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filterName}</p>
                              <button type="button" class="close remove-filter" data-filter="name" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class="" >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterUsername.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">نام کاربری : ${filterUsername}</p>
                              <button type="button" class="close remove-filter" data-filter="username" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }


                        if (mobileNumber.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1 " role="alert">
                                <p class="m-0">شماره تماس : ${mobileNumber}</p>
                              <button type="button" class="close remove-filter" data-filter="mobile" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                    } else {
                        let newRes = {
                            Experts: []
                        };
                        for (let i = 0; i < result.Experts.length; i++) {
                            if (filterName.length > 0) {
                                if (filterUsername.length > 0) {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].user_name.includes(filterUsername) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].user_name.includes(filterUsername)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                } else {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].name.includes(filterName)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                }
                            } else {
                                if (filterUsername.length > 0) {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].user_name.includes(filterUsername) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].user_name.includes(filterUsername)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                } else {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        newRes.Experts.push(result.Experts[i]);
                                    }
                                }
                            }
                        }

                        pagination(newRes, pagex);
                        res = result;
                        pageNav(result);
                        $("#isFilter").html('');
                        if (filterName.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filterName}</p>
                              <button type="button" class="close remove-filter" data-filter="name" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class="" >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterUsername.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">نام کاربری : ${filterUsername}</p>
                              <button type="button" class="close remove-filter" data-filter="username" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }


                        if (mobileNumber.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">شماره تماس : ${mobileNumber}</p>
                              <button type="button" class="close remove-filter" data-filter="mobile" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                        if (filter.rate.length > 0) {

                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">امتیاز : ${filter.rate}</p>
                              <button type="button" class="close remove-filter" data-filter="rate" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.category.length > 0) {
                            let cat = "";
                            if (filter.category == 1) {
                                cat = "نرم افزار"
                            } else if (filter.category == 2) {
                                cat = "سخت افزار"
                            } else {
                                cat = "فعالیت میدانی"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">رسته متخصص : ${cat}</p>
                              <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                        if (filter.state.length > 0) {
                            let st = "";
                            if (filter.state == 1) {
                                st = "فعال"
                            } else if (filter.state == 2) {
                                st = "غیر فعال"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">وضعیت  : ${st}</p>
                              <button type="button" class="close remove-filter" data-filter="state" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                    }


                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#expert-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
    $("#isFilter").on("click", ".remove-filter", function () {

        if ($(this).attr('data-filter') === "name") {
            $('#expertName').val('');
            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }


        } else if ($(this).attr('data-filter') === "mobile") {
            $('#expertMobileNumber').val('');
            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }


        } else if ($(this).attr('data-filter') === "username") {
            $("#expertUsername").val('');
            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }


        } else if ($(this).attr('data-filter') === "category") {
            $("#expertCategory").val('0');
            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }


        } else if ($(this).attr('data-filter') === "rate") {
            $("#expertRate").val('');
            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }


        } else if ($(this).attr('data-filter') === "state") {
            $("#expertState").val('2');

            reFilter();
            let filter = {
                name: $("#expertName").val(),
                username: $("#expertUsername").val(),
                mobile: $("#expertMobileNumber").val(),
                category: $("#expertCategory").val(),
                rate: $("#expertRate").val(),
                state: $("#expertState").val(),
            };

            if (filter.name.length == 0 && filter.username.length == 0 && filter.mobile.length == 0 && filter.rate.length == 0 && filter.state == 2 && filter.category == 0) {
                $('#isFilter').html('<span>همه</span>')
            }

        }


    });
    function reFilter() {


        var filter = {
            'category': $('#expertCategory').val(),
            'rate': $('#expertRate').val(),
            'state': $('#expertState').val(),


        };
        let filterUsername = $('#expertUsername').val();
        let filterName = $('#expertName').val();
        let mobileNumber = $('#expertMobileNumber').val();
        if (filter.category == 0) {
            filter.category = ""
        }
        if (filter.state == 2) {
            filter.state = ""
        }


        let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');

        if (filter.rate.length > 0 || filter.state != 2 || filterUsername.length > 0 || filterName.length > 0 || mobileNumber.length > 0 || filter.category != 0) {

            $.ajax({
                url: "https://tagino.ir/Pido/api/Experts/GetByFilter?type=Filter&" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#expert-list').html('');
                    if (result.Status == 6) {
                        if (filter.rate.length > 0 || filter.state.length > 0 || filter.category.length > 0) {
                            $('#isFilter').html('')
                        }
                        if (filter.rate.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">امتیاز : ${filter.rate}</p>
                              <button type="button" class="close remove-filter" data-filter="rate" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.category.length > 0) {
                            let cat = "";
                            if (filter.category == 1) {
                                cat = "نرم افزار"
                            } else if (filter.category == 2) {
                                cat = "سخت افزار"
                            } else {
                                cat = "فعالیت میدانی"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">رسته متخصص : ${cat}</p>
                              <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.state.length > 0) {
                            let st = "";
                            if (filter.state == 1) {
                                st = "فعال"
                            } else if (filter.state == 2) {
                                st = "غیر فعال"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">وضعیت  : ${st}</p>
                              <button type="button" class="close remove-filter" data-filter="state" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterName.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filterName}</p>
                              <button type="button" class="close remove-filter" data-filter="name" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class="" >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterUsername.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">نام کاربری : ${filterUsername}</p>
                              <button type="button" class="close remove-filter" data-filter="username" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (mobileNumber.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1 " role="alert">
                                <p class="m-0">شماره تماس : ${mobileNumber}</p>
                              <button type="button" class="close remove-filter" data-filter="mobile" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                    } else {
                        let newRes = {
                            Experts: []
                        };
                        for (let i = 0; i < result.Experts.length; i++) {
                            if (filterName.length > 0) {
                                if (filterUsername.length > 0) {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].user_name.includes(filterUsername) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].user_name.includes(filterUsername)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                } else {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].name.includes(filterName) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].name.includes(filterName)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                }
                            } else {
                                if (filterUsername.length > 0) {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].user_name.includes(filterUsername) && result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        if (result.Experts[i].user_name.includes(filterUsername)) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    }
                                } else {
                                    if (mobileNumber.length > 0) {
                                        if (result.Experts[i].mobile_no.toString().includes(mobileNumber.toString())) {
                                            newRes.Experts.push(result.Experts[i]);
                                        }
                                    } else {
                                        newRes.Experts.push(result.Experts[i]);
                                    }
                                }
                            }
                        }

                        pagination(newRes, pagex);
                        res = result;
                        pageNav(result);
                        /*
                        if (filterName.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filterName}</p>
                              <button type="button" class="close remove-filter" data-filter="name" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class="" >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filterUsername.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">نام کاربری : ${filterUsername}</p>
                              <button type="button" class="close remove-filter" data-filter="username" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }


                        if (mobileNumber.length > 0) {
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">شماره تماس : ${mobileNumber}</p>
                              <button type="button" class="close remove-filter" data-filter="mobile" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                        if (filter.rate.length > 0) {

                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">امتیاز : ${filter.rate}</p>
                              <button type="button" class="close remove-filter" data-filter="rate" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }
                        if (filter.category.length > 0) {
                            let cat = "";
                            if (filter.category == 1) {
                                cat = "نرم افزار"
                            } else if (filter.category == 2) {
                                cat = "سخت افزار"
                            } else {
                                cat = "فعالیت میدانی"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">رسته متخصص : ${cat}</p>
                              <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }

                        if (filter.state.length > 0) {
                            let st = "";
                            if (filter.category == 1) {
                                st = "فعال"
                            } else if (filter.category == 2) {
                                st = "غیر فعال"
                            }
                            $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                <p class="m-0">وضعیت  : ${st}</p>
                              <button type="button" class="close remove-filter" data-filter="state" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                            </div>`);
                        }*/
                        if (filter.rate.length == 0 && filter.category.length > 0 && filter.state.length > 0 && filterUsername.length == 0 && filterName.length == 0 && mobileNumber.length == 0) {
                            $("#isFilter").html('<span>همه</span>')
                        }
                    }


                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#expert-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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

    }




    //change state

    $('#expert-list').on('click', '.confirmationBtn', function () {
        $('#modal-change').attr('data-id', $(this).attr("data-id"));
        $('#modal-change').attr('data-status', $(this).attr('data-status'));

    });
    $('#modal-change').on('click', function () {

        let mydata=find(res,$(this).attr('data-id'));

        let sendData={
            userName:mydata.user_name,
            name:mydata.name,
            category:mydata.category,
            activation_state:mydata.activation_state,
            id:mydata.id,
            mobileNo:mydata.mobile_no,
            rate:mydata.rate,
        };
        console.log(sendData);
        if(mydata!=null){
            var stat;
            if ($(this).attr('data-status') == "0") {

                sendData.activation_state=1;
                stat = "فعال";
            } else {

                sendData.activation_state=0;
                stat = "غیر فعال";
            }

            $.ajax({
                url: "https://Tagino.ir/Pido/api/Experts/UpdateExpert",
                type: 'POST',
                data: sendData,

                success: function (result) {
                    console.log(result);
                    if (result.Message.toString() === "okey") {
                        if (sendData.activation_state != "1"){
                            $('.confirmationBtn[data-id='+sendData.id+']').attr('data-status','0');
                            $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                            متخصص مورد نظر غیرفعال شد
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`);
                            /*         $('.confirmationBtn').find('ul').find(`[data-id='${activeStatusData.stationID}']`).removeClass('status-ative').addClass('status-deactive')*/
                            $('.confirmationBtn[data-id='+sendData.id+']').parent().parent().find('.expert-status').text('غیرفعال');
                            $('.confirmationBtn[data-id='+sendData.id+']').parent().parent().find('.status-ative').removeClass('status-ative').addClass('status-deative');
                        }else {
                            $('.confirmationBtn[data-id='+sendData.id+']').attr('data-status','1');
                            $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                             متخصص مورد نظر فعال شد
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                            </button>
                    </div>`);
                            $('.confirmationBtn[data-id='+sendData.id+']').parent().parent().find('.expert-status').text('فعال');
                            $('.confirmationBtn[data-id='+sendData.id+']').parent().parent().find('.status-deative').removeClass('status-deative').addClass('status-ative');
                        }
                    } else {

                    }

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#alert-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                   خطایی در تغییر وضعیت متخصص مورد نظر رخ داده است
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


    });




    function pagination(result, x) {
        $('#expert-list').html(' ');
        if (result.Experts.length == 0) {
            $('#expert-list').html('<h4 class="m-3">هیچ نتیجه ای پیدا نشد</h4>');
        }
        pagex = x;
        var len = (pagex + 1) * pag;
        if (len >= result.Experts.length) {
            len = result.Experts.length;
        }
        for (i = (pagex * 6); i < len; i++) {

            let cat = "";
            if (result.Experts[i].category == 1) {
                cat = "نرم افزاری"
            } else if (result.Experts[i].category == 2) {
                cat = "سخت افزاری"
            } else {
                cat = "فعالیت میدانی"
            }

            if (result.Experts[i].activation_state == 1) {
                activeSt = 'فعال';
                actClass = "status-ative";
            } else {
                activeSt = 'غیر فعال';
                actClass = "status-deative";
            }

            var card = $(' <div class="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4">\n' +
                '              <div class="card ra-card float-right">\n' +
                '                <img class="card-img-top" src="assets/undraw_voice_control_ofo1.png" alt="متخصص">\n' +
                '                <div class="card-body">\n' +
                '                  <h5 class="card-title">' + result.Experts[i].name.toString() + '</h5>\n' +
                '                </div>\n' +
                '                <ul class="list-group list-group-flush">\n' +
                '                  <li class="list-group-item"><i class="fas fa-user"></i> ' + result.Experts[i].user_name.toString() + '</li>\n' +
                '                  <li class="list-group-item"><i class="fas fa-phone"></i> ' + result.Experts[i].mobile_no.toString() + '</li>\n' +
                '                  <li class="list-group-item"><i class="fas fa-list-alt"></i> ' + cat + '</li>\n' +
                '                  <li class="list-group-item"><i class="fas fa-star"></i> ' + result.Experts[i].rate + '</li>\n' +
                '                  <li class="list-group-item"><span class="' + actClass + '"></span> وضعیت : <span class="expert-status"> ' + activeSt + ' </span></li>' +
                '                </ul>\n' +
                '           <div class="ac-wrapper ">' +
                '           <button class="btn btn-warning mt-3 confirmationBtn" data-status="'+result.Experts[i].activation_state+'" data-toggle="modal" data-target="#changeStatus" data-id="'+result.Experts[i].id+'" style="width:120px; margin:0 20px;;">تغییر وضعیت</button>' +
                '</div>  ' +
                '             <div class="divider"></div>' +

                '                <div class="card-body">\n' +
                '                  <a href="expert-edit.html?id=' + result.Experts[i].id + '" class="btn btn-primary">ویرایش</a>\n' +
                '\n' +
                '                  <button type="button"   class=" btn btn-danger deleteBtn" data-id=' + result.Experts[i].id + ' name="delete" data-toggle="modal" data-target="#modal">\n' +
                '                    حذف متخصص\n' +
                '                  </button>\n' +

                '                </div>\n' +
                '              </div>\n' +
                '            </div>');
            $('#expert-list').append(card);
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
        if ($(this).attr('data-pg') > res.Experts.length / pag) {
            $('.next-page').addClass('disabled')
        } else {
            $('.next-page').removeClass('disabled')
        }

        pagex = $(this).attr('data-pg');

        pagination(res, $(this).attr('data-pg'));

    });

    function pageNav(result) {
        $('#page-ul').html('');

        for (i = 0; i < Math.ceil((result.Experts.length / pag)); i++) {
            if (i == 0) {
                $('#page-ul').append($('<li class="page-item active " data-pg="' + (i) + '" ><a class="page-link m-0" >' + (i + 1) + '</a></li>'));
            } else {
                $('#page-ul').append($('<li class="page-item " data-pg="' + (i) + '"><a  class="page-link m-0">' + (i + 1) + '</a></li>'));
            }

        }
    }
});
function find(res , id) {
    for (let i=0;i<res.Experts.length;i++){
        console.log(res.Experts[i]);

        if(res.Experts[i].id==id){
            return res.Experts[i];
        }
    }
    return null;
}



