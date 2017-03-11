import React, { PropTypes } from 'react';

require('./Man.css');

export const PLAYER_1_COLOR = '#ff1111';
export const PLAYER_2_COLOR = '#1111ff';

export const Man = ({ color }) => (
    <div className="man" style={{ backgroundColor: color }}/>
);

Man.propTypes = {
    color: PropTypes.string.isRequired,
};

export default Man;
