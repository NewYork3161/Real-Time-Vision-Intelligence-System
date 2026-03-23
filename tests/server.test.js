const request = require("supertest");
const app = require("../server");

async function runTests() {
    console.log("\n===============================");
    console.log("🚀 RUNNING SERVER TESTS");
    console.log("===============================\n");

    try {

        // TEST 1
        const res1 = await request(app).get("/");
        console.log("Test 1: GET /");
        console.log(res1.statusCode === 200 ? "✅ PASSED" : "❌ FAILED");

        // TEST 2
        const res2 = await request(app).get("/projects");
        console.log("Test 2: GET /projects");
        console.log(res2.statusCode === 200 ? "✅ PASSED" : "❌ FAILED");

        // TEST 3
        const res3 = await request(app).get("/YOLO_Real_Time_Object_Detection");
        console.log("Test 3: YOLO Page");
        console.log(res3.statusCode === 200 ? "✅ PASSED" : "❌ FAILED");

        // TEST 4
        const res4 = await request(app).get("/project/9999");
        console.log("Test 4: Invalid Project");
        console.log(res4.statusCode === 404 ? "✅ PASSED" : "❌ FAILED");

        // TEST 5
        const res5 = await request(app).get("/random-route");
        console.log("Test 5: Fallback Redirect");
        console.log(res5.statusCode === 302 ? "✅ PASSED" : "❌ FAILED");

        console.log("\n===============================");
        console.log("🎯 TESTING COMPLETE");
        console.log("===============================\n");

    } catch (err) {
        console.error("❌ ERROR DURING TESTING:", err);
    }
}

runTests();