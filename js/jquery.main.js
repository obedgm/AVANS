'use strict';

/* smartresize
================================================== */
(function($,sr){

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
			var timeout;

			return function debounced () {
					var obj = this, args = arguments;
					function delayed () {
							if (!execAsap)
									func.apply(obj, args);
							timeout = null;
					};

					if (timeout)
							clearTimeout(timeout);
					else if (execAsap)
							func.apply(obj, args);

					timeout = setTimeout(delayed, threshold || 100);
			};
	}
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

function run()
{
	var fName = arguments[0],
		aArgs = Array.prototype.slice.call(arguments, 1);
	try {
		fName.apply(window, aArgs);
	} catch(err) {
		console.log(fName, 'Oops...');
	}
};

/* intro size
================================================== */
function intro_size ()
{
	var intro_b  = document.getElementById("intro-fullscreen"),
		viewport = document.documentElement;

	intro_b.style.height = viewport.clientHeight + "px";

	var onresize = function() { 
		intro_b.style.height = viewport.clientHeight + "px";
	};

	$(window).smartresize(onresize);
};


/* s_vegas
================================================== */
function s_vegas ()
{
	var sl_cont = $('.slide-content');
	var dots;
	var a;

	var slides = [{
		name: "People are awesome 1",
		src: 'images/coffee.jpg'
	}, {
		name: "People are awesome 2",
		src: 'images/intro_bg.jpg'
	}, {
		name: "People are awesome 3",
		src: 'images/dome.jpg'
	}];

	var slides_2 = [{
		name: "People are awesome 1",
		src: 'images/a1.jpg'
	}, {
		name: "People are awesome 2",
		src: 'images/a2.jpg'
	}, {
		name: "People are awesome 3",
		src: 'images/a3.jpg'
	}];

	var sl_vegas = $('#intro-fullscreen .intro-slider-vegas').vegas({
		overlay: 0,
		timer: false,
		transition: 'fade',
		transitionDuration: 4000,
		delay: 10000,
		animation: 'random',
		animationDuration: 20000,
		slides: slides,
		init: function (globalSettings) {
			if ( this.data('dots') == true ) {

				var $this = this;
				dots = $('<div class="vegas-dots"></div>');

				$this.find('.vegas-control').append(dots);

				for (var i = 0; i < slides.length; i++) {
					var x = $('<a "href="#" class="paginatorLink"></a>');

					x.on('click', function(e) {
						e.preventDefault();

						$this.vegas('jump', dots.find('a').index(this));
					});

					dots.append(x);
				};

				a = dots.find('a');
				a.eq(0).addClass('active');

				sl_cont.eq(0).addClass('active').parent().css("height", sl_cont.eq(0).height())
			};
		},
		play: function (index, slideSettings) {
			$('#vegas-prev').on('click', function () {
				sl_vegas.vegas('previous');
			});

			$('#vegas-next').on('click', function () {
				sl_vegas.vegas('next');
			});
		},
		walk: function (index, slideSettings) {
			$('#vegas-prev')
							.find('p span').text(slides[(slides.length + index - 1)%slides.length].name).end()
							.find('img').attr('src', slides[(slides.length + index - 1)%slides.length].src);

			$('#vegas-next')
							.find('p span').text(slides[(slides.length + index + 1)%slides.length].name).end()
							.find('img').attr('src', slides[(slides.length + index + 1)%slides.length].src);

			if ( this.data('dots') == true ) { a.removeClass('active').eq(index).addClass('active'); };

			sl_cont.removeClass('active').eq(index).addClass('active');

			sl_cont.eq(index).find('> div').addClass(sl_cont.eq(index).data('animate'))

			sl_cont.parent().css("height", sl_cont.eq(index).height())
		}
	});

	var sl_vegas_2 = $('#intro-fullwidth .intro-slider-vegas').vegas({
		overlay: 0,
		timer: false,
		transition: 'fade',
		transitionDuration: 4000,
		delay: 10000,
		animation: 'random',
		animationDuration: 20000,
		slides: slides_2,
		init: function (globalSettings) {
			if ( this.data('dots') == true ) {

				var $this = this;
				dots = $('<div class="vegas-dots"></div>');

				$this.find('.vegas-control').append(dots);

				for (var i = 0; i < slides_2.length; i++) {
					var x = $('<a "href="#" class="paginatorLink"></a>');

					x.on('click', function(e) {
						e.preventDefault();

						$this.vegas('jump', dots.find('a').index(this));
					});

					dots.append(x);
				};

				a = dots.find('a');
				a.eq(0).addClass('active');

				sl_cont.eq(0).addClass('active').parent().css("height", sl_cont.eq(0).height())

				//sl_cont.eq(0).find('> div').addClass(sl_cont.data('animate'))
			};
		},
		walk: function (index, slideSettings) {
			if ( this.data('dots') == true ) { a.removeClass('active').eq(index).addClass('active'); };

			sl_cont.removeClass('active').eq(index).addClass('active');

			sl_cont.eq(index).find('> div').addClass(sl_cont.eq(index).data('animate'))

			sl_cont.parent().css("height", sl_cont.eq(index).height())
		}
	});
};

/* s_backstretch
================================================== */
function s_backstretch ()
{
	if ( $('#intro-fullwidth').length ) {

		var sl_b  = $('#intro-fullwidth').find('.slide-backstretch');

		sl_b.each(function ( index ) {
			var $this = $(this),
				$this_img = $this.data('backstretch-img');

			$this.backstretch($this_img , {duration: 0});

			$(window).smartresize(function () {
				$this.backstretch("resize")
			})
		});
	};
};

/* owlCarousel
================================================== */
function owl_carousel ()
{
	$("#project-slide").owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:1,
				margin:15,
				autoplay:false
			},
			768:{
				items:2
			},
			992:{
				items:3
			}
		},
		onInitialized : function callback(e) {
			$("#project-slide .owl-item.cloned a[data-gallery]").attr('data-gallery', 'f_project_cloned');
		}
	});


	$(".logos-carousel_long").owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:2,
				margin:15
			},
			600:{
				items:3
			},
			991:{
				items:3
			},
			992:{
				items:4
			},
			1200:{
				items:6
			}
		}
	});


	$(".logos-carousel_short").owlCarousel({
		loop:true,
		margin:30,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:2,
				margin:15
			},
			600:{
				items:3
			},
			991:{
				items:3
			},
			992:{
				items:4
			},
			1200:{
				items:6
			}
		}
	});


	$(".testimonial-slider").owlCarousel({
		items:1,
		loop:true,
		margin:15,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true
	});


	var imgSlider = $(".owlSliderImg");

	imgSlider.each(function ( index ) {
		var $this = $(this);

		$this.owlCarousel({
			animateOut: $this.data('animout'),
			animateIn: $this.data('animin'),
			autoplay: $this.data('auto'),
			autoplayTimeout: $this.data('autospeed'),
			autoplayHoverPause:true,
			items: $this.data('items'),
			loop: $this.data('loop'),
			nav: $this.data('nav'),
			dots:  $this.data('dots'),
			navText: [
				"<i class='icon-angle-left'></i>",
				"<i class='icon-angle-right'></i>"
			],
			mouseDrag: $this.data('mousedrag'),
			responsive:true,
			responsiveRefreshRate:50
		});
	});

	var $sync1 = $('#project-slider_big');
	var $sync2 = $('#project-slider_small'),
		flag = false,
		duration = 300;

	$sync1.owlCarousel({
		items:1,
		animateOut: "fadeOut",
		dots:false,
		nav:true,
		navText: [
			"<i class='icon-angle-left'></i>",
			"<i class='icon-angle-right'></i>"
		]
	})
	.on('changed.owl.carousel', function (e) {
		if (!flag) {
			flag = true;
			var pos = e.item.index;
			$sync2.trigger('to.owl.carousel', [pos, duration, true]);

			$sync2.find('.owl-item.current').removeClass('current');
			$sync2.find('.owl-item').eq(pos).addClass('current');
			flag = false;
		}
	});

	$sync2.owlCarousel({
		margin:30,
		dots:false,
		responsive:{
			0:{
				items:2,
				margin:15
			},
			380:{
				items:3
			},
			600:{
				items:4
			},
			992:{
				items:3
			},
			1200:{
				items:4
			}
		},
		onInitialized : function callback(e) {

			$sync2.find(".owl-item").eq(0).addClass("current");
		}
	})
	.on('click', '.owl-item', function () {
		$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);

		$(this).addClass('current').siblings().removeClass('current')

	})/*
	.on('changed.owl.carousel', function (e) {
		if (!flag) {
			flag = true;
			$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
			flag = false;
		}
	})*/;
};

