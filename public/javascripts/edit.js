$(document).ready(function() {
    $('#schedule-table').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
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
            null,
            { "sType": "numeric-html" },
            { "sType": "numeric-html" }
        ],
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    } );
    
    $('#match-table').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    });
    
    $('#pit-table').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    });
} );