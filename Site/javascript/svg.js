// USER VARIABLES ms
var
animateIN = 2600,
animateOUT = 1000,
animatePAUSE = 2000
;

// CALCULATED VARIABLES
var
svgEvol = document.getElementById('evol'),
/*  %%  */rowDurationsIN = [
	35,
	17,
	13,
	13,
	22
].map(function(d) {
	return animateIN * (d / 100);	// "d" portion of animateIN duration
}),
rowDurationsOUT = rowDurationsIN.map(function(d) {
	return d * (animateOUT / animateIN);	// Short ratio to determine portion of animateOUT
}),
netWait = animatePAUSE + animateIN,
svgThink = document.getElementById('think')
;


/** Called as transition to phase 1 */
function _think_OUT() {

	var svgThink = document.getElementById('think');

	svgRemClass(svgThink, 'think_drawIN');
	svgAddClass(svgThink, 'think_drawOUT');

	var lines = svgThink.getElementsByClassName('line');
	var circles = svgThink.getElementsByClassName('circle');
	var botlines = document.getElementById('think__botend').getElementsByClassName('endline');
	var toplines = document.getElementById('think__topend').getElementsByClassName('endline');
	var viewport = [3176.23, 3223.73];

	// lines
	for (var i = 0, ll = lines.length; i < ll; i++) {
		lines[i].setAttribute('style',
			'animation-duration:'+ animateOUT +'ms; '+
			'animation-delay:'+ netWait +'ms; '
		);
	}
	// circles
	for (var ii = 0, cl = circles.length; ii < cl; ii++) {
		var pp = (viewport[1] - circles[ii].getAttribute('cy')) / (viewport[1] - 98.87);
		var delay = (pp * animateOUT) - 200;

		circles[ii].setAttribute('style',
			'animation-delay:'+ (netWait+delay) +'ms; '
		);
	}
	// botlines
	for (var iii = 0, bl = botlines.length; iii < bl; iii++) {
		botlines[iii].setAttribute('style',
			'animation-delay:'+ (netWait-200) +'ms; '
		);
	}
	// toplines
	for (var iv = 0, tl = toplines.length; iv < tl; iv++) {
		toplines[iv].setAttribute('style',
			'animation-delay:'+ (netWait+animateOUT) +'ms; '
		);
	}

	toplines[0].addEventListener('animationend', _rows);

}


/** Called after _evol_drawOUT ends */
function _think() {
	this.removeEventListener('animationend', _think);

	var prerow = document.getElementsByClassName('row-drawOUT');
	var ir = prerow.length;
	while (ir--) {
		svgRemClass(prerow[ir], 'row-drawOUT');
	}
	svgRemClass(svgEvol, 'evol_drawOUT');


	svgAddClass(svgThink, 'think_drawIN');

	var lines = svgThink.getElementsByClassName('line');
	var circles = svgThink.getElementsByClassName('circle');
	var botlines = document.getElementById('think__botend').getElementsByClassName('endline');
	var toplines = document.getElementById('think__topend').getElementsByClassName('endline');
	var viewport = [3176.23, 3223.73];

	// lines
	for (var i = 0, ll = lines.length; i < ll; i++) {
		lines[i].setAttribute('style',
			'animation-duration:'+ animateIN +'ms; '
		);
	}

	// circles
	for (var ii = 0, cl = circles.length; ii < cl; ii++) {
		var pp = circles[ii].getAttribute('cy') / (viewport[1] - 98.87);
		var delay = (pp * animateIN) - (200 * (pp - 0.2));

		circles[ii].setAttribute('style',
			'animation-delay:'+ delay +'ms; '
		);
	}

	// bottom lines
	for (var iii = 0, bl = botlines.length; iii < bl; iii++) {
		botlines[iii].setAttribute('style',
			'animation-delay:'+ (animateIN-200) +'ms; '
		);
	}
	// top lines
	for (var iv = 0, tl = toplines.length; iv < tl; iv++) {
		toplines[iv].setAttribute('style', 'animation-delay:0ms; ');
	}

	setTimeout(_think_OUT, netWait);

}



/** Called as transition to phase 3 */
function _evol_OUT() {

	svgRemClass(svgEvol, 'evol_drawIN');
	svgAddClass(svgEvol, 'evol_drawOUT');

	var lines = svgEvol.getElementsByClassName('line');
	var circles = svgEvol.getElementsByClassName('circle');
	var toplines = svgEvol.getElementsByClassName('topline');

	var viewport = [3176.23, 2787.37];

	for (var i = 0, ll = lines.length; i < ll; i++) {
		lines[i].setAttribute("style",
			'animation-duration:'+	animateOUT+'ms; '+
			'animation-delay:'+		netWait +'ms; '
		);
	}

	for (var ii = 0, cl = circles.length; ii < cl; ii++) {

		var pp = (viewport[1] - circles[ii].getAttribute("cy")) / (viewport[1] - 98.87);
		var delay = (pp * animateOUT) - 200;

		circles[ii].setAttribute("style",
			'animation-delay:'+ (netWait+delay) +'ms; '
		);
	}

	for (var iii = 0, tl = toplines.length; iii < tl; iii++) {
		toplines[iii].setAttribute("style",
			'animation-delay:'+ (netWait+animateOUT) +'ms; '
		);
	}

	toplines[0].addEventListener('animationend', _think);

}


