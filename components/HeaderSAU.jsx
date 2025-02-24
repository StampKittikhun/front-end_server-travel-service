// 📦 Import Components จาก Material-UI
import React from "react";
import PropTypes from "prop-types";
import { Typography, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import { CommuteOutlined } from "@mui/icons-material";

// ✅ Header Component พร้อมรับ Props
function HeaderSAU({
  appName = "My Travel App",
  welcomeMessage = "WELCOME TO MY TRAVEL APP",
  version = "(version by dti-sau)",
}) {
  return (
    <>
      {/* 🚀 Navigation Bar (แถบนำทาง) */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#00796b", // 🎨 สีเขียวหลัก
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 🖌️ เงาเพิ่มมิติ
          }}
        >
          <Toolbar>
            {/* 🔘 ไอคอนเมนู (CommuteOutlined) */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <CommuteOutlined />
            </IconButton>

            {/* 🏷️ ชื่อแอป */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              {appName}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* 🚀 Welcome Section (แบนเนอร์ต้อนรับ) */}
      <Box
        width="100%"
        textAlign="center"
        p={4} // 📏 Padding เพิ่มความสวยงาม
        sx={{
          bgcolor: "#004d40", // 🎨 สีเขียวเข้ม
          color: "white", // 🎨 สีตัวอักษรขาว
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 🖌️ เพิ่มเงา
        }}
      >
        {/* ✨ ข้อความต้อนรับ (Welcome Message) */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold", // 🏋️ ทำให้ตัวหนา
            mb: 2, // 📏 Margin ด้านล่าง
            textTransform: "uppercase", // 🔡 เปลี่ยนเป็นตัวพิมพ์ใหญ่ทั้งหมด
            letterSpacing: 2, // 🔠 เพิ่มระยะห่างระหว่างตัวอักษร
          }}
        >
          {welcomeMessage}
        </Typography>

        {/* 🔖 แสดงเวอร์ชันของแอป */}
        <Typography variant="h4" sx={{ color: "#ffe082", fontStyle: "italic" }}>
          {version}
        </Typography>
      </Box>
    </>
  );
}

// ✅ กำหนดค่า PropTypes (รองรับการรับค่า Props)
HeaderSAU.propTypes = {
  appName: PropTypes.string,
  welcomeMessage: PropTypes.string,
  version: PropTypes.string,
};

// 🔄 ส่งออก Component
export default HeaderSAU;
