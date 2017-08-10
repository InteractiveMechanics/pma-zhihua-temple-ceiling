function OpenHotSpot(id) {
    if(id != 4) {

        if($('.popup-modal').is(':visible')) {
            $('.close-icon').click();
        } 


        var hotspot = GetHotSpot(id);

        
        var title = hotspot.title;
        var body = hotspot.body;
        var desc = hotspot.body;

        //var related_hotspots = convertToArrayOfObjects(hotspot.field_related_hotspots);
        hotspot.field_related_hotspots.sort(function(a,b) {return (a.field_sort_order > b.field_sort_order) ? 1 : ((b.field_sort_order > a.field_sort_order) ? -1 : 0);} ); 

        var sliderHTML = getSlider(hotspot.field_related_hotspots, title);

        sendEventMessage(title + " selected");

        $('.popup-modal .popup-title').text(title);
        $('.popup-modal .popup-body').html(body);
        $('.popup-modal .slider').html(sliderHTML);
        $('.popup-modal .slider-description').empty();


        $('.lap-view-modal').show();

        
        if(hotspot.field_related_hotspots.length > 1) {
            $('.popup-modal .single-item').slick({
                dots: true,
                arrows: true
            });

            $('.popup-modal .slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

                var currentItem = $(slick.$slides[currentSlide]);  
                currentItem[0].dataset.hlocation

                var vLoc = currentItem[0].dataset.vlocation;
                var hLoc = currentItem[0].dataset.hlocation;

                if(vLoc && hLoc) {
                    
                    krpanoMoveTo(hLoc, vLoc); 
                }

                $('.popup-modal .slider-description').html(currentItem[0].dataset.desc);

                var title = currentItem[0].dataset.title;
                sendEventMessage(title + " slide selected");
            });

            $('.popup-modal .slick-slide').on('click tap', function(){
                $('.popup-modal .single-item').slick('slickNext');
            });
        }

        var name = 'a' + id;

        var krpano = document.getElementById("krpanoSWFObject");
        krpano.call("looktohotspot('"+ name +"', .05, tween('easeInOutQuad', 0.5));");


        var query = "hotspot['"+name+"']"; // i.e. "hotspot['spot0']"
        var hotspot = krpano.get(query); 
        hotspot.alpha = 0;

        $('.close-icon').data('lasthotspot', 'a' + id);

    } else {
        //TinyTempleHotspot();

        //todo
        //sendEventMessage(title + " selected");

        //Tiny Temple Logic

        //Hide Controls
        if($('.start-over').hasClass('fade-in')) {
            $('.start-over').removeClass('fade-in').addClass('fade-out');
        }

        if($('.pano-controls').hasClass('fade-in')) {
            $('.pano-controls').removeClass('fade-in').addClass('fade-out');
        }

        //Show Popup
        $('.tiny-temple-modal').show();

        $('.close-icon').data('lasthotspot', 'a' + id);

        //Tiny Temple HotSpot
        var hotspot = GetHotSpot(id);

            
        var title = hotspot.title;
        var body = hotspot.body;
        var desc = hotspot.body;

        //var related_hotspots = convertToArrayOfObjects(hotspot.field_related_hotspots);
        hotspot.field_related_hotspots.sort(function(a,b) {return (a.field_sort_order > b.field_sort_order) ? 1 : ((b.field_sort_order > a.field_sort_order) ? -1 : 0);} ); 

        var sliderHTML = getTinyTempleSlider(hotspot.field_related_hotspots, title);

        sendEventMessage(title + " selected");

        $('.tiny-temple-modal .popup-title').text(title);
        $('.tiny-temple-modal .popup-body').html(body);
        $('.tiny-temple-modal .slider').html(sliderHTML);
        $('.tiny-temple-modal .slider-description').empty();


        //$('.lap-view-modal').show();

        
        if(hotspot.field_related_hotspots.length > 1) {
            $('.tiny-temple-modal .single-item').slick({
                dots: true,
                arrows: true
            });

            $('.tiny-temple-modal .slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

                var currentItem = $(slick.$slides[currentSlide]);  
                currentItem[0].dataset.hlocation

                var vLoc = currentItem[0].dataset.vlocation;
                var hLoc = currentItem[0].dataset.hlocation;
                var zoom = currentItem[0].dataset.zoom;

                if(vLoc && hLoc) {
                    console.log(vLoc, hLoc);
                    //templeZoomTo(.1);

                    //setTimeout(function(){
                        krpanoTempleMoveTo(hLoc, vLoc, zoom);
                    //},500);
                }

                $('.tiny-temple-modal .slider-description').html(currentItem[0].dataset.desc);

                var title = currentItem[0].dataset.title;
                sendEventMessage(title + " slide selected");
            });

            $('.tiny-temple-modal .slick-slide').on('click tap', function(){
                $('.tiny-temple-modal .single-item').slick('slickNext');
            });
        }

        //Show View
        //$('.tiny-temple-screen').css('z-index', 2);
        $('.tiny-temple-screen').css('z-index', 2).removeClass('fade-out').addClass('fade-in');

    }
}

