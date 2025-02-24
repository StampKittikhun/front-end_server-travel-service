// 📦 Import Libraries และ Components ที่จำเป็น
import React, { useEffect, useState } from "react";
import HeaderSAU from "../components/HeaderSAU.jsx";
import FooterSAU from "../components/FooterSAU.jsx";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

function MyTravel() {
  // 🎯 State สำหรับข้อมูลผู้ใช้
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerId, setTravellerId] = useState("");

  // 📝 State สำหรับเก็บข้อมูลการเดินทาง
  const [travel, setTravel] = useState([]);

  // 🔔 State สำหรับ Snackbar แจ้งเตือน
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // 🚪 ฟังก์ชันออกจากระบบ
  const handleLogoutClick = () => {
    localStorage.removeItem("traveller"); // 🧹 เคลียร์ข้อมูลผู้ใช้
    window.location.href = "/"; // 🔄 กลับไปหน้า Login
  };

  // 🔄 useEffect: ดึงข้อมูลผู้ใช้และรายการเดินทางจาก Server
  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));

    if (traveller) {
      setTravellerFullname(traveller.travellerFullname);
      setTravellerId(traveller.travellerId);

      // 🌐 เรียก API เพื่อดึงข้อมูลการเดินทาง
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3030/travel/${traveller.travellerId}`,
            { method: "GET", headers: { "Content-Type": "application/json" } }
          );
          if (response.ok) {
            const data = await response.json();
            setTravel(data["data"]); // 📝 บันทึกข้อมูลลง State
          }
        } catch (error) {
          // ❌ หากเกิดข้อผิดพลาด จะแจ้งเตือนด้วย Snackbar
          setSnackbarMessage("❌ เกิดข้อผิดพลาดในการดึงข้อมูล");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      };
      fetchData();
    } else {
      window.location.href = "/"; // 🔒 หากไม่พบข้อมูลผู้ใช้ ให้กลับไปหน้า Login
    }
  }, []);

  // 🗑️ ฟังก์ชันลบข้อมูลการเดินทาง
  const handleDeleteClick = async (travelId) => {
    try {
      const response = await fetch(`http://localhost:3030/travel/${travelId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSnackbarMessage("✅ ลบการเดินทางเรียบร้อยแล้ว!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // 📝 อัปเดต State โดยไม่ต้องโหลดหน้าใหม่
        setTravel((prev) => prev.filter((item) => item.travelId !== travelId));
      } else {
        setSnackbarMessage("❌ ลบไม่สำเร็จ ลองใหม่อีกครั้ง");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("❌ เกิดข้อผิดพลาดในการลบข้อมูล");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <HeaderSAU /> {/* 🌟 ส่วนหัวของแอปพลิเคชัน */}

      {/* 🔒 ปุ่มออกจากระบบ */}
      <Button
        variant="contained"
        color="error"
        sx={{ display: "block", mx: "auto", my: 2 }}
        onClick={handleLogoutClick}
      >
        LOGOUT
      </Button>

      {/* 💡 กล่องแสดงข้อมูลการเดินทาง */}
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

          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#004d40" }}
          >
            การเดินทางของคุณ: {travellerFullname}
          </Typography>

          {/* 📊 ตารางแสดงข้อมูลการเดินทาง */}
          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#004d40" }}>
                <TableRow>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    No.
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    สถานที่เดินทางไป
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    วันที่ไป
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    วันที่กลับ
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    ค่าใช้จ่าย (บาท)
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    จัดการ
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* 📝 แสดงรายการการเดินทางแบบ Dynamic */}
              <TableBody>
                {travel.map((row, index) => (
                  <TableRow
                    key={row.travelId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.travelPlace}</TableCell>
                    <TableCell align="center">{row.travelStartDate}</TableCell>
                    <TableCell align="center">{row.travelEndDate}</TableCell>
                    <TableCell align="center">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      {/* ✏️ ปุ่มแก้ไข */}
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#00796b",
                          "&:hover": { bgcolor: "#004d40" },
                          mr: 1,
                        }}
                        component={Link}
                        to={`/updatemytravel/${row.travelId}`}
                      >
                        แก้ไข
                      </Button>
                      {/* 🗑️ ปุ่มลบ */}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(row.travelId)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ➕ ปุ่มเพิ่มการเดินทาง */}
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" } }}
            component={Link}
            to="/AddMytravel"
          >
            เพิ่มการเดินทาง
          </Button>
        </Box>
      </Box>

      <FooterSAU /> {/* 🌟 ส่วนท้ายของแอปพลิเคชัน */}

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

export default MyTravel;
