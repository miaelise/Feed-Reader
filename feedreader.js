/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      //Checks that the feed is defined and length is not 0
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //This test loops through each feed, checking for a defined named
        //that is not empty.
        it('have names', function() {
          for (feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          }
        });

         //This test loops through each feed and checks the URL property
         //to make sure it has a URL defined and that it is not empty.
        it('are defined and not empty', function() {

          for (feed of allFeeds) {
            expect(feed).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });
       });

    //This suite tests the feed menu function.
    describe('The menu', function() {
      const body = document.querySelector('body');
      const menuIcon = document.querySelector('.menu-icon-link');

       //This test checks that the menu is hidden by default.
      it('is hidden by default', function() {
        expect(body.classList).toContain('menu-hidden');

      });

       //This test checks if the menu opens and closes when the icon is clicked.
       it('changes when clicked', function() {
          menuIcon.click();
          expect(body.classList).not.toContain('menu-hidden');
          menuIcon.click();
          expect(body.classList).toContain('menu-hidden');
       });

    });

    //This test checks the feed entries.
    describe('Initial Entries', function() {
      const feed = document.querySelector('.feed');
      const entries = [];
       //This test checks there is at least a single entry after the
       //loadFeed function completes.
       beforeEach(function(done) {
         loadFeed(0, function() {
           Array.from(feed.children).forEach(function(entry) {
             entries.push(entry.innerText);
           });
           done();
         });
       });

       it('loads properly', function() {
         expect(entries.length).not.toBe(0);
       });
   });

    //This suite checks to make new entries load when switching between feeds.
    describe('New Feed Selection', function() {
      const feed = document.querySelector('.feed');
      const firstFeed = [];
      const secondFeed = [];

       //This test loads two feeds asynchronously and checks to make sure
       //they contain different entries.
       beforeEach(function(done) {
         loadFeed(0, function() {
           Array.from(feed.children).forEach(function(entry) {
             firstFeed.push(entry.innerText);
           });
         })
         loadFeed(1, function() {
           Array.from(feed.children).forEach(function(entry) {
             secondFeed.push(entry.innerText);
           })
           done();
         })
       });
       it('changes content', function() {
         firstFeed.forEach(function(entry, index) {
           expect(entry !== secondFeed[index]).toBe(true);
         });
       });
   });
}());

//Special thanks to Matthew Cranford's blog for help with the async tests.
