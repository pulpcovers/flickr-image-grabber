// ==UserScript==
// @name         Flickr Image Dragger
// @namespace    https://www.flickr.com/
// @version      1.0
// @description  Allows dragging of images on Flickr sizes pages by removing the transparent overlay ("spaceball").
// @author       PulpCovers.com
// @match        https://www.flickr.com/photos/*/sizes/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function enableDragging() {
        // The main image on 'sizes' pages is usually inside a div with id 'allsizes-photo'
        const container = document.getElementById('allsizes-photo');

        if (container) {
            const imgs = container.getElementsByTagName('img');
            
            if (imgs.length > 0) {
                const mainImage = imgs[0];
                
                // 1. Enable pointer events on the image itself
                mainImage.style.pointerEvents = 'auto';
                mainImage.setAttribute('draggable', 'true');

                // 2. Remove any sibling elements (overlays/spaceballs) that might be blocking the image
                // Convert children to an array to safely iterate while removing
                Array.from(container.children).forEach(child => {
                    if (child !== mainImage) {
                        // Option A: Remove the overlay completely
                        child.remove();
                        
                        // Option B: Just make it "clickable-through" (safer if the overlay has other purposes)
                        // child.style.pointerEvents = 'none'; 
                    }
                });

                console.log('Flickr Image Dragger: Overlay removed and dragging enabled.');
            }
        }
    }

    // Run immediately
    enableDragging();

    // Also run on window load to ensure all assets are ready
    window.addEventListener('load', enableDragging);

})();
