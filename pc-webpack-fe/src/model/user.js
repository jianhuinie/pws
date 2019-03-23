export default {

    state: {
        name: 'wfsr',
        sex: 'man',
        role: []
    },

    action: {
        login() {
            return {
                name: 'chris',
                sex: 1,
                role: [
                    'admin',
                    'user',
                    'editor'
                ]
            };
        }
    },

    reducer: {
        login(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        }
    }
};
