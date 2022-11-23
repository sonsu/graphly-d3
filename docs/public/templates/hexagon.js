/* eslint-disable max-len */

const schema = {
	type: "object",
	properties: {
		title: { type: "string" },
		color: { type: "string" },
		tags: { type: "array", items: { type: "string" } },
		category: { type: "string", enum: ["A", "B", "C"] },
	},
	required: ["title", "color"],
};

const Hexaong = {
	shapeSize: 120,
	shapePayload: schema,
	shapeBuilder: shapeBuilder,
};

function shapeBuilder(data, Template) {
	const { Shape, SVGShape, TextCollection, CollectionStyle, ShapeStyle, Alignment } = Template;
	const shape = SVGShape(`
		<g transform="matrix(1,0,0,1,-101.915,-40.1924)">
			<g transform="matrix(8.33117e-17,-1.36058,1.36058,8.33117e-17,9.05891,870.52)">
				<path id="path" d="M384.617,88.155C406.11,75.826 432.531,75.826 454.023,88.155C488.394,107.873 540.748,137.906 575.236,157.69C596.908,170.123 610.273,193.199 610.273,218.184L610.273,356.483C610.273,381.468 596.908,404.544 575.236,416.977C540.748,436.761 488.394,466.794 454.023,486.512C432.531,498.841 406.11,498.841 384.617,486.512C350.246,466.794 297.892,436.761 263.405,416.977C241.733,404.544 228.367,381.468 228.367,356.483L228.367,218.184C228.367,193.199 241.733,170.123 263.405,157.69C297.892,137.906 350.246,107.873 384.617,88.155Z" />
			</g>
		</g>
	`);

	shape.select("path").style("fill", data.payload?.color ?? "#9575cd");

	shape.select(".title").remove();
	const bbox = Shape.getBBox(shape);
	const titleShape = TextCollection(
		data.payload?.title ?? "",
		CollectionStyle(200, bbox.width * 0.8, bbox.width * 0.1, bbox.height * 0.45, 10, 10, 2, Alignment.Center),
		[
			ShapeStyle("class", "n_text", true),
			ShapeStyle("font-size", "5em", true),
			ShapeStyle("class", "gly_text.light", true),
		]
	);
	titleShape.classed("title", true);
	shape.append(() => titleShape.node());

	return shape;
}

export default Hexaong;
