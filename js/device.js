$(document).ready(function () {
    $(document).ready(function () {

        let pag = 6;
        let pagex = 0;
        var res;
        $.ajax({
            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
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
                    $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                }
            },
            error: function (e) {
                console.log(e)
            }
        });

        $('#device-list').on('click', '.deleteBtn', function () {
            $('#modal-delete').attr('data-id', $(this).attr("data-id"));

        });


        $('#modal-delete').click(function () {
            $('#isFilter').html('همه');
            $('#modal').removeClass('show');
            $('#ِdeviceName').val('');
            $('#select-category').val('0');
            $('#select-status').val('3');
            $('.modal-backdrop').remove();

            let deleteData = {

                id: $(this).attr("data-id"),
            };


            $.ajax({
                url: "https://tagino.ir/Pido/api/Devices/DeleteDevice",
                type: 'POST',
                data: deleteData,

                success: function (result) {

                    console.log('-----------');
                    console.log(result);
                    if (result.Message.toString() === "okey") {
                        $('#alert-wrapper').append(`        <div class="alert alert-success alert-dismissible fade show" role="alert">
                    اپراتور مورد نظر حذف شد
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`);
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&p=" + Math.floor(Math.random() * 1000042000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                pagination(result, pagex);
                                res = result;
                                pageNav(result);

                            },
                            complete: function (e, xhr, settings) {
                                if (e.status === 200) {
                                    console.log('success')
                                } else {
                                    $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                   خطایی در حذف ادوات مورد نظر رخ داده است
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
            $('#ِdeviceName').val('');
            $('#select-category').val('0');
            $('#select-status').val('2');
            $('#isFilter').html('<span>همه</span>');
            $.ajax({
                url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    /*  Math.ceil((result.Devices.length/pag)*/
                    res = result;

                    pagination(result, pagex);
                    res = result;
                    pageNav(result);
                },
                complete: function (e, xhr, settings) {
                    if (e.status === 200) {
                        console.log('success')
                    } else {
                        $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
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
                'name': $('#ِdeviceName').val(),
                'category': $('#select-category').val(),
                'status': $('#select-status').val(),

            };
            let cat;
            let st;
            if (filter.category == 1) {
                cat = "نرم افزار"
            } else if (filter.category == 2) {
                cat = "سخت افزار"
            } else {
                cat = "ادوات جانبی"
            }
            if (filter.status == 1) {
                st = "فعال"
            } else {
                st = "غیرفعال"
            }
            if (filter.category != 0) {
                if (filter.status != 2) {
                    /*فیلتر بر اساس نام و دسته بندی و وضعیت*/

                    let urlParameters = filter.category;
                    console.log(urlParameters);
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                        type: 'GET',

                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#device-list').html('');
                            console.log(result);
                            if (result.Devices.length == 0) {
                                $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                            }
                            let newRes = {
                                "Devices": []
                            };
                            for (let i = 0; i < result.Devices.length; i++) {
                                if (result.Devices[i].activation_state == filter.status) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                            }
                            console.log(filter)
                            console.log(newRes);
                            pagination(newRes, pagex);
                            pageNav(newRes);

                            $("#isFilter").html(' ');
                            if (filter.name.length > 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                     <p class="m-0">نام : ${filter.name}</p>
                      <button type="button" class="close remove-filter"   data-filter="name" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                            }
                            if (filter.category != 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">دسته بندی : ${cat}</p>
                      <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                            }
                            if (filter.status != 2) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : ${st}</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                            }

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });

                } else {
                    /*فیلتر بر اساس نام و دسته بندی*/


                    let urlParameters = filter.category;
                    console.log(urlParameters);
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                        type: 'GET',

                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#device-list').html('');
                            console.log(result);
                            if (result.Devices.length == 0) {
                                $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                            }
                            let newRes = {
                                "Devices": []
                            };
                            for (let i = 0; i < result.Devices.length; i++) {

                                if (filter.name.length > 0) {
                                    if (result.Devices[i].device_name.includes(filter.name)) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                } else {
                                    newRes.Devices.push(result.Devices[i]);
                                }
                            }

                            console.log(newRes);
                            pagination(newRes, pagex);
                            pageNav(newRes);

                            $("#isFilter").html(' ');
                            if (filter.name.length > 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filter.name}</p>
                                <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                            }
                            if (filter.category != 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">دسته بندی : ${cat}</p>
                      <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                            }


                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }
            } else if (filter.status != 2) {
                if (filter.status == 1) {
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AllActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                        type: 'GET',

                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#device-list').html('');
                            console.log(result);
                            if (result.Devices.length == 0) {
                                $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                            }
                            let newRes = {
                                "Devices": []
                            };
                            for (let i = 0; i < result.Devices.length; i++) {
                                if (filter.name.length > 0) {
                                    if (result.Devices[i].device_name.includes(filter.name)) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                } else {
                                    newRes.Devices.push(result.Devices[i]);
                                }
                            }
                            console.log(newRes);
                            pagination(newRes, pagex);
                            pageNav(newRes);
                            $("#isFilter").html(' ');
                            if (filter.name.length > 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                            }

                            if (filter.status != 2) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت :فعال</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                            }

                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                } else {
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AlldeActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                        type: 'GET',

                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#device-list').html('');
                            console.log(result);
                            if (result.Devices.length == 0) {
                                $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                            }
                            let newRes = {
                                "Devices": []
                            };
                            for (let i = 0; i < result.Devices.length; i++) {
                                if (filter.name.length > 0) {
                                    if (result.Devices[i].device_name.includes(filter.name)) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                } else {
                                    newRes.Devices.push(result.Devices[i]);
                                }
                            }
                            console.log(newRes);
                            pagination(newRes, pagex);
                            pageNav(newRes);
                            $("#isFilter").html(' ');
                            if (filter.name.length > 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                            }

                            if (filter.status.length != 3) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : غیرفعال</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                            }

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }
            } else {
                if (filter.name.length > 0) {
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All" + "&x=" + Math.floor(Math.random() * 1000000000),
                        type: 'GET',
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            $('#device-list').html('');
                            console.log(result);
                            if (result.Devices.length == 0) {
                                $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                            }
                            let newRes = {
                                "Devices": []
                            };
                            for (let i = 0; i < result.Devices.length; i++) {
                                if (filter.name.length > 0) {
                                    if (result.Devices[i].device_name.includes(filter.name)) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                } else {
                                    newRes.Devices.push(result.Devices[i]);
                                }
                            }
                            console.log(filter);
                            console.log(newRes);
                            pagination(newRes, pagex);
                            pageNav(newRes);
                            $("#isFilter").html(' ');
                            if (filter.name.length > 0) {
                                $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                         <p class="m-0">نام : ${filter.name}</p>
                                          <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true" class="" >&times;</span>
                                          </button>
                                                </div>`);
                            }

                        },
                        complete: function (e, xhr, settings) {
                            if (e.status === 200) {
                                console.log('success')
                            } else {
                                $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                } else {
                    $.ajax({
                        url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
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
                                $('#device-list').html(`<div class="alert alert-danger alert-dismissible w-100 fade show m-3" role="alert">
                   <h5>خطایی رخ داده است</h5>
              </div>`);
                            }
                        },
                        error: function (e) {
                            console.log(e)
                        }
                    });
                }


            }




        });
        $("#isFilter").on("click", ".remove-filter", function () {

            var filter = {
                'category': $('#select-category').val(),
                'name': $('#ِdeviceName').val(),
                'status': $('#select-status').val(),

            };
            if ($(this).attr('data-filter') === "name") {

                $('#ِdeviceName').val('');
                if ($('#select-status').val() == 2 && $('#select-category').val() == 0 && $('#ِdeviceName').val().length == 0) {
                    $('#isFilter').html('<span>همه</span>');

                }
                filter = {
                    'category': $('#select-category').val(),
                    'name': $('#ِdeviceName').val(),
                    'status': $('#select-status').val(),

                };
                let cat;
                let st;
                if (filter.category == 1) {
                    cat = "نرم افزار"
                } else if (filter.category == 2) {
                    cat = "سخت افزار"
                } else {
                    cat = "ادوات جانبی"
                }
                if (filter.status == 1) {
                    st = "فعال"
                } else {
                    st = "غیرفعال"
                }
                if (filter.category != 0) {
                    if (filter.status != 2) {
                        /*فیلتر بر اساس نام و دسته بندی و وضعیت*/

                        let urlParameters = filter.category;
                        console.log(urlParameters);
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (result.Devices[i].activation_state == filter.status) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(filter);
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);

                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                     <p class="m-0">نام : ${filter.name}</p>
                      <button type="button" class="close remove-filter"   data-filter="name" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                                }
                                if (filter.category != 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">دسته بندی : ${cat}</p>
                      <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                                }
                                if (filter.status != 2) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : ${st}</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });

                    } else {
                        /*فیلتر بر اساس نام و دسته بندی*/


                        let urlParameters = filter.category;
                        console.log(urlParameters);
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {

                                    newRes.Devices.push(result.Devices[i]);
                                }

                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);

                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filter.name}</p>
                                <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                                }
                                if (filter.category != 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">دسته بندی : ${cat}</p>
                      <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                                }
                                if (filter.status != 3) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : ${st}</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }
                } else if (filter.status != 2) {
                    if (filter.status == 1) {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AllActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                                }

                                if (filter.status != 2) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت :فعال</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    } else {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AlldeActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                                }

                                if (filter.status != 2) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : غیرفعال</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }
                } else {
                    if (filter.name.length > 0) {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All" + "&x=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(filter);
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                         <p class="m-0">نام : ${filter.name}</p>
                                          <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true" class="" >&times;</span>
                                          </button>
                                                </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    } else {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
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
                        });
                    }


                }


            } else if ($(this).attr('data-filter') === "category") {
                $('#select-category').val('0');
                if ($('#select-status').val() == 2 && $('#select-category').val() == 0 && $('#ِdeviceName').val().length == 0) {
                    $('#isFilter').html('<span>همه</span>');

                }
                filter = {
                    'category': $('#select-category').val(),
                    'name': $('#ِdeviceName').val(),
                    'status': $('#select-status').val(),

                };
                let cat;
                let st;
                if (filter.category == 1) {
                    cat = "نرم افزار"
                } else if (filter.category == 2) {
                    cat = "سخت افزار"
                } else {
                    cat = "ادوات جانبی"
                }
                if (filter.status == 1) {
                    st = "فعال"
                } else {
                    st = "غیرفعال";
                }
                if (filter.status != 2) {
                    if (filter.status == 1) {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AllActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                                }

                                if (filter.status != 2) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                                     <p class="m-0">وضعیت :فعال</p>
                                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true" class=""  >&times;</span>
                              </button>
                           </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    } else {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=AlldeActivate" + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                      <p class="m-0">نام : ${filter.name}</p>
                                     <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" class="" >&times;</span>
                                </button>
                                    </div>`);
                                }

                                if (filter.status.length != 3) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : غیرفعال</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }
                } else {
                    if (filter.name.length > 0) {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All" + "&x=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(filter);
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                         <p class="m-0">نام : ${filter.name}</p>
                                          <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true" class="" >&times;</span>
                                          </button>
                                                </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    } else {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
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
                        });
                    }


                }
            } else if ($(this).attr('data-filter') === "status") {
                $('#select-status').val('2');
                if ($('#select-status').val() == 2 && $('#select-category').val() == 0 && $('#ِdeviceName').val().length == 0) {
                    $('#isFilter').html('<span>همه</span>');

                }
                filter = {
                    'category': $('#select-category').val(),
                    'name': $('#ِdeviceName').val(),
                    'status': $('#select-status').val(),

                };
                let cat;
                let st;
                if (filter.category == 1) {
                    cat = "نرم افزار"
                } else if (filter.category == 2) {
                    cat = "سخت افزار"
                } else {
                    cat = "ادوات جانبی"
                }
                if (filter.status == 1) {
                    st = "فعال"
                } else {
                    st = "غیرفعال"
                }
                if (filter.category != 0) {
                    //if not important!
                    if (filter.status != 2) {
                        /*فیلتر بر اساس نام و دسته بندی و وضعیت*/

                        let urlParameters = filter.category;
                        console.log(urlParameters);
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (result.Devices[i].activation_state == filter.status) {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(filter);
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);

                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                     <p class="m-0">نام : ${filter.name}</p>
                      <button type="button" class="close remove-filter"   data-filter="name" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                                }
                                if (filter.category != 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                        <p class="m-0">دسته بندی : ${cat}</p>
                      <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class="" >&times;</span>
                      </button>
                    </div>`);
                                }
                                if (filter.status != 2) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right w-auto  ml-1" role="alert">
                        <p class="m-0">وضعیت : ${st}</p>
                      <button type="button" class="close remove-filter" data-filter="status" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" class=""  >&times;</span>
                      </button>
                    </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });

                    } else {
                        /*فیلتر بر اساس نام و دسته بندی*/


                        let urlParameters = filter.category;
                        console.log(urlParameters);
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=ByCategory&category=" + urlParameters + "&z=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',

                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };

                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices.name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }

                                }


                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);

                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                <p class="m-0">نام : ${filter.name}</p>
                                <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true" class="" >&times;</span>
                      </button>
                            </div>`);
                                }
                                if (filter.category != 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                             <p class="m-0">دسته بندی : ${cat}</p>
                                 <button type="button" class="close remove-filter" data-filter="category" data-dismiss="alert" aria-label="Close">
                           <span aria-hidden="true" class="" >&times;</span>
                                </button>
                           </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }
                } else {
                    if (filter.name.length > 0) {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All" + "&x=" + Math.floor(Math.random() * 1000000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $('#device-list').html('');
                                console.log(result);
                                if (result.Devices.length == 0) {
                                    $('#device-list').html('<h5 class="mr-4 font-weight-light">هیچ اپراتوری  با فیلتر مورد نظر موجود نیست</h5>');
                                }
                                let newRes = {
                                    "Devices": []
                                };
                                for (let i = 0; i < result.Devices.length; i++) {
                                    if (filter.name.length > 0) {
                                        if (result.Devices[i].device_name.includes(filter.name)) {
                                            newRes.Devices.push(result.Devices[i]);
                                        }
                                    } else {
                                        newRes.Devices.push(result.Devices[i]);
                                    }
                                }
                                console.log(filter);
                                console.log(newRes);
                                pagination(newRes, pagex);
                                pageNav(newRes);
                                $("#isFilter").html(' ');
                                if (filter.name.length > 0) {
                                    $('#isFilter').append(`<div class="alert alert-rad alert-dismissible fade show float-right ml-1" role="alert">
                                         <p class="m-0">نام : ${filter.name}</p>
                                          <button type="button" class="close remove-filter"  data-filter="name" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true" class="" >&times;</span>
                                          </button>
                                                </div>`);
                                }

                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    } else {
                        $.ajax({
                            url: "https://tagino.ir/Pido/api/Devices/GetByType?type=All&x=" + Math.floor(Math.random() * 1000000),
                            type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                res = result;
                                $('#isFilter').html('<span>همه </span>');
                                pagination(result, pagex);
                                res = result;
                                pageNav(result);
                            },
                            error: function (e) {
                                console.log(e)
                            }
                        });
                    }


                }
            }


        });

        $('#device-list').on('click', '.confirmationBtn', function () {
            $('#modal-change').attr('data-id', $(this).attr("data-id"));
            $('#modal-change').attr('data-status', $(this).attr('data-status'));

        });
        $('#modal-change').on('click', function () {
            let mydata = find(res, $(this).attr('data-id'));
            let sendData = {
                name: mydata.device_name,
                category: mydata.device_category,
                activation_state: mydata.activation_state,
                id: mydata.id
            };
            console.log(sendData);
            if (mydata != null) {
                var stat;
                if ($(this).attr('data-status') == "0") {

                    sendData.activation_state = 1;
                    stat = "فعال";
                } else {

                    sendData.activation_state = 0;
                    stat = "غیر فعال";
                }

                $.ajax({
                    url: "https://Tagino.ir/Pido/api/Devices/UpdateDevice",
                    type: 'POST',
                    data: sendData,

                    success: function (result) {
                        console.log(result);
                        if (result.Message.toString() === "okey") {
                            if (sendData.activation_state != "1") {
                                $('.confirmationBtn[data-id=' + sendData.id + ']').attr('data-status', '0');
                                $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                            ادوات مورد نظر غیرفعال شد
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`);
                                /*         $('.confirmationBtn').find('ul').find(`[data-id='${activeStatusData.stationID}']`).removeClass('status-ative').addClass('status-deactive')*/
                                $('.confirmationBtn[data-id=' + sendData.id + ']').parent().parent().find('.device-status').text('غیرفعال');
                                $('.confirmationBtn[data-id=' + sendData.id + ']').parent().parent().find('.status-ative').removeClass('status-ative').addClass('status-deative');
                            } else {
                                $('.confirmationBtn[data-id=' + sendData.id + ']').attr('data-status', '1');
                                $('#alert-wrapper').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                             ادوات مورد نظر فعال شد
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                            </button>
                    </div>`);
                                $('.confirmationBtn[data-id=' + sendData.id + ']').parent().parent().find('.device-status').text('فعال');
                                $('.confirmationBtn[data-id=' + sendData.id + ']').parent().parent().find('.status-deative').removeClass('status-deative').addClass('status-ative');
                            }
                        } else {

                        }

                    },
                    complete: function (e, xhr, settings) {
                        if (e.status === 200) {
                            console.log('success')
                        } else {
                            $('#alert-wrapper').html(`<div class="alert alert-danger alert-dismissible w-100 fade show " role="alert">
                   خطایی در تغییر وضعیت ادوات مورد نظر رخ داده است
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
            $('#device-list').html('');
            if(result.Status!=6)
            if (result.Devices.length == 0) {
                $('#device-list').html('<h4 class="m-3">هیچ نتیجه ای پیدا نشد</h4>');
            }
            pagex = x;
            var len = (pagex + 1) * pag;
            if (len >= result.Devices.length) {
                len = result.Devices.length;
            }
            for (i = (pagex * 6); i < len; i++) {
                let cat = "";
                if (result.Devices[i].device_category == "1") {
                    cat = "نرم افزاری"
                } else if (result.Devices[i].device_category == "2") {
                    cat = "سخت افزاری"
                } else {
                    cat = "ادوات جانبی"
                }
                let status = '';
                let actClass = "";
                if (result.Devices[i].activation_state == 1) {
                    status = 'فعال';
                    actClass = "status-ative";
                } else {
                    status = 'غیر فعال';
                    actClass = "status-deative";
                }
                var card = $(` <div class="col-md-4 col-sm-12 col-12 col-lg-4 col-xl-4">
              <div class="card ra-card">
                <img class="card-img-top" src="assets/undraw_mobile_payments_edgf.png" alt="اپراتور">
                <div class="card-body">
                  <h5 class="card-title">${result.Devices[i].device_name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="fas fa-barcode"></i> ${result.Devices[i].id}</li>
                  <li class="list-group-item"><i class="fas fa-box"></i> ${cat}</li>
               
                   <li class="list-group-item"><span class="${actClass}"></span> وضعیت : <span class="device-status"> ${status} </span></li>
                </ul>
                    <div class="ac-wrapper ">
                <button class="btn btn-warning mt-3 confirmationBtn" data-status="${result.Devices[i].activation_state}" data-toggle="modal" data-target="#changeStatus" data-id="${result.Devices[i].id}" style="width:120px; margin:0 20px;;">تغییر وضعیت</button></div>
                <div class="divider"></div>
                <div class="card-body">
                  <a href="devices-edit.html?id=${result.Devices[i].id}" class="btn btn-primary">ویرایش</a>

                  <button type="button" class="btn btn-danger deleteBtn" data-toggle="modal" data-id="${result.Devices[i].id}" data-target="#modal">
                    حذف ادوات
                  </button>
                  
                </div>
              </div>
            </div>`);
                $('#device-list').append(card);
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
            if ($(this).attr('data-pg') > res.Devices.length / pag) {
                $('.next-page').addClass('disabled')
            } else {
                $('.next-page').removeClass('disabled')
            }

            pagex = $(this).attr('data-pg');

            pagination(res, $(this).attr('data-pg'));

        });

        function pageNav(result) {
            $('#page-ul').html('');

            for (i = 0; i < Math.ceil((result.Devices.length / pag)); i++) {
                if (i == 0) {
                    $('#page-ul').append($('<li class="page-item active " data-pg="' + (i) + '" ><a class="page-link m-0" >' + (i + 1) + '</a></li>'));
                } else {
                    $('#page-ul').append($('<li class="page-item " data-pg="' + (i) + '"><a  class="page-link m-0">' + (i + 1) + '</a></li>'));
                }

            }
        }
    });

    function find(res, id) {
        for (let i = 0; i < res.Devices.length; i++) {

            if (res.Devices[i].id == id) {
                return res.Devices[i];
            }
        }
        return null;
    }

    /*          <li class="page-item"><a class="page-link" href="#">۱</a></li>
        <li class="page-item active"><a class="page-link active" href="#">۲</a></li>
        <li class="page-item"><a class="page-link" href="#">۳</a></li>
        <li class="page-item next-pg">
          <a class="page-link"  href="#"> صفحه بعد <i class="fas fa-chevron-left"></i></a>
        </li>
        */


});