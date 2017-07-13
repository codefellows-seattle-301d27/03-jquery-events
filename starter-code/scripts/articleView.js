'use strict';

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    var authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from an attribute in `this` article element,
      //       and then use that bit of text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');
      optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      category = $(this).attr('data-category');
      optionTag = '<option value="' + category + '">' + category + '</option>';
      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we're
    //         defining. "$(this)" is using jQuery to select that element, so we can chain jQuery methods
    //         onto it.
    var authorName = $(this).val();
    if ($(this).val()) {
      // TODO: If the select box was changed to an option that has a value, we need to hide all the articles,
      //       and then show just the ones that match for the author that was selected.
      //       Use an "attribute selector" to find those articles, and fade them in for the reader.
      // estimated time 25 min actual time 40 min
      $('article').fadeOut();

      $('article[data-author="'+ authorName +'"]').fadeIn();

    } else {
      // TODO: If the select box was changed to an option that is blank, we should
      //       show all the articles, except the one article we are using as a template.
      // Estimated time : 5 mins, It actually took: 10 mins
      $('article:not(.template)').fadeIn();

    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
  //       When an option with a value is selected, hide all the articles, then reveal the matches.
  //       When the blank (default) option is selected, show all the articles, except for the template.
  //       Be sure to reset the #author-filter while you are at it!
  // Estimated 20 mins, It actually took : 30 mins
  $('#category-filter').on('change', function() {
    var category = $(this).val()
    if (category) {
      $('article').fadeOut();
      var selector = 'article[data-category="'+ category +'"]'
      $(selector).fadeIn();
    } else {
      $('article:not(.template)').fadeIn();
    }
  })
}

articleView.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav elements that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  //  Estimated time: 15 mins, It actually took: 25 mins
  $('.tab').on('click', function(){
    let tabName = $(this).find('a').attr('class')
    if (tabName === 'icon-home') {
      $('#about').fadeOut();
      $('#articles').fadeIn();
    } else if (tabName === 'icon-address-book') {
      $('#articles').fadeOut();
      $('#about').fadeIn();
    }

  })


  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any article body.

  // TODO: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

  // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  // Estimated time 5 mins, it took us 15 minutes


  $('.read-on').on('click', function(e){
    e.preventDefault();
    console.log($(this).text())
    if ($(this).text()[0] === 'R') {
      $(this).parents().first().find('* :nth-of-type(n+2)').show()
      $(this).text('Show Less')
    } else if ($(this).text()[0] === 'S'){
      $(this).parents().first().find('* :nth-of-type(n+2)').hide()
      $(this).html('Read on &rarr;')
    }
  })




};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
//estimated time 15 min, actual time 10 min
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
