import * as d3 from "https://esm.sh/d3";
import * as React from "react";

// based on https://www.react-graph-gallery.com/voronoi


export default function ({ value, setValue, width, height, render_delaunay, render_voronoi }) {
    const xScale = d3.scaleLinear().domain([-3, 3]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-3, 3]).range([0, height]);

    const paths = [];

    value.forEach((d, i) => {
        paths.push(<circle key={i} cx={xScale(d[0])} cy={yScale(d[1])} r={4} />);
    });
    console.log(paths)

    // const delaunay = React.useMemo(() => {
    const delaunay = (() => {
        const formattedData = value.map((d) => [xScale(d[0]), yScale(d[1])]);
        console.log({value, formattedData})
        return d3.Delaunay.from(formattedData);
    })();

    if(render_delaunay) {
        const delaunayPath = delaunay.render();
        paths.push(
            <path d={delaunayPath} stroke="grey" fill="transparent" opacity={0.8} />
        );
    }
    if(render_voronoi) {
        const voronoi = delaunay.voronoi([0, 0, width, height]);
        const voronoiPath = voronoi.render();
        paths.push(<path d={voronoiPath} stroke="orange" fill="red" />);
    }
    return <svg width={width} height={height}>
        {paths}
        </svg>
}