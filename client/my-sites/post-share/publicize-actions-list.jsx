/**
 * External dependencies
 */
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import {
	getPostShareScheduledActions,
	getPostSharePublishedActions,
} from 'state/selectors';
import QuerySharePostActions from 'components/data/query-share-post-actions/index.jsx';
import CompactCard from 'components/card/compact';
import SocialLogo from 'social-logos';
import EllipsisMenu from 'components/ellipsis-menu';
import PopoverMenuItem from 'components/popover/menu-item';
import {
	SCHEDULED,
	PUBLISHED,
} from './constants';

class PublicizeActionsList extends PureComponent {
	static propTypes = {
		section: PropTypes.string,
		siteId: PropTypes.number,
		postId: PropTypes.number,
	};

	static defaultProps = {
		section: SCHEDULED,
	};

	renderFooterSectionItem( {
		connectionName,
		message,
		shareDate,
		service,
	}, index ) {
		const { translate } = this.props;
		return (
			<CompactCard className="post-share__footer-items" key={ index }>
				<div className="post-share__footer-item">
					<div className="post-share__handle">
						<SocialLogo icon={ service === 'google_plus' ? 'google-plus' : service } />
						<span className="post-share__handle-value">
							{ connectionName }
						</span>
					</div>
					<div className="post-share__timestamp">
						<Gridicon icon="time" size={ 18 } />
						<span className="post-share__timestamp-value">
							{ shareDate }
						</span>
					</div>
					<div className="post-share__message">
						{ message }
					</div>
				</div>

				<EllipsisMenu>
					<PopoverMenuItem icon="visible">
						{ translate( 'Preview' ) }
					</PopoverMenuItem>
					<PopoverMenuItem icon="pencil">
						{ translate( 'Edit' ) }
					</PopoverMenuItem>
					<PopoverMenuItem icon="trash">
						{ translate( 'Trash' ) }
					</PopoverMenuItem>
				</EllipsisMenu>
			</CompactCard>
		);
	}

	renderActionsList( status = SCHEDULED ) {
		if ( this.props.section !== status ) {
			return null;
		}

		const {
			postId,
			scheduledActions,
			publishedActions,
			siteId,
		} = this.props;

		const actions = status === SCHEDULED ? scheduledActions : publishedActions;

		return (
			<div>
				<QuerySharePostActions siteId={ siteId } postId={ postId } status={ status } />
				{ actions.map( ( item, index ) => this.renderFooterSectionItem( item, index ) ) }
			</div>
		);
	}

	render() {
		return (
			<div className="post-share__actions-list">
				<div className="post-share__scheduled-list">
					{ this.renderActionsList( SCHEDULED ) }
				</div>

				<div className="post-share__published-list">
					{ this.renderActionsList( PUBLISHED ) }
				</div>
			</div>
		);
	}
}

export default connect(
	( state, { postId, siteId } ) => {
		return {
			scheduledActions: getPostShareScheduledActions( state, siteId, postId ),
			publishedActions: getPostSharePublishedActions( state, siteId, postId ),
		};
	},
)( localize( PublicizeActionsList ) );
