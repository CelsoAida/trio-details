let anim = ['pop', 'bounces', 'showUp1', 'showUp2', 'blurry'];
// animations for home page header
(function(){

	// navigation buttons
	(()=>{
		let li = Select('.navbar ul li', true),
		cls = 'show'
		for(var i=0, len=li.length; i<len; i++) {
			let dur = GetRandom(0, 1), // duration
				del = GetRandom(0, 2), // delay
				index = GetRandomInt(0, anim.length-1),
				animName = anim[index]

			li[i].style.animation = `${animName} ${dur}s ${del}s ease-in-out forwards`
		}
	})();

	// message
	(()=>{
		let msgDiv = Select('.header .content .message')
			msgDiv = msgDiv.childNodes

		for(var i=0, len=msgDiv.length; i<len; i++) {
			if(i%2 === 0) {
				continue
			}

			let dur = GetRandom(1, 2), // duration
				del = GetRandom(0, 2), // delay
				index = GetRandomInt(0, anim.length-1),
				animName = anim[index]

			msgDiv[i].style.animation = `${animName} ${dur}s ${del}s ease-in-out forwards`
		}
	})();

	// scroll button (SVG animation)
	(()=>{
		let poly = Select('.scrollBtn svg .cls-1', true), // svg polyline elements
		init = ''
		
		init = setInterval(()=> {
			let delay = 9

			for(var i=0, len=poly.length; i<len; i++) {
				delay -= 3
				poly[i].style = ''
				poly[i].style.animation = `blink 1s 0.${delay}s ease-in-out infinite`
				
			}
		}, 1000)
	})();
}());


// show elements on scroll
(function(){
	let scrollY = '',
		navbarFixed = Select('.scrollShow'), // navbar for scroll effect
		poly = Select('.scrollBtn')
		abtDiv = Select('.about .holder'), // element that would slide in
		service = Select('.services .inner-container .fir', true), // services details elements
		servH1 = Select('.services .heading'), // Services heading(h1) element
		scrnHeight = innerHeight, // height of the screen
		ft = Select('.footer'),
		scrnShow = scrnHeight / 1.15, // where elements hit on the screen and get showed
		folio = Select('.portfolio .holder .folio', true)


		// service element animation, helps stop jiglings onScroll
		servDelArr = [] // service animation delay array
		servAnimName = []
		for(var i=0; i<service.length; i++) {
			servDelArr.push(GetRandom(0, 1))
			servAnimName.push(anim[GetRandomInt(0, anim.length-1)])
		}
			
		AddEvnt(window, 'scroll', ()=>{
			scrollY = pageYOffset

			// about us animation
			ScrollEaseAnim(abtDiv, 'showUp1', 1.5, 0.3, scrollY, getTop(abtDiv) - scrnShow) 

			// children of services details element(class="fir") animation
			for(var i=0; i<service.length; i++) {
				let chil = service[i].childNodes // children of services details element(class="fir")

				for(var j=0; j<chil.length; j++) {
					
					if(j%2 === 0 || j===1 || j===0)
						continue

					// children of services details element(class="fir") animation
					ScrollEaseAnim(chil[j], 'bounces', 1.5, servDelArr[i], scrollY, getTop(chil[j]) - scrnShow)
				}
			}

			// services heading element animation
			ScrollEaseAnim(servH1, 'showUp1', 1.5, 0.5, scrollY, getTop(servH1) - scrnShow)

			// portfolio heading animation
			ScrollEaseAnim(Select('.portfolio .heading .inner'), 'showUp1', 1, 0.5, scrollY, getTop(Select('.portfolio .heading')) - scrnShow)

			// protfolio images animation
			for(var i=0; i<folio.length; i++) {
				ScrollEaseAnim(folio[i], 'bounces', 1.5, 0.5, scrollY, getTop(folio[i]) - scrnShow)
			}

			// contact heading animation
			ScrollEaseAnim(Select('.contact .heading'), 'showUp1', 1.5, 0.5, scrollY, getTop(Select('.contact .heading')) - scrnShow)

			// contact information heading
			let cntHead = Select('.contact .information .el h1', true) 
			for(var i=0; i<cntHead.length; i++) {
				ScrollEaseAnim(cntHead[i], 'bounces', 1.5, (i/2)+(0.5/2), scrollY, getTop(cntHead[i]) - scrnShow)
			}

			// contact information content
			let cntCont = Select('.contact .information .el.contact-info p', true) 
			for(var i=0; i<cntCont.length; i++) {
				ScrollEaseAnim(cntCont[i], 'bounces', 1.5, (i/2)+(0.5/2), scrollY, getTop(cntCont[i]) - scrnShow)
			}

			if(innerWidth > 800) {
				if(scrollY >= scrnHeight) {
					Clas(navbarFixed, 'add', 'fixed')
					Clas(poly, 'add', 'fixed')
					poly.childNodes[1].href = '#home'
				} else {
					navbarFixed.classList.remove('fixed');
					poly.classList.remove('fixed')
					poly.childNodes[1].href = '#about'
				}
			}
			
		})
}());

// portfolio mouse enter
(function(){
	let div = Select('.portfolio .holder .folio', true), // portfolio showcases
		divArr = [], array =  [], infoArr = []

	for(var i=0; i<div.length; i++) {
		divArr.push(div[i])
		AddEvnt(div[i], 'mouseenter', enter)

		AddEvnt(div[i], 'mouseleave', leave)

		if(innerWidth > 800) {
			AddEvnt(div[i], 'click', enter)
		}
	}

	// Each  time mouse enter any porfolio showcase animate
	function enter() {
		this.index = divArr.indexOf(this);
		array = [], infoArr = []

		for(var i=0; i<div[divArr.indexOf(this)].childNodes.length; i++) {
			if(i%2 === 0)
				continue

			array.push(div[divArr.indexOf(this)].childNodes[i])
		}
		if(innerWidth > 800) {
			array[1].style= `
				width: 30px;
				height: 30px;
				top: 30px;
				transform: translate(0, 0);
				right: 20px;
				left: auto;
				z-index: 120;
			`;
		} else {
			array[1].style= `
				width: 30px;
				height: 30px;
				top: calc(100% - 40px);
				transform: translate(0, 0);
				right: 20px;
				left: auto;
				z-index: 120;
			`;
		}
		array[2].style.opacity = 1;


		for(var i=0; i<array[2].childNodes.length; i++) {
			if(i%2 === 0)
				continue

			infoArr.push(array[2].childNodes[i])
		}

		// Random animation for info elemeent
		// the h1 and p elements
		for(var i=0; i<infoArr.length; i++) {
			let dur = GetRandom(0, 0.8),
				del = GetRandom(0, 0.3),
				name = anim[GetRandomInt(0, anim.length-1)]
			infoArr[i].opacity = 0;
			Animate(infoArr[i], name, dur, del)
		}

	}

	// function for mouse leave
	// clear any animation and style applied in mouse enter
	function leave() {
		array[1].style = '';
		array[2].style.opacity = 0;

		for(var i=0; i<infoArr.length; i++) {
			clearAnimation(infoArr[i])
		}
	}
}());

if(innerWidth <= 800) {
	let serv = Select('.services .inner-container'),
		port = Select('.portfolio .holder')

	serv.classList.remove('grid')
	serv.classList.remove('grid-col-12')

	port.classList.remove('grid')
	port.classList.remove('grid-col-12')
}





