var ExampleData = {};

ExampleData.example_data = [
    {
        label: 'BIM',
        id: 1,
        children: [
		{label:'Bim Manager',id:2,children:[
		{label:'Option1',id:8,children:[]},
		{label:'Option2',id:9,children:[]},
		{label:'Option3',id:10,children:[
		{label:'Option',id:9,children:[]},]},
		]},
		{label:'Clash Detection',id:3,children:[]},
		{label:'Bim Mobile',id:4,children:[]}
            
        ]
    },{label:'Core Services',id:5,children:[
	
	{label:'System Options',id:6,children:[]},
	{label:'Projects',id:7,children:[]},
	]}
    
];

ExampleData.getFirstLevelData = function(nodes) {
    if (! nodes) {
        nodes = ExampleData.example_data;
    }

    var data = [];

    $.each(nodes, function() {
        var node = {
            label: this.label,
            id: this.id
        };

        if (this.children) {
            node.load_on_demand = true;
        }

        data.push(node);
    });

    return data;
}

ExampleData.getChildrenOfNode = function(node_id) {
    var result = null;

    function iterate(nodes) {
        $.each(nodes, function() {
            if (result) {
                return;
            }
            else {
                if (this.id == node_id) {
                    result = this;
                }

                if (this.children) {
                    iterate(this.children);
                }
            }
        });
    }

    iterate(ExampleData.example_data);

    return ExampleData.getFirstLevelData(result.children);
}