import React from 'react';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail, VideoList } from './Components';

import youtube from './api/youtube';
import './App.css';

class App extends React.Component {
	state = {
		videos: [],
		selectedVideo: null,
	}

	handleVideoSelect = (event, video) => this.setState({ selectedVideo: video })
	handleSubmit = async (searchTerm) => {
		const response = await youtube.get('search', {
			params: {
				part: "snippet",
				maxResults: 5,
				key: 'AIzaSyBYvdQYWjho3UxMrjsbauPmxT-RG7et650',
				q: searchTerm,
			}

		});
		this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
	}
	render() {
		const { selectedVideo, videos } = this.state;
		return (
			<Grid justify="center" container spacing={10}>
				<Grid item xs={12} >
					<Grid container spacing={10}>
						<Grid item xs={12} >
							<SearchBar onformSumit={this.handleSubmit} />
						</Grid>
						<Grid item xs={8} >
							<VideoDetail video={selectedVideo} />
						</Grid>
						<Grid item xs={4} >
							<VideoList videos={videos} onClick={this.handleVideoSelect} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default App;