
export default {
    state: {
        name: 'aa',
        chapters: [],
        index: 0
    },

    action: {
        reading(payload) {
            return new Promise(resolve => {
                setTimeout(() => resolve(payload), 1000);
            });
        },
        next: () => 1,
        prev: () => -1
    },

    reducer: {
        reading(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        },

        next(state, {payload: index}) {
            return {
                ...state,
                index: state.index + index
            };
        },

        prev(state, {payload: index}) {
            return {
                ...state,
                index: state.index + index
            };
        },

        finish(state, {payload}) {
            return state;
        }
    }
};
