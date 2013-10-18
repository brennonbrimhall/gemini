$(document).ready(function() {
    $('#team-lookup').dataTable({
        "bPaginate": false,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "aoColumns": [
            { "sType": "numeric-html" }
        ],
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    } );
} );