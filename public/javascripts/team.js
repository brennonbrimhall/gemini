function pause() {
	$('.carousel').carousel('pause');
}

$(document).ready(function() {
	$('.carousel').carousel({
		pause: true,
		interval: false
	});
		
    $('#schedule-table').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "aoColumns": [
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            { "sType": "numeric-html" },
            null,
            null
        ],
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    } );
    
    $('#auto-individual').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    });
    
    $('#cycle-individual').dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    });
} );