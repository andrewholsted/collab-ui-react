
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <p>The following snippet of text is <em>rendered as italicized text</em>.</p>`}} />

              /* eslint-enable */
              }
            }
          