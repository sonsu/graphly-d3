import * as d3 from "d3";

import { Graph } from "../types/Graph";
import { Node } from "../types/Node";
import { Link } from "../types/Link";

import { linkForce, xForce, yForce, gravity, circleCollide } from "./forces";
import { ticked } from "./ticked";
import { renderNodes, renderLinks } from "./render";

interface SelectionGroups {
	world: d3.Selection<SVGGElement, any, any, any>;
	nodes: d3.Selection<SVGGElement, any, any, any>;
	links: d3.Selection<SVGGElement, any, any, any>;
}

export default class ForceSimulation {
	private _svgElement: SVGElement;
	get svgElement(): SVGElement {
		return this._svgElement;
	}
	set svgElement(svgElement: SVGElement) {
		this._svgElement = svgElement;
		this._svgSelection = d3.select(svgElement);
		this.selectionGroups = this.createWorld();
		this._zoom = this.createZoom();
		this.render(this.graph);
	}

	private _svgSelection: d3.Selection<SVGElement, any, any, any>;
	get svgSelection(): d3.Selection<SVGElement, any, any, any> {
		return this._svgSelection;
	}

	private _simulation: d3.Simulation<Node, Link>;
	get simulation(): d3.Simulation<Node, Link> {
		return this._simulation;
	}

	private _zoom: d3.ZoomBehavior<Element, any>;
	private _worldTransform: { x: number; y: number; k: number };
	get worldTransform(): { x: number; y: number; k: number } {
		return this._worldTransform;
	}
	set zoomScaleExtent(extent: [number, number]) {
		this._zoom.scaleExtent(extent);
	}
	set zoomEnabled(enabled: boolean) {
		this._zoom.on("zoom", null);
		if (enabled) this._zoom.on("zoom", ({ transform }) => this.onZoom(transform));
	}

	set envGravity(value: number) {
		this.simulation.force("gravity", gravity(value));
	}

	set linkDistance(value: number) {
		this.simulation.force("link", linkForce(value));
	}

	public animationDuration: number = 300;
	public draggableNodes: boolean = true;

	public selectionGroups: SelectionGroups;

	public graph: Graph = { nodes: [], links: [] };

	constructor(svgEl: SVGElement | d3.Selection<SVGElement, any, any, any>) {
		if (svgEl instanceof SVGElement) {
			this._svgElement = svgEl;
			this._svgSelection = d3.select(svgEl);
		} else {
			this._svgSelection = svgEl;
			this._svgElement = svgEl.node() as SVGElement;
		}

		this._worldTransform = { x: this.svgElement.clientWidth / 2, y: this.svgElement.clientHeight / 2, k: 1 };
		this._simulation = this.createSimulation();
		this.selectionGroups = this.createWorld();
		this._zoom = this.createZoom();
	}

	private createSimulation(): d3.Simulation<Node, Link> {
		const simulation = d3
			.forceSimulation<Node, Link>()
			.force("link", linkForce(400))
			.force("forceX", xForce())
			.force("forceY", yForce())
			.force("gravity", gravity(-10_000))
			.force("collide", circleCollide())
			.on("tick", ticked.bind(this));

		return simulation;
	}

	private createZoom(): d3.ZoomBehavior<Element, any> {
		const zoom = d3
			.zoom()
			.extent([
				[0, 0],
				[this.svgElement.clientWidth, this.svgElement.clientHeight],
			])
			.scaleExtent([0.1, 3])
			.on("zoom", ({ transform }) => this.onZoom(transform));
		this.svgSelection
			.call(zoom as any)
			.call(
				(zoom as any).transform,
				d3.zoomIdentity.translate(this._worldTransform.x, this._worldTransform.y).scale(this._worldTransform.k)
			);
		this.svgSelection.on("dblclick.zoom", null);
		return zoom;
	}

	private onZoom(transform: any) {
		this._worldTransform = transform;
		this.selectionGroups.world.attr("transform", transform);
	}

	private createWorld(): SelectionGroups {
		const world = this.svgSelection.append("g").attr("data-name", "world");
		const links = world.append("g").attr("data-name", "links");
		const nodes = world.append("g").attr("data-name", "nodes");
		return { world, nodes, links };
	}

	public async render(this: ForceSimulation, graph: Graph, alpha: number = 0.05) {
		this.graph = graph;
		await renderNodes.bind(this)(this.graph);
		renderLinks.bind(this)(this.graph);

		this.simulation.nodes(this.graph.nodes);
		(this.simulation.force("link") as d3.ForceLink<Node, Link>).links(graph.links);
		this.simulation.alphaTarget(alpha).restart();
		setTimeout(() => {
			this.simulation.alphaTarget(0);
		}, 100);
	}
}
