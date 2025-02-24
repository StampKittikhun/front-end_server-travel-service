// 📦 Import Libraries และ Components ที่จำเป็น
import React, { useEffect, useState } from "react";
import HeaderSAU from "./../components/HeaderSAU.jsx";
import FooterSAU from "./../components/FooterSAU.jsx";
import {
  Button,
  Typography,
  Avatar,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

// ✅ ฟังก์ชันหลักของหน้าแก้ไขข้อมูลการเดินทาง
function UpdateMytravel() {
  // 📝 State สำหรับเก็บข้อมูลการเดินทาง
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");

  // 🔔 State สำหรับการแจ้งเตือน
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // 🏷️ ดึง travelId จาก URL
  const { travelId } = useParams();

  // 🌐 ✅ ฟังก์ชันสำหรับดึงข้อมูลการเดินทางจาก API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/travel/travelId/${travelId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTravelPlace(data["data"].travelPlace);
        setTravelStartDate(data["data"].travelStartDate);
        setTravelEndDate(data["data"].travelEndDate);
        setTravelCostTotal(data["data"].travelCostTotal);
      } else {
        setSnackbarMessage("❌ เกิดข้อผิดพลาดในการดึงข้อมูล");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // ⏳ ✅ useEffect: เรียกใช้เมื่อหน้าโหลดครั้งแรก
  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      fetchData();
    } else {
      window.location.href = "/";
    }
  }, [travelId]);

  // 💾 ✅ ฟังก์ชันสำหรับอัปเดตข้อมูลการเดินทาง
  const handleUpdateClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/travel/${travelId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            travelPlace,
            travelStartDate,
            travelEndDate,
            travelCostTotal,
          }),
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("✅ อัปเดตข้อมูลสำเร็จ!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.href = "/mytravel"; // 🔄 กลับไปหน้ารายการเดินทาง
        }, 2000);
      } else {
        const errorData = await response.json();
        setSnackbarMessage(`❌ เกิดข้อผิดพลาด: ${errorData.message}`);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("❌ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // 🔐 ฟังก์ชันออกจากระบบ
  const handleLogoutClick = () => {
    localStorage.removeItem("traveller");
    window.location.href = "/";
  };

  return (
    <>
      <HeaderSAU />
      {/* 🔑 ปุ่มออกจากระบบ */}
      <Button
        variant="contained"
        color="error"
        sx={{ display: "block", mx: "auto", my: 2 }}
        onClick={handleLogoutClick}
      >
        LOGOUT
      </Button>

      {/* 📝 กล่องฟอร์มแก้ไขข้อมูล */}
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box sx={{ width: "70%", boxShadow: 3, borderRadius: 2, my: 3, p: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#00796b", fontWeight: "bold" }}
          >
            My Travel App
          </Typography>
          <Avatar
            alt="Logoapp"
            src="https://media.istockphoto.com/id/1899228994/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%84%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B8%B8%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%B2%E0%B8%A7%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B9%82%E0%B8%A3%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B4%E0%B8%9B%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AB%E0%B8%A2%E0%B8%B8%E0%B8%94%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%99.jpg?s=1024x1024&w=is&k=20&c=1NJ7fP4Bp9vuP_s3Lp_2x7rIznIZocCKN_YZ0K0N_6M="
            sx={{ width: 100, height: 100, mx: "auto", my: 2 }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#004d40" }}
          >
            แก้ไขการเดินทาง
          </Typography>

          {/* 📋 ฟอร์มแก้ไขข้อมูล */}
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
            variant="outlined"
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="วันที่กลับ"
            variant="outlined"
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="ค่าใช้จ่ายตลอดการเดินทาง"
            variant="outlined"
            type="number"
            fullWidth
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* 💾 ปุ่มบันทึกการอัปเดต */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
            onClick={handleUpdateClick}
          >
            แก้ไขการเดินทาง
          </Button>

          <Box sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            <Link to="/mytravel" style={{ color: "#00796b" }}>
              🔙 กลับไปหน้าการเดินทาง
            </Link>
          </Typography>
        </Box>
      </Box>

      <FooterSAU />

      {/* 🔔 Snackbar แจ้งเตือนผลลัพธ์ */}
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

export default UpdateMytravel;
