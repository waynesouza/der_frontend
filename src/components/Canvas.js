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
                model: goObj(go.GraphLinksModel, { linkKeyProperty: 'key' }),
                allowDrop: true,
            });

            diagram.current.nodeTemplate = goObj(go.Node, 'Auto',
                goObj(go.Shape, 'Rectangle', { fill: 'white', strokeWidth: 0 }),
                goObj(go.TextBlock, { margin: 8 }, new go.Binding('text', 'name'))
            );
        }
    }, []);

    useEffect(() => {
        const handleDrop = (event) => {
            event.preventDefault();
            const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));
            const point = diagram.current.transformViewToDoc(diagram.current.lastInput.documentPoint);
            diagram.current.model.addNodeData({ ...data, loc: go.Point.stringify(point) });
        };

        if (diagram.current) {
            diagram.current.div.addEventListener('drop', handleDrop);
            diagram.current.div.addEventListener('dragover', (e) => e.preventDefault());
        }

        return () => {
            if (diagram.current) {
                diagram.current.div.removeEventListener('drop', handleDrop);
            }
        };
    }, [diagram.current]);

    return <div ref={diagramRef} style={{ flex: 1, backgroundColor: '#DAE4E4' }}></div>;
};

export default Canvas;
