/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import VerticalMenu from '../index';
import { SocialItem } from '../items';

const announceIt = console.log.bind( console );

export default class VerticalMenuExample extends React.Component {
	static displayName = 'VerticalMenu';

	render() {
		return (
			<div>
				<h3>Social Items</h3>
				<VerticalMenu onClick={ announceIt }>
					<SocialItem service="google" />
					<SocialItem service="facebook" />
					<SocialItem service="wordpress" />
					<SocialItem service="linkedin" />
					<SocialItem service="twitter" />
				</VerticalMenu>
			</div>
		);
	}
}
