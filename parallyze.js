/*!
Parallyze - 0.0.1
Copyright © 2015 Josip Psihistal
Licensed under the MIT license.
*/

var didScroll = false;

setInterval(function() {			
  if (didScroll) {
    didScroll = false;
  }
}, 100);

(function() {
 'use strict';

	var pCounter = 0;
	var paraZoo = {};

	function Parallyze(options) {
    if (!options.front) { throw new Error('No element selected!'); }

	  this.defaults = {
	    back: options.front.parentNode,
	    speed: 0.25,
	    stick: false,
	    direction: 'down',
	    end: null,
	    offset: 0
	  };

		this.back = options.back ? options.back : this.defaults.back;
			this.back.rect = this.back.getBoundingClientRect();
			this.back.distance = 0;

    this.front = options.front;
    	this.front.height = options.front.clientHeight;
    	this.front.top = options.front.offsetTop;    	
    	this.front.bottom = this.back.rect.bottom + this.front.top;
    	this.front.distance = 0;

    this.end = options.end ? this.front.height * options.end : 0;

    if (options.direction == ('up' || 'left')) {
    	this.direction = 1;
    } else {
    	this.direction = -1;
    }

    this.stick = options.stick ? options.stick : this.defaults.stick;
		
		this.speed = options.speed ? options.speed : this.defaults.speed;
			this.relativeSpeed = this.back.innerHeight * this.speed;

		this.complete = false;
		
		window.onscroll = function() { shift(); };

		function shift() {
			for (var pzKey in paraZoo) {
			  var pz = paraZoo[pzKey];
			  didScroll = true;

		    // update distace bg has travelled
		    pz.back.distance = pz.back.rect.top;

		    // move foreground relative distance
				pz.front.distance = pz.back.distance * pz.speed * pz.direction;
			  pz.front.style.top = pz.front.top + pz.front.distance + 'px';

				//update positions
				pz.back.rect = pz.back.getBoundingClientRect();
			}
		}
		paraZoo[pCounter] = this;
		pCounter++;
	}

	window.Parallyze = Parallyze;
}());
