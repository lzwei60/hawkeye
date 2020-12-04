const state = {
    fullWidth: document.documentElement.clientWidth, // 浏览器宽度
	fullHeight: document.documentElement.clientHeight, //浏览器高度
}
const getters = {
	
}

const mutations = {
	SET_fullWidth(state, width) {
		state.fullWidth = width;
    },
    SET_fullHeight(state, height) {
		state.fullHeight = height;
	},
}

const actions = {
	FETCH_fullWidth(commit, width) {
		commit.commit('SET_fullWidth', width)
	},
	FETCH_fullHeight(commit, height) {
		commit.commit('SET_fullHeight', height)
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}
