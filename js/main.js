// duration of scroll animation
var scrollDuration = 300;
// paddles
var leftPaddle = $('.left-paddle');
var rightPaddle = $('.right-paddle');
$(leftPaddle).hide();
// get items dimensions
var itemsLength = $('.product').length;
var itemSize = $('.product').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

// get wrapper width
var getMenuWrapperSize = function () {
  return $('#products').outerWidth();
};
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function () {
  menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function () {
  return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function () {
  return $('.products').scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
$('.products').on('scroll', function () {
  // get how much of menu is invisible
  menuInvisibleSize = menuSize - menuWrapperSize;
  // get how much have we scrolled so far
  var menuPosition = getMenuPosition();

  var menuEndOffset = menuInvisibleSize - paddleMargin;

  // show & hide the paddles
  // depending on scroll position
  if (menuPosition <= paddleMargin) {
    $(leftPaddle).hide();
    $(rightPaddle).show();
  } else if (menuPosition < menuEndOffset) {
    // show both paddles in the middle
    $(leftPaddle).show();
    $(rightPaddle).hide();
  } else if (menuPosition >= menuEndOffset) {
    $(leftPaddle).show();
    $(rightPaddle).hide();
  }
});

// scroll to left
$('#rightPaddle').click(function (e) {
  $('#products').animate({ scrollLeft: menuInvisibleSize }, scrollDuration);
});

// scroll to right
$('#leftPaddle').click(function (e) {
  e.preventDefault();
  $('#products').animate({ scrollLeft: '0' }, scrollDuration);
});
