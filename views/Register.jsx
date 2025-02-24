// 📦 Import Libraries และ Components ที่จำเป็น
import React, { useState } from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "../components/FooterSAU.jsx";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

function Register() {
  // 📝 State สำหรับเก็บข้อมูลฟอร์มลงทะเบียน
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  // 🔔 State สำหรับจัดการ Snackbar แจ้งเตือน
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // ✅ ฟังก์ชันสำหรับการลงทะเบียน
  const handleSaveClick = async (e) => {
    e.preventDefault();

    // 🔍 ตรวจสอบความครบถ้วนของข้อมูล
    if (!travellerFullname || !travellerEmail || !travellerPassword) {
      setSnackbarMessage("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else {
      try {
        // 🌐 เรียก API เพื่อลงทะเบียนผู้ใช้ใหม่
        const response = await fetch("http://localhost:3030/traveller", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            travellerFullname,
            travellerEmail,
            travellerPassword,
          }),
        });

        // ✅ หากลงทะเบียนสำเร็จ
        if (response.status === 201) {
          setSnackbarMessage("✅ บันทึกการลงทะเบียนเรียบร้อยแล้ว!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);

          // ⏳ หน่วงเวลา 2 วินาที ก่อน Redirect กลับหน้า Login
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setSnackbarMessage("❌ เกิดข้อผิดพลาดในการลงทะเบียน");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMessage("❌ เกิดข้อผิดพลาดในการลงทะเบียน");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <>
      <HeaderSAU /> {/* 🌟 ส่วนหัวของแอปพลิเคชัน */}

      {/* 📦 กล่องฟอร์มลงทะเบียน */}
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box sx={{ width: "70%", boxShadow: 3, borderRadius: 2, my: 3, p: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#00796b", fontWeight: "bold" }}
          >
            My Travel App
          </Typography>

          {/* 🖼️ รูปโปรไฟล์ */}
          <Avatar
            alt="Logoapp"
            src="https://media.istockphoto.com/id/1899228994/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=1NJ7fP4Bp9vuP_s3Lp_2x7rIznIZocCKN_YZ0K0N_6M="
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />

          {/* 📝 หัวข้อฟอร์มลงทะเบียน */}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#004d40" }}
          >
            ลงทะเบียนเพื่อสร้างบัญชีผู้ใช้งาน
          </Typography>

          <Box sx={{ my: 2 }} />

          {/* 🔥 ฟอร์มป้อนข้อมูลลงทะเบียน */}
          <TextField
            label="ชื่อ-สกุล"
            variant="outlined"
            placeholder="ชื่อ-สกุล"
            fullWidth
            value={travellerFullname}
            onChange={(e) => setTravellerFullname(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="อีเมล์"
            variant="outlined"
            placeholder="Travller@gmail.com"
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="รหัสผ่าน"
            variant="outlined"
            placeholder="********"
            fullWidth
            type="password"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* 🔒 ปุ่มบันทึกข้อมูล */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
            onClick={handleSaveClick}
          >
            บันทึกการลงทะเบียน
          </Button>

          <Box sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            <Link to="/" style={{ color: "#00796b" }}>
              🔙 กลับไปหน้าเข้าใช้งาน
            </Link>
          </Typography>
        </Box>
      </Box>

      <FooterSAU /> {/* 🌟 ส่วนท้ายของแอปพลิเคชัน */}

      {/* 🔔 Snackbar แจ้งเตือนผลการทำงาน */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Register;
