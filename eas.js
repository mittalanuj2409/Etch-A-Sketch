function add_blocks(n){
	console.log(n);
	container.style.gridTemplateColumns = `repeat(${n}, ${98/n}vw)`;
	container.style.gridAutoRows = `${92/n}vh`;
	let child = container.lastElementChild;
	//let head = container.getElementById("head");
	while(child){
		container.removeChild(child);
		child = container.lastElementChild;
	}
	let grid = [];
	for(let i=0; i<n*n; i++){
		let box = document.createElement("div");
		box.className = "child";
		let deg = Math.random();
		grid[i] = new boxes(100, deg * 360, box);
		box.style.backgroundColor = `hsl(${deg * 360}, 100%, 100%)`;
		box.style.width = `${98/n}vw`;
		box.style.height = `${92/n}vh`;
		box.style.zIndex = `-1`;
		box.onmouseover = function () {color_inc(grid[i])};
		container.appendChild(box);
	}
}

function boxes(l, h, box){
	this.l = l;
	this.box = box;
	this.h = h;
}

function color_inc(event){
	event["l"] -= 10;
	event["box"].style.backgroundColor = `hsl(${event["h"]}, 100%, ${event["l"]}%)`;
}

function clear_grid(){
	add_blocks(dim);
}

function new_grid(){
	if(size.value < 65 && size.value > 0){
		dim = size.value;
		add_blocks(dim);
	}
}

function draw() {
	let x = pos.x;
	let y = pos.y;

	dots.forEach(function(dot, index, dots) {
		let nextDot = dots[index + 1] || dots[0];
		dot.x = x;
		dot.y = y;
		dot.draw();
		x += (nextDot.x - dot.x) * .6;
		y += (nextDot.y - dot.y) * .6;
	});
}

function animate() {
	draw();
	requestAnimationFrame(animate);
}

let dim = 16;
let container = document.getElementById("container");
add_blocks(dim);
let clear = document.getElementById("clear");
clear.addEventListener(`click`, clear_grid);
let size = document.getElementById("size");
size.addEventListener(`input`, ()=>{
	size.setCustomValidity(``);
	size.checkValidity();
});
size.addEventListener(`invalid`, ()=>{
	if(size.value == `` || true){
		size.setCustomValidity("Enter a number in range [1, 64]");
	}
	
});
let resize = document.getElementById("resize");
resize.addEventListener(`click`, new_grid);

let pos = {
	x: 0,
	y: 0,
};

let dots = [];

let Dot = function(){
	this.x = 0;
	this.y = 0;
	this.node = (function(){
		let d = document.createElement("div");
		d.className = "dot";
		d.style.zIndex = `1`;
		document.getElementById("pad").appendChild(d);
		return d;
	}());
};

Dot.prototype.draw = function(){
	this.node.style.left = this.x + `px`;
	this.node.style.top = this.y + `px`;
};

for(let i = 0; i < 16; i++){
	let d = new Dot();
	dots.push(d);
}

let pad = document.getElementById("pad");

pad.addEventListener("mousemove", function(event){
	pos.x = event.pageX;
	pos.y = event.pageY;
});

animate();