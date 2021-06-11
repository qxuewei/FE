// U聊JSSDK 桥 - JS端
document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {

    var bridge = event.bridge
    function log(message, data) {
        console.log(message, data)
    }


    UPCHAT.M = {

        init: function (fn) {
            if (fn) {
                fn();
            }
        },

        isNative: function () {
            return true
        },

        NAPI: {
            // ————————————————————————
            // 转换为 BdHiJs 调用
            closeWebView: function (url) {
                log("closeWebView" + url);
                BdHiJs.appnative.webview.close({
                    data: {
                        animated: true, // Boolean, 可选，在移动端关闭页面，是否采用动画方式关闭，默认为true。true：有动画关闭。false：无动画关闭
                        url: url
                    },
                    onsuccess: function () {
                        // 关闭成功
                    },
                    onfail: function (err) {
                        // 关闭失败，err 错误信息
                        log("closeWebView error! " + err);
                    }
                });
            },

            setNavigationBarTitle: function (title) {
                BdHiJs.appnative.title.setText(title);
            },

            showWaterMark: function (successFn, failFn) {
                BdHiJs.appnative.webview.setWaterMark({
                    data: {
                        status: 1, // int，必选，1: 显示水印  0：隐藏水印
                    },
                    onsuccess: function (result) {
                        // 设置成功
                        log("Success");
                        if (successFn) {
                            successFn(result);
                            log(result);
                        }
                    },
                    onfail: function (err) {
                        // 设置失败
                        log("fail");
                        if (failFn) {
                            failFn(err);
                            log(err);
                        }
                    }
                });
            },

            hiddenWaterMark: function (successFn, failFn) {
                BdHiJs.appnative.webview.setWaterMark({
                    data: {
                        status: 0, // int，必选，1: 显示水印  0：隐藏水印
                    },
                    onsuccess: function (result) {
                        // 设置成功
                        log("Success");
                        if (successFn) {
                            successFn(result);
                            log(result);
                        }
                    },
                    onfail: function (err) {
                        // 设置失败
                        log("fail");
                        if (failFn) {
                            failFn(err);
                            log(err);
                        }
                    }
                });
            },

            startCodeScanView: function (successFn, failFn) {
                BdHiJs.appnative.qrcode.getQrCode({
                    listener: function (qrCodeString) {
                        // 通过qrCodeString属性读取出来的字符串
                        if (successFn) {
                            successFn({ "status": "0", "resultString": qrCodeString });
                        }
                    }
                });
            },

            showPhotos: function (successFn, failFn, params) {
                log("showPhotos ++ " + params);
                var urls = params["photos"];
                var position = params["index"];

                BdHiJs.appnative.pic.show({
                    data: {
                        urls: urls,
                        position: position,
                    },
                    onfail: function (err) {
                        if (failFn) {
                            failFn();
                        }
                    },
                    onsuccess: function () {
                        // 已显示图片浏览器
                        if (successFn) {
                            successFn();
                        }
                    }
                });
            },

            //    choosePhoto: function(successFn, failFn) {
            //        BdHiJs.appnative.pic.takeAndPick({
            //            onfail: function(err) {
            //            },
            //            onsuccess: function(result) {
            //                if (successFn) {
            //                    successFn(result);
            //                }
            //            }
            //        });
            //    },

            choosePhoto: function (successFn, failFn) {
                bridge.callHandler('UPCHAT.choosePhoto', {}, function (responseObject) {
                    log('choosePhoto -- JS got response', responseObject)
                    if (responseObject.succ) {
                        if (responseObject.succData) {
                            successFn(responseObject.succData)
                        } else {
                            successFn()
                        }
                    } else {
                        if (responseObject.errorData) {
                            failFn(responseObject.errorData)
                        } else {
                            failFn()
                        }
                    }
                });
            },

            showFlashInfo: function (msg) {
                BdHiJs.appnative.toast.show({
                    data: {
                        text: msg // 必填，String，提示内容
                    },
                    ondismiss: function () {
                        // 提示框已消失
                    }
                });
            },

            // 建立独立桥接
            //(1). 定义JS桥 调用原生 “UPCHAT.showAlertView” 功能
            showAlertView: function (successFn, failFn, opt) {
                log("showAlertView JS got response", opt);
                bridge.callHandler('UPCHAT.showAlertView', opt, function (responseObject) {
                    log('showAlertView -- JS got response', responseObject)
                    if (responseObject.succ) {
                        successFn();
                    } else {
                        failFn();
                    }
                })
            },

            startNewWebView: function (url, ext) {
                var options = {}
                options["url"] = url
                options["ext"] = ext

                bridge.callHandler('UPCHAT.startNewWebView', options, function (responseObject) {
                    log('startNewWebView -- JS got response', responseObject)
                })
            },

            //获取验证码
            getSecurity: function (successFn, failFn) {
                bridge.callHandler('UPCHAT.getSecurity', {}, function (responseObject) {
                    log('getSecurity -- JS got response', responseObject)
                    if (responseObject.succ) {
                        if (responseObject.succData) {
                            successFn(responseObject.succData)
                        } else {
                            successFn()
                        }
                    } else {
                        if (responseObject.errorData) {
                            failFn(responseObject.errorData)
                        } else {
                            failFn()
                        }
                    }
                });
            },

            //获取地理位置 一定要在开启定位的公众号打开
            getLocation: function (successFn, failFn) {
                bridge.callHandler('UPCHAT.getLocation', {}, function (responseObject) {
                    log('getLocation -- JS got response', responseObject)
                    if (responseObject.succ) {
                        if (responseObject.succData) {
                            successFn(responseObject.succData)
                        } else {
                            successFn()
                        }
                    } else {
                        if (responseObject.errorData) {
                            failFn(responseObject.errorData)
                        } else {
                            failFn()
                        }
                    }
                });
            },

            showLoadingView: function () {
                log("showAlertView JS got response");
                bridge.callHandler('UPCHAT.showLoadingView');
            },

            //在线打开文档
            openFile: function (successFn, failFn, opt) {
                bridge.callHandler('UPCHAT.openFile', opt, function (responseObject) {
                    log('hiddenWaterMark -- JS got response', responseObject)
                    if (responseObject.succ) {
                        successFn()
                    } else {
                        failFn()
                    }
                });
            },

            dismiss: function () {
                log("dismiss JS got response");
                bridge.callHandler('UPCHAT.dismiss');
            },

            //显示等待界面（页面无法滑动）
            showWaitingView: function () {
                log("showAshowWaitingViewlertView JS got response");
                bridge.callHandler('UPCHAT.showWaitingView');
            }
            // ————————————————————————
        }

    }
})
