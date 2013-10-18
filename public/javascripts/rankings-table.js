$(document).ready(function() {
    $('#rankings').dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "aoColumns": [
            { "sType": null },
            { "sType": "numeric-html" },
            { "sType": null },
            { "sType": null },
            { "sType": null },
            { "sType": null }
        ],
        "bInfo": false,
        "bAutoWidth": true,
        "sPaginationType": "bootstrap"
    } );
} );