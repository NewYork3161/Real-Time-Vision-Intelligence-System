const express = require("express");

const app = express();

/* VIEW ENGINE */

app.set("view engine", "ejs");

/* STATIC FILES */

app.use(express.static("public"));

/* -------------------------------- */
/* LANDING PAGE */
/* -------------------------------- */

app.get("/", (req, res) => {
    res.render("index");
});

/* -------------------------------- */
/* PROJECT LIST PAGE */
/* -------------------------------- */

app.get("/projects", (req, res) => {
    res.render("projects");
});

/* -------------------------------- */
/* YOLO PROJECT PAGE */
/* -------------------------------- */

app.get("/YOLO_Real_Time_Object_Detection", (req, res) => {
    res.render("YOLO_Real_Time_Object_Detection");
});

/* -------------------------------- */
/* YOLO CODE REVIEW PAGE 1 */
/* ai_analysis.py */
/* -------------------------------- */

app.get("/yolo_code_review", (req, res) => {
    res.render("YOLO_Code_Review_ai_analysis");
});

/* -------------------------------- */
/* YOLO CODE REVIEW PAGE 2 */
/* analysis_dashboard.py */
/* -------------------------------- */

app.get("/yolo_code_review_dashboard", (req, res) => {
    res.render("YOLO_Code_Review_analysis_dashboard");
});

/* -------------------------------- */
/* YOLO CODE REVIEW PAGE 3 */
/* analytics */
/* -------------------------------- */

app.get("/yolo_code_review_analytics", (req, res) => {
    res.render("YOLO_Code_Review_analytics");
});

/* -------------------------------- */
/* PROJECT PAGES */
/* -------------------------------- */

app.get("/project1", (req, res) => {
    res.render("Project1");
});

app.get("/project2", (req, res) => {
    res.render("Project2");
});

app.get("/project3", (req, res) => {
    res.render("Project3");
});

app.get("/project4", (req, res) => {
    res.render("Project4");
});

app.get("/project5", (req, res) => {
    res.render("Project5");
});

app.get("/project6", (req, res) => {
    res.render("Project6");
});

/* -------------------------------- */
/* SERVER */
/* -------------------------------- */

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});