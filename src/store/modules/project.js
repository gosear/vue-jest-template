const state = {
  project_id: "1",
  project_name: ""
};

const mutations = {
  MODIFY_PROJECTID(state, id) {
    state.project_id = id;
  },
  ADD_PROJECTNAME(state, name) {
    state.project_name = name;
  }
};

export default {
  state,
  mutations
};
