import React, { useEffect, useState } from 'react';
import * as go from 'gojs';

// Assuming GoJS extensions and necessary resources are correctly imported or available

function Canvas({ nodeDataArray }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, "myDiagramDiv", {
            allowDelete: false,
            allowCopy: false,
            "undoManager.isEnabled": true
        });

        // Define the colorSwitch function here, adjusted to use React state
        function colorSwitch(color) {
            if (color === "green") return darkMode ? "#429E6F" : "#62bd8e";
            if (color === "blue") return darkMode ? "#3f9fc6" : "#3999bf";
            if (color === "purple") return darkMode ? "#9951c9" : "#7f36b0";
            if (color === "red") return darkMode ? "#ff4d3d" : "#c41000";
            return "black";
        }

        const itemTempl =
            $(go.Panel, "Horizontal",
                $(go.Shape,
                    { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: "#eeeeee", margin: 2 },
                    new go.Binding("figure", "figure"),
                    new go.Binding("fill", "color", n => colorSwitch(n)),
                    new go.Binding("stroke", "color", n => colorSwitch(n))
                ),
                $(go.TextBlock,
                    { font: " 14px sans-serif", stroke: "black" },
                    new go.Binding("text", "name"), new go.Binding("stroke",  "", n => (myDiagram.model.modelData.darkMode) ? "#f5f5f5" :"#000000")),
            );



        myDiagram.nodeTemplate =
            $(go.Node, "Auto",  // the whole node panel
                {
                    selectionAdorned: true,
                    resizable: true,
                    layoutConditions: go.Part.LayoutConditionsStandard & ~go.Part.LayoutConditionsNodeSized,
                    fromSpot: go.Spot.LeftRightSides,
                    toSpot: go.Spot.LeftRightSides,
                    isShadowed: true,
                    shadowOffset: new go.Point(4, 4),
                    shadowColor: "#919cab"
                },
                new go.Binding("location", "location").makeTwoWay(),
                // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
                // clear out any desiredSize set by the ResizingTool.
                new go.Binding("desiredSize", "visible", v => new go.Size(NaN, NaN)).ofObject("LIST"),
                // define the node's outer shape, which will surround the Table
                $(go.Shape, "RoundedRectangle",
                    { stroke: "#e8f1ff", strokeWidth: 3 },
                    new go.Binding("fill", "", n => (myDiagram.model.modelData.darkMode) ? "#4a4a4a" : "#f7f9fc")
                ),
                $(go.Panel, "Table",
                    {
                        margin: 8,
                        stretch: go.GraphObject.Fill,
                        width: 160
                    },
                    $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
                    // the table header
                    $(go.TextBlock,
                        {
                            row: 0, alignment: go.Spot.Center,
                            editable: true,
                            margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                            font: "bold 16px sans-serif"
                        },
                        new go.Binding("text", "key").makeTwoWay(),
                        new go.Binding("stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                    // the collapse/expand button
                    $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
                        { row: 0, alignment: go.Spot.TopRight },
                        new go.Binding("ButtonIcon.stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                    $(go.Panel, "Table",
                        { name: "LIST", row: 1, stretch: go.GraphObject.Horizontal },
                        $(go.TextBlock,
                            {
                                font: "bold 15px sans-serif",
                                text: "Attributes",
                                row: 0,
                                alignment: go.Spot.TopLeft,
                                margin: new go.Margin(8, 0, 0, 0),
                            },
                            new go.Binding("stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                        $("PanelExpanderButton", "NonInherited", // the name of the element whose visibility this button toggles
                            {
                                row: 0,
                                column: 1
                            },
                            new go.Binding("ButtonIcon.stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                        $(go.Panel, "Vertical",
                            {
                                name: "NonInherited",
                                alignment: go.Spot.TopLeft,
                                defaultAlignment: go.Spot.Left,
                                itemTemplate: itemTempl,
                                row: 1
                            },
                            new go.Binding("itemArray", "items")),
                        $(go.TextBlock,
                            {
                                font: "bold 15px sans-serif",
                                text: "Inherited Attributes",
                                row: 2,
                                alignment: go.Spot.TopLeft,
                                margin: new go.Margin(8, 0, 0, 0),
                            },
                            new go.Binding("visible", "visibility", Boolean),
                            new go.Binding("stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                        $("PanelExpanderButton", "Inherited", // the name of the element whose visibility this button toggles
                            {
                                row: 2,
                                column: 1,
                            },
                            new go.Binding("visible", "visibility", Boolean),
                            new go.Binding("ButtonIcon.stroke", "", n => (myDiagram.model.modelData.darkMode) ? "#d6d6d6" : "#000000")),
                        $(go.Panel, "Vertical",
                            {
                                name: "Inherited",
                                alignment: go.Spot.TopLeft,
                                defaultAlignment: go.Spot.Left,
                                itemTemplate: itemTempl,
                                row: 3
                            },
                            new go.Binding("itemArray", "inheriteditems"))
                    )
                ) // end Table Panel
            );  // end Node

        // define the Link template, representing a relationship
        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                {
                    selectionAdorned: true,
                    layerName: "Background",
                    reshapable: true,
                    routing: go.Link.AvoidsNodes,
                    corner: 5,
                    curve: go.Link.JumpOver,
                    isShadowed: true,
                    shadowOffset: new go.Point(2, 2),
                    shadowColor: "#919cab"
                },
                $(go.Shape,  // the link shape
                    { stroke: "#f7f9fc", strokeWidth: 4 }),
                $(go.Panel, "Auto", {segmentIndex: 0 , segmentOffset: new go.Point(22,0)},
                    $(go.Shape, "RoundedRectangle", {fill: "#f7f9fc"}, {stroke: "#eeeeee"}),
                    $(go.TextBlock,  // the "from" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "black",
                            background: "#f7f9fc",
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "text"))),
                $(go.Panel, "Auto",
                    {
                        segmentIndex: -1,
                        segmentOffset: new go.Point(-13,0)
                    },
                    $(go.Shape, "RoundedRectangle", {fill: "#edf6fc"}, {stroke: "#eeeeee"}),
                    $(go.TextBlock,  // the "to" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "black",
                            segmentIndex: -1,
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "toText"))),
            );

        // create the model for the E-R diagram
        const nodeDataArray2 = [
            {
                key: "Products", visibility: true, location: new go.Point(250,250) ,
                items: [{ name: "ProductID", iskey: true, figure: "Decision", color: "purple" },
                    { name: "ProductName", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "ItemDescription", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "WholesalePrice", iskey: false, figure: "Circle", color: "green", },
                    { name: "ProductPhoto", iskey: false, figure: "TriangleUp", color: "red"}],
                inheriteditems: [{ name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
                    { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
            },
            {
                key: "Suppliers", visibility: false,location: new go.Point(500,0) ,
                items: [{ name: "SupplierID", iskey: true, figure: "Decision", color: "purple" },
                    { name: "CompanyName", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "ContactName", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "Address", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "ShippingDistance", iskey: false, figure: "Circle", color: "green", },
                    { name: "Logo", iskey: false, figure: "TriangleUp", color: "red"}],
                inheriteditems: []
            },
            {
                key: "Categories", visibility: true,location: new go.Point(0,30) ,
                items: [{ name: "CategoryID", iskey: true, figure: "Decision", color: "purple" },
                    { name: "CategoryName", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "Description", iskey: false, figure: "Hexagon", color: "blue" },
                    { name: "Icon", iskey: false, figure: "TriangleUp", color: "red"}],
                inheriteditems: [{ name: "SupplierID", iskey: false, figure: "Decision", color: "purple" }]
            },
            {
                key: "Order Details", visibility: true,location: new go.Point(600,350) ,
                items: [{ name: "OrderID", iskey: true, figure: "Decision", color: "purple" },
                    { name: "UnitPrice", iskey: false, figure: "Circle", color: "green", },
                    { name: "Quantity", iskey: false, figure: "Circle", color: "green",  },
                    { name: "Discount", iskey: false, figure: "Circle", color: "green" }],
                inheriteditems: [{ name: "ProductID", iskey: true, figure: "Decision", color: "purple" }]
            },
        ];
        const linkDataArray = [
            { from: "Products", to: "Suppliers", text: "0..N", toText: "1" },
            { from: "Products", to: "Categories", text: "0..N", toText: "1" },
            { from: "Order Details", to: "Products", text: "0..N", toText: "1" },
            { from: "Categories", to: "Suppliers", text: "0..N", toText: "1" }
        ];

        // Set up model data with the darkMode state
        myDiagram.model = new go.GraphLinksModel({
            // Model configuration...
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray: nodeDataArray,
            // linkDataArray: linkDataArray,
            modelData: { darkMode: darkMode }
            // Other model setup...
        });

        // Return a cleanup function to dispose of the diagram if the component unmounts
        return () => myDiagram.div = null;
    }, [darkMode, nodeDataArray]); // Re-run this effect when darkMode changes

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div id="sample">
            <div id="myDiagramDiv" style={{ backgroundColor: darkMode ? '#242424' : 'white', border: 'solid 1px black', width: '700px', height: '700px' }}></div>
            <button onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            {/* Additional component content */}
        </div>
    );
}

export default Canvas;
