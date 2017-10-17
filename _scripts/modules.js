function print(msg) {
	console.log(msg)
}

// chec if a class is present
function HasClass(elem, clsname) {
	this.elem = elem
	this.clas = clsname

	// if the element does not have any class at all return false
	if(this.elem.classList.length === 0) {
		return false;
	}

	for(var i=0; i<this.elem.classList.length; i++) {
		if(this.elem.classList[i] === this.clas)
			return true
		else
			continue
			return false
	}
}

// addEventListener
function AddEvnt(elem, evt, callback) {
	if(typeof(elem) === 'string')
		this.elem = Select(elem)
	else
		this.elem = elem


	this.evt = evt
	this.call = callback

	this.elem.addEventListener(this.evt, this.call);
}

// Element Selector
function Select(elem, opt) {
	this.elem = elem
	this.opt = opt
	var elems;


	// if second parameter is given and is equal to true
	// then Select all the elements of that nature
	if(this.opt === true)
		elems = document.querySelectorAll(this.elem)
	// if the second parameter is not passed then
	// select just on element or the first element of this nature
	else if(!this.opt)
		elems = document.querySelector(this.elem)


	return elems
}

// Creating an Element
function CreateElem(elem) {
	this.elem = elem
	var element = document.createElement(this.elem)
	return element
}

// Append an element to another element
function AppendElem(child, parent) {
	parent.appendChild(child)
}

// create an element and append it to another
function CreateAndAppend(child, parent, callback) {
	// create an element here
	this.child = CreateElem(child);

	// checks if argument passed to parent parameter is a string
	if(typeof(parant) === 'string') {
		// if argument is a string then select it
		// this allows css selectors in the parent parameter
		this.parent = Select(parent);
	} else if(!parent) {
		print('error parent argument not defined')
		return
	} else {
		// if argument passed to parent parameter is a DOM Element
		// assign it to this.parent
		this.parent = parent;
	}

	this.parent.appendChild(this.child)

	// callback function allows for you to manipulate the
	// the element that was created
	callback(this.child)
}

function Clas(elem, type, classname) {
	this.type = type
	this.name = classname

	if(typeof(elem) === 'string')
		this.elem = Select(elem);
	else if(!elem)
		print('Error: can\'t read element')
	else
		this.elem = elem


	if(this.type === 'add')
		this.elem.classList.add(this.name)
	else if(this.type === 'remove')
		this.elem.classList.remove(this.name)
	else if(this.type === 'toggle')
		this.elem.classList.toggle(this.name)
	else
	print('type error: classList method undefined')
}

function GetRandomInt(min, max) {
	let random = Math.floor(Math.random() * (max-min+1) + min)
	return random
}

function GetRandom(min, max) {
	let random = Math.random() * (max-min+1) + min
	return random
}

function scrollTo(element, to, duration) {
  if (duration <= 0) 
  	return false;

  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to)
    	return false;

    scrollTo(element, to, duration - 5);
  }, 10);
}

function Animate(elem, fx, dur, delay) {
	if(!elem)
		return

	this.elem = elem
	this.fx = fx
	this.dur = dur
	this.delay = delay

	this.elem.style.webkitAnimation = `${this.fx} ${this.dur}s ${this.delay}s ease-in-out forwards`
	this.elem.style.mozAnimation = `${this.fx} ${this.dur}s ${this.delay}s ease-in-out forwards`
	this.elem.style.animation = `${this.fx} ${this.dur}s ${this.delay}s ease-in-out forwards`
}

function clearAnimation(elem) {
	if(!elem)
		return

	elem.style.webkitAnimation = ''
	elem.style.mozAnimation = ''
	elem.style.animation = ''
}

function ScrollEaseAnim(elem, fx, dur, delay, scrl, view, clr) {
	if(!elem) 
		return

	if(clr === true) {
		if(scrl > view) {
			Animate(elem, fx, dur, delay)
		} else {
			clearAnimation(elem)
		}
	} else if(!clr || clr === false) {
		if(scrl > view) {
			Animate(elem, fx, dur, delay)
		}
	}

}

// get elements positon on the screen on
// also track it on scroll to see how near it is to being visible
function getTop(elem) {
    let parentArr = [],
		result = elem.offsetTop

	parentArr.push(elem.offsetParent)

    for(var i=0; i<200; i++) {
		if(parentArr[i].offsetParent === document.body)
			break
        parentArr.push(parentArr[i].offsetParent)
    }

	for(var i=0; i<parentArr.length; i++) {
		result += parentArr[i].offsetTop
    }

	return result
}