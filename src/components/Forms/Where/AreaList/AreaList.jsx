import React from 'react';
import AreaItem from './AreaItem/AreaItem';

function AreaList(props) {

	return (
		<ul>
			{
				props.areas.map(area =>
					(
						<AreaItem
							area={area}
							onDeselect={props.onDeselectArea}
							key={area.id}/>
					)
				)
			}
		</ul>
	);
}

export default AreaList;