/* google map
================================================== */
function g_map ()
{
	var maps = $('.map');

	maps.each(function() {
		var current_map = $(this);
		var latlng = new google.maps.LatLng(current_map.attr('data-longitude'), current_map.attr('data-latitude'));
		//var latlngmarker = new google.maps.LatLng(current_map.attr('data-marker-longitude'), current_map.attr('data-marker-latitude'));
		var point = current_map.attr('data-marker');

		var myOptions = {
			zoom: 14,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			panControl: false,
			zoomControl: false,
			disableDefaultUI: true
		};

		var map = new google.maps.Map(current_map[0], myOptions);

		var marker = new google.maps.Marker({
			map: map,
			icon: {
				size: new google.maps.Size(99,109),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(49,110),
				url: point
			},
			position: latlng
		});
        

		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	});
};


/* tabs
================================================== */
function tabs ()
{
	$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

	$('.tab ul.tabs li a').on('click', function (g) {
		g.preventDefault();

		var tab = $(this).closest('.tab'), 
			index = $(this).closest('li').index();

		tab.find('ul.tabs > li').removeClass('current');

		$(this).closest('li').addClass('current');

		tab.find('.tab_content').find('div.tabs_tab').not('div.tabs_tab:eq(' + index + ')').slideUp();

		tab.find('.tab_content').find('div.tabs_tab:eq(' + index + ')').slideDown();
	});
};

