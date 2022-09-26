/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */

//const { default: webConfig } = require("../../../config/web.config");

; (function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        //console.log('Session_Time : ' +expires.getMilliseconds() + attributes.expires * 864e+5);
        function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write
            //console.log('Session_Time : ' +expires.getMilliseconds() + attributes.expires * 864e+5);
            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    
                    attributes.expires = expires;
                }
              
                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                //console.log('Session_Time : ' +expires.getMilliseconds() + attributes.expires * 864e+5);
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) { }

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) { }
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) { }
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () { });
}));

if (!window.ttsdk || !ttsdk) {
    window.ttsdk = {}
}

ttsdk = {
    domain: '.malangmalang.com',

    path: '/',

    invitation: null,
    startCount :15,
    countText : null,
   
    init: function (gameID, hostUrls) {
        console.log('[ttsdk] Now initializing...');
        if (hostUrls != null) {
            console.log('[ttsdk] HOST URLS : =>');
            console.log(hostUrls);    
        }

        setInterval(function () {
            var invitations = ttsdk.getInvitations();

            if (invitations && invitations.length) {
                console.log('[ttsdk] Invitatation found.', invitations);

                if (!ttsdk.invitation) {
                    for (var i = invitations.length - 1; i >= 0; i--) {
                        if (!invitations[i].isRejected && (invitations[i].isForTypingPractice || invitations[i].isForGame)) {
                            ttsdk.invitation = invitations[i];
                            break;
                        }
                    }

                    if (ttsdk.invitation) {
                        console.log('[ttsdk] Open invitation:', ttsdk.invitation);

                        ttsdk.open(ttsdk.invitation, hostUrls);
                    }
                }
            }
        }, 1000);
    },

    onInit: function () { return true },

    onAccept: function () { },

    onReject: function () { },

    open: function (invitation, hostUrls) {
        console.log('Trying to open invitation popup: ', invitation)
        if (ttsdk.onInit) {
            if (!ttsdk.onInit(invitation)) {
                return;
            }
        }
        ttsdk.openInvitePopup(invitation, hostUrls);
    },
    timerReject :function () {
        

        if (!ttsdk.invitation) {
            console.log('[ttsdk] No invitation to reject.');
            return
        }

        if (ttsdk.onReject) {
            ttsdk.onReject(ttsdk.invitation);
        }

        const invitations = ttsdk.getInvitations();

        for (var i = invitations.length - 1; i >= 0; i--) {
            if (ttsdk.isEqualInvitation(ttsdk.invitation, invitations[i])) {
                invitations[i].isRejected = true;
                break;
            }
        }

        Cookies.set('invitations', invitations, {
            domain: ttsdk.domain,
            path: ttsdk.path,
            expires: ttsdk.get10MinutesAfter()
        });

        ttsdk.close();
    },
    openInvitePopup: function (invitation, hostUrls) {
        console.log('Now creating invitation popup: ', invitation)
        var gameName;
        var startCount =15;
        var inter = setInterval(function(){
           // document.getElementsByClassName('.tt-sdk-count')[0].innerText(startCount);
            startCount--;
            if(startCount <=-1){
                ttsdk.timerReject();
                clearInterval(inter);
            }else{
                console.log( document.getElementsByClassName('tt-sdk-count')[0].innerHTML);
                document.getElementsByClassName('tt-sdk-count')[0].innerHTML = '남은 초대 수락 시간 : ' + startCount + ' 초';
                console.log(startCount);
            }
        },1000)
        if(invitation.game_code === 10000)
        {
        gameName = invitation.game_code === 10000 ? '동전쌓기' : '알 수 없는 게임';
        }
        else if(invitation.game_code === 10001)
        {
            gameName = invitation.game_code === 10001 ? '판뒤집기' : '알 수 없는 게임';
        }
        
        console.log($('.tt-sdk-modal'));
        if ($('.tt-sdk-modal')) {
            $('.tt-sdk-modal').remove();
        }

        var host = (hostUrls)? hostUrls.home :"https://typing.malangmalang.com";
        console.log("tt-sdk HOME HOST : "+host);

        var $bg = $('<div class="tt-sdk-bg"></div>');
        var $modal = $('<div class="tt-sdk-modal">'
            + '<div class="tt-sdk-header">'
            + '<img src="' + host + '/images/icon_tooltip_circle.png' + '" alt="툴팁">'
            + '<h4>초대 메시지</h4>'
            + '</div>'
            + '<div class="tt-sdk-body">'
            + '<p>'
            + '<span class="tt-sdk-bold">\'' + (invitation.from_nick_name || '닉네임 없음') + '\'</span>님이<br>'
            + '<span class="tt-sdk-bold">\'' + gameName + '\'</span>에서 초대했습니다.</p>'
            + '<p class="tt-sdk-count">남은 초대 수락 시간 : '+startCount + ' 초</p>'
            // + (invitation.password ? '<p>(비밀번호 : ' + invitation.password + ')</p>' : '')
            + '</div>'
            + '<div class="tt-sdk-footer">'
            + '<button class="tt-sdk-accept tt-sdk-button red">수락</button>'
            + '<button class="tt-sdk-reject tt-sdk-button gray">거절</button>'
            + '</div>'
            // + '<a class="tt-sdk-close" title="닫기"><img src="' + host + '/images/icon_close.png" alt="닫기"></a>'
            + '</div>');

        if (!$('.tt-sdk-bg').length) {
            $('body').append($bg);
        } else {
            $bg = $('.tt-sdk-bg');
        }

        $modal
            .find('.tt-sdk-accept')
            .click(function (e) {
                e.preventDefault();

                if (!ttsdk.invitation) {
                    console.log('[ttsdk] No invitation to accept.');
                    return
                }

                if (ttsdk.onAccept) {
                    ttsdk.onAccept(ttsdk.invitation);
                }

                Cookies.set('accepted_invitation', ttsdk.invitation, {
                    domain: ttsdk.domain,
                    path: ttsdk.path,
                    expires: ttsdk.get10MinutesAfter()
                });
                var gamecode = invitation.game_code;
                clearInterval(inter);
                ttsdk.destroyInvitations();
                switch(gamecode){
                    case 10000:
                        window.location.href = ((hostUrls)? hostUrls.coin :"https://tt-coin-c.malangmalang.com/coinpile_sample/WebContent")+'?channel=' + ttsdk.invitation.server_idx;
                        ttsdk.closeAll();
                        break;
                    case 10001:
                        console.log('판뒤집기!!!!!!!!!');
                        window.location.href = (hostUrls)? hostUrls.pan :"https://tt-block-c.malangmalang.com/Flip01/WebContent";
                        break;
                }
                
            });

        $modal
            .find('.tt-sdk-reject')
            .click(function (e) {
                e.preventDefault();

                if (!ttsdk.invitation) {
                    console.log('[ttsdk] No invitation to reject.');
                    return
                }

                if (ttsdk.onReject) {
                    ttsdk.onReject(ttsdk.invitation);
                }

                const invitations = ttsdk.getInvitations();

                for (var i = invitations.length - 1; i >= 0; i--) {
                    if (ttsdk.isEqualInvitation(ttsdk.invitation, invitations[i])) {
                        invitations[i].isRejected = true;
                        break;
                    }
                }

                Cookies.set('invitations', invitations, {
                    domain: ttsdk.domain,
                    path: ttsdk.path,
                    expires: ttsdk.get10MinutesAfter()
                });

                clearInterval(inter);
                ttsdk.close();
            });

        $modal
            .find('.tt-sdk-close')
            .click(function (e) {
                e.preventDefault();

                ttsdk.close();
            });

        $bg.append($modal);
    },

    getInvitations: function () {
        return Cookies.getJSON('invitations') || [];
    },

    deleteInvitation: function (invitation) {
        const invitations = ttsdk.getInvitations().filter(function (item) {
            return !ttsdk.isEqualInvitation(invitation, item);
        });

        if (invitations && invitations.length) {
            Cookies.set('invitations', invitations, {
                domain: ttsdk.domain,
                path: ttsdk.path,
                expires: ttsdk.get10MinutesAfter()
            });
        } else {
            ttsdk.destroyInvitations();
        }
    },

    destroyInvitations: function () {
        Cookies.remove('invitations', {
            domain: ttsdk.domain,
            path: ttsdk.path
        });
    },

    isEqualInvitation: function (invitation1, invitation2) {
        return invitation1.from_nick_name === invitation2.from_nick_name && invitation1.invited_time === invitation2.invited_time;
    },

    get10MinutesAfter: function () {
        var date = new Date();

        date.setTime(date.getTime() + 10 * 60 * 1000);

        return date;
    },

    takeAcceptedInvitation: function () {
        var acceptedInvitation = Cookies.getJSON('accepted_invitation') || null;

        if (acceptedInvitation) {
            Cookies.remove('accepted_invitation', {
                domain: ttsdk.domain,
                path: ttsdk.path
            });
        }

        return acceptedInvitation;
    },

    close: function () {
        $('.tt-sdk-modal').remove();

        const invitations = ttsdk.getInvitations();

        ttsdk.invitation = null;

        if (invitations.length) {
            for (var i = invitations.length - 1; i >= 0; i--) {
                if (!invitations[i].isRejected && (invitations[i].isForTypingPractice || invitations[i].isForGame)) {
                    ttsdk.invitation = invitations[i];
                    break;
                }
            }
        }

        if (ttsdk.invitation) {
            ttsdk.openInvitePopup(ttsdk.invitation);
        } else {
            ttsdk.closeAll();
        }
    },

    closeAll: function () {
        ttsdk.invitation = null;
        $('.tt-sdk-bg').remove();
    }
};