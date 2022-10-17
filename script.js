// ==UserScript==
// @name         freevee Ad Skipper | Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Skip ads on Freevee
// @author       jumoog
// @include      /https?:\/\/(?:www\.)?amazon(?:\.[a-z]+){1,2}\/gp\/video\/detail\/.+/
// @icon         https://www.amazon.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('atvwebplayersdk-adtimeindicator-text')) {
                        document.querySelector('div[class^="rendererContainer"]').querySelector('video').muted = true;
                        document.querySelector('div[class^="rendererContainer"]').querySelector('video').playbackRate = 16.0;
                    }
                });
                mutation.removedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('atvwebplayersdk-adtimeindicator-text')) {
                        document.querySelector('div[class^="rendererContainer"]').querySelector('video').muted = false;
                        document.querySelector('div[class^="rendererContainer"]').querySelector('video').playbackRate = 1.0;
                        document.querySelector('div[class^="rendererContainer"]').querySelector('video').currentTime = document.querySelector('div[class^="rendererContainer"]').querySelector('video').currentTime - 3.0;
                    }
                });
            }
        });
    });

    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
