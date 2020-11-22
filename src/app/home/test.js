$( '.checkboxlist' ).on( 'click', 'input:checkbox', function () {
    $( this ).parent().toggleClass( 'highlight', this.checked );
 });

 console.log("ASD");