import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import {
  Avatar,
  Icon,
  ListItem,
  ListItemSection 
} from '@collab-ui/react';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class SpaceListItem extends React.PureComponent {
  static displayName = 'SpaceListItem';

  state = {
    id: uniqueId(
      (this.props.id && `${this.props.id}-`) || 'cui-space-list-item-'
    )
  };

  render() {
    const {
      attachments,
      className,
      childrenLeft,
      childrenRight,
      header,
      headerSecondary,
      highlightColor,
      isAlertOn,
      isBold,
      isMentioned,
      isMuted,
      isOverview,
      isUnread,
      resultRight,
      searchTerm,
      subheader,
      title,
      type,
      ...props
    } = this.props;
    const { id } = this.state;

    const getTitle =
      (!title && typeof header === 'string')
        ? header
        : title;

    const getIcon = () => {
      if (isMuted) {
        return <Icon color="$white-60" name="alert-muted_12" />;
      } else if (isUnread) {
        return (
          <i
            style={{ fontSize: '12px', color: '#07C1E4' }}
            className="icon icon-unread-badge_16"
          />
        );
      } else if (isMentioned) {
        return <Icon color="blue" name="mention_12" />;
      } else if (isAlertOn) {
        return <Icon color="$white-60" name="alert_12" />;
      }

      return null;
    };

    const leftSection = isOverview 
      ? (
        <Avatar isOverview icon={<Icon name="handset_24" />} />
      ) : (
        childrenLeft
      );

    const rightSection = (
      <ListItemSection key="child-2" position="right">
        {childrenRight ? childrenRight : getIcon()}
      </ListItemSection>
    );

    const addEscapes = text =>
      text && text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") || '';

    const highlightSubheader = () => {
      const escapedTerm = addEscapes(searchTerm);
      const re = new RegExp(`(${escapedTerm})`, 'gi');

      return searchTerm && typeof subheader === 'string'
        ? subheader.split(re)
          .map((ele, idx) =>
            ele.match(re) 
              ? (
                <span
                  key={`subheader-${idx}`}
                  className="cui-list-item__subheader--highlight"
                  style={{ color: highlightColor }}
                >
                  {ele}
                </span>
              ) : ele
          )
        : subheader;
    };

    const highlightHeader = () => {
      const escapedTerm = addEscapes(searchTerm);
      const re = new RegExp(`(${escapedTerm})`, 'gi');

      return searchTerm && typeof header === 'string'
        ? header.split(re)
          .map((ele, idx) =>
            ele.match(re) 
              ? (
                <span
                  key={`header-${idx}`}
                  className="cui-list-item__header--highlight"
                  style={{ color: highlightColor }}
                >
                  {ele}
                </span>
              ) : ele
          )
        : header;
    };

    const getHeader = ['search', 'filter', 'flag', 'filter-search'].includes(type)
      ? [
          <span key="header-0" className="cui-list-item__header-main">{header}</span>,
          headerSecondary && (
            <span className="cui-list-item__header-secondary" key="header-1">
              {headerSecondary}
            </span>
          )
        ]
      : highlightHeader();

    const children = [
      <ListItemSection key="child-0" position="left">
        {leftSection || <Avatar title="NA" />}
      </ListItemSection>,
      <ListItemSection key="child-1" position="center">
        <div
          className={
            'cui-list-item__header' +
            `${((searchTerm || isOverview) && ` cui-list-item__header--overview`) || ''}`
          }
        >
          {getHeader}
        </div>
        {['search', 'filter', 'flag', 'filter-search'].includes(type) 
          ? (
            <ListItemSection
              position="center"
              className="cui-list-item__result-container"
            >
              {['flag'].includes(type) 
                ? (
                  <ListItemSection
                    position="center"
                    key="attachment-line-1"
                    className="cui-list-item__attachment"
                  >
                    <div className="cui-list-item__attachment--top">
                      <ListItemSection
                        position="center"
                        className="cui-list-item__attachment--top-left">
                        {highlightSubheader(subheader)}
                      </ListItemSection>
                      {resultRight && (
                        <ListItemSection
                          position="right"
                          className="cui-list-item__attachment--top-right">
                          {resultRight}
                        </ListItemSection>
                      )}
                    </div>
                    {attachments &&
                      attachments.length && (
                        <div className="cui-list-item__attachment--bottom">
                          {attachments[0]}
                        </div>
                    )}
                  </ListItemSection>
                ) : (
                  <div className="cui-list-item__result">
                    {highlightSubheader(subheader)}
                  </div>
                )
              }
            </ListItemSection>
          ) : (
            <div className="cui-list-item__subheader">{subheader}</div>
          )
        }
      </ListItemSection>,
      ...(!type ? [rightSection] : [])
    ];

    return (
      <ListItem
        className={
          `${(isBold && ` cui-list-item--unread`) || ''}` +
          `${(type && ` cui-list-item--space-${type}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type="space"
        {...props}
      >
        {children}
      </ListItem>
    );
  }
}

SpaceListItem.defaultProps = {
  attachments: null,
  className: '',
  childrenLeft: null,
  childrenRight: null,
  headerSecondary: '',
  highlightColor: '',
  id: '',
  isAlertOn: false,
  isBold: false,
  isOverview: false,
  isMentioned: false,
  isMuted: false,
  isUnread: false,
  resultRight: null,
  subheader: '',
  type: ''
};

SpaceListItem.propTypes = {
  /** ListItem Attachment Array */
  attachments: PropTypes.arrayOf(PropTypes.node),
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** Children for left section */
  childrenLeft: PropTypes.node,
  /** Children for right section */
  childrenRight: PropTypes.node,
  /** ListItem header */
  header: PropTypes.node.isRequired,
  /** Secondary Header for center Section */
  headerSecondary: PropTypes.string,
  /** Highlight Color for Regex */
  highlightColor: PropTypes.string,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** SpaceListItem Boolean */
  isAlertOn: PropTypes.bool,
  /** SpaceListItem Boolean */
  isBold: PropTypes.bool,
  /** SpaceListItem Boolean */
  isOverview: PropTypes.bool,
  /** SpaceListItem Boolean */
  isMentioned: PropTypes.bool,
  /** SpaceListItem Boolean */
  isUnread: PropTypes.bool,
  /** SpaceListItem Boolean */
  isMuted: PropTypes.bool,
  /** Children for result right section */
  resultRight: PropTypes.node,
  /** ListItem searchTerm */
  searchTerm: PropTypes.string,
  /** ListItem subheader */
  subheader: PropTypes.node,
  /** ListItem title */
  title: PropTypes.string,
  /** ListItem type */
  type: PropTypes.oneOf([
    '',
    'search',
    'filter-summary',
    'filter',
    'flag',
    'filter-search'
  ])
};

export default SpaceListItem;

/**
* @name Space List
*
* @category containers
* @component list-item
* @section space
*
* @js
*
import { List, SpaceListItem, ListItemHeader, Icon } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List style={{backgroundColor: 'black'}}>
          <SpaceListItem isOverview header='Overview Item' />
          <SpaceListItem header='Header Only'/>
          <SpaceListItem header='Bold Unread' isBold isUnread/>
          <SpaceListItem header='Bold Mentioned' isBold isMentioned/>
          <SpaceListItem header='isAlertOn' isAlertOn/>
          <SpaceListItem header='isMuted' isMuted/>
          <SpaceListItem header='Disabled' subheader='subheader' disabled/>
          <SpaceListItem header='Subheader as Node' subheader={<span style={{color: '#98D5CA'}}>Marketing</span>}/>
          <ListItemHeader header='List Header-Type(space)' children={<a>More</a>} type='space'/>
          <SpaceListItem header='Header with SearchTerm' searchTerm='search'/>
          <SpaceListItem header='Both Headers w/ SearchTerm' subheader='Searchable subheader' searchTerm='search'/>
          <SpaceListItem header='Subheader(node)-searchTerm' subheader={<span style={{color: '#D7ABE1'}}>Searching</span>} searchTerm='search'/>
          <SpaceListItem header='Type(search)' headerSecondary='16:00' subheader='HighlightColor changes search color' searchTerm='search' type='search' highlightColor='white'/>
          <SpaceListItem header='Type(filter)' headerSecondary='12/03/2018' subheader='headerSecondary=string' searchTerm='Barbara' type='filter' />
          <SpaceListItem header='Type(filter-search)' headerSecondary='12/03/2018' subheader='For search after a (filter)' type='filter-search' searchTerm='(filter)'/>
          <SpaceListItem header='Type(filter-summary) (8)' type='filter-summary' childrenLeft={<Icon name='alert_12' />}/>
          <SpaceListItem header='Type(flag)-attachments' attachments={[<span><Icon name='document_12' />  <span>Ideas.pdf</span></span>]} subheader='resultRight=node, attachments=[node]' headerSecondary='12/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
          <SpaceListItem header='Type(flag)' subheader='header&subheader=node' headerSecondary='08/03/2018' type='flag' resultRight={<Icon name='flag-active_12'/>}/>
        </List>
      </div>
    );
  }
}
**/
