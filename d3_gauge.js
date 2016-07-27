var margin = { top: 0, left: 0, right: 0, bottom: 0 },
     width = 800,
     height = 600;

var maxVal = 12;
var angle = 0;
var svg = d3.select(".container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bgArc = d3.svg.arc()
    .outerRadius(100)
    .innerRadius(10)
    .startAngle(0)
    .endAngle(2 * Math.PI);

var needleScale = d3.scale.linear().domain([0, 360]).range([0, 180]);

//draw donut
var wrap = svg.append("g")
    .attr("class", "wrap")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

wrap.append('g')
    .attr('class', 'donut')
    .append("path")
    .attr("d", bgArc)
    .style("fill", "white")
    .style("stroke-width", 2)
    .style("stroke", "white");

wrap.append('g')
    .attr('class', 'outerMostCircle')
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 108)
    .style("stroke", "white")
    .style("stroke-width", 2)
    .style("fill", "transparent");

//draw needle
var needle = wrap.append('g')
    .attr("class", "needle")
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -102)
    .attr("stroke-width", 6)
    .attr("stroke", "coral");

// add text
var text = svg.append("g")
    .attr("class", "text")
    .append("text")
    .attr("transform", "translate(" + width / 2.2 + "," + height / 4 + ")")
    .attr("font-size", "2em");

setInterval(function() {
    curVal = Math.floor(Math.random()* 12);
        d3.select('.needle').select('line')
            .transition()
            .duration(1000)
            .attrTween('transform', function() {
                return tweenNeedle(curVal, maxVal);
            });

        text.datum(curVal).text(function(d) {
            return d + " m/s";
        });
}, 1500);

function tweenNeedle(data, max) {
    var prevAngle = angle;
        angle = (data / max * 360);
        return d3.interpolateString("rotate(" +prevAngle+")", "rotate(" + (data / max * 360) + ")");
        
}

function getEndAngle(data, max) {
    return data / max * 2 * Math.PI;
}

wrap.append('g')
    .attr('class', 'outerCircle')
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 20)
    .attr("fill", "pink");
    
wrap.append('g')
    .attr('class', 'innerCircle')
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 10)
    .attr("fill", "#666");
