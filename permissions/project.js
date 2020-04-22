const { ROLE } = require("../data");

function canViewProject({ user, project }) {
	return user.role === ROLE.ADMIN || project.userId === user.id;
}

function scopedProjects({ user, projects }) {
	if (user.role === ROLE.ADMIN) {
		return projects;
	}

	return projects.filter(project => project.userId === user.id);
}

// admins CANNOT delete projects of others
function canDeleteProject({ user, project }) {
	return user.id === project.userId;
}

module.exports = {
	canViewProject,
	scopedProjects,
	canDeleteProject
};