/* accordion
================================================== */
function accordion ()
{
	$('.accordion').addClass('active').find('> .acc:eq(0) a.tog').addClass('current').next().show();

	$('.accordion a.tog').on('click', function (j) {
		j.preventDefault();

		var dropDown = $(this).closest('.acc').find('.tab_content');
		$(this).closest('.accordion').find('.tab_content').not(dropDown).slideUp();

		if ($(this).hasClass('current')) { 
			$(this).removeClass('current');
		} else { 
			$(this).closest('.accordion').find('.tog.current').removeClass('current');
			$(this).addClass('current');
		}

		dropDown.stop(false, true).slideToggle();
	});
};

/* chart
================================================== */
function chart ()
{
	$('.skills').appear(function() {
		setTimeout(function() {
			$('.chart').easyPieChart({
				easing: 'easeOutElastic',
				delay: 3000,
				barColor: '#369670',
				trackColor: '#fff',
				scaleColor: false,
				lineWidth: 10,
				trackWidth: 10,
				size: 123,
				lineCap: 'butt',
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent);
				}
			});
		}, 150);
	});
};

/* video
================================================== */
function video ()
{
	$('.post-item__link_video').on('click', function (e) {
		e.preventDefault();

		var videoLink = $(this).attr('href');
		var PlaceV = $(this).parent();

		if ($(this).hasClass('post-item__link_video_youtube')) {
			$(PlaceV).html('<iframe class="fullwidth" frameborder="0" height="333" src="' + videoLink + '?autoplay=1&showinfo=0" title="YouTube video player" width="547"></iframe>');
		} else {
			$(PlaceV).html('<iframe class="fullwidth" src="' + videoLink + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;color=ffffff" width="500" height="281" frameborder="0"></iframe>');
		}
	});
};

/* boxer gall
================================================== */
function gall ()
{
	$("a[data-gallery]").boxer({
		fixed: true,
		videoWidth: 800
	});
};

/* portfolio
================================================== */
function portfolio ()
{
	var $container = $('.isotope-container'),
		$d_container = $('#isotope-default'),
		$m_container = $('#isotope-masonry'),
		$optionSets = $('#option-set'),
		$optionLinks = $optionSets.find('a');

	$d_container.isotope({
		itemSelector : '.element',
		transitionDuration: '0.6s'
	});

	$m_container.isotope({
		resizable: false,
		itemSelector : '.element',
		transitionDuration: '0.6s',
		masonry: {columnWidth: $container.width() / 4}
	});


	$(window).smartresize(function(){
		$m_container.isotope({
		// update columnWidth to a percentage of container width
			masonry: { columnWidth: $container.width() / 4 }
		});
	});

	$optionLinks.on('click', function(e) {
		var $this = $(this),
			currentOption = $this.data('cat');

		$optionSets.find('.selected').removeClass('selected');
		$this.addClass('selected');

		if (currentOption !== '*') {
			currentOption = '.' + currentOption;
		}

		$container.isotope({filter : currentOption});
		return false;
	});
};

var $header = $('#header'),
	$headerOffset;

$(window).load(function(){

	$headerOffset = $header.offset().top;

	$(window).on('scroll',function(){
		var $this = $(this);

		if( $this.scrollTop() >= $headerOffset ) { $header.addClass("header__fixed"); }

		else { $header.removeClass("header__fixed"); }
	}).scroll();


	/* portfolio
	================================================== */
	run(portfolio);
});

$(document).ready(function(){

	$("html").niceScroll({
		cursorcolor:"#374145",
		mousescrollstep: 50,
		scrollspeed: 70,
		zindex: 100,
		cursorborderradius: 0,
		cursorborder:0,
		horizrailenabled: false,
		cursorfixedheight:120,
		cursorwidth:"10px"
	});

	var oMenuLink = $('#menu-tog'),
		oNav = $('#navigation'),
		oSubMenu = oNav.find('.submenu');

	/* Desktop, tablet and mobile menu
	================================================== */
	if ( oSubMenu.length ) {
		oSubMenu.parent().addClass('has-submenu');
	};

	oMenuLink.on('click', function(e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.hasClass('active')) {

			oNav.slideUp('fast');
			oSubMenu.css({ display : 'none' });

			$this.removeClass('active');

			oNav.find('a.drop_active').removeClass('drop_active');

		} else {

			oNav.slideDown('fast');

			$this.addClass('active');

			if ($headerOffset > 0 && !$header.hasClass("header__fixed")) {

				$('body,html').stop().animate({ scrollTop: $headerOffset } , 300);
			};
		};
	});

	oNav.on('touchend click', 'ul>li>a', function() {
		var $this = $(this);

		if ( oMenuLink.is(':visible') ) {
			if ( $this.next().is('div.submenu') ) {
				if ( $this.next().is(':visible') ) {

					$this.removeClass('drop_active');
					$this.next().slideUp('fast');
					$this.next().find('.submenu').css({display : 'none' });

				} else {

					$this.closest('ul').find('a.drop_active').removeClass('drop_active');
					$this.closest('ul').find('.submenu').slideUp('fast');
					$this.addClass('drop_active');
					$this.next().slideDown('fast');
				};

				return false;
			};
		};
	});

	$(window).smartresize(function(){
		if ($(this).width() > 767) {

			oMenuLink.removeClass('active');
			oNav.removeAttr('style');
			oSubMenu.removeAttr('style');
			oNav.find('a.drop_active').removeClass('drop_active');
		}
	});

	$('#go-bottom').on('click', function (e) {
		e.preventDefault();

		$('body,html').stop().animate({ scrollTop: document.documentElement.clientHeight } , 1000);
	});

	/* intro size
	================================================== */
	run(intro_size);

	/* owlCarousel
	================================================== */
	run(owl_carousel);

	/* s_vegas
	================================================== */
	run(s_vegas);

	/* s_backstretch
	================================================== */
	run(s_backstretch);

	/* google map
	================================================== */
	run(g_map);
    
    run(initMap);
	/* tabs
	================================================== */
	run(tabs);

	/* accordion
	================================================== */
	run(accordion);

	/* chart
	================================================== */
	run(chart);

	/* video
	================================================== */
	run(video);

	/* boxer gall
	================================================== */
	run(gall);


	$('input[type=text], input[type=email], input[type=tel], input[type=password], textarea').each(function() {
		var $this = $(this);
		
		$this.attr('data-placeholder', $this.attr('placeholder'));
		$this.removeAttr('placeholder');
		
		$this.val() == '' && $this.val($this.attr('data-placeholder'));
	}).focusin(function() {
		var $this = $(this);
		
		$this.val() == $this.attr('data-placeholder') && $this.val('').css('color', '');
	}).focusout(function() {
		var $this = $(this);
		
		$this.val() == '' && $this.val($this.attr('data-placeholder'));
	});
});



 var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',    
          width: '50%',        
          videoId: 'NI-NbDYfg4c',
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
        player1 = new YT.Player('player1', {
            height: '390',
            width: '49%',
            videoId:'n7kLuXie64w',
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
      }
        


      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }



