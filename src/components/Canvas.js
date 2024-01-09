import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';

const goObj = go.GraphObject.make;

const Canvas = () => {
    const diagramRef = useRef(null);
    const diagram = useRef(null);

    useEffect(() => {
        if (diagramRef.current && !diagram.current) {
            diagram.current = goObj(go.Diagram, diagramRef.current, {
                'undoManager.isEnabled': true,
                model: goObj(go.GraphLinksModel, {
                    linkKeyProperty: 'key',
                    copiesArrays: true,
                    copiesArrayObjects: true,
                }),
                allowDrop: true,
            });

            const attributeTemplate = goObj(go.Panel, 'Horizontal',
                goObj(go.TextBlock, { margin: 3, editable: true },
                    new go.Binding('text').makeTwoWay()),
                goObj("Button",
                    { click: (e, obj) => removeAttribute(e, obj) },
                    goObj(go.TextBlock, "-", { margin: 2 })
                )
            );

            diagram.current.nodeTemplate = goObj(go.Node, 'Auto',
                goObj(go.Shape, 'Rectangle', { fill: 'white' }),
                goObj(go.Panel, 'Vertical',
                    goObj(go.TextBlock, { margin: 3, editable: true },
                        new go.Binding('text', 'name').makeTwoWay()),
                    goObj(go.Panel, 'Vertical',
                        new go.Binding('itemArray', 'attributes'),
                        {
                            itemTemplate: attributeTemplate,
                            defaultAlignment: go.Spot.Left
                        }
                    ),
                    goObj("Button",
                        { click: (e, obj) => addAttribute(e, obj) },
                        goObj(go.TextBlock, "+", { margin: 2 })
                    )
                )
            );

            function addAttribute(e, obj) {
                const node = obj.part;
                if (node) {
                    const data = node.data;
                    diagram.current.model.startTransaction("add attribute");
                    diagram.current.model.addArrayItem(data.attributes, { text: "" });
                    diagram.current.model.commitTransaction("add attribute");
                }
            }

            function removeAttribute(e, obj) {
                const node = obj.part;
                if (node && node.data.attributes.length > 1) {
                    const data = node.data;
                    diagram.current.model.startTransaction("remove attribute");
                    diagram.current.model.removeArrayItem(data.attributes, obj.panel.itemIndex);
                    diagram.current.model.commitTransaction("remove attribute");
                }
            }

            const handleDrop = (e) => {
                e.preventDefault();
                const data = JSON.parse(e.dataTransfer.getData("application/reactflow"));
                const point = diagram.current.transformViewToDoc(diagram.current.lastInput.documentPoint);

                diagram.current.model.addNodeData({
                    loc: go.Point.stringify(point),
                    name: data.name,
                    attributes: [{ text: 'Novo Atributo' }]
                });
            };

            if (diagram.current) {
                diagram.current.div.addEventListener('drop', handleDrop);
                diagram.current.div.addEventListener('dragover', (e) => e.preventDefault());
            }
        }
    }, [diagram.current]);

    return <div ref={diagramRef} style={{ width: '100%', height: '600px', backgroundColor: '#DAE4E4' }}></div>;
};

export default Canvas;
