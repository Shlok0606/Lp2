import express from "express";
import mongoose from "mongoose";
const app = express();
import { studentsData } from "./data.js";
app.use(express());

mongoose
  .connect(
    "mongodb+srv://shlok:y1Izf9hbyvjha91Z@cluster0.kyqc460.mongodb.net/testStudents?retryWrites=true&w=majority"
    mongodb+srv://shlok:@cluster0.kyqc460.mongodb.net/?retryWrites=true&w=majority
  )
  .then(() => {
    console.log("Mongoose Connected");
  });

const Schema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  CC_Marks: Number,
  AI_marks: Number,
});

const Student = mongoose.model("studentsmarks", Schema);

app.get("/addData", async (req, res) => {
  try {
    const data = await Student.insertMany(studentsData);
    res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/showData", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    const data = await Student.find();
    var tableData = data.map((ele) => {
      return `
    <tr>
    <td>${ele.Name}</td>
    <td>${ele.Roll_No}</td>
    <td>${ele.WAD_Marks}</td>
    <td>${ele.DSBDA_Marks}</td>
    <td>${ele.CNS_Marks}</td>
    <td>${ele.CC_Marks}</td>
    <td>${ele.AI_marks}</td>
    </tr>
    `;
    });

    const table = `
    <table>
 <tr>
 <th>Name</th>
 <th>Roll_No</th>
 <th>WAD_Marks</th>
 <th>DSBDA_Marks</th>
 <th>CNS_Marks</th>
 <th>CC_Marks</th>
 <th>AI_Marks</th>
 </tr>
 ${tableData}
   </table>
 `;

    res.send(`TotalCount=  ${count} <br></br>
      data= <br></br> ${table}
    `);
  } catch (err) {
    res.send("Error in showing data");
  }
});

app.get("/dsbda", async (req, res) => {
  try {
    const data = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/update/:rollNo", async (req, res) => {
  try {
    const { rollNo } = req.params;

    const filter = { Roll_No: rollNo };
    const updated = {
      $inc: {
        DSBDA_Marks: 10,
        CC_Marks: 10,
        CNS_Marks: 10,
        WAD_Marks: 10,
        AI_marks: 10,
      },
    };

    const data = await Student.findOneAndUpdate(filter, updated);

    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/gt25", async (req, res) => {
  try {
    const data = await Student.find({
      DSBDA_Marks: { $gt: 25 },
      WAD_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
    });

    res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/lt40", async (req, res) => {
  try {
    const data = await Student.find({
      CC_Marks: { $lt: 40 },
      CNS_Marks: { $lt: 40 },
    });
    res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/delete/:rollNo", async (req, res) => {
  try {
    const { rollNo } = req.params;
    const data = await Student.findOneAndDelete({ Roll_No: rollNo });
    res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.listen(8000, () => {
  console.log("server listening on port 8000");
});
