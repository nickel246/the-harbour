import React from 'react';
import { useLocation } from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {useWindowSize} from '@docusaurus/theme-common';

/*
Required props:
- label - string: text to display in navbar item
- graphic? - string: css class to display a graphic in place of text.  Check out some of the navbar items in custom.css for examples
- One of:
    to - string or array of strings*: internal path (ie doc) to navigate to when on the corresponding page
    href - string or array of strings*: external link (github, discord, etc.) to navigate to when on the corresponding page
    
    * If showIn is a string, to/href must also be a string.  
      If showIn is an array, to/href can be either a string or array of the same length
- showIn - string or array of strings: path(s) where the navbar item should be displayed

If showIn and to/href are arrays, then the navbar item will display the to/href link at the same index as the valid location in showIn.
For example, if showIn = ['one', 'two'] and to = ['oneLink', 'twoLink'], then the navbar item will display 'oneLink' when the user is
on a page with 'one' in the path, and 'twoLink' when the user is on a page with 'two' in the path.
*/
export default function ConditionalNavbarItem({ label, graphic, to, href, showIn, mobile }) {
    const currLocation = useLocation().pathname;

    let locationIndex = -1;
    if (typeof showIn !== 'string') { // if showIn is an array, check if current location is valid
        for (let i = 0; i < showIn.length; i++) {
            if (currLocation.search(new RegExp(showIn[i])) >= 1) { // check if current location is valid
                locationIndex = i;
                break;
            }
        }
        if (locationIndex === -1) { // don't render item if not in valid location
            return null;
        }
    }

    let toFinal = null;
    let hrefFinal = null;

    if (to) { // if called with "to", render as standard item
        toFinal = (typeof to === 'string') ? to : to[locationIndex];
        return <DefaultNavbarItem to={toFinal} label={label} mobile={mobile} />;
    }
    else if (href) { // if called with "href", render as external link
        hrefFinal = (typeof href === 'string') ? href : href[locationIndex];
        if (graphic) {
            if (useWindowSize() === "mobile") {
                return ( // on mobile view
                    <DefaultNavbarItem 
                        className={graphic + "-mobile"} 
                        href={hrefFinal} 
                        label={<span class="navbar-label-mobile">{label}</span>}
                        mobile={mobile} 
                    />
                );
            }
            return ( // on desktop view
                <div class= "tooltip">
                    <DefaultNavbarItem className={graphic} href={hrefFinal} mobile={mobile} />
                    <span class="tooltiptext">{label}</span> 
                </div>
            );
        }
        // no graphic
        return <DefaultNavbarItem href={hrefFinal} label={label} mobile={mobile} />;
    }
    return null; // don't render item if neither "to" or "href" is defined
}