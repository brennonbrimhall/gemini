jQuery.fn.dataTableExt.oSort['numeric-html-asc']  = function(a,b) {
    a = parseInt($(a).text());
    b = parseInt($(b).text());
    return ((a < b) ? -1 : ((a > b) ?  1 : 0));
};
 
jQuery.fn.dataTableExt.oSort['numeric-html-desc']  = function(a,b) {
    a = parseInt($(a).text());
    b = parseInt($(b).text());
    return ((a < b) ? 1 : ((a > b) ?  -1 : 0));
};