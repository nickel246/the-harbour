import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import IconExternalLink from '@theme/Icon/ExternalLink';

/*
Required props:
- label - string: text to display in navbar item
- ?graphic - string: css class to display a graphic in place of text.  Check out some of the navbar items in custom.css for examples
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
export default function ConditionalNavbarItem({ label, graphic, to, href, showIn }) {
    const currLocation = useLocation().pathname;

    let locationIndex = -1;
    if (typeof showIn !== 'string') { // if showIn is an array, check if current location is valid
        for (let i = 0; i < showIn.length; i++) {
            if (currLocation.includes(showIn[i])) { // check if current location is valid
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
    let isActive = false;

    if (to) { // if called with "to", render as standard item
        toFinal = (typeof to === 'string') ? to : to[locationIndex];
        isActive = currLocation.includes(toFinal)

        return (
            <Link 
                // render navbar item; render as active if already in destination dir
                className={`navbar__item navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                to={toFinal} >
                {label}
            </Link>
        );
    }
    else if (href) { // if called with "href", render as external link
        hrefFinal = (typeof href === 'string') ? href : href[locationIndex];
        if (graphic) {
            return (
                <div class="tooltip">
                <Link 
                    // render navbar item; render as active if already in destination dir
                    className={`navbar__item navbar__link ${graphic ? graphic : ''}`}
                    href={hrefFinal} >
                    {graphic ? '' :label}
                    {graphic ? '' : <IconExternalLink {...{width: 12, height: 12}} />}
                </Link>
                <span class="tooltiptext">{label}</span> </div>
            );
        }
        else {
            return (
                <Link 
                    // render navbar item; render as active if already in destination dir
                    className={'navbar__item navbar__link'}
                    href={hrefFinal} >
                    {label}
                    <IconExternalLink {...{width: 12, height: 12}} />
                </Link>
            );
        }
    }
    return null; // don't render item if neither "to" or "href" is defined
}