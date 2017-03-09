import React, { PropTypes } from 'react';

const style = {
    borderRadius: '100%',
    margin: 15,
    width: 70,
    height: 70,
};

export const Man = ({ color }) => (
    <div
        style={{
            ...style,
            backgroundColor: color,
        }}
    />
);

Man.propTypes = {
    color: PropTypes.string.isRequired,
};

export default Man;
