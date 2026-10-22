import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import IconExternalLink from '@theme/Icon/ExternalLink';

export default function ConditionalNavbarItem({ label, to, showIn, href }) {
    const currLocation = String(useLocation().pathname);

    let locationIndex = -1;
    for (let i = 0; i < showIn.length; i++) {
        if (currLocation.includes(showIn[i])) { // check if current location is valid
            locationIndex = i;
            break;
        }
    }
    if (locationIndex === -1) { // don't render item if not in valid location
        return null;
    }


    let toFinal = null;
    let hrefFinal = null;
    let isActive = false;

    if (to) { // if called with "to", render as standard item
        toFinal = to[locationIndex];
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
        hrefFinal = href[locationIndex];
        isActive = currLocation.includes(hrefFinal)

        return (
            <Link 
                // render navbar item; render as active if already in destination dir
                className={`navbar__item navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                href={hrefFinal} >
                {label}
                <IconExternalLink {...{width: 12, height: 12}} />
            </Link>
        );
    }
    return null; // don't render item if neither "to" or "href" is defined
}