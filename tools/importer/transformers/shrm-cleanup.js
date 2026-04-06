/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: SHRM cleanup. Selectors from captured DOM of https://www.shrm.org/home
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove accessibility widget, membership bars, paywall overlays, cookie consent
    WebImporter.DOMUtils.remove(element, [
      'access-widget-ui',
      '.acsb-sr-alert',
      '.acsb-sr-only',
      '.infonotificationbar',
      '.content-metering-card',
      '.pop-over__container',
      '.cmp-page__skiptomaincontent',
      '#onetrust-consent-sdk',
      '#ot-sdk-btn-floating',
    ]);
    // Remove tracking pixels and iframes with bracket-containing URLs that break regex in adjustImageUrls
    element.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('[') || src.includes(']')) img.remove();
    });
    element.querySelectorAll('iframe').forEach((iframe) => {
      const src = iframe.getAttribute('src') || '';
      if (src.includes('[') || src.includes(']') || src.includes('usbrowserspeed') || src.includes('dpmsrv')) iframe.remove();
    });
  }
  if (hookName === H.after) {
    // Remove non-authorable global elements
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.layout-container__wave-wrapper',
      '.overlay-solid',
      '.overlay-gradient',
      'link',
      'noscript',
      'iframe',
    ]);
    // Remove images/elements with bracket-containing URLs (tracking pixels) that break regex in adjustImageUrls
    element.querySelectorAll('img[src*="["], img[src*="]"]').forEach((img) => img.remove());
    element.querySelectorAll('a[href*="usbrowserspeed"], a[href*="dpmsrv"]').forEach((a) => a.remove());
  }
}
