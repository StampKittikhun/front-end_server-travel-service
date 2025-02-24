import React, { useEffect, useState } from "react"; // 🚀 React Hooks
import HeaderSAU from "../components/HeaderSAU.jsx"; // 🔥 Header component
import FooterSAU from "../components/FooterSAU.jsx"; // 🔥 Footer component
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material"; // 🎨 MUI Components
import { Link } from "react-router-dom"; // 🔗 สำหรับลิงก์เปลี่ยนหน้า

function AddMytravel() {
  // 🎯 State สำหรับเก็บข้อมูลผู้ใช้
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerId, setTravellerId] = useState("");

  // 📝 State สำหรับข้อมูลการเดินทาง
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");

  // 🔔 State สำหรับ Snackbar (แจ้งเตือน)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // ✅ ฟังก์ชันบันทึกข้อมูลการเดินทาง
  const handleSaveClick = async (e) => {
    e.preventDefault();

    // 🔒 ตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
    if (!travelPlace || !travelStartDate || !travelEndDate || !travelCostTotal) {
      setSnackbarMessage("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      // 🌐 เรียก API เพื่อบันทึกข้อมูล
      const response = await fetch("http://localhost:3030/travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          travelPlace,
          travelStartDate,
          travelEndDate,
          travelCostTotal,
          travellerId, // 🛡️ ส่ง travellerId ไปด้วยเพื่อเชื่อมโยงข้อมูล
        }),
      });

      const data = await response.json(); // 📦 อ่านข้อมูลจาก response

      if (response.ok) {
        // 🎉 แจ้งเตือนเมื่อบันทึกข้อมูลสำเร็จ
        setSnackbarMessage("✅ บันทึกข้อมูลสำเร็จ!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.href = "/mytravel"; // 🔄 กลับไปหน้ารายการเดินทาง
        }, 2000);
      } else {
        setSnackbarMessage(`❌ บันทึกไม่สำเร็จ: ${data.message}`);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาด:", error);
      setSnackbarMessage("❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง...");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // 🔍 ดึงข้อมูลผู้ใช้จาก LocalStorage เมื่อหน้าโหลด
  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));

    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      setTravellerEmail(traveller.travellerEmail);
      setTravellerId(traveller.travellerId);
    } else {
      window.location.href = "/"; // 🚪 หากไม่พบข้อมูลผู้ใช้ กลับไปหน้า Login
    }
  }, []);

  // 🚪 ฟังก์ชันออกจากระบบ
  const handleLogoutClick = () => {
    localStorage.removeItem("traveller"); // 🧹 ลบข้อมูลจาก LocalStorage
    window.location.href = "/"; // 🔄 กลับไปหน้า Login
  };

  return (
    <>
      <HeaderSAU /> {/* 🌟 Header ส่วนหัวของเว็บ */}

      {/* 🔒 ปุ่ม Logout */}
      <Button
        variant="contained"
        color="error"
        sx={{ display: "block", mx: "auto", my: 2 }}
        onClick={handleLogoutClick}
      >
        LOGOUT
      </Button>

      {/* 💡 กล่องฟอร์มหลัก */}
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box sx={{ width: "70%", boxShadow: 3, borderRadius: 2, my: 3, p: 4 }}>
          <Typography variant="h4" sx={{ textAlign: "center", color: "#00796b" }}>
            My Travel App
          </Typography>

          {/* 🖼️ โลโก้ */}
          <Avatar
            alt="Logoapp"
            src="https://media.istockphoto.com/id/1899228994/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=1NJ7fP4Bp9vuP_s3Lp_2x7rIznIZocCKN_YZ0K0N_6M="
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />

          <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
            เพิ่มการเดินทาง
          </Typography>

          {/* 📝 ฟอร์มป้อนข้อมูล */}
          <TextField
            label="สถานที่เดินทางไป"
            variant="outlined"
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="วันที่ไป"
            type="date"
            variant="outlined"
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="วันที่กลับ"
            type="date"
            variant="outlined"
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="ค่าใช้จ่ายตลอดการเดินทาง (บาท)"
            type="number"
            variant="outlined"
            fullWidth
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* 🖱️ ปุ่มบันทึก */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
            onClick={handleSaveClick}
          >
            บันทึกการเดินทาง
          </Button>

          {/* 🔗 ลิงก์กลับไปหน้าหลัก */}
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/mytravel">กลับไปหน้าการเดินทาง</Link>
          </Typography>
        </Box>
      </Box>

      <FooterSAU /> {/* 🌟 Footer ส่วนท้ายของเว็บ */}

      {/* 🔔 Snackbar แจ้งเตือน */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddMytravel;
