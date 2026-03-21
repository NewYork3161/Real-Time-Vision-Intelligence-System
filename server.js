const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

/* -------------------------------- */
/* MIDDLEWARE */
/* -------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------- */
/* VIEW ENGINE */
/* -------------------------------- */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* -------------------------------- */
/* STATIC FILES */
/* -------------------------------- */
app.use(express.static(path.join(__dirname, "public")));

/* -------------------------------- */
/* HOMEPAGE (ALL ENTRY ROUTES) */
/* -------------------------------- */
app.get(["/", "/home", "/index"], (req, res) => {
    res.render("index");
});

/* -------------------------------- */
/* PROJECT LIST PAGE */
/* -------------------------------- */
app.get("/projects", (req, res) => {
    res.render("projects");
});

/* -------------------------------- */
/* MAIN PROJECT PAGES */
/* -------------------------------- */
app.get("/YOLO_Real_Time_Object_Detection", (req, res) => {
    res.render("YOLO_Real_Time_Object_Detection");
});

app.get("/miniatureChatProject", (req, res) => {
    res.render("Miniature_ChatGPT_Project");
});

app.get("/reptileShop", (req, res) => {
    res.render("Hoffman_reptile_project");
});

/* -------------------------------- */
/* YOLO CODE REVIEW PAGES */
/* -------------------------------- */
app.get("/yolo_code_review", (req, res) => {
    res.render("YOLO_Code_Review_ai_analysis");
});

app.get("/yolo_code_review_dashboard", (req, res) => {
    res.render("YOLO_Code_Review_analysis_dashboard");
});

app.get("/yolo_code_review_analytics", (req, res) => {
    res.render("YOLO_Code_Review_analytics");
});

/* -------------------------------- */
/* DYNAMIC PROJECT ROUTES (SAFE) */
/* -------------------------------- */
app.get("/project/:id", (req, res) => {
    const projectId = req.params.id;
    const filePath = path.join(__dirname, "views", `Project${projectId}.ejs`);

    if (fs.existsSync(filePath)) {
        res.render(`Project${projectId}`);
    } else {
        res.status(404).send("Project not found");
    }
});

/* -------------------------------- */
/* FALLBACK (UNKNOWN ROUTES → HOME) */
/* -------------------------------- */
app.use((req, res) => {
    res.redirect("/");
});

/* -------------------------------- */
/* SERVER */
/* -------------------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});