const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { authUser } = require("../basicAuth");
const { canViewProject, canDeleteProject, scopedProjects } = require("../permissions/project");

router.get("/", authUser, (req, res) => {
	res.json(scopedProjects({ user: req.user, projects }));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
	res.json(req.project);
});

router.delete("/:projectId", setProject, authUser, authDeleteProject, (req, res) => {
	res.send("Deleted Successfully");
});

function setProject(req, res, next) {
	const projectId = parseInt(req.params.projectId);
	req.project = projects.find(project => project.id === projectId);

	if (req.project == null) {
		res.status(404);
		return res.send("Project not found");
	}
	next();
}

function authGetProject(req, res, next) {
	if (!canViewProject({ user: req.user, project: req.project })) {
		res.status(401);
		res.send("Unable to view project");
	}
	next();
}

function authDeleteProject(req, res, next) {
	if (!canDeleteProject({ user: req.user, project: req.project })) {
		res.status(401);
		res.send("You cannot delete a project that does not belong to you");
	}
	next();
}

module.exports = router;
