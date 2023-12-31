;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};


	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			//$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	var HandleBackClick = function() {
  	$(window).unload(function() {
			if ( $('body').hasClass('fh5co-offcanvas') ) {
				alert("ciao");
				$('body').removeClass('fh5co-offcanvas');
			}
		});
	}	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	};


	var randomNames = function() {
		var Elements = document.getElementsByClassName('random-names');
		var elem;
		if (Elements.length) {
			for (var i=0; i<Elements.length;i++) {
				elem=Elements[i];
				if (Math.random()>0.5) {
					elem.innerHTML="Mirko &#x2764; Federica"; 
					document.title = "Matrimonio Mirko \u2764 Federica"
				}
				else {
					elem.innerHTML="Federica &#x2764; Mirko";
					document.title = "Matrimonio Federica \u2764 Mirko"
				}
			}
		}
	};


	var loadScript = function(sourceSrc){
    var scriptTag = document.createElement('script');
    scriptTag.src = sourceSrc;
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
	}

	// Set the date we're counting down to
	var countDownDate = new Date("Oct 01, 2023 13:30:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function() {
	if (document.getElementsByName("footerMessage").length > 0) {
		document.getElementsByName("footerMessage").item(0).innerHTML = "";
  };
	if (document.getElementsByClassName("securityNote").length > 0) {
		document.getElementsByClassName("securityNote").item(0).innerHTML = "";
  };

  if (document.getElementById("days") == null) { return };

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in an element with id="demo"
	// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
	// + minutes + "Minutes " + seconds + "Seconds ";
	// Display the result in an element with id="demo"
	document.getElementById("days").innerHTML = days +" <small>giorni</small>";
	document.getElementById("hours").innerHTML = hours + " <small>ore</small> ";
	document.getElementById("minutes").innerHTML = minutes + " <small>minuti</small> ";
	document.getElementById("seconds").innerHTML = seconds + " <small>secondi</small> ";

	// If the count down is finished, write some text 
	if (distance < 0) {
	 clearInterval(x);
	 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
	}
	}, 1000);

	// Document on load.

	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
		HandleBackClick();
		randomNames();
	});


}());
