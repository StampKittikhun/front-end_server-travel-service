import React, { useState } from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "./../components/FooterSAU.jsx";
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

function Login() {
  // ✅ State สำหรับเก็บค่าที่ผู้ใช้กรอก
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  // ✅ State สำหรับ Snackbar แจ้งเตือน
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // ✅ ฟังก์ชันสำหรับการเข้าสู่ระบบ
  const handleLoginClick = async (e) => {
    e.preventDefault(); // 🚀 ป้องกันหน้าเว็บโหลดใหม่เมื่อกดปุ่ม

    // ❌ ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (travellerEmail === "" || travellerPassword === "") {
      setSnackbarMessage("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else {
      try {
        // 🌐 ส่งคำขอไปยัง API เพื่อเช็คข้อมูลเข้าสู่ระบบ
        const response = await fetch(
          `http://localhost:3030/traveller/${travellerEmail}/${travellerPassword}`,
          { method: "GET" }
        );

        // ✅ กรณีเข้าสู่ระบบสำเร็จ
        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("traveller", JSON.stringify(data["data"])); // 💾 เก็บข้อมูลผู้ใช้ลงใน LocalStorage
          setSnackbarMessage("✅ เข้าสู่ระบบสำเร็จ!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);

          // 🚀 นำผู้ใช้ไปหน้า `mytravel` หลังจาก 2 วินาที
          setTimeout(() => {
            window.location.href = "mytravel";
          }, 2000);
        } else {
          // ❌ หากรหัสผ่านหรืออีเมลผิด แจ้งเตือนผู้ใช้
          setSnackbarMessage("❌ ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        setSnackbarMessage("❌ เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <>
      {/* ✅ Header ส่วนหัวของหน้า */}
      <HeaderSAU />

      {/* ✅ Container หลักของหน้า Login */}
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box sx={{ width: "70%", boxShadow: 3, borderRadius: 2, my: 3, p: 4 }}>
          {/* ✅ หัวข้อของแอป */}
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#00796b", fontWeight: "bold" }}
          >
            My Travel App
          </Typography>

          {/* ✅ โลโก้แอป */}
          <Avatar
            alt="Logoapp"
            src="https://media.istockphoto.com/id/1899228994/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=1NJ7fP4Bp9vuP_s3Lp_2x7rIznIZocCKN_YZ0K0N_6M="
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />

          {/* ✅ หัวข้อการเข้าสู่ระบบ */}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#004d40" }}
          >
            เข้าสู่ระบบ
          </Typography>

          {/* 📝 ฟอร์มเข้าสู่ระบบ */}
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

          {/* 🔥 ปุ่มเข้าสู่ระบบ */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
            onClick={handleLoginClick}
          >
            LOGIN
          </Button>

          <Box sx={{ my: 2 }} />

          {/* ✅ ลิงก์ไปหน้าลงทะเบียน */}
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            คุณยังไม่มีบัญชีผู้ใช้งานใช่ไหม ?{" "}
            <Link to="/register" style={{ color: "#00796b" }}>
              ลงทะเบียนที่นี่
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* ✅ Footer ส่วนท้ายของหน้า */}
      <FooterSAU />

      {/* 🔔 Snackbar แจ้งเตือน */}
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

export default Login;
