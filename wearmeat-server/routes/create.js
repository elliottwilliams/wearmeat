var express = require('express');
var router = express.Router();
var data = require('../lib/data');

/* GET home page. * /
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res) {
	res.render('create');
});

router.post('/', function(req, res){
	var groupId = createGroupId();
	var newGroup = data.createGroup( groupId, 
		buildOptions(req),
		buildDests(req)  );
	data.addGroup( newGroup );

	//redirect to new page
	//The first member will be added then
	res.redirect( "/?id="+groupId );

	console.log(data.groups);
});

//Several helper/extensibility functions
function createGroupId(){
	var groupId = ""+Math.floor( 1000000*Math.random() );
	return groupId;
}
function buildDests( req ){
	var dests = [
		{ name:'Wiley',
			location:{ longitude:20.000,
				latitude:20.000}
		},
		{ name:'Windsor',
			location: {longitude:20.020,
				latitude:20.010}
		}
	]
	return dests;
}
function buildOptions( req ){
	return {};
}

module.exports = router;
