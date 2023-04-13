var title = '<h1><a href="/">minaizamina</a></h1>';


let md = window.markdownit({html: true});

var width;

$("document").ready(function(){
    width = $(window).width();
    displayText();
});

$("#handle").draggable({
    grid: [50, 50],
    axis: "x",
    containment: "#container",
    zIndex: 100,
    drag: function(event, ui){
        ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);

        let x = ui.position.left + 12.5;

        $("#left").css( "width", x );
        $("#left")[ 0 ].style.setProperty( '--title-fontsize',  x / window.innerWidth );
    }
});
function loadProject( url ) {
    $.ajax({
        url: url,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#left`).html( '<div id="title">' + title + '</div>' + html);
        }
    });
    
    var imageURL = url.split( '.md' ).shift( ) + '-images.md';
    $.ajax({
        url: imageURL,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html( html );
        }
    });
}
function displayText(){
    $("#title").html(title);

    $.ajax({
        url: `md/projects.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);

            $( '#right a' ).click( function( event ) {
                event.preventDefault( );

                loadProject( $( this ).attr( 'href' ) );
            } );
        }
    });

    $.ajax({
        url: `md/bio.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#left`).append(html);
        }
    });
}
/* 
const handle = document.getElementById( 'handle' );

handle.addEventListener( 'dragstart', event => {
    handle.classList.add( 'dragging' );  
    //console.log( event.offsetX );
} );
handle.addEventListener( 'drag', event => {
    handle.classList.add( 'dragging' );  

    //console.log( event );
} );
handle.addEventListener( 'dragend', event => {
    handle.style.left = event.screenX + 'px';
} );
// document.addEventListener( 'mousemove', event => {

//     // ABORT MISSION IF SLIDER IS NOT CLICKED
//     if ( handle.classList.contains( 'dragging' ) == false ) return;

//     // CODE ONLY GETS EXECUTED WHEN THE SLIDER IS CLICKED
//     handle.style.left = event.clientX + 'px';
    
// } );
// document.addEventListener( 'mouseup', ( ) => {
//     handle.classList.remove( 'dragging' );  
// } );

console.log( handle )

*/