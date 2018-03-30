import React from 'react';
import PropTypes from 'prop-types';
import AreaItem from './AreaItem/AreaItem';

function AreaList(props) {
	return <ul>{props.areas.map(area => <AreaItem area={area} onDeselect={props.onDeselectArea} key={area.id} />)}</ul>;
}

AreaList.propTypes = {
	areas: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string
		})
	),
	onDeselectArea: PropTypes.func
};

export default AreaList;
