$(document).ready(function() {
    $('#averages-table').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": false,
        "aoColumnDefs": [
			{ "sType": "numeric-html", "aTargets": [ 0 ] }
		],
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap",
    } );
} );