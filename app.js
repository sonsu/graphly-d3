let container = d3.select("#list_data");

const svg = d3.select("svg");
let width = window.innerWidth;
let height = window.innerHeight;

let graph = {
	nodes: [],
	links: [],
};

const drag = d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
function dragstarted(e, d) {
	simulation.alphaTarget(0.1).restart();
	d.fx = e.x;
	d.fy = e.y;
}
function dragged(e, d) {
	d.fx = e.x;
	d.fy = e.y;
}
function dragended(e, d) {
	simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}

const simulation = d3
	.forceSimulation()
	.force(
		"link",
		d3.forceLink().id((d) => d.id)
	)
	.force("change", d3.forceManyBody().strength(-20))
	.force("center", d3.forceCenter(width / 2, height / 2))
	.force("collide", d3.forceCollide(30))
	.on("tick", ticked);

const linkGroup = svg.append("g").attr("id", "links");
const nodeGroup = svg.append("g").attr("id", "nodes");
const contextGroup = svg.append("g").attr("id", "context");
const graphElements = {
	nodes: null,
	links: null,
};

render();

function ticked() {
	// console.log(graphElements);
	if (!graphElements.links || !graphElements.nodes) return;

	graphElements.links
		.select("line")
		.attr("x1", (d) => {
			return d.source.x;
		})
		.attr("y1", (d) => d.source.y)
		.attr("x2", (d) => d.target.x)
		.attr("y2", (d) => d.target.y);

	graphElements.nodes.attr("transform", (d) => {
		return `translate(${d.x}, ${d.y})`;
	});
}

function render() {
	// update data in graph
	simulation.nodes(graph.nodes);
	simulation.force("link").links(graph.links);
	simulation.alpha(0.1).restart();

	// clear graph
	contextGroup.selectAll("*").remove();
	nodeGroup.selectAll("*").remove();
	linkGroup.selectAll("*").remove();

	// links
	const links = linkGroup
		.selectAll("g")
		.data(graph.links)
		.enter()
		.append("g")
		.call((d) => {
			graphElements.links = d;
		})
		.classed("link", true)
		.append("line");

	links.exit().remove();

	// nodes
	const nodes = nodeGroup
		.selectAll("g")
		.data(graph.nodes)
		.enter()
		.append("g")
		.call(drag)
		.call((d) => {
			graphElements.nodes = d;
		})
		.classed("node", true);

	// node content
	nodes.append("circle").attr("r", (d) => d.value / 2);
	nodes
		.append("text")
		.classed("noselect", true)
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.text((d) => d.label);

	// Tooltip
	nodes.on("click", (e, d) => {
		const currentNode = d3.select(e.currentTarget);
		if (currentNode.classed("selected")) {
			currentNode.classed("selected", false);
			// currentNode.select(".tooltip").remove();
			contextGroup.selectAll("*").remove();
			return;
		}
		const tooltip = contextGroup.append("g").classed("tooltip", true);
		tooltip
			.append("rect")
			.attr("width", "100px")
			.attr("height", "25px")
			.attr("y", e.y - 10)
			.attr("x", e.x - 50)
			.on("mouseout", (e, d) => {
				contextGroup.selectAll("*").remove();
				currentNode.classed("selected", false);
			});
		tooltip
			.append("text")
			.classed("noselect", true)
			.attr("text-anchor", "middle")
			.attr("dy", "0.35em")
			.attr("x", e.x)
			.attr("y", e.y)
			.text("remove")
			.on("click", (ev, da) => {
				graph.nodes = graph.nodes.filter((n) => n.id !== d.id);
				graph.links = graph.links.filter((l) => l.source.id !== d.id && l.target.id !== d.id);
				render();
			});
		currentNode.classed("selected", true);
	});

	nodes.exit().remove();
}

function loadData() {
	fetch("./graph.json")
		.then((data) => data.json())
		.then((data) => (graph = data.graph))
		.then(render)
		.then(() => {
			for (let i = 0; i < 200; i++) {
				graph.nodes.push({
					id: Math.random(),
					value: Math.floor(Math.random() * 100) + 10,
					label: Math.random().toString(36).substring(7),
				});
				graph.links.push({
					source: graph.nodes[Math.floor(Math.random() * graph.nodes.length)].id,
					target: graph.nodes[graph.nodes.length - 1].id,
				});
			}
			render();
		});
}

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	svg.attr("width", width).attr("height", height);
	simulation.force("center", d3.forceCenter(width / 2, height / 2));
	simulation.alpha(1).restart();
}

window.onload = () => {
	resize();
	loadData();
};
window.onresize = resize;

///
/// HELPER BUTTONS
///

const addNodeButton = document.getElementById("add-node");
const removeNodeButton = document.getElementById("remove-node");

addNodeButton.addEventListener("click", () => {
	graph.nodes.push({
		id: Math.random(),
		value: Math.floor(Math.random() * 100) + 10,
		label: Math.random().toString(36).substring(7),
	});
	graph.links.push({
		source: graph.nodes[Math.floor(Math.random() * graph.nodes.length)].id,
		target: graph.nodes[graph.nodes.length - 1].id,
	});
	render();
});

removeNodeButton.addEventListener("click", () => {
	// find random node and remove it as well as all links to it
	const node = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
	graph.nodes = graph.nodes.filter((n) => n.id !== node.id);
	graph.links = graph.links.filter((l) => l.source.id !== node.id && l.target.id !== node.id);
	render();
});
