( function( window, $ ) {
    var _windowSearchToObject,
        _captchaStatuses,
        _sayIsVisualCaptchaFilled;

    _windowSearchToObject = function() {
        var search = window.location.search,
            params = search.substring( 1 ).split( '&' ),
            result = {},
            pair;

        for ( var key in params ) {
            if ( params[ key ] !== '' ) {
              pair = params[ key ].split( '=' );

              result[ decodeURIComponent( pair[ 0 ] ) ] = decodeURIComponent( pair[ 1 ] );
            }
        }

        return result;
    };

    _captchaStatuses = {
        'noCaptcha':   '<div class="status"><div class="icon-no"></div><p>visualCaptcha was not started!</p></div>',
        'validImage':  '<div class="status valid"><div class="icon-yes"></div><p>Image was valid!</p></div>',
        'failedImage': '<div class="status"><div class="icon-no"></div><p>Image was NOT valid!</p></div>',
        'validAudio':  '<div class="status valid"><div class="icon-yes"></div><p>Accessibility answer was valid!</p></div>',
        'failedAudio': '<div class="status"><div class="icon-no"></div><p>Accessibility answer was NOT valid!</p></div>',
        'failedPost':  '<div class="status"><div class="icon-no"></div><p>No visualCaptcha answer was given!</p></div>'
    };

    // Show an alert saying if visualCaptcha is filled or not
    _sayIsVisualCaptchaFilled = function() {
        var captcha = $( this ).siblings( '.visualCaptcha' ).data( 'captcha' );

        if ( captcha.getCaptchaData().valid ) {
            window.alert( 'visualCaptcha is filled!' );
        } else {
            window.alert( 'visualCaptcha is NOT filled!' );
        }
    };

    $( function() {
        var params = _windowSearchToObject(),
            elements,
            statusElement;

        // Load captcha on elements with data-captcha attribute
        elements = $( '[data-captcha]' ).visualCaptcha({
            imgPath: 'img/',
            captcha: {
                numberOfImages: 4
            }
        } );

        // Filter selected elements by namespace
        if ( typeof params.namespace !== 'undefined' ) {
            elements = elements.filter( '[data-namespace="' + params.namespace + '"]' );
        }

        if ( typeof params.status !== 'undefined' ) {
            elements.each( function() {
                // Show success/error messages
                if ( _captchaStatuses[ params.status ] ) {
                    $( this )
                        .siblings( '.captcha-status' )
                        .html( _captchaStatuses[ params.status ] );
                }
            } );
        }

        // Bind click on all .check-captcha elements
        $( 'body' ).on( 'click', '.check-captcha', _sayIsVisualCaptchaFilled );
    } );
}( window, jQuery ) );