/** Called after _rows_OUT finishes */
function _evol() {
	this.removeEventListener('animationend', _evol);

	var prerow = document.getElementsByClassName('row-drawOUT');
	var ir = prerow.length;
	while (ir--) {
		svgRemClass(prerow[ir], 'row-drawOUT');
	}
	svgRemClass(svgThink, 'think_drawOUT');


	svgAddClass(svgEvol, 'evol_drawIN');

	var lines = svgEvol.getElementsByClassName('line');
	var toplines = svgEvol.getElementsByClassName('topline');
	var circles = svgEvol.getElementsByClassName('circle');

	var viewport = [3176.23, 2787.37];

	// lines
	for (var i = 0, ll = lines.length; i < ll; i++) {
		lines[i].setAttribute("style",
			'animation-duration:'+animateIN+'ms; '
		);
	}
	// top lines
	for (var ii = 0, tl = toplines.length; ii < tl; ii++) {
		toplines[ii].setAttribute('style', 'animation-delay:0ms; ');
	}

	// circles
	for (var iii = 0, cl = circles.length; iii < cl; iii++) {

		var pp = circles[iii].getAttribute("cy") / (viewport[1] - 98.87);
		var delay = parseFloat((pp * animateIN) - (200*(pp - 0.7)).toFixed(2));

		circles[iii].setAttribute("style",
			'animation-delay:'+ delay +'ms; '
		);

	}

	setTimeout(_evol_OUT, netWait);
}




/** Called as transition to phase 2 */
function _rows_OUT() {

	var rows = document.getElementsByClassName('row');


	/** Iterate over each row as j
	 *	j: row iteration
	*/
	for (var j = 0, rl = rows.length; j < rl; j++) {

		var row = rows[j];

		/** Iterate backwards over all rows, accumulating a reverse delay for each
		 *	jj: iteration over row
		*/
		row.delay = 0;
		var jj = rl;
		while (jj--) {
			if (jj <= j) break;
			row.delay += rowDurationsOUT[jj];
		}


		/** Iterate over every line of the current jth row
		 *	kk: iteration over lines
		 *	ll: lines length
		*/
		var lines = row.getElementsByTagName('polyline');
		for (var kk = 0, ll = lines.length; kk < ll; kk++) {
			lines[kk].setAttribute("style",
				'animation-duration:'+	rowDurationsOUT[j]	+'ms; '+
				'animation-delay:'+		(netWait+row.delay)	+'ms; '+
				'animation-timing-function:'+	row.ease	+'; '
			);
		}
		var circles = row.getElementsByClassName('circle');
		for (var kkk = 0, cl = circles.length; kkk < cl; kkk++) {
			circles[kkk].setAttribute("style",
				'animation-delay:'+(netWait+row.delay)+'ms; '
			);
		}

		svgRemClass(rows[j], "row-drawIN");
		svgAddClass(rows[j], "row-drawOUT");

	}

	rows[0].addEventListener('animationend', _evol);

}


/** Called per initial trigger */
function _rows() {
	this.removeEventListener('animationend', _rows);

	svgRemClass(svgThink, 'think_drawOUT');
	svgRemClass(svgEvol, 'evol_drawOUT');


	var rows = document.getElementsByClassName('row');

	/** Called on every row
	* 		id = rowth number (0-4)
	*/
	for (var i = 0, rl = rows.length; i < rl; i++) {

		var row = rows[i];

		/** Iterate over rows successively to accumulate forward delay
		 *	k: iteration over row
		*/
		row.delay = 0;
		for (var k = 0; k < i; k++) {
			row.delay += rowDurationsIN[k];
		}
		// console.log(row.delay);

		row.ease = 'linear';
		if (i === 0) row.ease = 'ease-in';
		if (i === 4) row.ease = 'ease-out';

		/** Iterate thru all lines for each row
		 *		i = row-th number (0-4)
		 *		j = line-th number (0-(2^n))
		*/
		var lines = row.getElementsByTagName('polyline');
		for (var j = 0, ll = lines.length; j < ll; j++) {
			lines[j].setAttribute("style",
				'animation-duration:'+	rowDurationsIN[i]	+'ms; '+
				'animation-delay:'+		row.delay			+'ms; '+
				'animation-timing-function:'+	row.ease	+'; '
			);
		}
		var circles = row.getElementsByTagName('circle');
		for (var jj = 0, cl = circles.length; jj < cl; jj++) {
			circles[jj].setAttribute("style",
				'animation-delay:'+row.delay+'ms; '
			);
		}

		svgAddClass(row, 'row-drawIN');
	}

	setTimeout(_rows_OUT, netWait);

}


function loaded() {

	_rows();

	var visited = getCookie("visited");
	if (visited) {
		remClass(document.getElementsByClassName('hero-title')[0], 'hidden');
		remClass(document.getElementsByClassName('hero-desc')[0], 'hidden');
		remClass(document.getElementById('l_links-top'), 'hidden');
		remClass(document.getElementById('l_links-bottom'), 'hidden');
		return;
	}
	else {
		setCookie("visited", true);
	}

	document.getElementById('rows').setAttribute(
		'style',
		'animation:svg_perspective_out 2000ms forwards cubic-bezier(.5,.25,.1,1);'
	);

	setTimeout(function() {
		remClass(document.getElementsByClassName('hero-title')[0], 'hidden');
	}, animateIN * 0.66);

	setTimeout(function() {
		remClass(document.getElementsByClassName('hero-desc')[0], 'hidden');
	}, animateIN);

	setTimeout(function() {
		remClass(document.getElementById('l_links-top'), 'hidden');
		remClass(document.getElementById('l_links-bottom'), 'hidden');
	}, animateIN*1.25);
}
window.addEventListener('load', loaded);
