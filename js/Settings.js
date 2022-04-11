export default class Settings {
	constructor(planning = false) {
		this.planning = planning;
	}

	set planningPhase(planning) {
		this.planning = planning;
		return planning;
	}
}
