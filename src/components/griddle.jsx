import React from 'react';
import GriddleReact, { plugins } from 'griddle-react';
import * as tableComponents from './table';

const Griddle = ({ style, docsLoaded, className, components, children, ...props }) => (
  <div
    style={{
      overflow: 'auto',
      width: '100%',
      // ...(!docsLoaded && { opacity: 0.5 }),
      ...style }} className={className}
  >
    <GriddleReact
      components={{
        ...tableComponents,
        ...components,
      }}
      {...props}
      plugins={[plugins.LocalPlugin]}
    >
      {children}
    </GriddleReact>
  </div>
);

export default Griddle;
