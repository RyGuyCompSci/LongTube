/* Shorts text content for comparison */
const shortsText = "Shorts";
const trendingShortsText = "Trending Shorts";

let canExecute = true;

/**
 * Catch-all to hide shorts content
*/
function hideShortsContent() {
  navigateAwayFromShorts();
  if (!canExecute) {
    return;
  }
  hideShortsOnHomepage();
  hideShortsChannelTab();
  hideShortsNavOnSidebar();
  hideShortsOnTrendingPage();
  hideShortRemixes();
  hideShortResultsInSearch();
}

/**
 * Hides shorts content on YouTube homepage
 */
function hideShortsOnHomepage() {
  const tagName = "ytd-rich-section-renderer";
  queryAsArray(tagName)
    .filter((element) => element.querySelector("div#title-text span#title").innerHTML == shortsText)
    .forEach((element) => element.style.display = "none");
}

/**
 * Hides shorts content on YouTube channel page
 */
function hideShortsChannelTab() {
  const tagName = "yt-tab-shape";
  queryAsArray(tagName)
    .filter((element) => element.textContent == shortsText)
    .forEach((element) => element.style.display = "none");
}

/**
 * Function to hide navigation elements to shorts pages.
*/
function hideShortsNavOnSidebar() {
  const tagName = "ytd-guide-entry-renderer";
  queryAsArray(tagName)
    .filter((element) => element.firstElementChild.title == shortsText)
    .forEach((element) => element.style.display = "none");
}

/**
 * Hides shorts on trending page
 */
function hideShortsOnTrendingPage() {
  const tagName = "ytd-item-section-renderer";
  queryAsArray(tagName)
    .filter((element) => element.querySelector("div#contents div#title-container span#title")?.innerHTML == trendingShortsText)
    .forEach((element) => element.style.display = "none");
}

/**
 * Hide UI elements showing shorts that remix the current video
 */
function hideShortRemixes() {
  const tagName = "ytd-reel-shelf-renderer";
  queryAsArray(tagName)
    .forEach((element) => element.style.display = "none");
}

/**
 * Hide video results from the search page
 */
function hideShortResultsInSearch() {
  const tagName = "ytd-video-renderer";
  queryAsArray(tagName)
    .filter((element) => element.querySelector("a#thumbnail").href.includes("/shorts/"))
    .forEach((element) => element.style.display = "none");
}

/**
 * Gets list of html elements using the query selector function and returns them as an array.
 *
 * @param {string} tagName Tag name to search
 * @returns Array of html elements matching the query
 */
function queryAsArray(tagName) {
  return Array.from(document.querySelectorAll(tagName));
}

/**
 * Function to go to YouTube homepage if we're on a shorts url
 */
function navigateAwayFromShorts() {
  if (window.location.toString().match(/\/shorts/ig)) {
    canExecute = false;
    window.location = "https://youtube.com/";
  }
}

setInterval(hideShortsContent, 100);
