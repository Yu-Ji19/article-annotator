import $ from "jquery"

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
    },
    
    compress: (range)=>{
        var start = range.startContainer.parentElement;
        var end = range.endContainer.parentElement;
        return {start:start.id, end:end.id};
    },

    highlight: (range, color)=>{
        var nodes = rangy.getRangeSelectedNodes(range);
        nodes.forEach(node=>{
            if(node.id){
                $("#" + node.id).addClass("highlight-" + color);
            }
        })
    },

    addTarget: (range, id)=>{
        var nodes = rangy.getRangeSelectedNodes(range);
        nodes.forEach(node=>{
            var annotations = $("#" + node.id).attr("data-annotations");
            if(!annotations){
                annotations = "";
            }
            $("#" + node.id).attr("data-annotations", annotations+id+",");
        })
    },

    addClick: (range)=>{
        var nodes = rangy.getRangeSelectedNodes(range);
        nodes.forEach(node=>{
            var ids = node.getAttribute("data-annotations").split(",");
            if(ids){ // CAN ACTUALLY ASSUME ANNOTATIONS WILL NEVER BE NULL 
                $("#" + node.id).on("click", ()=>{
                    $(".annotation").each((i, ele)=>{
                        
            
                        if(!ids.includes($(ele).attr("id"))){
                            $(ele).addClass("hidden");
                        }else{
                            $(ele).removeClass("hidden");
                        }
                    })
                    
                })
            }
        })
    }
}

export default rangy;