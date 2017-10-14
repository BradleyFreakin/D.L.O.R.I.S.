
function getOffsetTop(el) {
	var l = 0;
	if (el.offsetParent) {
		do {
			l += el.offsetTop;
			el = el.offsetParent;
		}
		while (el);
	}
	return l;
}


function addClass(el, cls) {
	if (el.classList) el.classList.add(cls);
	else if (!hasClass(el, cls)) el.className += " " + cls;
}
function remClass(el, cls) {
	if (el.classList) el.classList.remove(cls);
	else if (hasClass(el, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
}
function hasClass(el, cls) {
	if (el.classList)
		return el.classList.contains(cls);
	else
		return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}


function svgAddClass(el, cls) {
	var clstr = el.getAttribute("class");
	var prev = (clstr === null) ? '' : clstr;
	el.setAttribute("class", prev+' '+cls);
}
function svgRemClass(el, cls) {
	if (!el.getAttribute("class"))
		return;
	var prev = el.getAttribute("class");
	var regex = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	var newAtr = prev.replace(regex, '');
	el.setAttribute("class", newAtr);
}


function setCookie(name, value, expireDays) {
	var date = new Date();
	date.setTime(date.getTime() + (expireDays*86400000));
	var expires = "expires"+date.toUTCString();
	document.cookie += name+"="+value+";"+expires+";path=/";
}
function getCookie(_name) {
	var name = _name+"=";
	var cookies = decodeURIComponent(document.cookie);
	var cookieArr = cookies.split(";");
	for (var i = 0, l = cookieArr.length; i < l; i++) {
		var cookie = cookieArr[i];
		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) === 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
	return false;
}
