const playBtnMarkup = `
		<svg viewBox="0 0 459 459">
			<path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651
			l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416
			c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151
			C315.662,233.564,313.652,237.364,310.292,239.651z"/>
		</svg>
`;

const pauseBtnMarkup = `
		<svg viewBox="0 0 512 512">
			<path d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
		c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
		c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"/>
			</svg>`;

export default class Settings {
	constructor(playCallback = null, pauseCallback = null) {
		this.planning = true;
		this.playCallback = playCallback;
		this.pauseCallback = pauseCallback;
	}

	set setPlanningPhase(planning) {
		this.planning = planning;
		return planning;
	}

	init() {
		const playBtn = document.createElement('div');
		playBtn.id = 'play-btn';
		playBtn.classList.add('active');
		playBtn.insertAdjacentHTML('beforeend', playBtnMarkup);
		playBtn.onclick = () => {
			this.play();
		};

		const pauseBtn = document.createElement('div');
		pauseBtn.id = 'pause-btn';
		pauseBtn.insertAdjacentHTML('beforeend', pauseBtnMarkup);
		pauseBtn.onclick = () => {
			this.pause();
		};

		document.body.append(playBtn);
		document.body.append(pauseBtn);
		window.Settings = this;
	}

	play() {
		const playBtn = document.getElementById('play-btn');
		const pauseBtn = document.getElementById('pause-btn');
		this.planning = false;
		playBtn.classList.remove('active');
		pauseBtn.classList.add('active');
		if (this.playCallback) this.playCallback();
		window.Settings = this;
	}

	pause() {
		const playBtn = document.getElementById('play-btn');
		const pauseBtn = document.getElementById('pause-btn');
		this.planning = true;
		pauseBtn.classList.remove('active');
		playBtn.classList.add('active');
		if (this.pauseCallback) this.pauseCallback();
		window.Settings = this;
	}
}
