import React from 'react';
import AreaInput from './AreaInput';

class Where extends React.Component {

	//TODO: Keep it? It is more optimized but more risky
	shouldComponentUpdate() {
		// Should update only when getting init data, because after there is no more changes
		return (this.props.areas.length === 0);
	}

	render() {
		return (
			<section>
				<header>
					<h1>Where?</h1>
					<p>Choose one or more places of your desired weather</p>
					<blockquote>
						Wherever you go, no matter what the weather, always bring your own sunshine.<br/>
						Anthony J. D&#39;Angelo
					</blockquote>
				</header>
				<form>
					{
						this.props.areas.map((area) => (
							<div key={area.id}>
								<AreaInput area={area} onToggle={this.props.onSelectArea}></AreaInput>
							</div>
						))
					}
				</form>
				<footer>
					<button onClick={this.props.onClickNext}>Last question</button>
				</footer>
			</section>
		);
	}
}

export default Where;
