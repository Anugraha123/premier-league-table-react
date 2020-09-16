import React from 'react';

export default ({columns}) => {
	return (
		<thead>
			<tr>
				{
					columns.map(({title}, index) => {
						return (
							<th key={title+index}>
								{title}
							</th>
						)
					})
				}
			</tr>
		</thead>
  );
}
