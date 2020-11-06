$(document).ready(function () {

    let pag = 6;
    let pagex = 0;
    var res;
    $('#loader').show();
    $.ajax({
        url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&x" + Math.floor(Math.random() * 1000000),
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (result, status, jqXHR) {
            /*  Math.ceil((result.Stations.length/pag)*/

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
                $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
            }
        },
        error: function (e) {
            console.log(e)
        }

    });

    $('#operator-list').on('click', '.deleteBtn', function () {
        $('#modal-delete').attr('data-id', $(this).attr("data-id"));

    });


    $('#modal-delete').click(function () {
        $('#modal').removeClass('show');
        $('.modal-backdrop').remove();

        let deleteData = {
            type: "byID",
            operatorID: $(this).attr("data-id"),
        };


        $.ajax({
            url: "https://tagino.ir/Pido/api/operator/removeOperator",
            type: 'POST',
            data: deleteData,

            success: function (result) {
                $('#isFilter').html('همه');

                if (result.Message.toString() === "okey") {
                    $('#alert-wrapper').append(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    اپراتور مورد نظر حذف شد
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                  </div>`);
                    $('#operator-list').html(' <span id="loader" style="width:60px; height: 60px;; display: block; margin:10px  auto;"><img alt="loader" src="Rolling-0.9s-200px.gif" style="width: 100%;height:100%;" height="200" width="200"/></span>');


                    $.ajax({
                        url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&p=" + Math.floor(Math.random() * 1000042000),
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
                                $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                   خطایی در حذف کاربر مورد نظر رخ داده است
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`);
                }
            }
            ,
            error: function (e) {
                console.log(e)
            }
        });


    });


    $('#cancel-filter').click(function () {
        $('#oprationName').val('');
        $('#oprationID').val('');
        $('#oprationName').val('');
        $('#isFilter').html('<span>همه</span>');
        $.ajax({
            url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&x" + Math.floor(Math.random() * 1000000),
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
                    $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
            'id': $('#oprationID').val(),
            'name': $('#oprationName').val(),
            'username': $('#oprationUserName').val(),

        };

        let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
        if (filter.id.length > 0 || filter.name.length > 0 || filter.username.length > 0) {

            $.ajax({
                url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
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
                    if (filter.id.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                     <p class="m-0">آی دی : ${filter.id}</p>
                      <button type="button" class="close remove-filter"  data-filter="id" data-dismiss="alert" aria-label="Close">
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
                    if (filter.username.length > 0) {
                        $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">نام کاربری : ${filter.username}</p>
                      <button type="button" class="close remove-filter" data-filter="username" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                    }

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
            'id': $('#oprationID').val(),
            'name': $('#oprationName').val(),
            'username': $('#oprationUserName').val(),

        };
        if ($(this).attr('data-filter') === "name") {

            $('#oprationName').val('');
            if ($('#oprationID').val().length == 0 && $('#oprationName').val().length == 0 && $('#oprationUserName').val().length == 0) {
                $('#isFilter').html('<span>همه</span>');

            }
            filter = {
                'id': $('#oprationID').val(),
                'name': $('#oprationName').val(),
                'username': $('#oprationUserName').val(),

            };

            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#operator-list').html('');
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
                        $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });
        } else if ($(this).attr('data-filter') === "id") {
            $('#oprationID').val('');
            if ($('#oprationID').val().length == 0 && $('#oprationName').val().length == 0 && $('#oprationUserName').val().length == 0) {
                $('#isFilter').html('<span>همه</span>');
            }
            filter = {
                'id': $('#oprationID').val(),
                'name': $('#oprationName').val(),
                'username': $('#oprationUserName').val(),

            };
            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
                type: 'GET',

                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    $('#operator-list').html('');
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
                        $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });
        } else if ($(this).attr('data-filter') === "username") {
            $('#oprationUserName').val('');
            if ($('#oprationID').val().length == 0 && $('#oprationName').val().length == 0 && $('#oprationUserName').val().length == 0) {
                $('#isFilter').html('<span>همه</span>');
            }
            filter = {
                'id': $('#oprationID').val(),
                'name': $('#oprationName').val(),
                'username': $('#oprationUserName').val(),

            };
            let urlParameters = Object.entries(filter).map(e => e.join('=')).join('&');
            console.log(urlParameters);
            $.ajax({
                url: "https://tagino.ir/Pido/api/operator/getOperator?type=filter&" + urlParameters + "&cx=" + Math.floor(Math.random() * 100),
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

                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#operator-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
        $('#operator-list').html(' ');
        if (result.Stations.length == 0) {
            $('#operator-list').html('<h4 class="m-3">هیچ نتیجه ای پیدا نشد</h4>');
        }
        pagex = x;
        var len = (pagex + 1) * pag;
        if (len >= result.Stations.length) {
            len = result.Stations.length;
        }
        for (i = (pagex * 6); i < len; i++) {

            var card = $(' <div class="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4">\n' +
                '              <div class="card ra-card float-right">\n' +
                '                <img class="card-img-top" src="assets/undraw_voice_control_ofo1.png" alt="اپراتور">\n' +
                '                <div class="card-body">\n' +
                '                  <h5 class="card-title">' + result.Stations[i].name.toString() + '</h5>\n' +
                '                </div>\n' +
                '                <ul class="list-group list-group-flush">\n' +
                '                  <li class="list-group-item"><i class="fas fa-barcode"></i> ' + result.Stations[i].id.toString() + '</li>\n' +
                '                  <li class="list-group-item"><i class="fas fa-user"></i> ' + result.Stations[i].username.toString() + '</li>\n' +
                '                </ul>\n' +
                '                <div class="card-body">\n' +
                '                  <a href="operation-edit.html?id=' + result.Stations[i].id + '" class="btn btn-primary">ویرایش</a>\n' +
                '\n' +
                '                  <button type="button"   class=" btn btn-danger deleteBtn" data-id=' + result.Stations[i].id + ' name="delete" data-toggle="modal" data-id="' + result.Stations[i].id.toString() + '" data-target="#modal">\n' +
                '                    حذف اپراتور\n' +
                '                  </button>\n' +

                '                </div>\n' +
                '              </div>\n' +
                '            </div>');
            $('#operator-list').append(card);
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


/*          <li class="page-item"><a class="page-link" href="#">۱</a></li>
    <li class="page-item active"><a class="page-link active" href="#">۲</a></li>
    <li class="page-item"><a class="page-link" href="#">۳</a></li>
    <li class="page-item next-pg">
      <a class="page-link"  href="#"> صفحه بعد <i class="fas fa-chevron-left"></i></a>
    </li>
    */

