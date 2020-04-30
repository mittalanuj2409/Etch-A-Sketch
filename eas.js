function add_blocks(n){
	console.log(n);
	let child = container.lastElementChild;
	while(child){
		container.removeChild(child);
		child = container.lastElementChild;
	}
	for(let i=0; i<n*n; i++){
		console.log(i);
		let div = document.createElement("div");
		div.className = "child";
		div.style.width = `${100/n}vw`;
		div.style.height = `${100/n}vh`;
		container.appendChild(div);
	}
}

let dim = 16;
let container = document.getElementById("container");
container.style.gridTemplateColumns = `repeat(${dim}, ${100/dim}vw)`;
container.style.gridAutoRows = `${100/dim}vh`;
add_blocks(dim);