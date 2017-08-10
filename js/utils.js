function showControls() {
    $('.pano-controls').removeClass('fade-out').addClass('fade-in');
    $('.start-over').removeClass('fade-out').addClass('fade-in');
}

function hideControls() {
    $('.pano-controls').removeClass('fade-in').addClass('fade-out');
    $('.start-over').removeClass('fade-in').addClass('fade-out');
}

function showBatteryModal() {
    $("#battery-low-modal-content, #modal-background").addClass("active");
}

function showOutOfRangeModal() {
    $("#out-of-range-modal-content, #modal-background").addClass("active");
}

function convertToArrayOfObjects(details) {
    var tempArray = [];
    for (var i = 0; i < details.length; i++) {
        var subDetail = details[i];
        for (var i = 0; i < subDetail.length; i++) {
            tempArray.push(subDetail[i]);
        }
    }
    
    console.log(tempArray);

    return tempArray;
}

function getSlider(details, title) {
    var html = '<div class="single-item">'
    for (var i = 0; i < details.length; i++) {
        html += '<div data-title="'+ title +'" data-vLocation="'+ details[i].field_vertical_position +'" data-hLocation="'+ details[i].field_horizontal_position +'" data-desc="'+details[i].field_hotspot_body+'"> <img src="http://dev.interactivemechanics.com'+details[i].field_hotspot_detail_image.trim()+'" width="100%"> </div>';
    };

    html += "</div>"

    return html;
}

function getTinyTempleSlider(details, title) {
    var html = '<div class="single-item">'
    for (var i = 0; i < details.length; i++) {
        html += '<div data-zoom="'+ details[i].field_zoom_value +'" data-title="'+ title +'" data-vLocation="'+ details[i].field_vertical_position +'" data-hLocation="'+ details[i].field_horizontal_position +'" data-desc="'+details[i].field_hotspot_body+'"> <img src="http://dev.interactivemechanics.com'+details[i].field_hotspot_detail_image.trim()+'" width="100%"> </div>';
    };
    html += "</div>"

    return html;
}

function getAboutSliderItem(details) {
    var html = '<div class="single-item">'
    for (var i = 0; i < details.length; i++) {
        html += '<div data-desc="'+details[i].image+'"> <img src="http://dev.interactivemechanics.com'+details[i].description.trim()+'"> </div>';
    };
    html += "</div>"

    return html;
}


function setupAbout() {
    $('.about-modal-title').text(AboutData.title);
    $('.about-modal-body').text(AboutData.description);

    var aboutSliderItems = getAboutSliderItem(AboutData.slides);

    $('.about-slider').html(aboutSliderItems);
    $('.about-slider-description').empty();

    //Create Slider
    $('.about-modal .single-item').slick({
        dots: true,
        arrows: true
    });

    console.log(aboutSliderItems[0].image);
    //Populate First Description
    $('.about-modal .about-slider-description').text(AboutData.slides[0].image);

    //Set Slider Events
    
    $('.about-modal .slick-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var currentItem = $(slick.$slides[currentSlide]);  
        $('.about-modal .about-slider-description').html(currentItem[0].dataset.desc);
    });

    $('.about-modal .slick-slide').on('click tap', function(){
        $('.about-modal .single-item').slick('slickNext');
    });
}

function sendEventMessage(msg, param) {
   // logEvent(msg, param)
}