function TinyTempleHotspot() {

    //todo
    //sendEventMessage(title + " selected");

    //Tiny Temple Logic

    //Hide Controls
    if($('.start-over').hasClass('fade-in')) {
        $('.start-over').removeClass('fade-in').addClass('fade-out');
    }

    if($('.pano-controls').hasClass('fade-in')) {
        $('.pano-controls').removeClass('fade-in').addClass('fade-out');
    }

    //Show Popup
    $('.tiny-temple-modal').show();

    //Show View
    $('.tiny-temple-screen').css('z-index', 2).removeClass('fade-out').addClass('fade-in');


    $('.close-icon').data('lasthotspot', 'a' + id);

    //Tiny Temple HotSpot
    var hotspot = GetHotSpot(id);

        
    var title = hotspot.title;
    var body = hotspot.body;
    var desc = hotspot.body;

    //var related_hotspots = convertToArrayOfObjects(hotspot.field_related_hotspots);
    hotspot.field_related_hotspots.sort(function(a,b) {return (a.field_sort_order > b.field_sort_order) ? 1 : ((b.field_sort_order > a.field_sort_order) ? -1 : 0);} ); 

    var sliderHTML = getTinyTempleSlider(hotspot.field_related_hotspots, title);

    sendEventMessage(title + " selected");

    $('.tiny-temple-modal .popup-title').text(title);
    $('.tiny-temple-modal .popup-body').html(body);
    $('.tiny-temple-modal .slider').html(sliderHTML);
    $('.tiny-temple-modal .slider-description').empty();


    //$('.lap-view-modal').show();

    
    if(hotspot.field_related_hotspots.length > 1) {
        $('.tiny-temple-modal .single-item').slick({
            dots: true,
            arrows: true
        });

        $('.tiny-temple-modal .slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

            var currentItem = $(slick.$slides[currentSlide]);  
            currentItem[0].dataset.hlocation

            var vLoc = currentItem[0].dataset.vlocation;
            var hLoc = currentItem[0].dataset.hlocation;

            if(vLoc && hLoc) {
                console.log(vLoc, hLoc);
                //krpanoMoveTo(hLoc, vLoc); 
            }

            $('.tiny-temple-modal .slider-description').html(currentItem[0].dataset.desc);

            var title = currentItem[0].dataset.title;
            sendEventMessage(title + " slide selected");
        });

        $('.tiny-temple-modal .slick-slide').on('click tap', function(){
            $('.tiny-temple-modal .single-item').slick('slickNext');
        });
    }
}

function GetHotSpot(id){
    var hotspot;
    for (var i = 0; i < HotspotData.length; i++) {
        if ( HotspotData[i].nid == id ) {
            hotspot = HotspotData[i]
        }
    };

    return hotspot;
}

function showHotSpots() {
    var krpano = getKrpanoObject();
    var hotspot_count = krpano.get('hotspot.count');

    for(i = 0; i < hotspot_count; i++){
        krpano.set('hotspot[' + i + '].alpha', 1); 
    }
}

function getHotSpot(name) {
    var krpano = getKrpanoObject();
    var hotspot_count = krpano.get('hotspot.count');

    var spotname = "spot0";
    var query = "hotspot['"+name+"']"; 
    var hotspot = krpano.get(query);

    return hotspot;
}