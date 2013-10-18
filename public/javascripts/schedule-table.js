$(document).ready(function() {
    $('#schedule').dataTable({
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
            null
        ],
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    } );
} );