const rangy = {

    nextNode:(node) => {
		if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
	},
	
	getRangeSelectedNodes: (range) =>{
		var node = range.startContainer;
		var endNode = range.endContainer;
        

		// Special case for a range that is contained within a single node
		if (node === endNode) {
			return [node];
		}
	
		// Iterate nodes until we hit the end container
		var rangeNodes = [];
		while (node && node !== endNode) {
            node = rangy.nextNode(node);
            if(node && node.nodeName === "SPAN"){
                rangeNodes.push(node);
            }
		}
	
		// Add partially selected nodes at the start of the range
        node = range.startContainer;
		while (node && node !== range.commonAncestorContainer) {
            if(node && node.nodeName === "SPAN"){
                rangeNodes.unshift(node);
            }
			node = node.parentNode;
		}
	
		return rangeNodes;
	}
}

export default rangy;