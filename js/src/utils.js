/**
 * Whale Assets: Utilities
 */

// const tester = function(tmp) {
//     console.log(`Hello ${ tmp } from tester module`);
// }

export const displayAlert = function(msg, type = 'info') {
  const containerClass = 'whale-container';

  const alertDiv = document.createElement('div');

  alertDiv.className = `alert alert-${type}`;
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerHTML = `
      ${msg}
      &nbsp;<button type="button" class="close" data-dismiss="alert">×</button>
  `;

  document.querySelector(`.${containerClass}`).insertAdjacentElement('afterbegin', alertDiv);

  setTimeout(() => $(alertDiv).fadeOut(), 3000);
}

// export { tester, displayAlert };
