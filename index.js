import m from 'mithril';

const stateObj = () => ({
	count: 100,
	requestRef: undefined,
	previousTimeRef: undefined,
});

const countDown = () => {
	
	// Initialize state object
	let state = stateObj();
	
	const animate = time => {
						
		if( state.previousTimeRef !== undefined ){
			const deltatime = time - state.previousTimeRef;
			
			//Update count
			state.count = state.count <= 0 ? state.count = 100 : (state.count - deltatime * 0.01) % 100;
			
			//Redraw component after count is updated
			m.redraw();
		}
		
		state.previousTimeRef = time;
		state.requestRef = requestAnimationFrame(animate);
	}
	
	const startAnimation = () => {
		state.requestRef = requestAnimationFrame(animate);
	}
	
	const stopAnimation = () => {
		cancelAnimationFrame(state.requestRef);
		state = stateObj();
	}
	
	return {
		
		oncreate: () => {
			startAnimation();
		},
		
		view: () => [
			m('.number', Math.round(state.count)),
			
			m('button.stop',{
				onclick: () => stopAnimation(),
			},'Stop'),
			
			m('button.start',{
				onclick: () => startAnimation(),
			},'Start'),
		]
	}
}

document.getElementById("app") && m.mount( document.getElementById('app'), {
	view: vnode => m(countDown)
});