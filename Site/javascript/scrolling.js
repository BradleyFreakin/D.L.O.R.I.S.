
var isScrolling = false;

var landing = document.getElementsByClassName('landing')[0];


function scroll(_pos) {
	/**
	 * Apply parallax effect to hero title and landing area
	 */
	var posL = Math.round(_pos / 2);
	if (_pos >= 0) {
		landing.style.transform = "translateY("+posL+"px)";
	}

	isScrolling = false;
}

function reqScroll() {
	if (!isScrolling) {
		requestAnimationFrame(function() {
			scroll(window.scrollY);
		});
	}
	isScrolling = true;
}

document.addEventListener('scroll', reqScroll);


function attachEventListeners() {
	var links = document.getElementsByClassName('l_link');
	var i = links.length;
	while (i--) {
		links[i].addEventListener('click', function(e) {
			e.preventDefault();
			var toElement = document.getElementById(this.getAttribute("href").substring(1));
			toElement.scrollIntoView({
				behavior:"smooth"
			});
		});
	}
}
